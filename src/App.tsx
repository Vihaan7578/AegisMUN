import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import FloatingParticles from './components/FloatingParticles'
import SnowCanvas from './components/SnowCanvas'
import WinterBackground from './components/WinterBackground'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingScreen from './components/LoadingScreen'

// Contexts
import { MusicProvider } from './contexts/MusicContext'
import { NavbarProvider } from './contexts/NavbarContext'

// Utils
import { usePlatformDetection, getViewportClasses } from './utils/platformDetection'
import { useLoadingState } from './hooks/useLoadingState'
import './utils/responsiveTest' // Auto-run responsive tests in development
import './utils/mobileErrorHandler' // Auto-initialize mobile error handling

// Pages
import Home from './pages/Home'
import Committees from './pages/Committees'
import Agendas from './pages/Agendas'
import Team from './pages/Team'
import Registration from './pages/Registration'

function App() {
  const platform = usePlatformDetection()
  const platformClasses = getViewportClasses(platform)
  const { isLoading } = useLoadingState({
    minLoadingTime: 8000, // 8 seconds to read the fun fact
    skipLoadingInDev: false // Show loading even in development
  })

  const handleLoadingComplete = () => {
    // This is now handled by the useLoadingState hook
  }
  
  return (
    <HelmetProvider>
      <Router>
        {/* Loading Screen */}
        {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
        
        {/* Main App Content */}
        <div className={`min-h-screen bg-aegis-black text-aegis-white relative overflow-x-hidden ${platformClasses}`}>
          <ErrorBoundary>
            <FloatingParticles />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <SnowCanvas />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <WinterBackground />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <NavbarProvider>
              <MusicProvider>
                <Navbar />
              
              <main className="relative z-10">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/committees" element={<Committees />} />
                  <Route path="/agendas" element={<Agendas />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/registration" element={<Registration />} />
                </Routes>
              </main>
              
              <Footer />
              
              {/* YouTube Player Container */}
              <div id="youtube-music-player" style={{ display: 'none' }}></div>
            </MusicProvider>
            </NavbarProvider>
          </ErrorBoundary>
          
          {/* ScrollToTop outside MusicProvider to prevent AnimatePresence conflicts */}
          <ErrorBoundary>
            <ScrollToTop />
          </ErrorBoundary>
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App 
