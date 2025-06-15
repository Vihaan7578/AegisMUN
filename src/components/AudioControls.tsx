import React from 'react'
import { motion } from 'framer-motion'

interface AudioControlsProps {
  isPlaying: boolean
  isMuted: boolean
  onToggleMute: () => void
  onVolumeChange: (volume: number) => void
  onStop: () => void
}

const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  isMuted,
  onToggleMute,
  onVolumeChange,
  onStop
}) => {
  if (!isPlaying) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 right-6 z-50 bg-aegis-burgundy/90 backdrop-blur-md rounded-xl p-4 shadow-xl border border-aegis-highlight/30"
    >
      <div className="flex items-center gap-3">
        {/* Now Playing Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
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
          <span className="text-aegis-white text-sm font-medium">Theme Playing</span>
        </div>

        {/* Volume Control */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          defaultValue="0.3"
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="w-16 h-1 bg-aegis-dark-gray rounded-lg appearance-none cursor-pointer slider"
          disabled={isMuted}
        />

        {/* Mute Button */}
        <button
          onClick={onToggleMute}
          className="p-2 rounded-lg bg-aegis-brown/50 hover:bg-aegis-brown transition-colors"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg className="w-4 h-4 text-aegis-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.793a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
              <path d="M3 3l14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-aegis-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.793a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Stop Button */}
        <button
          onClick={onStop}
          className="p-2 rounded-lg bg-red-600/50 hover:bg-red-600 transition-colors"
          title="Stop Theme"
        >
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}

export default AudioControls 