import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { YouTubeSearchResult } from '../utils/youtubeMusic'

interface SongSelectionModalProps {
  isOpen: boolean
  searchResults: YouTubeSearchResult[]
  onSelect: (song: YouTubeSearchResult) => void
  onClose: () => void
  onRandomize: () => void
  isLoading: boolean
}

const SongSelectionModal: React.FC<SongSelectionModalProps> = ({
  isOpen,
  searchResults,
  onSelect,
  onClose,
  onRandomize,
  isLoading
}) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-aegis-burgundy/95 backdrop-blur-md rounded-xl p-6 shadow-xl border border-aegis-highlight/30 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif font-bold text-aegis-white">
              Choose Your Song
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-aegis-brown/50 hover:bg-aegis-brown transition-colors"
            >
              <svg className="w-5 h-5 text-aegis-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 border-2 border-aegis-highlight border-t-transparent rounded-full"
              />
              <span className="ml-3 text-aegis-white">Searching for songs...</span>
            </div>
          ) : (
            <>
              {/* Randomize Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onRandomize}
                className="w-full p-4 mb-4 bg-gradient-to-r from-aegis-highlight to-aegis-brown rounded-lg hover:from-aegis-brown hover:to-aegis-highlight transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5 text-aegis-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-aegis-black">🎲 Surprise Me! (Random Song)</span>
              </motion.button>

              {/* Search Results */}
              <div className="space-y-3">
                {searchResults.map((song, index) => (
                  <motion.button
                    key={song.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect(song)}
                    className="w-full p-4 bg-aegis-dark-gray/50 hover:bg-aegis-dark-gray/70 rounded-lg border border-aegis-highlight/20 hover:border-aegis-highlight/50 transition-all duration-300 flex items-center gap-4 text-left"
                  >
                    <img
                      src={song.thumbnailUrl}
                      alt={song.title}
                      className="w-16 h-12 object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA2NCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMUUxRTFFIi8+CjxwYXRoIGQ9Ik0yNiAyMEwyNiAyOEwzNCAyNEwyNiAyMFoiIGZpbGw9IiNGRkQ3N0UiLz4KPC9zdmc+'
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-aegis-white truncate">{song.title}</h4>
                      <p className="text-sm text-aegis-off-white truncate">{song.channelTitle}</p>
                      <p className="text-xs text-aegis-highlight">{song.duration}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-aegis-highlight" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.button>
                ))}
              </div>

              {searchResults.length === 0 && !isLoading && (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-aegis-off-white/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m6-16v8a4 4 0 01-4 4H6a4 4 0 01-4-4V4a4 4 0 014-4h12a4 4 0 014 4z" />
                  </svg>
                  <p className="text-aegis-off-white">No songs found. Try a different search term.</p>
                </div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SongSelectionModal 