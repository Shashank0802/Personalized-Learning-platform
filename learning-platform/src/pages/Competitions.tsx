import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrophyIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  TagIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline'

interface Competition {
  id: number
  title: string
  description: string
  startDate: string
  endDate: string
  prize: string
  participants: number
  maxParticipants: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  tags: string[]
  image: string
  status: 'Upcoming' | 'Ongoing' | 'Past'
}

const competitions: Competition[] = [
  {
    id: 1,
    title: 'AI Hackathon 2024',
    description: 'Build innovative AI solutions to solve real-world problems. Showcase your skills and win amazing prizes!',
    startDate: '2024-04-15',
    endDate: '2024-04-17',
    prize: '$10,000',
    participants: 150,
    maxParticipants: 200,
    difficulty: 'Advanced',
    tags: ['AI', 'Machine Learning', 'Hackathon'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
    status: 'Upcoming',
  },
  {
    id: 2,
    title: 'Web Development Challenge',
    description: 'Create a responsive and modern web application using the latest technologies. Perfect for beginners!',
    startDate: '2024-03-20',
    endDate: '2024-03-25',
    prize: '$5,000',
    participants: 80,
    maxParticipants: 100,
    difficulty: 'Beginner',
    tags: ['Web Development', 'React', 'UI/UX'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
    status: 'Ongoing',
  },
  {
    id: 3,
    title: 'Data Science Competition',
    description: 'Analyze complex datasets and build predictive models. Show your data science expertise!',
    startDate: '2024-02-01',
    endDate: '2024-02-15',
    prize: '$7,500',
    participants: 120,
    maxParticipants: 150,
    difficulty: 'Intermediate',
    tags: ['Data Science', 'Python', 'Machine Learning'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
    status: 'Past',
  },
]

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']
const statuses = ['All', 'Upcoming', 'Ongoing', 'Past']

export default function Competitions() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCompetitions = competitions.filter(comp => {
    const matchesDifficulty = selectedDifficulty === 'All' || comp.difficulty === selectedDifficulty
    const matchesStatus = selectedStatus === 'All' || comp.status === selectedStatus
    const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesDifficulty && matchesStatus && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-24">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-[500px] h-[500px] bg-primary-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{ top: '10%', left: '10%' }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{ bottom: '10%', right: '10%' }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-primary-200 to-white bg-clip-text text-transparent">
                Coding Competitions
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Challenge yourself, showcase your skills, and win amazing prizes
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search competitions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-white placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Difficulty Filter */}
              <div className="flex-1">
                <div className="relative">
                  <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-white"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty} className="bg-gray-800">{difficulty}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex-1">
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-white"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status} className="bg-gray-800">{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Competition Listings */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8">
          {filteredCompetitions.map((competition, index) => (
            <motion.div
              key={competition.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 hover:border-primary-500/50 transition-colors"
            >
              <div className="flex flex-col md:flex-row">
                {/* Competition Image */}
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img
                    src={competition.image}
                    alt={competition.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Competition Details */}
                <div className="flex-1 p-6">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h2 className="text-2xl font-semibold text-white">{competition.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      competition.status === 'Upcoming' ? 'bg-green-500/20 text-green-300' :
                      competition.status === 'Ongoing' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {competition.status}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-500/20 text-primary-300">
                      {competition.difficulty}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-6">{competition.description}</p>

                  <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5" />
                      <span>{new Date(competition.startDate).toLocaleDateString()} - {new Date(competition.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrophyIcon className="w-5 h-5" />
                      <span>{competition.prize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserGroupIcon className="w-5 h-5" />
                      <span>{competition.participants}/{competition.maxParticipants} participants</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {competition.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-white/5 text-gray-300 flex items-center gap-1"
                      >
                        <TagIcon className="w-4 h-4" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full md:w-auto px-6 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-primary-500/25"
                  >
                    {competition.status === 'Past' ? 'View Results' : 'Register Now'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 