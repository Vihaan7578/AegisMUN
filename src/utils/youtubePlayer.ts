// YouTube IFrame Player API integration
import { FallbackAudioPlayer, FALLBACK_PLAYER_STATES } from './fallbackPlayer'

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export interface YouTubePlayer {
  playVideo: () => void
  pauseVideo: () => void
  stopVideo: () => void
  getCurrentTime: () => number
  getDuration: () => number
  getPlayerState: () => number
  setVolume: (volume: number) => void
  destroy: () => void
}

export class YouTubeMusicPlayer {
  private player: YouTubePlayer | null = null
  private fallbackPlayer: FallbackAudioPlayer | null = null
  private containerId: string
  private onTimeUpdate?: (currentTime: number) => void
  private onStateChange?: (state: number) => void
  private useFallback = false
  private timeTrackingInterval?: NodeJS.Timeout

  constructor(containerId: string = 'youtube-music-player') {
    this.containerId = containerId
  }

  private loadYouTubeAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Check if API is already loaded
        if (window.YT && window.YT.Player) {
          console.log('YouTube API already loaded')
          resolve()
          return
        }

        // Check if script is already in DOM (more thorough check)
        const existingScripts = Array.from(document.querySelectorAll('script[src*="youtube.com/iframe_api"]'))
        
        if (existingScripts.length > 0) {
          console.log('YouTube API script already exists, waiting for load...')
          
          // Script exists, wait for it with timeout
          let attempts = 0
          const maxAttempts = 50 // 5 seconds with 100ms intervals
          
          const checkInterval = setInterval(() => {
            attempts++
            if (window.YT && window.YT.Player) {
              clearInterval(checkInterval)
              console.log('YouTube API loaded (existing script)')
              resolve()
            } else if (attempts >= maxAttempts) {
              clearInterval(checkInterval)
              console.warn('Timeout waiting for existing YouTube API script')
              reject(new Error('YouTube API loading timeout (existing script)'))
            }
          }, 100)
          return
        }

        console.log('Loading YouTube API script...')
        
        // Set up timeout for new script loading (reduced for faster experience)
        const timeout = setTimeout(() => {
          console.warn('YouTube API loading timeout, falling back')
          reject(new Error('YouTube API loading timeout'))
        }, 5000) // 5 second timeout for faster fallback

        // Create script element with enhanced error handling
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        tag.async = true
        tag.defer = true
        
        tag.onerror = (error) => {
          clearTimeout(timeout)
          console.error('Failed to load YouTube API script:', error)
          reject(new Error('Failed to load YouTube API script'))
        }

        tag.onload = () => {
          console.log('YouTube API script loaded')
          // API might still be initializing, so we wait for the callback
        }
        
        // Safe DOM insertion
        try {
          const firstScriptTag = document.getElementsByTagName('script')[0]
          if (firstScriptTag && firstScriptTag.parentNode) {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
          } else {
            // Fallback to head if no script tags exist
            const head = document.head || document.getElementsByTagName('head')[0]
            if (head) {
              head.appendChild(tag)
            } else {
              // Last resort: append to body
              document.body.appendChild(tag)
            }
          }
        } catch (domError) {
          clearTimeout(timeout)
          console.error('DOM insertion error:', domError)
          reject(new Error('Failed to insert YouTube API script into DOM'))
          return
        }

        // Enhanced callback setup
        const originalCallback = window.onYouTubeIframeAPIReady
        window.onYouTubeIframeAPIReady = () => {
          try {
            clearTimeout(timeout)
            console.log('YouTube API ready callback triggered')
            
            // Call original callback if it existed
            if (originalCallback && typeof originalCallback === 'function') {
              originalCallback()
            }
            
            // Verify API is actually ready
            if (window.YT && window.YT.Player) {
              resolve()
            } else {
              console.error('YouTube API callback triggered but YT.Player not available')
              reject(new Error('YouTube API ready but Player not available'))
            }
          } catch (callbackError) {
            clearTimeout(timeout)
            console.error('Error in YouTube API ready callback:', callbackError)
            reject(callbackError)
          }
        }
      } catch (error) {
        console.error('Error in loadYouTubeAPI:', error)
        reject(error)
      }
    })
  }

  private createPlayerContainer(): HTMLElement {
    try {
      // Remove existing container if it exists
      const existingContainer = document.getElementById(this.containerId)
      if (existingContainer && existingContainer.parentNode) {
        existingContainer.parentNode.removeChild(existingContainer)
      }

      // Create new container with safe DOM operations
      const container = document.createElement('div')
      container.id = this.containerId
      container.style.cssText = `
        position: fixed !important;
        top: -2000px !important;
        left: -2000px !important;
        width: 1px !important;
        height: 1px !important;
        opacity: 0 !important;
        pointer-events: none !important;
        z-index: -1000 !important;
        overflow: hidden !important;
      `

      // Safe append to body
      try {
        document.body.appendChild(container)
      } catch (appendError) {
        console.error('Error appending container to body:', appendError)
        throw new Error('Failed to create player container')
      }

      console.log('YouTube player container created successfully')
      return container
    } catch (error) {
      console.error('Error creating player container:', error)
      throw error
    }
  }

  async loadVideo(videoId: string, autoplay: boolean = true): Promise<void> {
    try {
      console.log('Attempting to load video:', videoId)
      
      // Clean up existing players first
      this.cleanup()
      
      // Try YouTube API first
      try {
        console.log('Attempting YouTube API load...')
        await this.loadYouTubeAPI()
        console.log('YouTube API loaded successfully')
        
        // Create container
        const container = this.createPlayerContainer()
        
        // Validate YouTube API is available
        if (!window.YT || !window.YT.Player) {
          throw new Error('YouTube API not available after loading')
        }

        console.log('Creating YouTube player...')
        
        // Create new player with enhanced error handling
        this.player = new window.YT.Player(this.containerId, {
          height: '1',
          width: '1',
          videoId: videoId,
          playerVars: {
            autoplay: autoplay ? 1 : 0,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            showinfo: 0,
            start: 0,
            html5: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (event: any) => {
              try {
                console.log('YouTube player ready')
                if (autoplay) {
                  setTimeout(() => {
                    try {
                      event.target.playVideo()
                    } catch (playError) {
                      console.error('Error auto-playing video:', playError)
                    }
                  }, 100)
                }
                this.startTimeTracking()
              } catch (error) {
                console.error('Error in onReady callback:', error)
              }
            },
            onStateChange: (event: any) => {
              try {
                if (this.onStateChange) {
                  this.onStateChange(event.data)
                }
              } catch (error) {
                console.error('Error in onStateChange callback:', error)
              }
            },
            onError: (event: any) => {
              console.error('YouTube player error:', event.data)
              this.handlePlayerError(event.data)
            }
          }
        })
        
        this.useFallback = false
        console.log('YouTube player created successfully')
        
      } catch (youtubeError) {
        console.error('YouTube API failed, using fallback:', youtubeError)
        await this.loadWithFallback(videoId, autoplay)
      }
      
    } catch (error) {
      console.error('Failed to load video completely:', error)
      // Even fallback failed, but don't throw to prevent app crash
    }
  }

  private async loadWithFallback(videoId: string, autoplay: boolean): Promise<void> {
    try {
      console.log('Loading with fallback player...')
      this.useFallback = true
      
      // Clean up YouTube player if it exists
      if (this.player) {
        try {
          this.player.destroy()
        } catch (e) {
          console.warn('Error destroying YouTube player:', e)
        }
        this.player = null
      }

      // Create and setup fallback player
      if (this.fallbackPlayer) {
        this.fallbackPlayer.destroy()
      }

      this.fallbackPlayer = new FallbackAudioPlayer(this.containerId + '-fallback')
      
      // Set up callbacks
      this.fallbackPlayer.setTimeUpdateCallback((currentTime) => {
        if (this.onTimeUpdate) {
          this.onTimeUpdate(currentTime)
        }
      })

      this.fallbackPlayer.setStateChangeCallback((state) => {
        if (this.onStateChange) {
          this.onStateChange(state)
        }
      })

      // Load video
      await this.fallbackPlayer.loadVideo(videoId, autoplay)
      console.log('Fallback player loaded successfully')
      
    } catch (fallbackError) {
      console.error('Fallback player also failed:', fallbackError)
      throw fallbackError
    }
  }

  private handlePlayerError(errorCode: number): void {
    console.error('YouTube player error code:', errorCode)
    
    const errorMessages: { [key: number]: string } = {
      2: 'Invalid video ID',
      5: 'HTML5 player error',
      100: 'Video not found or private',
      101: 'Video not allowed in embedded players',
      150: 'Video not allowed in embedded players'
    }
    
    const message = errorMessages[errorCode] || 'Unknown YouTube player error'
    console.error(message)
    
    // For certain errors, try fallback immediately
    if ([100, 101, 150].includes(errorCode)) {
      console.log('Switching to fallback due to video restrictions')
      // Don't auto-switch here to avoid infinite loops
    }
  }

  private startTimeTracking(): void {
    // Clear existing interval
    if (this.timeTrackingInterval) {
      clearInterval(this.timeTrackingInterval)
    }

    const updateTime = () => {
      try {
        if (this.useFallback) {
          // Fallback player handles its own time tracking
          return
        }
        
        if (this.player && this.onTimeUpdate) {
          try {
            const currentTime = this.player.getCurrentTime()
            if (typeof currentTime === 'number' && !isNaN(currentTime)) {
              this.onTimeUpdate(currentTime)
            }
          } catch (error) {
            console.warn('Error getting current time from YouTube player:', error)
          }
        }
      } catch (error) {
        console.error('Error in time tracking:', error)
      }
    }

    // Start time tracking with error handling
    this.timeTrackingInterval = setInterval(updateTime, 250)
  }

  private cleanup(): void {
    try {
      // Clear time tracking
      if (this.timeTrackingInterval) {
        clearInterval(this.timeTrackingInterval)
        this.timeTrackingInterval = undefined
      }

      // Cleanup YouTube player
      if (this.player) {
        try {
          this.player.destroy()
        } catch (error) {
          console.warn('Error destroying YouTube player:', error)
        }
        this.player = null
      }

      // Cleanup fallback player
      if (this.fallbackPlayer) {
        try {
          this.fallbackPlayer.destroy()
        } catch (error) {
          console.warn('Error destroying fallback player:', error)
        }
        this.fallbackPlayer = null
      }

      // Remove container safely
      try {
        const container = document.getElementById(this.containerId)
        if (container && container.parentNode) {
          container.parentNode.removeChild(container)
        }
      } catch (error) {
        console.warn('Error removing player container:', error)
      }
    } catch (error) {
      console.error('Error in cleanup:', error)
    }
  }

  setTimeUpdateCallback(callback: (currentTime: number) => void): void {
    this.onTimeUpdate = callback
  }

  setStateChangeCallback(callback: (state: number) => void): void {
    this.onStateChange = callback
  }

  play(): void {
    try {
      if (this.useFallback && this.fallbackPlayer) {
        this.fallbackPlayer.play()
      } else if (this.player) {
        this.player.playVideo()
      }
    } catch (error) {
      console.error('Error playing video:', error)
    }
  }

  pause(): void {
    try {
      if (this.useFallback && this.fallbackPlayer) {
        this.fallbackPlayer.pause()
      } else if (this.player) {
        this.player.pauseVideo()
      }
    } catch (error) {
      console.error('Error pausing video:', error)
    }
  }

  stop(): void {
    try {
      if (this.useFallback && this.fallbackPlayer) {
        this.fallbackPlayer.stop()
      } else if (this.player) {
        this.player.stopVideo()
      }
    } catch (error) {
      console.error('Error stopping video:', error)
    }
  }

  setVolume(volume: number): void {
    try {
      if (this.useFallback && this.fallbackPlayer) {
        this.fallbackPlayer.setVolume(volume)
      } else if (this.player) {
        this.player.setVolume(volume)
      }
    } catch (error) {
      console.error('Error setting volume:', error)
    }
  }

  getCurrentTime(): number {
    try {
      if (this.useFallback && this.fallbackPlayer) {
        return this.fallbackPlayer.getCurrentTime()
      } else if (this.player) {
        return this.player.getCurrentTime() || 0
      }
    } catch (error) {
      console.error('Error getting current time:', error)
    }
    return 0
  }

  getDuration(): number {
    try {
      if (this.useFallback && this.fallbackPlayer) {
        return this.fallbackPlayer.getDuration()
      } else if (this.player) {
        return this.player.getDuration() || 0
      }
    } catch (error) {
      console.error('Error getting duration:', error)
    }
    return 0
  }

  getPlayerState(): number {
    try {
      if (this.useFallback && this.fallbackPlayer) {
        return this.fallbackPlayer.getPlayerState()
      } else if (this.player) {
        return this.player.getPlayerState() || -1
      }
    } catch (error) {
      console.error('Error getting player state:', error)
    }
    return -1
  }

  destroy(): void {
    try {
      this.cleanup()
      console.log('YouTube music player destroyed')
    } catch (error) {
      console.error('Error destroying player:', error)
    }
  }
}

// YouTube Player States
export const YT_PLAYER_STATES = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5
} 