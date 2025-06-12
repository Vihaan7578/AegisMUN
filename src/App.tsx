import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import FloatingParticles from './components/FloatingParticles'

// Pages
import Home from './pages/Home'
import Committees from './pages/Committees'
import Agendas from './pages/Agendas'
import Team from './pages/Team'
import Registration from './pages/Registration'

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-aegis-black text-aegis-white relative overflow-x-hidden">
          <FloatingParticles />
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
          <ScrollToTop />
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App 
