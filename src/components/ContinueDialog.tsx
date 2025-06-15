import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ContinueDialogProps {
  isVisible: boolean
  memberName: string
  themeName: string
  onContinue: () => void
  onStop: () => void
}

const ContinueDialog: React.FC<ContinueDialogProps> = ({
  isVisible,
  memberName,
  themeName,
  onContinue,
  onStop
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onStop}
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-aegis-burgundy/95 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-aegis-highlight/30 max-w-md w-full mx-4"
          >
            <div className="text-center">
              {/* Music Icon */}
              <div className="mx-auto w-16 h-16 bg-aegis-highlight/20 rounded-full flex items-center justify-center mb-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg className="w-8 h-8 text-aegis-highlight" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                  </svg>
                </motion.div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-serif font-bold text-aegis-white mb-2">
                Theme Complete!
              </h3>

              {/* Description */}
              <p className="text-aegis-off-white text-sm mb-2">
                <span className="text-aegis-highlight font-medium">{themeName}</span>
                <br />
                for {memberName} has finished playing.
              </p>

              <p className="text-aegis-off-white text-sm mb-6">
                Would you like to continue listening to the full song?
              </p>

              {/* Buttons */}
              <div className="flex gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onContinue}
                  className="px-6 py-3 bg-aegis-highlight text-aegis-black font-semibold rounded-lg hover:bg-aegis-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Continue Playing
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onStop}
                  className="px-6 py-3 bg-aegis-brown/50 text-aegis-white font-semibold rounded-lg hover:bg-aegis-brown transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                  </svg>
                  Stop
                </motion.button>
              </div>

              {/* Hint */}
              <p className="text-aegis-off-white/70 text-xs mt-4">
                You can also click outside this dialog to stop
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ContinueDialog 