import React from 'react'
import { Helmet } from 'react-helmet-async'
import { usePlatformDetection } from '../utils/platformDetection'

const Registration: React.FC = () => {
  const platform = usePlatformDetection()
  
  return (
    <>
      <Helmet>
        <title>Registration - AEGIS MUN</title>
      </Helmet>
      <div className={`${platform.isMobile ? 'min-h-[100dvh]' : 'min-h-screen'} ${platform.isMobile ? 'pt-14' : 'pt-16'} bg-aegis-black safe-area-top`}>
        <div className={`max-w-4xl mx-auto ${platform.isMobile ? 'px-4 py-8' : 'px-4 py-16'} safe-area-left safe-area-right`}>
          <h1 className={`${platform.isMobile ? 'text-3xl' : 'text-5xl'} font-serif font-black text-aegis-white mb-8 text-center`}>
            Registration
          </h1>
          <div className={`glass-effect rounded-xl ${platform.isMobile ? 'p-6' : 'p-8'} border border-aegis-brown/30 space-y-4 text-center`}>
            <p className={`text-aegis-white ${platform.isMobile ? 'text-base' : 'text-lg'} font-semibold`}>
              Core Team and Secretariat applications are out now!
            </p>
            <a
              href="https://linktr.ee/aegismun2025"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block px-6 py-3 bg-aegis-burgundy text-aegis-white rounded-full hover:bg-aegis-brown transition-colors font-medium ${platform.isMobile ? 'active:scale-95' : ''}`}
              style={{ minHeight: '44px', touchAction: 'manipulation' }}
            >
              Apply via Linktree
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Registration 