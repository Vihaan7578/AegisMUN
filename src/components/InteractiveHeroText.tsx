import React, { useState } from 'react'
import { motion } from 'framer-motion'

const InteractiveHeroText: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const text = "AEGIS MODEL UN"

  return (
    <div className="flex flex-wrap justify-center items-center gap-1 md:gap-2">
      {text.split('').map((char, index) => {
        const isHovered = hoveredIndex === index
        const isSpace = char === ' '
        
        if (isSpace) {
          return <div key={index} className="w-4 md:w-8" />
        }

        return (
          <motion.span
            key={index}
            className="relative inline-block cursor-pointer select-none font-display font-normal text-aegis-white"
            style={{ 
              fontSize: 'clamp(2.5rem, 10vw, 8rem)',
              lineHeight: '0.9',
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              scale: isHovered ? 1.2 : 1,
              z: isHovered ? 50 : 0,
              textShadow: isHovered 
                ? '0 0 30px rgba(255, 211, 126, 0.8), 0 0 60px rgba(255, 211, 126, 0.4)' 
                : '0 0 0px transparent',
              color: isHovered ? '#FFD37E' : '#FFFFFF'
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              duration: 0.3
            }}
          >
            <motion.span
              animate={{
                rotateY: isHovered ? [0, 15, -15, 0] : 0,
                rotateX: isHovered ? [0, 10, -10, 0] : 0,
              }}
              transition={{
                duration: isHovered ? 0.6 : 0.3,
                ease: "easeInOut"
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
            
            {/* Glow effect background */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 pointer-events-none -z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2, opacity: 0.3 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full bg-aegis-highlight rounded-full blur-xl" />
              </motion.div>
            )}
            
            {/* Subtle pulse when hovered */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 pointer-events-none -z-20"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.1, 0.2]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full bg-aegis-highlight rounded-full blur-2xl" />
              </motion.div>
            )}
          </motion.span>
        )
      })}
    </div>
  )
}

export default InteractiveHeroText 