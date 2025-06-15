import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { YouTubeSearchResult } from '../utils/youtubeMusic'
import SongSelectionModal from './SongSelectionModal'
import SafeAnimatePresence from './SafeAnimatePresence'

interface MusicSearchWidgetProps {
  onSearch: (songName: string, artistName?: string) => void
  onSelectSong: (song: YouTubeSearchResult) => void
  onRandomSong: () => void
  isSearching: boolean
  isPlaying: boolean
  currentSong: string | null
  searchResults: YouTubeSearchResult[]
  showSongSelection: boolean
  onCloseSongSelection: () => void
  onStop: () => void
}

const MusicSearchWidget: React.FC<MusicSearchWidgetProps> = ({
  onSearch,
  onSelectSong,
  onRandomSong,
  isSearching,
  isPlaying,
  currentSong,
  searchResults,
  showSongSelection,
  onCloseSongSelection,
  onStop
}) => {
  const [showSearch, setShowSearch] = useState(false)
  const [songName, setSongName] = useState('')
  const [artistName, setArtistName] = useState('')
  const [buttonState, setButtonState] = useState<'idle' | 'searching' | 'playing'>('idle')
  const previousIsPlaying = useRef(isPlaying)
  const previousIsSearching = useRef(isSearching)

  // Fast button state management for instant feedback
  useEffect(() => {
    // Update button state immediately for better responsiveness
    if (isSearching !== previousIsSearching.current || isPlaying !== previousIsPlaying.current) {
      const newState = isSearching ? 'searching' : (isPlaying ? 'playing' : 'idle')
      setButtonState(newState)

      previousIsPlaying.current = isPlaying
      previousIsSearching.current = isSearching
    }
  }, [isSearching, isPlaying])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (songName.trim()) {
      onSearch(songName.trim(), artistName.trim() || undefined)
      setSongName('')
      setArtistName('')
      setShowSearch(false)
    }
  }

  const handleToggleMusic = () => {
    // Prevent rapid clicking that could cause state conflicts
    if (buttonState === 'searching') {
      return
    }

    if (isPlaying) {
      onStop()
    } else {
      setShowSearch(true)
    }
  }

  // Determine button appearance based on stable state
  const getButtonClass = () => {
    switch (buttonState) {
      case 'playing':
        return 'bg-red-600 border-red-400 hover:bg-red-700'
      case 'searching':
        return 'bg-yellow-600 border-yellow-400 hover:bg-yellow-700'
      default:
        return 'bg-gradient-to-r from-aegis-brown to-aegis-burgundy border-aegis-highlight hover:from-aegis-burgundy hover:to-aegis-brown'
    }
  }

  const getButtonTitle = () => {
    switch (buttonState) {
      case 'playing':
        return 'Stop Music'
      case 'searching':
        return 'Searching...'
      default:
        return 'Play Background Music'
    }
  }

  const getButtonIcon = () => {
    switch (buttonState) {
      case 'searching':
        return (
          <motion.div
            key="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
          />
        )
      case 'playing':
        return (
          <svg key="stop-icon" className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
          </svg>
        )
      default:
        return (
          <svg key="play-icon" className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
          </svg>
        )
    }
  }

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2">
        {/* Main Music Button */}
        <motion.button
          key={`music-main-button-${buttonState}`}
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          whileHover={buttonState !== 'searching' ? { scale: 1.1 } : {}}
          whileTap={buttonState !== 'searching' ? { scale: 0.95 } : {}}
          onClick={handleToggleMusic}
          disabled={buttonState === 'searching'}
          className={`w-14 h-14 rounded-full shadow-xl border-2 transition-all duration-300 flex items-center justify-center ${getButtonClass()} ${buttonState === 'searching' ? 'cursor-wait' : 'cursor-pointer'}`}
          title={getButtonTitle()}
        >
          {getButtonIcon()}
        </motion.button>



        <SafeAnimatePresence mode="wait">
          {/* Search Form */}
          {showSearch && (
            <motion.div
              key="search-form"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="absolute bottom-16 left-0 bg-aegis-burgundy/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-aegis-highlight/30 min-w-80"
            >
              <form onSubmit={handleSearch} className="space-y-3">
                <div>
                  <label className="block text-aegis-white text-sm font-medium mb-1">
                    Song Name *
                  </label>
                  <input
                    type="text"
                    value={songName}
                    onChange={(e) => setSongName(e.target.value)}
                    placeholder="Enter song name..."
                    className="w-full px-3 py-2 bg-aegis-dark-gray/50 border border-aegis-highlight/30 rounded-lg text-aegis-black placeholder-aegis-off-white/60 focus:outline-none focus:border-aegis-highlight focus:ring-1 focus:ring-aegis-highlight"
                    style={{ color: '#000000', backgroundColor: 'rgba(245, 245, 245, 0.9)' }}
                    autoFocus
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-aegis-white text-sm font-medium mb-1">
                    Artist Name (optional)
                  </label>
                  <input
                    type="text"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    placeholder="Enter artist name..."
                    className="w-full px-3 py-2 bg-aegis-dark-gray/50 border border-aegis-highlight/30 rounded-lg text-aegis-black placeholder-aegis-off-white/60 focus:outline-none focus:border-aegis-highlight focus:ring-1 focus:ring-aegis-highlight"
                    style={{ color: '#000000', backgroundColor: 'rgba(245, 245, 245, 0.9)' }}
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={!songName.trim() || buttonState === 'searching'}
                    className="flex-1 px-4 py-2 bg-aegis-highlight text-aegis-black font-semibold rounded-lg hover:bg-aegis-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {buttonState === 'searching' ? (
                      <>
                        <motion.div
                          key="search-spinner"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-aegis-black border-t-transparent rounded-full"
                        />
                        Searching...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-10V7a3 3 0 01-3 3H4a3 3 0 01-3-3V4a3 3 0 013-3h16a3 3 0 013 3z" />
                        </svg>
                        Play Music
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowSearch(false)}
                    className="px-4 py-2 bg-aegis-brown/50 text-aegis-white font-semibold rounded-lg hover:bg-aegis-brown transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Now Playing Indicator */}
          {buttonState === 'playing' && currentSong && (
            <motion.div
              key="now-playing"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute bottom-16 left-0 bg-aegis-burgundy/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-aegis-highlight/30 max-w-80"
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`visualizer-bar-${i}`}
                      className="w-1 bg-aegis-highlight rounded-full"
                      animate={{
                        height: [4, 12, 4],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-aegis-white text-sm font-medium">Now Playing</p>
                  <p className="text-aegis-highlight text-xs truncate">{currentSong}</p>
                </div>
              </div>
            </motion.div>
          )}
        </SafeAnimatePresence>
      </div>
      
      {/* Song Selection Modal */}
      <SongSelectionModal
        isOpen={showSongSelection}
        searchResults={searchResults}
        onSelect={onSelectSong}
        onClose={onCloseSongSelection}
        onRandomize={onRandomSong}
        isLoading={isSearching}
      />
    </>
  )
}

export default MusicSearchWidget 