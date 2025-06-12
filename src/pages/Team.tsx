import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const teamMembers: TeamMember[] = [
    // Secretariat placeholders
    {
      id: 'secretariat-1',
      name: 'Secretariat 1',
      position: 'To Be Announced',
      bio: '',
      image: 'https://via.placeholder.com/300x400?text=Secretariat+1',
      funFact: '',
      category: 'Secretariat'
    },
    {
      id: 'secretariat-2',
      name: 'Secretariat 2',
      position: 'To Be Announced',
      bio: '',
      image: 'https://via.placeholder.com/300x400?text=Secretariat+2',
      funFact: '',
      category: 'Secretariat'
    },
    {
      id: 'secretariat-3',
      name: 'Secretariat 3',
      position: 'To Be Announced',
      bio: '',
      image: 'https://via.placeholder.com/300x400?text=Secretariat+3',
      funFact: '',
      category: 'Secretariat'
    },
    // Executive Board placeholders
    {
      id: 'executive-1',
      name: 'Executive 1',
      position: 'To Be Announced',
      bio: '',
      image: 'https://via.placeholder.com/300x400?text=Executive+1',
      funFact: '',
      category: 'Executive Board'
    },
    {
      id: 'executive-2',
      name: 'Executive 2',
      position: 'To Be Announced',
      bio: '',
      image: 'https://via.placeholder.com/300x400?text=Executive+2',
      funFact: '',
      category: 'Executive Board'
    },
    {
      id: 'executive-3',
      name: 'Executive 3',
      position: 'To Be Announced',
      bio: '',
      image: 'https://via.placeholder.com/300x400?text=Executive+3',
      funFact: '',
      category: 'Executive Board'
    }
  ]

  const categories = ['All', 'Secretariat', 'Executive Board']
  
  const filteredMembers = selectedCategory === 'All' 
    ? teamMembers 
    : teamMembers.filter(member => member.category === selectedCategory)

  return (
    <>
      <Helmet>
        <title>Our Team - AEGIS MUN</title>
        <meta name="description" content="Meet the brilliant minds behind AEGIS MUN." />
      </Helmet>

      <div className="min-h-screen pt-16">
        <section className="py-20 bg-gradient-to-br from-aegis-black to-aegis-dark-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif font-black text-aegis-white mb-6"
            >
              Meet the Minds Behind AEGIS
            </motion.h1>
          </div>
        </section>

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedMember(member)}
                  className="glass-effect rounded-xl overflow-hidden border border-aegis-brown/30 hover:border-aegis-highlight/50 transition-all duration-300 cursor-pointer group"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="p-6">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-aegis-burgundy/20 text-aegis-highlight">
                      {member.category}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-aegis-white mb-1 mt-3">
                      {member.name}
                    </h3>
                    <p className="text-aegis-off-white text-sm">
                      {member.position}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-aegis-dark-gray rounded-xl p-8 max-w-2xl w-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-aegis-white mb-2">
                      {selectedMember.name}
                    </h2>
                    <p className="text-aegis-highlight text-lg">
                      {selectedMember.position}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="text-aegis-off-white hover:text-aegis-white"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-aegis-off-white mb-4">{selectedMember.bio}</p>
                <p className="text-aegis-off-white italic">"{selectedMember.funFact}"</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default Team 