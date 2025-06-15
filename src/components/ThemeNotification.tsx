import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ThemeNotificationProps {
  isVisible: boolean
  memberName: string
  themeName: string
  duration?: number
  onClose: () => void
}

const ThemeNotification: React.FC<ThemeNotificationProps> = ({
  isVisible,
  memberName,
  themeName,
  duration = 10,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed top-20 right-6 z-50 bg-aegis-burgundy/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-aegis-highlight/30 max-w-sm"
        >
          <div className="flex items-start gap-3">
            {/* Music Icon */}
            <div className="flex-shrink-0">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-8 h-8 bg-aegis-highlight/20 rounded-full flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-aegis-highlight" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                </svg>
              </motion.div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-aegis-white font-medium text-sm">
                Now Playing
              </p>
              <p className="text-aegis-highlight font-semibold text-base truncate">
                {themeName}
              </p>
              <p className="text-aegis-off-white text-xs mt-1">
                for {memberName}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 rounded-full hover:bg-aegis-brown/50 transition-colors"
              title="Close notification"
            >
              <svg className="w-4 h-4 text-aegis-off-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 w-full bg-aegis-dark-gray/50 rounded-full h-1">
            <motion.div
              className="bg-aegis-highlight h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: duration, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ThemeNotification 