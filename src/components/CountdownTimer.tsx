import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CountdownTimer: React.FC = () => {
  // Set conference date (October 4, 2025)
  const conferenceDate = new Date('2025-10-04T09:00:00').getTime()
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = conferenceDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [conferenceDate])

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ]

  return (
    <div className="text-center">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-serif font-bold text-aegis-white mb-8"
      >
        Conference Begins In
      </motion.h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 120
            }}
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-aegis-brown to-aegis-burgundy rounded-xl opacity-20 blur-xl" />
            
            {/* Timer card */}
            <div className="relative glass-effect rounded-xl p-6 border border-aegis-brown/30 hover:border-aegis-highlight/50 transition-all duration-300">
              {/* Number */}
              <motion.div
                key={unit.value} // Key change triggers animation
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-aegis-highlight mb-2"
              >
                {unit.value.toString().padStart(2, '0')}
              </motion.div>
              
              {/* Label */}
              <div className="text-sm md:text-base text-aegis-off-white font-medium">
                {unit.label}
              </div>
              
              {/* Animated separator dots */}
              {index < 3 && (
                <div className="hidden md:block absolute -right-2 top-1/2 transform -translate-y-1/2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1 h-1 bg-aegis-highlight rounded-full mb-1"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="w-1 h-1 bg-aegis-highlight rounded-full"
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Motivational text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-aegis-off-white mt-8 text-lg max-w-md mx-auto"
      >
        Don't miss out on this extraordinary diplomatic experience. 
        <span className="text-aegis-highlight font-semibold"> Secure your spot today!</span>
      </motion.p>

      {/* Pulse animation for urgency */}
      <motion.div
        animate={{ 
          scale: [1, 1.02, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 pointer-events-none rounded-xl border-2 border-aegis-highlight/30"
      />
    </div>
  )
}

export default CountdownTimer 