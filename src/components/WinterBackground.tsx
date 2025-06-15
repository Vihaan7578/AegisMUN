import { useEffect, useState } from 'react'

const WinterBackground = () => {
  const [isWinterMode, setIsWinterMode] = useState(false)

  useEffect(() => {
    const checkWinterMode = () => {
      setIsWinterMode(document.body.classList.contains('winter-mode'))
    }

    // Check initial state
    checkWinterMode()

    // Listen for class changes
    const observer = new MutationObserver(checkWinterMode)
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['class'] 
    })

    return () => observer.disconnect()
  }, [])

  if (!isWinterMode) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Winter gradient overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(100, 191, 255, 0.3) 0%, rgba(15, 27, 61, 0.1) 50%, transparent 100%)'
        }}
      />
      
      {/* Floating ice crystals */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <i 
              className="fas fa-snowflake text-blue-200 opacity-30"
              style={{
                fontSize: `${0.5 + Math.random() * 1}rem`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default WinterBackground 