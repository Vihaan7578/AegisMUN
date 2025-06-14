import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

interface Committee {
  id: string
  name: string
  abbreviation: string
  agenda: string
  size: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  description: string
  chairs: string[]
  type: string
}

const Committees: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All')
  const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(null)

  const committees: Committee[] = [
    {
      id: 'unsc',
      name: 'United Nations Security Council',
      abbreviation: 'UNSC',
      agenda: 'The situation in Eastern Europe: Addressing Regional Security Challenges',
      size: 15,
      difficulty: 'Advanced',
      description: 'The premier crisis committee dealing with international peace and security matters.',
      chairs: ['Sarah Chen', 'Michael Rodriguez'],
      type: 'Crisis Committee'
    },
    {
      id: 'unga',
      name: 'United Nations General Assembly',
      abbreviation: 'UNGA',
      agenda: 'Sustainable Development Goals: Progress and Future Challenges',
      size: 193,
      difficulty: 'Beginner',
      description: 'The main deliberative assembly where all UN member states have equal representation.',
      chairs: ['Emma Thompson', 'David Kim'],
      type: 'General Assembly'
    },
    {
      id: 'ecosoc',
      name: 'Economic and Social Council',
      abbreviation: 'ECOSOC',
      agenda: 'Digital Divide and Economic Inequality in the Post-Pandemic World',
      size: 54,
      difficulty: 'Intermediate',
      description: 'Coordinating international cooperation on economic and social issues.',
      chairs: ['Lisa Wang', 'Ahmed Hassan'],
      type: 'Specialized Committee'
    },
    {
      id: 'unhrc',
      name: 'UN Human Rights Council',
      abbreviation: 'UNHRC',
      agenda: 'Digital Rights and Privacy in the 21st Century',
      size: 47,
      difficulty: 'Intermediate',
      description: 'Promoting and protecting human rights around the globe.',
      chairs: ['Maria Gonzalez', 'James Wilson'],
      type: 'Specialized Committee'
    },
    {
      id: 'nato',
      name: 'North Atlantic Treaty Organization',
      abbreviation: 'NATO',
      agenda: 'Cybersecurity Threats and Collective Defense in the Digital Age',
      size: 30,
      difficulty: 'Advanced',
      description: 'Military alliance focused on collective defense and crisis management.',
      chairs: ['Alexander Petrov', 'Sophie Martin'],
      type: 'Crisis Committee'
    },
    {
      id: 'who',
      name: 'World Health Organization',
      abbreviation: 'WHO',
      agenda: 'Global Health Preparedness for Future Pandemics',
      size: 34,
      difficulty: 'Beginner',
      description: 'Leading international health authority within the UN system.',
      chairs: ['Dr. Rachel Green', 'Dr. Yuki Tanaka'],
      type: 'Specialized Committee'
    }
  ]

  const filteredCommittees = selectedDifficulty === 'All' 
    ? committees 
    : committees.filter(committee => committee.difficulty === selectedDifficulty)

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500'
      case 'Intermediate': return 'bg-yellow-500'
      case 'Advanced': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <>
      <Helmet>
        <title>Committees - AEGIS MUN</title>
        <meta name="description" content="Explore our diverse range of committees covering contemporary global issues with experienced chairs." />
      </Helmet>

      <div className="min-h-screen pt-16">
        {/* Header */}
        <section className="py-20 bg-gradient-to-br from-aegis-black to-aegis-dark-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-7xl font-serif font-black text-aegis-white mb-6"
            >
              Choose Your Committee
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-aegis-off-white max-w-3xl mx-auto px-4"
            >
              Dive into global challenges across our expertly curated committees, 
              each designed to test your diplomatic skills and expand your worldview.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg font-semibold text-aegis-highlight mt-4"
            >
              *These committees are not final – they are sample layouts to show how the section may look.*
            </motion.p>
          </div>
        </section>

        {/* Filter Controls */}
        <section className="py-8 bg-aegis-dark-gray/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {difficulties.map((difficulty) => (
                <motion.button
                  key={difficulty}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedDifficulty === difficulty
                      ? 'bg-aegis-burgundy text-aegis-white shadow-lg'
                      : 'bg-aegis-dark-gray text-aegis-off-white border border-aegis-brown hover:bg-aegis-brown/20'
                  }`}
                >
                  {difficulty}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Committees Grid */}
        <section className="py-16 bg-aegis-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence>
                {filteredCommittees.map((committee, index) => (
                  <motion.div
                    key={committee.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    onClick={() => setSelectedCommittee(committee)}
                    className="glass-effect rounded-xl p-6 cursor-pointer border border-aegis-brown/30 hover:border-aegis-highlight/50 transition-all duration-300 group"
                  >
                    {/* Committee type badge */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-aegis-burgundy/20 text-aegis-highlight text-sm rounded-full">
                        {committee.type}
                      </span>
                      <span className={`w-3 h-3 rounded-full ${getDifficultyColor(committee.difficulty)}`} />
                    </div>

                    {/* Committee name */}
                    <h3 className="text-xl font-serif font-bold text-aegis-white mb-2 group-hover:text-aegis-highlight transition-colors">
                      {committee.abbreviation}
                    </h3>
                    <p className="text-sm text-aegis-off-white mb-4">
                      {committee.name}
                    </p>

                    {/* Agenda preview */}
                    <p className="text-aegis-off-white text-sm mb-4 line-clamp-2">
                      {committee.agenda}
                    </p>

                    {/* Committee stats */}
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-aegis-highlight">
                          {committee.size} delegates
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(committee.difficulty)} text-white`}>
                          {committee.difficulty}
                        </span>
                      </div>
                      <svg className="w-5 h-5 text-aegis-highlight transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Committee Detail Modal */}
        <AnimatePresence>
          {selectedCommittee && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCommittee(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-aegis-dark-gray rounded-xl p-4 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-aegis-brown mx-4"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-aegis-white mb-2">
                      {selectedCommittee.abbreviation}
                    </h2>
                    <p className="text-aegis-off-white">{selectedCommittee.name}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCommittee(null)}
                    className="text-aegis-off-white hover:text-aegis-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-aegis-highlight mb-2">Agenda</h3>
                    <p className="text-aegis-off-white">{selectedCommittee.agenda}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-aegis-highlight mb-2">Description</h3>
                    <p className="text-aegis-off-white">{selectedCommittee.description}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-aegis-highlight mb-2">Committee Details</h3>
                      <ul className="space-y-2 text-aegis-off-white">
                        <li>Type: {selectedCommittee.type}</li>
                        <li>Size: {selectedCommittee.size} delegates</li>
                        <li>Difficulty: <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(selectedCommittee.difficulty)} text-white ml-2`}>
                          {selectedCommittee.difficulty}
                        </span></li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-aegis-highlight mb-2">Executive Board</h3>
                      <ul className="space-y-1 text-aegis-off-white">
                        {selectedCommittee.chairs.map((chair, index) => (
                          <li key={index}>{chair}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-aegis-brown/30">
                    <Link
                      to="/registration"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-aegis-brown to-aegis-burgundy text-aegis-white font-semibold rounded-lg hover:from-aegis-burgundy hover:to-aegis-brown transition-all duration-300"
                    >
                      Register for this Committee
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default Committees 