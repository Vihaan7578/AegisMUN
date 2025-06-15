import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useYouTubeMusic } from '../hooks/useYouTubeMusic'
import { YouTubeSearchResult } from '../utils/youtubeMusic'
import MusicSearchWidget from '../components/MusicSearchWidget'
import SongSelectionModal from '../components/SongSelectionModal'
import ErrorBoundary from '../components/ErrorBoundary'

interface MusicContextType {
  isPlaying: boolean
  currentSong: string | null
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

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export const useMusicContext = () => {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error('useMusicContext must be used within a MusicProvider')
  }
  return context
}

interface MusicProviderProps {
  children: ReactNode
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const location = useLocation()
  const [mounted, setMounted] = useState(false)
  
  const {
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
  } = useYouTubeMusic()

  // Ensure component is mounted before rendering music components
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Debug logging for music
  useEffect(() => {
    console.log('MusicContext state:', {
      isPlaying,
      currentSong: currentSong?.title || null
    })
  }, [isPlaying, currentSong])

  const contextValue: MusicContextType = {
    isPlaying,
    currentSong: currentSong?.title || null,
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

  // Safe component renderer with error handling
  const SafeComponent: React.FC<{ component: React.ReactNode }> = ({ component }) => {
    try {
      return <>{component}</>
    } catch (error) {
      console.error('Error rendering music component:', error)
      return null
    }
  }

  return (
    <MusicContext.Provider value={contextValue}>
      {children}
      
      {mounted && (
        <ErrorBoundary>
          {/* Global Music Widget - only show on home page */}
          {location.pathname === '/' && (
            <ErrorBoundary key="music-widget-boundary">
              <SafeComponent 
                component={
                  <MusicSearchWidget
                    onSearch={searchAndPlay}
                    onSelectSong={selectAndPlay}
                    onRandomSong={playRandomSong}
                    isSearching={isSearching}
                    isPlaying={isPlaying}
                    currentSong={currentSong?.title || null}
                    searchResults={searchResults}
                    showSongSelection={showSongSelection}
                    onCloseSongSelection={closeSongSelection}
                    onStop={stopMusic}
                  />
                }
              />
            </ErrorBoundary>
          )}
          
          
          {/* Song Selection Modal */}
          {showSongSelection && (
            <ErrorBoundary key="modal-boundary">
              <SafeComponent 
                component={
                  <SongSelectionModal
                    isOpen={showSongSelection}
                    searchResults={searchResults}
                    onSelect={selectAndPlay}
                    onClose={closeSongSelection}
                    onRandomize={playRandomSong}
                    isLoading={isSearching}
                  />
                }
              />
            </ErrorBoundary>
          )}
        </ErrorBoundary>
      )}
    </MusicContext.Provider>
  )
} 