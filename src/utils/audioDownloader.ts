// Utility to download and cache audio files
// This is for demonstration purposes - in production you'd use proper CDN/hosting

interface AudioCache {
  [key: string]: string // blob URLs
}

class AudioDownloader {
  private cache: AudioCache = {}
  private downloadPromises: { [key: string]: Promise<string> } = {}

  async downloadAudio(url: string, cacheKey: string): Promise<string> {
    // Return cached version if available
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey]
    }

    // Return existing promise if download is in progress
    if (cacheKey in this.downloadPromises) {
      return this.downloadPromises[cacheKey]
    }

    // Start new download
    this.downloadPromises[cacheKey] = this.performDownload(url, cacheKey)
    return this.downloadPromises[cacheKey]
  }

  private async performDownload(url: string, cacheKey: string): Promise<string> {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      
      // Cache the blob URL
      this.cache[cacheKey] = blobUrl
      
      // Clean up the promise
      delete this.downloadPromises[cacheKey]
      
      return blobUrl
    } catch (error) {
      // Clean up the promise on error
      delete this.downloadPromises[cacheKey]
      throw error
    }
  }

  // Clean up blob URLs to prevent memory leaks
  cleanup() {
    Object.values(this.cache).forEach(blobUrl => {
      URL.revokeObjectURL(blobUrl)
    })
    this.cache = {}
  }

  // Get cached audio if available
  getCached(cacheKey: string): string | null {
    return this.cache[cacheKey] || null
  }
}

// Singleton instance
export const audioDownloader = new AudioDownloader()

// Theme song URLs (using placeholder URLs for demo)
// In production, these would be actual theme song files
export const themeUrls = {
  'tony-stark': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder
  'daenerys-targaryen': 'https://www.soundjay.com/misc/sounds/bell-ringing-04.wav', // Placeholder
  'rhaenyra-targaryen': 'https://www.soundjay.com/misc/sounds/bell-ringing-03.wav', // Placeholder
  'alex-dunphy': 'https://www.soundjay.com/misc/sounds/bell-ringing-02.wav', // Placeholder
  'jake-peralta': 'https://www.soundjay.com/misc/sounds/bell-ringing-01.wav', // Placeholder
  'paxton-hall-yoshida': 'https://www.soundjay.com/misc/sounds/bell-ringing-06.wav' // Placeholder
}

// For demo purposes, we'll use generated audio
// In a real implementation, you would host actual theme song files
export const getThemeAudio = async (memberId: string): Promise<string> => {
  // For now, we'll use the generated audio approach
  // This is where you would implement actual file downloading
  const { generatePlaceholderAudio, themeFrequencies } = await import('./audioGenerator')
  
  const frequency = themeFrequencies[memberId as keyof typeof themeFrequencies] || 440
  return generatePlaceholderAudio(frequency, 15) // 15 second theme
} 