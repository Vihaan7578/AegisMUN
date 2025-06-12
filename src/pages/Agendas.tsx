import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

interface AgendaItem {
  id: string
  committee: string
  title: string
  description: string
  keyPoints: string[]
  pdfUrl?: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

const Agendas: React.FC = () => {
  const agendas: AgendaItem[] = [
    {
      id: 'unsc-agenda',
      committee: 'UNSC',
      title: 'The situation in Eastern Europe: Addressing Regional Security Challenges',
      description: 'This agenda focuses on the complex geopolitical landscape in Eastern Europe, examining the root causes of regional tensions and exploring diplomatic solutions to maintain international peace and security.',
      keyPoints: [
        'Analysis of current security threats in the region',
        'Role of international law in conflict resolution',
        'Economic sanctions and their humanitarian impact',
        'Refugee crisis and international response',
        'Cybersecurity implications of regional conflicts'
      ],
      pdfUrl: '/agendas/unsc-eastern-europe.pdf',
      difficulty: 'Advanced'
    },
    {
      id: 'unga-agenda',
      committee: 'UNGA',
      title: 'Sustainable Development Goals: Progress and Future Challenges',
      description: 'Examining the progress made on the UN Sustainable Development Goals since 2015 and addressing the challenges posed by global crises including the pandemic and climate change.',
      keyPoints: [
        'Assessment of SDG progress across different regions',
        'Impact of COVID-19 on sustainable development',
        'Climate change and environmental sustainability',
        'Digital divide and technological inequality',
        'Gender equality and social inclusion'
      ],
      pdfUrl: '/agendas/unga-sdg-progress.pdf',
      difficulty: 'Beginner'
    },
    {
      id: 'ecosoc-agenda',
      committee: 'ECOSOC',
      title: 'Digital Divide and Economic Inequality in the Post-Pandemic World',
      description: 'Addressing the growing digital divide and its impact on economic inequality, particularly in developing nations, and exploring solutions for inclusive digital transformation.',
      keyPoints: [
        'Digital infrastructure development in LDCs',
        'Educational technology access and equity',
        'Remote work and economic opportunities',
        'Digital financial inclusion',
        'Public-private partnerships in digital development'
      ],
      pdfUrl: '/agendas/ecosoc-digital-divide.pdf',
      difficulty: 'Intermediate'
    },
    {
      id: 'unhrc-agenda',
      committee: 'UNHRC',
      title: 'Digital Rights and Privacy in the 21st Century',
      description: 'Exploring the intersection of human rights and digital technology, focusing on privacy rights, freedom of expression online, and the responsibility of tech companies.',
      keyPoints: [
        'Right to privacy in the digital age',
        'Freedom of expression and online censorship',
        'Data protection and surveillance concerns',
        'Digital rights of marginalized communities',
        'Corporate responsibility and human rights'
      ],
      pdfUrl: '/agendas/unhrc-digital-rights.pdf',
      difficulty: 'Intermediate'
    },
    {
      id: 'nato-agenda',
      committee: 'NATO',
      title: 'Cybersecurity Threats and Collective Defense in the Digital Age',
      description: 'Examining evolving cybersecurity threats to NATO member states and developing comprehensive strategies for collective cyber defense under Article 5.',
      keyPoints: [
        'State-sponsored cyber attacks and attribution',
        'Critical infrastructure protection',
        'Information warfare and disinformation',
        'Cyber deterrence strategies',
        'International cooperation in cybersecurity'
      ],
      pdfUrl: '/agendas/nato-cybersecurity.pdf',
      difficulty: 'Advanced'
    },
    {
      id: 'who-agenda',
      committee: 'WHO',
      title: 'Global Health Preparedness for Future Pandemics',
      description: 'Learning from the COVID-19 pandemic to build resilient health systems and improve global preparedness for future health emergencies.',
      keyPoints: [
        'Early warning systems and disease surveillance',
        'Equitable access to vaccines and treatments',
        'Health system resilience and capacity building',
        'International health regulations reform',
        'One Health approach to pandemic prevention'
      ],
      pdfUrl: '/agendas/who-pandemic-preparedness.pdf',
      difficulty: 'Beginner'
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/20'
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/20'
      case 'Advanced': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  return (
    <>
      <Helmet>
        <title>Agendas - AEGIS MUN</title>
        <meta name="description" content="Explore detailed agendas for all committees, covering the most pressing global challenges of our time." />
      </Helmet>

      <div className="min-h-screen pt-16">
        {/* Header */}
        <section className="py-20 bg-gradient-to-br from-aegis-black to-aegis-dark-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif font-black text-aegis-white mb-6"
            >
              Committee Agendas
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-aegis-off-white max-w-3xl mx-auto"
            >
              Delve deep into the critical issues that will shape our world's future. 
              Each agenda is carefully crafted to challenge delegates and foster meaningful debate.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg font-semibold text-aegis-highlight mt-4"
            >
              *These agendas are not final – they are sample layouts to show how the section may look.*
            </motion.p>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-aegis-black relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-aegis-brown to-aegis-burgundy h-full" />

            {/* Agenda items */}
            <div className="space-y-16">
              {agendas.map((agenda, index) => (
                <motion.div
                  key={agenda.id}
                  initial={{ 
                    opacity: 0, 
                    x: index % 2 === 0 ? -100 : 100,
                    y: 50
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    y: 0
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Timeline node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-aegis-brown to-aegis-burgundy rounded-full border-4 border-aegis-black shadow-lg z-10">
                    <div className="w-full h-full bg-aegis-highlight rounded-full animate-pulse" />
                  </div>

                  {/* Content card */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="glass-effect rounded-xl p-8 border border-aegis-brown/30 hover:border-aegis-highlight/50 transition-all duration-300 group">
                      {/* Committee badge and difficulty */}
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-4 py-2 bg-aegis-burgundy/20 text-aegis-highlight font-semibold rounded-full">
                          {agenda.committee}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(agenda.difficulty)}`}>
                          {agenda.difficulty}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-aegis-white mb-4 group-hover:text-aegis-highlight transition-colors">
                        {agenda.title}
                      </h3>

                      {/* Description */}
                      <p className="text-aegis-off-white mb-6 leading-relaxed">
                        {agenda.description}
                      </p>

                      {/* Key points */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-aegis-highlight mb-3">Key Discussion Points:</h4>
                        <ul className="space-y-2">
                          {agenda.keyPoints.map((point, pointIndex) => (
                            <motion.li
                              key={pointIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: pointIndex * 0.1 }}
                              className="flex items-start text-aegis-off-white"
                            >
                              <span className="text-aegis-highlight mr-2 mt-1">•</span>
                              {point}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Download button */}
                      {agenda.pdfUrl && (
                        <a
                          href={agenda.pdfUrl}
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-aegis-brown to-aegis-burgundy text-aegis-white font-semibold rounded-lg hover:from-aegis-burgundy hover:to-aegis-brown transform hover:scale-105 transition-all duration-300 shadow-lg"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Full Agenda
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-aegis-burgundy to-aegis-brown">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-serif font-bold text-aegis-white mb-6"
            >
              Ready to tackle these challenges?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-aegis-off-white mb-8"
            >
              Choose your committee and prepare to engage with some of the most pressing issues facing our world today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="/registration"
                className="inline-flex items-center px-8 py-4 bg-aegis-white text-aegis-burgundy font-semibold rounded-lg hover:bg-aegis-off-white transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Register Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="/committees"
                className="inline-flex items-center px-8 py-4 border-2 border-aegis-white text-aegis-white font-semibold rounded-lg hover:bg-aegis-white hover:text-aegis-burgundy transition-all duration-300"
              >
                Explore Committees
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Agendas 