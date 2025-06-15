import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePlatformDetection } from '../utils/platformDetection'

interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  image: string
  funFact: string
  category: 'Secretariat' | 'Executive Board'
}

interface TeamMemberModalProps {
  isOpen: boolean
  member: TeamMember | null
  isPlaying: boolean
  onClose: () => void
  onPlayTheme: () => void
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  isOpen,
  member,
  isPlaying,
  onClose,
  onPlayTheme
}) => {
  const platform = usePlatformDetection()
  
  // Prevent background scroll on mobile when modal is open
  useEffect(() => {
    if (isOpen && platform.isMobile) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
    
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [isOpen, platform.isMobile])
  
  if (!member) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          
          {/* Modal Container */}
          <div className={`fixed inset-0 z-[70] flex items-center justify-center ${platform.isMobile ? 'p-2' : 'p-4'} safe-area-top safe-area-bottom safe-area-left safe-area-right`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative bg-aegis-burgundy/95 backdrop-blur-md rounded-2xl shadow-2xl border border-aegis-highlight/30 w-full ${platform.isMobile ? 'max-w-full max-h-[calc(100vh-1rem)]' : 'max-w-5xl max-h-[90vh]'} overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className={`absolute ${platform.isMobile ? 'top-2 right-2' : 'top-4 right-4'} z-10 p-2 rounded-full bg-aegis-brown/50 hover:bg-aegis-brown transition-colors`}
                style={{ minHeight: '44px', minWidth: '44px', touchAction: 'manipulation' }}
                title="Close"
              >
                <svg className={`${platform.isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-aegis-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Content */}
              <div className={`flex ${platform.isMobile ? 'flex-col' : 'flex-col lg:flex-row'} h-full`}>
                {/* Image Section */}
                <div className={`${platform.isMobile ? 'w-full relative min-h-[250px] max-h-[40vh]' : 'lg:w-1/2 relative min-h-[300px] lg:min-h-[600px]'}`}>
                  <div className={`absolute inset-0 overflow-hidden ${platform.isMobile ? 'rounded-t-2xl' : 'rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none'}`}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center"
                      style={{
                        objectPosition: member.id === 'daenerys-targaryen' ? 'center 25%' : 'center center',
                        objectFit: 'cover'
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <div className={`absolute ${platform.isMobile ? 'top-2 left-2' : 'top-4 left-4'}`}>
                      <span className={`${platform.isMobile ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'} rounded-full font-medium bg-aegis-burgundy/90 text-aegis-white backdrop-blur-sm border border-aegis-highlight/30`}>
                        {member.category}
                      </span>
                    </div>

                    {/* Audio Indicator */}
                    {isPlaying && (
                      <div className={`absolute ${platform.isMobile ? 'top-2 right-14' : 'top-4 right-16'}`}>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className={`${platform.isMobile ? 'w-8 h-8' : 'w-10 h-10'} bg-aegis-highlight/90 rounded-full flex items-center justify-center backdrop-blur-sm`}
                        >
                          <svg className={`${platform.isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-aegis-black`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.793a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                          </svg>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className={`${platform.isMobile ? 'w-full flex flex-col' : 'lg:w-1/2 flex flex-col'}`}>
                  <div className={`flex-1 ${platform.isMobile ? 'p-4 max-h-[50vh]' : 'p-6 lg:p-8'} overflow-y-auto`}>
                    <div className={`${platform.isMobile ? 'space-y-4' : 'space-y-6'}`}>
                      {/* Header */}
                      <div>
                        <h2 className={`${platform.isMobile ? 'text-xl' : 'text-2xl lg:text-3xl xl:text-4xl'} font-serif font-black text-aegis-white mb-2`}>
                          {member.name}
                        </h2>
                        <p className={`text-aegis-highlight ${platform.isMobile ? 'text-sm' : 'text-base lg:text-lg'} font-semibold`}>
                          {member.position}
                        </p>
                      </div>

                      {/* Bio */}
                      <div>
                        <h3 className={`text-aegis-white font-semibold mb-3 ${platform.isMobile ? 'text-base' : 'text-lg'}`}>About</h3>
                        <p className={`text-aegis-off-white leading-relaxed ${platform.isMobile ? 'text-sm' : 'text-sm lg:text-base'}`}>
                          {member.bio}
                        </p>
                      </div>

                      {/* Fun Fact */}
                      <div className={`${platform.isMobile ? 'p-3' : 'p-4'} rounded-xl bg-aegis-brown/20 border border-aegis-brown/30`}>
                        <h3 className={`text-aegis-highlight font-semibold mb-2 ${platform.isMobile ? 'text-xs' : 'text-sm'} uppercase tracking-wide`}>
                          Fun Fact
                        </h3>
                        <p className={`text-aegis-off-white italic ${platform.isMobile ? 'text-sm' : 'text-sm lg:text-base'}`}>
                          "{member.funFact}"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className={`${platform.isMobile ? 'p-4 pt-0' : 'p-6 lg:p-8 pt-0 lg:pt-0'}`}>
                    <div className={`flex ${platform.isMobile ? 'flex-col gap-2' : 'flex-col sm:flex-row gap-3'}`}>
                      <motion.button
                        whileHover={!platform.isMobile ? { scale: 1.02 } : {}}
                        whileTap={{ scale: 0.98 }}
                        onClick={onPlayTheme}
                        className={`flex-1 ${platform.isMobile ? 'px-4 py-3' : 'px-6 py-3'} rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${platform.isMobile ? 'text-sm' : 'text-sm lg:text-base'} ${
                          isPlaying
                            ? 'bg-red-600/20 text-red-400 border border-red-400/50 hover:bg-red-600 hover:text-white active:scale-95'
                            : 'bg-aegis-highlight/20 text-aegis-highlight border border-aegis-highlight/50 hover:bg-aegis-highlight hover:text-aegis-black active:scale-95'
                        }`}
                        style={{ minHeight: '44px', touchAction: 'manipulation' }}
                      >
                        {isPlaying ? (
                          <>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                            </svg>
                            Stop Theme
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                            Replay Theme
                          </>
                        )}
                      </motion.button>

                      <motion.button
                        whileHover={!platform.isMobile ? { scale: 1.02 } : {}}
                        whileTap={{ scale: 0.98 }}
                        onClick={onClose}
                        className={`${platform.isMobile ? 'px-4 py-3' : 'px-6 py-3'} rounded-xl font-semibold bg-aegis-brown/50 text-aegis-white hover:bg-aegis-brown transition-colors ${platform.isMobile ? 'text-sm' : 'text-sm lg:text-base'} active:scale-95`}
                        style={{ minHeight: '44px', touchAction: 'manipulation' }}
                      >
                        Close
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default TeamMemberModal 