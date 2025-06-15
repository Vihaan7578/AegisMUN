import { useState, useEffect } from 'react'

interface LoadingStateConfig {
  minLoadingTime?: number
  skipLoadingInDev?: boolean
}

export const useLoadingState = (config: LoadingStateConfig = {}) => {
  const {
    minLoadingTime = 8000, // Minimum 8 seconds
    skipLoadingInDev = false
  } = config

  const [isLoading, setIsLoading] = useState(true)
  const [hasLoadedBefore, setHasLoadedBefore] = useState(false)

  useEffect(() => {
    // Check if we've already shown loading screen this session
    const hasShownLoading = sessionStorage.getItem('aegis-loading-shown')
    
    // Skip loading in development if configured
    if (skipLoadingInDev && process.env.NODE_ENV === 'development') {
      setIsLoading(false)
      return
    }

    // If we've already shown loading this session, skip it
    if (hasShownLoading === 'true') {
      setIsLoading(false)
      setHasLoadedBefore(true)
      return
    }

    // Set minimum loading time
    const timer = setTimeout(() => {
      // Mark as shown in session storage
      sessionStorage.setItem('aegis-loading-shown', 'true')
      setIsLoading(false)
    }, minLoadingTime)

    return () => clearTimeout(timer)
  }, [minLoadingTime, skipLoadingInDev])

  const resetLoadingState = () => {
    sessionStorage.removeItem('aegis-loading-shown')
    sessionStorage.removeItem('lastFactIndex')
    setIsLoading(true)
    setHasLoadedBefore(false)
  }

  const forceShowLoading = () => {
    setIsLoading(true)
  }

  return {
    isLoading,
    hasLoadedBefore,
    resetLoadingState,
    forceShowLoading
  }
} 