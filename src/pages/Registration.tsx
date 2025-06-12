import React from 'react'
import { Helmet } from 'react-helmet-async'

const Registration: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Registration - AEGIS MUN</title>
      </Helmet>
      <div className="min-h-screen pt-16 bg-aegis-black">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-serif font-black text-aegis-white mb-8 text-center">
            Registration
          </h1>
          <div className="glass-effect rounded-xl p-8 border border-aegis-brown/30 space-y-4 text-center">
            <p className="text-aegis-white text-lg font-semibold">
              Core Team and Secretariat applications are out now!
            </p>
            <a
              href="https://linktr.ee/aegismun2025"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-aegis-burgundy text-aegis-white rounded-full hover:bg-aegis-brown transition-colors font-medium"
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