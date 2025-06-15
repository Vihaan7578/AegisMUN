import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import CountdownTimer from '../components/CountdownTimer'
import InteractiveHeroText from '../components/InteractiveHeroText'
import { usePlatformDetection } from '../utils/platformDetection'

const Home: React.FC = () => {
  const platform = usePlatformDetection()
  
  return (
    <>
      <Helmet>
        <title>AEGIS MUN - Empowering Voices. Crafting Futures.</title>
        <meta
          name="description"
          content="Join AEGIS MUN - the premier Model United Nations conference where diplomacy meets audacity. Register now for an unforgettable experience."
        />
        <meta property="og:title" content="AEGIS MUN - Empowering Voices. Crafting Futures." />
        <meta
          property="og:description"
          content="Join the premier Model United Nations conference where diplomacy meets audacity."
        />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className={`relative ${platform.isMobile ? 'min-h-[100dvh]' : 'min-h-screen'} flex items-center justify-center overflow-hidden safe-area-top`}>
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-aegis-black via-aegis-dark-gray to-aegis-black" />
          
          {/* Hero content */}
          <div className={`relative z-10 text-center ${platform.isMobile ? 'px-4' : 'px-4 sm:px-6 lg:px-8'} safe-area-left safe-area-right`}>
            {/* Interactive AEGIS MODEL UN text */}
            <div className="mb-8">
              <InteractiveHeroText />
            </div>

            {/* Tagline */}
            <div className="mb-12">
              <h2 className={`${platform.isMobile ? 'text-2xl' : 'text-2xl sm:text-3xl md:text-5xl lg:text-6xl'} font-serif text-aegis-white mb-6`}>
                MODEL. DEBATE. INSPIRE.
              </h2>
              <p className={`${platform.isMobile ? 'text-base leading-relaxed' : 'text-base sm:text-lg md:text-xl'} text-aegis-off-white max-w-2xl mx-auto px-4`}>
                Where diplomacy meets audacity.
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <Link
                to="/registration"
                className={`inline-flex items-center ${platform.isMobile ? 'px-6 py-3 text-base' : 'px-8 py-4'} bg-gradient-to-r from-aegis-brown to-aegis-burgundy text-aegis-white font-semibold rounded-full hover:from-aegis-burgundy hover:to-aegis-brown ${platform.isMobile ? 'active:scale-95' : 'transform hover:scale-105'} transition-all duration-300 shadow-xl hover:shadow-2xl`}
                style={{ minHeight: '44px', touchAction: 'manipulation' }}
              >
                <span className="mr-2">Register Now</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce">
              <svg className="w-6 h-6 text-aegis-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="py-20 bg-gradient-to-b from-aegis-black to-aegis-dark-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-aegis-white mb-6">
                Where diplomacy meets{' '}
                <span className="text-aegis-highlight">audacity</span>
              </h2>
              <p className="text-lg sm:text-xl text-aegis-off-white max-w-3xl mx-auto leading-relaxed px-4">
                AEGIS MUN brings together brilliant minds from around the world to tackle 
                global challenges, forge diplomatic solutions, and shape the future through 
                meaningful dialogue and collaboration.
              </p>
            </div>

            {/* Key Features Grid */}
            <div className={`grid ${platform.isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-3 gap-8'} mb-16`}>
              <div className="glass-effect rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-aegis-brown to-aegis-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-aegis-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-aegis-white mb-4">Expert Committees</h3>
                <p className="text-aegis-off-white">
                  Diverse range of committees covering contemporary global issues with experienced chairs.
                </p>
              </div>

              <div className="glass-effect rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-aegis-brown to-aegis-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-aegis-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-aegis-white mb-4">Educational Excellence</h3>
                <p className="text-aegis-off-white">
                  Comprehensive training sessions and workshops to enhance your diplomatic skills.
                </p>
              </div>

              <div className="glass-effect rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-aegis-brown to-aegis-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-aegis-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-aegis-white mb-4">Global Network</h3>
                <p className="text-aegis-off-white">
                  Connect with delegates from around the world and build lasting friendships.
                </p>
              </div>
            </div>

            {/* Countdown Timer */}
            <CountdownTimer />
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-aegis-burgundy to-aegis-brown">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-aegis-white mb-6">
              Ready to make your mark?
            </h2>
            <p className="text-lg sm:text-xl text-aegis-off-white mb-8 px-4">
              Join hundreds of delegates in shaping tomorrow's diplomatic landscape. 
              Your voice matters, your ideas count.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/registration"
                className="inline-flex items-center px-8 py-4 bg-aegis-white text-aegis-burgundy font-semibold rounded-lg hover:bg-aegis-off-white transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Register Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/committees"
                className="inline-flex items-center px-8 py-4 border-2 border-aegis-white text-aegis-white font-semibold rounded-lg hover:bg-aegis-white hover:text-aegis-burgundy transition-all duration-300"
              >
                View Committees
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home 