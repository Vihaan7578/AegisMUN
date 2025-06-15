import { useState, useRef, useCallback, useEffect } from 'react'
import { getYouTubeResults, YouTubeSearchResult } from '../utils/youtubeMusic'
import { YouTubeMusicPlayer, YT_PLAYER_STATES } from '../utils/youtubePlayer'

interface YouTubeMusicManager {
  isPlaying: boolean
  currentSong: YouTubeSearchResult | null
  isSearching: boolean
  searchResults: YouTubeSearchResult[]
  showSongSelection: boolean
  searchAndPlay: (songName: string, artistName?: string) => Promise<void>
  selectAndPlay: (song: YouTubeSearchResult) => Promise<void>
  playRandomSong: () => Promise<void>
  stopMusic: () => void
  closeSongSelection: () => void
  pauseMusic: () => void
  resumeMusic: () => void
}

export const useYouTubeMusic = (): YouTubeMusicManager => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState<YouTubeSearchResult | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [, setCurrentTime] = useState(0)
  const [searchResults, setSearchResults] = useState<YouTubeSearchResult[]>([])
  const [showSongSelection, setShowSongSelection] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  
  const playerRef = useRef<YouTubeMusicPlayer | null>(null)

  // Cleanup on component unmount or page unload
  useEffect(() => {
    const cleanup = () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy()
          playerRef.current = null
        } catch (error) {
          console.warn('Error during player cleanup:', error)
        }
      }
    }

    // Add beforeunload listener to prevent errors on page reload
    const handleBeforeUnload = () => {
      cleanup()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      cleanup()
    }
  }, [])

  // YouTube Player API integration
  const initializePlayer = useCallback(async (videoId: string) => {
    try {
      console.log('Initializing player for video:', videoId)
      
      // Ensure we don't initialize multiple times
      if (isInitialized && playerRef.current) {
        try {
          await playerRef.current.loadVideo(videoId, true)
          return
        } catch (error) {
          console.warn('Failed to reuse existing player, creating new one:', error)
        }
      }
      
      // Create YouTube player instance
      if (playerRef.current) {
        console.log('Destroying existing player')
        try {
          playerRef.current.destroy()
        } catch (error) {
          console.warn('Error destroying existing player:', error)
        }
        playerRef.current = null
      }
      
      // Check if YouTube player container exists
      const container = document.getElementById('youtube-music-player')
      if (!container) {
        throw new Error('YouTube player container not found')
      }
      
      console.log('Creating new YouTube player')
      const player = new YouTubeMusicPlayer('youtube-music-player')
      playerRef.current = player
      setIsInitialized(true)
      
      // Set up time tracking
      player.setTimeUpdateCallback((currentTime) => {
        try {
          // Validate currentTime
          if (typeof currentTime !== 'number' || isNaN(currentTime) || currentTime < 0) {
            return
          }
          setCurrentTime(currentTime)
        } catch (error) {
          console.error('Error in time update callback:', error)
        }
      })
      
      // Set up state change callback
      player.setStateChangeCallback((state) => {
        try {
          console.log('Player state changed:', state)
          
          if (state === YT_PLAYER_STATES.PLAYING) {
            setIsPlaying(true)
            setIsPaused(false)
          } else if (state === YT_PLAYER_STATES.PAUSED) {
            setIsPaused(true)
          } else if (state === YT_PLAYER_STATES.ENDED) {
            console.log('Song ended')
            setIsPlaying(false)
            setIsPaused(false)
          } else if (state === YT_PLAYER_STATES.BUFFERING) {
            console.log('Player buffering...')
          }
        } catch (error) {
          console.error('Error in state change callback:', error)
        }
      })
      
      // Load and play the video
      console.log('Loading video:', videoId)
      await player.loadVideo(videoId, true)
      console.log('Video loaded successfully')
      
    } catch (error) {
      console.error('Failed to initialize YouTube player:', error)
      setIsInitialized(false)
      throw error
    }
  }, [isInitialized])

  // Search and play music
  const searchAndPlay = useCallback(async (songName: string, artistName?: string) => {
    try {
      setIsSearching(true)
      console.log(`Searching YouTube for: ${songName} ${artistName || ''}`)
      
      const query = artistName ? `${artistName} ${songName}` : songName
      
      // Search YouTube API for accurate results
      const results = await getYouTubeResults(query)
      
      if (results.length > 0) {
        console.log(`Found ${results.length} YouTube results`)
        setSearchResults(results)
        setShowSongSelection(true)
      } else {
        console.log('No YouTube results found')
        alert('No songs found. Please try a different search term.')
      }
      
      setIsSearching(false)
      
    } catch (error) {
      console.error('Failed to search YouTube:', error)
      alert('Search failed. Please check your internet connection and try again.')
      setIsSearching(false)
    }
  }, [])

  const selectAndPlay = useCallback(async (song: YouTubeSearchResult) => {
    try {
      console.log('Attempting to play song:', song.title)
      setIsSearching(true)
      
      // Stop current music if playing (no delay for faster switching)
      if (isPlaying) {
        console.log('Stopping current music')
        stopMusic()
      }
      
      setCurrentSong(song)
      
      // Initialize and play
      console.log('Initializing player...')
      await initializePlayer(song.id)
      
      setIsPlaying(true)
      setIsPaused(false)
      setCurrentTime(0)
      setShowSongSelection(false)
      
      console.log('Song started successfully')
      
    } catch (error) {
      console.error('Failed to play music:', error)
      // Reset states on error
      setIsPlaying(false)
      setCurrentSong(null)
      setShowSongSelection(false)
      
      // Show user-friendly error
      alert('Failed to play the selected song. Please try another one.')
    } finally {
      setIsSearching(false)
    }
  }, [isPlaying, initializePlayer])

  const playRandomSong = useCallback(async () => {
    try {
      console.log('Playing random song instantly...')
      
      // Fast random song selection with real YouTube IDs
      const randomSongs = [
        { id: 'dQw4w9WgXcQ', title: 'Never Gonna Give You Up - Rick Astley', artist: 'Rick Astley' },
        { id: 'fJ9rUzIMcZQ', title: 'Bohemian Rhapsody - Queen', artist: 'Queen' },
        { id: 'rYEDA3JcQqw', title: 'Rolling in the Deep - Adele', artist: 'Adele' },
        { id: 'JGwWNGJdvx8', title: 'Shape of You - Ed Sheeran', artist: 'Ed Sheeran' },
        { id: 'YQHsXMglC9A', title: 'Hello - Adele', artist: 'Adele' },
        { id: '9bZkp7q19f0', title: 'Gangnam Style - PSY', artist: 'PSY' },
        { id: 'lp-EO5I60KA', title: 'Blinding Lights - The Weeknd', artist: 'The Weeknd' },
        { id: 'ZbZSe6N_BXs', title: 'Happy - Pharrell Williams', artist: 'Pharrell Williams' }
      ]
      
      const randomSong = randomSongs[Math.floor(Math.random() * randomSongs.length)]
      const song: YouTubeSearchResult = {
        id: randomSong.id,
        title: randomSong.title,
        channelTitle: randomSong.artist,
        duration: '3:32',
        thumbnailUrl: `https://img.youtube.com/vi/${randomSong.id}/mqdefault.jpg`
      }
      
      // Play immediately without extra delays
      await selectAndPlay(song)
    } catch (error) {
      console.error('Failed to play random song:', error)
      alert('Failed to play random song. Please try again.')
    }
  }, [selectAndPlay])

  const stopMusic = useCallback(() => {
    console.log('Stopping music')
    
    // Destroy YouTube player
    if (playerRef.current) {
      playerRef.current.destroy()
      playerRef.current = null
    }
    
    // Reset state
    setIsPlaying(false)
    setCurrentSong(null)
    setCurrentTime(0)
  }, [])

  const closeSongSelection = useCallback(() => {
    setShowSongSelection(false)
    setSearchResults([])
  }, [])

  const pauseMusic = useCallback(() => {
    if (playerRef.current && isPlaying) {
      playerRef.current.pause()
      setIsPaused(true)
    }
  }, [isPlaying])

  const resumeMusic = useCallback(() => {
    if (playerRef.current && isPaused) {
      playerRef.current.play()
      setIsPaused(false)
    }
  }, [isPaused])

  // Debug logging
  useEffect(() => {
    console.log('Music state updated:', {
      isPlaying,
      currentSong: currentSong?.title || null
    })
  }, [isPlaying, currentSong])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMusic()
    }
  }, [stopMusic])

  return {
    isPlaying,
    currentSong,
    isSearching,
    searchResults,
    showSongSelection,
    searchAndPlay,
    selectAndPlay,
    playRandomSong,
    stopMusic,
    closeSongSelection,
    pauseMusic,
    resumeMusic
  }
} 