import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import WinterToggle from './WinterToggle'
import { usePlatformDetection } from '../utils/platformDetection'
import { useNavbar } from '../contexts/NavbarContext'

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const platform = usePlatformDetection()
  const { isNavbarVisible } = useNavbar()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Committees', path: '/committees' },
    { name: 'Agendas', path: '/agendas' },
    { name: 'Team', path: '/team' },
    { name: 'Register', path: '/registration' },
  ]

  return (
    <AnimatePresence>
      {isNavbarVisible && (
        <motion.nav
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
              ? 'bg-aegis-burgundy/95 backdrop-blur-md shadow-lg'
              : 'bg-transparent'
          }`}
        >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-area-left safe-area-right">
        <div className={`flex items-center justify-between ${platform.isMobile ? 'h-14' : 'h-16'}`}>
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className={`${platform.isMobile ? 'text-lg' : 'text-xl sm:text-2xl'} font-serif font-black text-aegis-white hover:text-aegis-highlight transition-colors`}>
              AEGIS MUN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:text-aegis-highlight ${
                    location.pathname === item.path
                      ? 'text-aegis-highlight border-b-2 border-aegis-highlight'
                      : 'text-aegis-white hover:bg-aegis-white/10'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {/* Winter mode toggle button */}
              <WinterToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-3 rounded-md text-aegis-white hover:text-aegis-highlight hover:bg-aegis-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-aegis-highlight active:scale-95 transition-transform"
              style={{ minHeight: '44px', minWidth: '44px', touchAction: 'manipulation' }}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-aegis-burgundy/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-aegis-highlight bg-aegis-white/10'
                    : 'text-aegis-white hover:text-aegis-highlight hover:bg-aegis-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {/* Mobile toggle */}
            <div className="px-3 py-2">
              <WinterToggle />
            </div>
          </div>
        </div>
      )}
    </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default Navbar 