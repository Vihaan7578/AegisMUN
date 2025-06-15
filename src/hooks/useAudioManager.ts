import { useRef, useCallback, useState } from 'react'

interface AudioManager {
  currentAudio: HTMLAudioElement | null
  isPlaying: boolean
  isMuted: boolean
  showContinueDialog: boolean
  currentThemeInfo: { memberName: string; themeName: string } | null
  playTheme: (audioSrc: string, startTime: number, duration: number, memberName: string, themeName: string, volume?: number) => Promise<void>
  stopTheme: () => Promise<void>
  toggleMute: () => void
  setVolume: (volume: number) => void
  continuePlaying: () => void
  stopAfterTheme: () => void
}

export const useAudioManager = (): AudioManager => {
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showContinueDialog, setShowContinueDialog] = useState(false)
  const [currentThemeInfo, setCurrentThemeInfo] = useState<{ memberName: string; themeName: string } | null>(null)
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const themeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const fadeIn = useCallback((audio: HTMLAudioElement, targetVolume: number = 0.3, duration: number = 1000) => {
    return new Promise<void>((resolve) => {
      audio.volume = 0
      const steps = 50
      const stepTime = duration / steps
      const volumeStep = targetVolume / steps
      let currentStep = 0

      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
      }

      fadeIntervalRef.current = setInterval(() => {
        currentStep++
        audio.volume = Math.min(volumeStep * currentStep, targetVolume)
        
        if (currentStep >= steps) {
          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current)
            fadeIntervalRef.current = null
          }
          resolve()
        }
      }, stepTime)
    })
  }, [])

  const fadeOut = useCallback((audio: HTMLAudioElement, duration: number = 1000) => {
    return new Promise<void>((resolve) => {
      const startVolume = audio.volume
      const steps = 50
      const stepTime = duration / steps
      const volumeStep = startVolume / steps
      let currentStep = 0

      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
      }

      fadeIntervalRef.current = setInterval(() => {
        currentStep++
        audio.volume = Math.max(startVolume - (volumeStep * currentStep), 0)
        
        if (currentStep >= steps || audio.volume <= 0) {
          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current)
            fadeIntervalRef.current = null
          }
          audio.pause()
          resolve()
        }
      }, stepTime)
    })
  }, [])

  const playTheme = useCallback(async (audioSrc: string, startTime: number, duration: number, memberName: string, themeName: string, volume: number = 0.3) => {
    try {
      // Stop current audio if playing (including continued themes)
      if (currentAudioRef.current) {
        // Remove any existing event listeners to prevent conflicts
        currentAudioRef.current.removeEventListener('ended', () => {})
        await fadeOut(currentAudioRef.current, 500)
        currentAudioRef.current = null
      }

      // Clear any existing timeout and dialog
      if (themeTimeoutRef.current) {
        clearTimeout(themeTimeoutRef.current)
        themeTimeoutRef.current = null
      }
      setShowContinueDialog(false)

      // Create new audio instance
      const audio = new Audio(audioSrc)
      audio.preload = 'auto'
      
      // Wait for audio to be ready
      await new Promise((resolve, reject) => {
        audio.addEventListener('canplaythrough', resolve, { once: true })
        audio.addEventListener('error', reject, { once: true })
        audio.load()
      })

      currentAudioRef.current = audio
      
      // Set theme info
      setCurrentThemeInfo({ memberName, themeName })
      
      // Set start time and play
      audio.currentTime = startTime
      await audio.play()
      setIsPlaying(true)
      
      if (!isMuted) {
        await fadeIn(audio, volume)
      } else {
        audio.volume = 0
      }

      // Set timeout to show continue dialog after theme duration
      themeTimeoutRef.current = setTimeout(() => {
        setShowContinueDialog(true)
      }, duration * 1000)

    } catch (error) {
      console.warn('Audio playback failed:', error)
      setIsPlaying(false)
    }
  }, [fadeIn, fadeOut, isMuted])

  const stopTheme = useCallback(async () => {
    if (currentAudioRef.current) {
      // Remove any existing event listeners
      currentAudioRef.current.removeEventListener('ended', () => {})
      await fadeOut(currentAudioRef.current, 500)
      currentAudioRef.current = null
      setIsPlaying(false)
    }
    
    if (themeTimeoutRef.current) {
      clearTimeout(themeTimeoutRef.current)
      themeTimeoutRef.current = null
    }
    
    setShowContinueDialog(false)
    setCurrentThemeInfo(null)
  }, [fadeOut])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev
      if (currentAudioRef.current) {
        if (newMuted) {
          currentAudioRef.current.volume = 0
        } else {
          currentAudioRef.current.volume = 0.3
        }
      }
      return newMuted
    })
  }, [])

  const setVolume = useCallback((volume: number) => {
    if (currentAudioRef.current && !isMuted) {
      currentAudioRef.current.volume = Math.max(0, Math.min(1, volume))
    }
  }, [isMuted])

  const continuePlaying = useCallback(() => {
    setShowContinueDialog(false)
    // Audio continues playing from current position
    if (currentAudioRef.current) {
      // Add event listener for when the full song ends
      const handleEnded = () => {
        setIsPlaying(false)
        setCurrentThemeInfo(null)
      }
      currentAudioRef.current.addEventListener('ended', handleEnded, { once: true })
    }
  }, [])

  const stopAfterTheme = useCallback(() => {
    setShowContinueDialog(false)
    stopTheme()
  }, [stopTheme])

  return {
    currentAudio: currentAudioRef.current,
    isPlaying,
    isMuted,
    showContinueDialog,
    currentThemeInfo,
    playTheme,
    stopTheme,
    toggleMute,
    setVolume,
    continuePlaying,
    stopAfterTheme
  }
}

export default useAudioManager 