import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme-preference'

const WinterToggle = () => {
  const [enabled, setEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'winter'
    } catch {
      return false
    }
  })

  // Update body class whenever state changes
  useEffect(() => {
    document.body.classList.toggle('winter-mode', enabled)
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? 'winter' : 'summer')
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [enabled])

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      aria-pressed={enabled}
      title={enabled ? 'Switch to Summer Mode' : 'Switch to Winter Mode'}
      className="ml-4 inline-flex items-center px-4 py-2 rounded-md bg-aegis-burgundy text-aegis-white hover:bg-aegis-brown transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aegis-highlight focus:ring-opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105"
    >
      <span className="hidden sm:inline mr-2 font-medium">
        {enabled ? 'Winter Mode' : 'Summer Mode'}
      </span>
      {/* Font Awesome snowflake icon */}
      <i className={`fas fa-snowflake text-lg ${enabled ? 'animate-spin' : ''}`} style={{animationDuration: '3s'}}></i>
    </button>
  )
}

export default WinterToggle 