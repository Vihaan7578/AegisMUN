// Fallback audio player when YouTube API fails
export class FallbackAudioPlayer {
  private audio: HTMLAudioElement | null = null
  private onTimeUpdate?: (currentTime: number) => void
  private onStateChange?: (state: number) => void
  private isPlaying = false

  constructor(private containerId: string = 'fallback-audio-player') {
    console.log('Initializing fallback audio player')
  }

  async loadVideo(videoId: string, autoplay: boolean = true): Promise<void> {
    try {
      console.log('Loading fallback audio for video:', videoId)
      
      // Create audio element
      if (this.audio) {
        this.audio.pause()
        this.audio.remove()
      }

      this.audio = document.createElement('audio')
      this.audio.style.display = 'none'
      this.audio.crossOrigin = 'anonymous'
      
      // Try to get audio URL from video ID (this is a simplified approach)
      // In reality, you'd need a service to extract audio from YouTube
      // For now, we'll use a placeholder that shows the fallback is working
      const audioUrl = `https://www.soundjay.com/misc/sounds/bells-ringing-05.mp3` // Placeholder audio
      
      this.audio.src = audioUrl
      this.audio.preload = 'auto'

      // Set up event listeners
      this.audio.addEventListener('loadeddata', () => {
        console.log('Fallback audio loaded')
        if (autoplay) {
          this.play()
        }
        this.startTimeTracking()
      })

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false
        if (this.onStateChange) {
          this.onStateChange(0) // ENDED state
        }
      })

      this.audio.addEventListener('play', () => {
        this.isPlaying = true
        if (this.onStateChange) {
          this.onStateChange(1) // PLAYING state
        }
      })

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false
        if (this.onStateChange) {
          this.onStateChange(2) // PAUSED state
        }
      })

      this.audio.addEventListener('error', (e) => {
        console.error('Fallback audio error:', e)
        if (this.onStateChange) {
          this.onStateChange(-1) // ERROR state
        }
      })

      // Append to container
      let container = document.getElementById(this.containerId)
      if (!container) {
        container = document.createElement('div')
        container.id = this.containerId
        container.style.display = 'none'
        document.body.appendChild(container)
      }
      container.appendChild(this.audio)

      // Load the audio
      this.audio.load()

    } catch (error) {
      console.error('Failed to load fallback audio:', error)
      throw error
    }
  }

  private startTimeTracking(): void {
    const updateTime = () => {
      try {
        if (this.audio && this.onTimeUpdate) {
          const currentTime = this.audio.currentTime
          if (typeof currentTime === 'number' && !isNaN(currentTime)) {
            this.onTimeUpdate(currentTime)
          }
        }
        
        if (this.audio && !this.audio.ended) {
          setTimeout(updateTime, 250)
        }
      } catch (error) {
        console.error('Error in fallback time tracking:', error)
      }
    }
    
    updateTime()
  }

  setTimeUpdateCallback(callback: (currentTime: number) => void): void {
    this.onTimeUpdate = callback
  }

  setStateChangeCallback(callback: (state: number) => void): void {
    this.onStateChange = callback
  }

  play(): void {
    if (this.audio) {
      this.audio.play().catch(e => {
        console.error('Failed to play fallback audio:', e)
      })
    }
  }

  pause(): void {
    if (this.audio) {
      this.audio.pause()
    }
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause()
      this.audio.currentTime = 0
    }
  }

  setVolume(volume: number): void {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume))
    }
  }

  getCurrentTime(): number {
    return this.audio ? this.audio.currentTime : 0
  }

  getDuration(): number {
    return this.audio ? this.audio.duration || 0 : 0
  }

  getPlayerState(): number {
    if (!this.audio) return -1
    if (this.audio.ended) return 0
    if (!this.audio.paused && this.isPlaying) return 1
    return 2
  }

  destroy(): void {
    if (this.audio) {
      this.audio.pause()
      this.audio.remove()
      this.audio = null
    }
    
    const container = document.getElementById(this.containerId)
    if (container) {
      container.remove()
    }
  }
}

// Player states to match YouTube API
export const FALLBACK_PLAYER_STATES = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5
} 