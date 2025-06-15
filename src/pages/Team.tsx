import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import useAudioManager from '../hooks/useAudioManager'
import { useMusicContext } from '../contexts/MusicContext'
import AudioControls from '../components/AudioControls'
import ThemeNotification from '../components/ThemeNotification'
import ContinueDialog from '../components/ContinueDialog'
import TeamMemberModal from '../components/TeamMemberModal'
import { themeMapping, defaultTheme } from '../data/themeMapping'
import { useNavbar } from '../contexts/NavbarContext'

interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  image: string
  funFact: string
  category: 'Secretariat' | 'Executive Board'
}

const Team: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const [showNotification, setShowNotification] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<{ memberName: string; themeName: string } | null>(null)
  const [modalMember, setModalMember] = useState<TeamMember | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const audioManager = useAudioManager()
  const musicContext = useMusicContext()
  const { isNavbarVisible, setNavbarVisible } = useNavbar()

  const teamMembers: TeamMember[] = [
    // Secretariat members
    {
      id: 'daenerys-targaryen',
      name: 'Daenerys Targaryen',
      position: 'Secretary-General',
      bio: 'The Mother of Dragons and former Queen of Meereen brings unparalleled experience in liberation movements and diplomatic negotiations. Known for her fierce advocacy for the oppressed and her revolutionary approach to breaking chains of injustice.',
      image: '/images/team/daenerys.jpg',
      funFact: 'Can conduct negotiations in High Valyrian, Dothraki, and Common Tongue',
      category: 'Secretariat'
    },
    {
      id: 'rhaenyra-targaryen',
      name: 'Rhaenyra Targaryen',
      position: 'Deputy Secretary-General',
      bio: 'Heir to the Iron Throne and experienced in court politics, Princess Rhaenyra excels at navigating complex political landscapes and building coalitions. Her leadership during the Dance of Dragons demonstrated strategic thinking under pressure.',
      image: '/images/team/rhaenyra.jpg',
      funFact: 'First woman to be named heir to the Iron Throne, breaking centuries of tradition',
      category: 'Secretariat'
    },
    {
      id: 'alex-dunphy',
      name: 'Alex Dunphy',
      position: 'Chief of Research',
      bio: 'Valedictorian and academic prodigy with expertise in multiple fields including science, literature, and international relations. Her analytical mind and attention to detail ensure all committee research meets the highest standards.',
      image: '/images/team/alex.webp',
      funFact: 'Has read every book in the Sherman Oaks High School library twice',
      category: 'Secretariat'
    },
    // Executive Board members
    {
      id: 'jake-peralta',
      name: 'Jake Peralta',
      position: 'Head of Crisis Management',
      bio: 'NYPD Detective with an impressive track record of solving complex cases and managing high-pressure situations. His quick thinking and ability to find creative solutions make him invaluable during crisis simulations.',
      image: '/images/team/jake.jpg',
      funFact: 'Holds the record for fastest case closure at the Nine-Nine precinct',
      category: 'Executive Board'
    },
    {
      id: 'tony-stark',
      name: 'Tony Stark',
      position: 'Director of Innovation',
      bio: 'Genius inventor and former CEO of Stark Industries, bringing cutting-edge technology solutions to Model UN proceedings. His experience leading the Avengers provides unique insights into international cooperation and crisis response.',
      image: '/images/team/tony.avif',
      funFact: 'Built the first arc reactor in a cave with a box of scraps',
      category: 'Executive Board'
    },
    {
      id: 'paxton-hall-yoshida',
      name: 'Paxton Hall-Yoshida',
      position: 'Youth Outreach Coordinator',
      bio: 'Star swimmer and charismatic leader with exceptional interpersonal skills and cultural awareness. His ability to connect with diverse groups and navigate social dynamics makes him perfect for building bridges between different communities.',
      image: '/images/team/paxton.jpg',
      funFact: 'State champion swimmer and surprisingly good at history tutoring',
      category: 'Executive Board'
    }
  ]

  const categories = ['All', 'Secretariat', 'Executive Board']
  
  const filteredMembers = selectedCategory === 'All' 
    ? teamMembers 
    : teamMembers.filter(member => member.category === selectedCategory)

  const handleMemberClick = async (member: TeamMember) => {
    // Hide navbar when modal opens
    setNavbarVisible(false)
    
    // Pause user's background music if playing
    if (musicContext.isPlaying) {
      musicContext.pauseMusic()
    }

    // Always stop any currently playing theme audio first
    if (audioManager.isPlaying) {
      await audioManager.stopTheme()
    }

    // Clear any existing notifications
    setShowNotification(false)
    setCurrentTheme(null)

    // Open the modal
    setModalMember(member)
    setIsModalOpen(true)

    // Automatically start playing the theme
    try {
      const theme = themeMapping[member.id] || defaultTheme
      
      // Play the theme with timestamp and duration
      await audioManager.playTheme(theme.audioSrc, theme.startTime, theme.duration, member.name, theme.themeName, 0.3)
      setSelectedMember(member.id)
      
      // Show notification
      setCurrentTheme({ memberName: member.name, themeName: theme.themeName })
      setShowNotification(true)
      
      // Auto-hide notification after theme duration + 1 second
      setTimeout(() => setShowNotification(false), (theme.duration + 1) * 1000)
    } catch (error) {
      console.warn('Failed to play theme:', error)
    }
  }

  const handlePlayTheme = async () => {
    if (!modalMember) return

    try {
      // If clicking the same member, stop the theme
      if (selectedMember === modalMember.id && audioManager.isPlaying) {
        await audioManager.stopTheme()
        setSelectedMember(null)
        setShowNotification(false)
        setCurrentTheme(null)
        return
      }

      // Always stop any currently playing audio first (including continued themes)
      if (audioManager.isPlaying) {
        await audioManager.stopTheme()
      }

      // Clear any existing notifications
      setShowNotification(false)
      setCurrentTheme(null)

      // Get theme for this member
      const theme = themeMapping[modalMember.id] || defaultTheme
      
      // Play the theme with timestamp and duration
      await audioManager.playTheme(theme.audioSrc, theme.startTime, theme.duration, modalMember.name, theme.themeName, 0.3)
      setSelectedMember(modalMember.id)
      
      // Show notification
      setCurrentTheme({ memberName: modalMember.name, themeName: theme.themeName })
      setShowNotification(true)
      
      // Auto-hide notification after theme duration + 1 second
      setTimeout(() => setShowNotification(false), (theme.duration + 1) * 1000)
    } catch (error) {
      console.warn('Failed to play theme:', error)
    }
  }

  const handleCloseModal = async () => {
    // Show navbar when modal closes
    setNavbarVisible(true)
    
    // Stop any playing theme when modal closes
    if (audioManager.isPlaying) {
      await audioManager.stopTheme()
    }
    
    // Resume user's background music if it was playing
    if (musicContext.isPlaying) {
      musicContext.resumeMusic()
    }
    
    // Clear states
    setSelectedMember(null)
    setShowNotification(false)
    setCurrentTheme(null)
    setIsModalOpen(false)
    setModalMember(null)
  }

  return (
    <>
      <Helmet>
        <title>Our Team - AEGIS MUN</title>
        <meta name="description" content="Meet the brilliant minds behind AEGIS MUN." />
      </Helmet>

      <AudioControls
        isPlaying={audioManager.isPlaying}
        isMuted={audioManager.isMuted}
        onToggleMute={audioManager.toggleMute}
        onVolumeChange={audioManager.setVolume}
        onStop={() => {
          audioManager.stopTheme()
          setSelectedMember(null)
          setShowNotification(false)
          setCurrentTheme(null)
        }}
      />

      {/* Theme Notification */}
      {currentTheme && selectedMember && (
        <ThemeNotification
          isVisible={showNotification}
          memberName={currentTheme.memberName}
          themeName={currentTheme.themeName}
          duration={themeMapping[selectedMember]?.duration || 10}
          onClose={() => setShowNotification(false)}
        />
      )}

      {/* Continue Dialog */}
      {audioManager.currentThemeInfo && (
        <ContinueDialog
          isVisible={audioManager.showContinueDialog}
          memberName={audioManager.currentThemeInfo.memberName}
          themeName={audioManager.currentThemeInfo.themeName}
          onContinue={audioManager.continuePlaying}
          onStop={audioManager.stopAfterTheme}
        />
      )}

      {/* Team Member Modal */}
      <TeamMemberModal
        isOpen={isModalOpen}
        member={modalMember}
        isPlaying={selectedMember === modalMember?.id && audioManager.isPlaying}
        onClose={handleCloseModal}
        onPlayTheme={handlePlayTheme}
      />

      <div className="min-h-screen pt-16">
        <AnimatePresence>
          {isNavbarVisible && (
            <motion.section
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="py-20 bg-gradient-to-br from-aegis-black to-aegis-dark-gray"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl md:text-7xl font-serif font-black text-aegis-white mb-6"
                >
                  Meet the Minds Behind AEGIS
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-aegis-off-white text-lg mb-4"
                >
                  Click on any team member to see their profile and hear their theme song automatically! 🎵
                </motion.p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <section className="py-8 bg-aegis-dark-gray/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-aegis-burgundy text-aegis-white shadow-lg'
                      : 'bg-aegis-dark-gray text-aegis-off-white border border-aegis-brown'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-aegis-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`glass-effect rounded-xl overflow-hidden border transition-all duration-300 group cursor-pointer ${
                    selectedMember === member.id 
                      ? 'border-aegis-highlight shadow-lg shadow-aegis-highlight/20 scale-105' 
                      : 'border-aegis-brown/30 hover:border-aegis-highlight/50'
                  }`}
                  onClick={() => handleMemberClick(member)}
                >
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`w-full h-64 transition-transform duration-300 group-hover:scale-105 object-cover`}
                      style={member.id === 'daenerys-targaryen' ? { objectPosition: 'center 25%' } : {}}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-aegis-burgundy/90 text-aegis-white backdrop-blur-sm">
                        {member.category}
                      </span>
                    </div>
                    {selectedMember === member.id && (
                      <div className="absolute top-4 right-4">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-8 h-8 bg-aegis-highlight/90 rounded-full flex items-center justify-center backdrop-blur-sm"
                        >
                          <svg className="w-4 h-4 text-aegis-black" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.793a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                          </svg>
                        </motion.div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="bg-aegis-highlight/90 text-aegis-black px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
                      >
                        👁️ View Profile
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-aegis-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-aegis-highlight text-sm font-medium">
                        {member.position}
                      </p>
                    </div>
                    
                    <p className="text-aegis-off-white text-sm leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                    
                    <div className="pt-3 border-t border-aegis-brown/30">
                      <p className="text-aegis-off-white text-xs italic line-clamp-2">
                        "{member.funFact}"
                      </p>
                    </div>
                    
                    {themeMapping[member.id] && (
                      <div className="pt-2 border-t border-aegis-brown/20">
                        <p className="text-aegis-highlight text-xs font-medium">
                          🎵 {themeMapping[member.id].themeName}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Team 