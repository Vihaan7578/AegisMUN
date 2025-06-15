import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePlatformDetection } from '../utils/platformDetection'

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const platform = usePlatformDetection()
  const [progress, setProgress] = useState(0)
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // Fun facts about the website's interactivity
  const funFacts = [
    "🎵 Click the music button to play songs while you browse the website!",
    "❄️ Turn on winter mode to see beautiful snowfall across the entire site!",
    "🎭 Each team member has their own special theme song - check them out!",
    "📱 The website knows if you're on a phone or computer and adjusts automatically!",
    "🔍 Search for any song you want - we connect directly to YouTube!",
    "🌟 Everything moves smoothly on your device, whether it's a phone or computer!",
    "🎪 Buttons and animations work differently if you're touching or using a mouse!",
    "🔄 The website remembers your settings when you come back next time!",
    "🎨 Works perfectly on all phones, even ones with curved screens or notches!",
    "⚡ Music keeps playing as you move between different pages!",
    "🎮 Move your mouse over the big text on the homepage - it follows you!",
    "📐 The website changes its layout based on your screen size automatically!",
    "🎺 Team member songs are short clips from their favorite movies and shows!",
    "🌈 Colors change slightly when you turn on winter mode for a cooler look!",
    "🔧 Buttons are made bigger on phones so they're easier to tap!",
    "⭐ You can install this website like an app on your phone's home screen!",
    "🎪 Watch the floating particles move around in the background!",
    "🔊 Music controls show up automatically when a song is playing!",
    "📏 Text gets bigger or smaller based on your screen size!",
    "🎯 All buttons are big enough to tap easily on any phone!"
  ]

  // Select a random fact on component mount
  useEffect(() => {
    const getRandomFactIndex = () => {
      const savedIndex = sessionStorage.getItem('lastFactIndex')
      const lastIndex = savedIndex ? parseInt(savedIndex, 10) : -1
      
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * funFacts.length)
      } while (newIndex === lastIndex && funFacts.length > 1)
      
      sessionStorage.setItem('lastFactIndex', newIndex.toString())
      return newIndex
    }

    setCurrentFactIndex(getRandomFactIndex())
  }, [funFacts.length])

  // Loading progress simulation
  useEffect(() => {
    const duration = 8000 // 8 seconds loading time
    const interval = 50 // Update every 50ms
    const increment = 100 / (duration / interval)

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment + Math.random() * 2 // Add some randomness
        if (newProgress >= 100) {
          clearInterval(timer)
          // Small delay before starting exit animation
          setTimeout(() => {
            setIsVisible(false)
            // Complete loading after exit animation
            setTimeout(onLoadingComplete, 500)
          }, 200)
          return 100
        }
        return newProgress
      })
    }, interval)

    return () => clearInterval(timer)
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className={`loading-screen loading-optimized z-[100] flex items-center justify-center bg-gradient-to-br from-aegis-black via-aegis-dark-gray to-aegis-burgundy ${platform.isMobile ? 'p-4' : 'p-8'}`}
          style={{ backdropFilter: 'blur(20px)' }}
        >
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(45deg, #FFD37E 0%, #811A29 50%, #8A4B38 100%)',
                backgroundSize: '400% 400%',
              }}
            />
          </div>

          {/* Main Content */}
          <div className={`relative z-10 text-center max-w-2xl mx-auto ${platform.isMobile ? 'px-4' : 'px-8'}`}>
            {/* Logo/Title */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mb-8"
            >
              <h1 className={`font-serif font-black text-aegis-white mb-4 ${platform.isMobile ? 'text-4xl' : 'text-6xl lg:text-7xl'}`}>
                AEGIS MUN
              </h1>
              <p className={`text-aegis-highlight font-medium ${platform.isMobile ? 'text-lg' : 'text-xl lg:text-2xl'}`}>
                Empowering Voices. Crafting Futures.
              </p>
            </motion.div>

            {/* Fun Fact */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`mb-8 ${platform.isMobile ? 'min-h-[120px]' : 'min-h-[100px]'} flex items-center justify-center`}
            >
              <div className="glass-effect rounded-xl p-6 border border-aegis-highlight/30">
                <p className={`text-aegis-off-white leading-relaxed ${platform.isMobile ? 'text-sm' : 'text-base lg:text-lg'}`}>
                  <span className="text-aegis-highlight font-semibold">Did you know?</span>
                  <br />
                  {funFacts[currentFactIndex]}
                </p>
              </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mb-6"
            >
              <div className={`w-full bg-aegis-dark-gray/50 rounded-full ${platform.isMobile ? 'h-2' : 'h-3'} overflow-hidden border border-aegis-highlight/20 relative`}>
                <motion.div
                  className="h-full bg-gradient-to-r from-aegis-brown via-aegis-highlight to-aegis-burgundy rounded-full loading-shimmer"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="mt-3 flex justify-between items-center">
                <span className={`text-aegis-off-white ${platform.isMobile ? 'text-sm' : 'text-base'}`}>
                  Loading amazing experience...
                </span>
                <span className={`text-aegis-highlight font-mono ${platform.isMobile ? 'text-sm' : 'text-base'}`}>
                  {Math.round(Math.min(progress, 100))}%
                </span>
              </div>
            </motion.div>

            {/* Loading Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex justify-center items-center space-x-2"
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className={`bg-aegis-highlight rounded-full ${platform.isMobile ? 'w-2 h-2' : 'w-3 h-3'}`}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
              ))}
            </motion.div>

            {/* Platform Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="mt-8"
            >
              <p className={`text-aegis-off-white/70 ${platform.isMobile ? 'text-xs' : 'text-sm'}`}>
                Optimized for{' '}
                {platform.isIOS && '📱 iOS'}
                {platform.isAndroid && '🤖 Android'}
                {platform.isDesktop && '💻 Desktop'}
                {' '}• {platform.screenSize.toUpperCase()} Screen
                {platform.hasTouchSupport && ' • Touch Ready'}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen 