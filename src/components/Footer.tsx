import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="bg-aegis-dark-gray border-t border-aegis-brown/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-serif font-black text-aegis-white mb-4">
              AEGIS MUN
            </h3>
            <p className="text-aegis-off-white mb-6 max-w-md">
              Empowering Voices. Crafting Futures. Join the premier Model United Nations 
              conference where diplomacy meets audacity.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/aegis_mun2025/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-aegis-white hover:text-aegis-highlight transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.004 5.367 18.635.001 12.017.001zM8.648 16.239c-1.134 0-2.052-.918-2.052-2.051s.918-2.052 2.052-2.052 2.052.919 2.052 2.052-.918 2.051-2.052 2.051zm6.718 0c-1.134 0-2.052-.918-2.052-2.051s.918-2.052 2.052-2.052 2.051.919 2.051 2.052-.917 2.051-2.051 2.051z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-aegis-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/committees"
                  className="text-aegis-off-white hover:text-aegis-highlight transition-colors"
                >
                  Committees
                </Link>
              </li>
              <li>
                <Link
                  to="/agendas"
                  className="text-aegis-off-white hover:text-aegis-highlight transition-colors"
                >
                  Agendas
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-aegis-off-white hover:text-aegis-highlight transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/registration"
                  className="text-aegis-off-white hover:text-aegis-highlight transition-colors"
                >
                  Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-aegis-white mb-4">Contact</h4>
            <ul className="space-y-2 text-aegis-off-white">
              <li>
                <span className="block">Email:</span>
                <a
                  href="mailto:info@aegismun.com"
                  className="text-aegis-highlight hover:text-aegis-white transition-colors"
                >
                  info@aegismun.com
                </a>
              </li>
              <li>
                <span className="block">Phone:</span>
                <a
                  href="tel:+1234567890"
                  className="text-aegis-highlight hover:text-aegis-white transition-colors"
                >
                  +1 (234) 567-8900
                </a>
              </li>
              <li>
                <span className="block">Venue:</span>
                <span>To Be Decided</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-aegis-brown/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-aegis-off-white text-sm">
            © 2024 AEGIS MUN. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-aegis-off-white hover:text-aegis-highlight transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-aegis-off-white hover:text-aegis-highlight transition-colors text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-aegis-off-white hover:text-aegis-highlight transition-colors text-sm"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 