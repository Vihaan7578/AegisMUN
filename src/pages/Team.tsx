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
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const teamMembers: TeamMember[] = [
    // Secretariat members
    {
      id: 'daenerys-targaryen',
      name: 'Daenerys Targaryen',
      position: 'Secretary-General',
      bio: 'The Mother of Dragons and former Queen of Meereen brings unparalleled experience in liberation movements and diplomatic negotiations. Known for her fierce advocacy for the oppressed and her revolutionary approach to breaking chains of injustice.',
      image: '/src/assets/team/daenerys.jpg',
      funFact: 'Can conduct negotiations in High Valyrian, Dothraki, and Common Tongue',
      category: 'Secretariat'
    },
    {
      id: 'rhaenyra-targaryen',
      name: 'Rhaenyra Targaryen',
      position: 'Deputy Secretary-General',
      bio: 'Heir to the Iron Throne and experienced in court politics, Princess Rhaenyra excels at navigating complex political landscapes and building coalitions. Her leadership during the Dance of Dragons demonstrated strategic thinking under pressure.',
      image: '/src/assets/team/rhaenyra.jpg',
      funFact: 'First woman to be named heir to the Iron Throne, breaking centuries of tradition',
      category: 'Secretariat'
    },
    {
      id: 'alex-dunphy',
      name: 'Alex Dunphy',
      position: 'Chief of Research',
      bio: 'Valedictorian and academic prodigy with expertise in multiple fields including science, literature, and international relations. Her analytical mind and attention to detail ensure all committee research meets the highest standards.',
      image: '/src/assets/team/alex.webp',
      funFact: 'Has read every book in the Sherman Oaks High School library twice',
      category: 'Secretariat'
    },
    // Executive Board members
    {
      id: 'jake-peralta',
      name: 'Jake Peralta',
      position: 'Head of Crisis Management',
      bio: 'NYPD Detective with an impressive track record of solving complex cases and managing high-pressure situations. His quick thinking and ability to find creative solutions make him invaluable during crisis simulations.',
      image: '/src/assets/team/jake.jpg',
      funFact: 'Holds the record for fastest case closure at the Nine-Nine precinct',
      category: 'Executive Board'
    },
    {
      id: 'tony-stark',
      name: 'Tony Stark',
      position: 'Director of Innovation',
      bio: 'Genius inventor and former CEO of Stark Industries, bringing cutting-edge technology solutions to Model UN proceedings. His experience leading the Avengers provides unique insights into international cooperation and crisis response.',
      image: '/src/assets/team/tony.avif',
      funFact: 'Built the first arc reactor in a cave with a box of scraps',
      category: 'Executive Board'
    },
    {
      id: 'paxton-hall-yoshida',
      name: 'Paxton Hall-Yoshida',
      position: 'Youth Outreach Coordinator',
      bio: 'Star swimmer and charismatic leader with exceptional interpersonal skills and cultural awareness. His ability to connect with diverse groups and navigate social dynamics makes him perfect for building bridges between different communities.',
      image: '/src/assets/team/paxton.jpg',
      funFact: 'State champion swimmer and surprisingly good at history tutoring',
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-effect rounded-xl overflow-hidden border border-aegis-brown/30 hover:border-aegis-highlight/50 transition-all duration-300 group"
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
                    
                    <p className="text-aegis-off-white text-sm leading-relaxed">
                      {member.bio}
                    </p>
                    
                    <div className="pt-3 border-t border-aegis-brown/30">
                      <p className="text-aegis-off-white text-xs italic">
                        "{member.funFact}"
                      </p>
                    </div>
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