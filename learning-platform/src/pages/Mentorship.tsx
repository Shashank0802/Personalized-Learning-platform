import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  UserIcon,
  StarIcon,
  ClockIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  VideoCameraIcon,
  ClockIcon as HistoryIcon,
} from '@heroicons/react/24/outline'

interface Mentor {
  id: string
  name: string
  role: string
  company: string
  expertise: string[]
  rating: number
  reviews: number
  hourlyRate: number
  image: string
  bio: string
  availability: string[]
}

interface Session {
  id: string
  mentorId: string
  mentorName: string
  date: string
  time: string
  duration: string
  status: 'completed' | 'upcoming' | 'cancelled'
  notes?: string
  rating?: number
  feedback?: string
}

const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior Software Engineer',
    company: 'Google',
    expertise: ['React', 'TypeScript', 'System Design'],
    rating: 4.9,
    reviews: 128,
    hourlyRate: 85,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: '10+ years of experience in full-stack development. Passionate about mentoring and helping others grow in their tech careers.',
    availability: ['Monday', 'Wednesday', 'Friday'],
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'Frontend Architect',
    company: 'Microsoft',
    expertise: ['JavaScript', 'Vue.js', 'UI/UX Design'],
    rating: 4.8,
    reviews: 95,
    hourlyRate: 75,
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Frontend development expert with a focus on creating scalable and maintainable applications. Love sharing knowledge with aspiring developers.',
    availability: ['Tuesday', 'Thursday', 'Saturday'],
  },
  {
    id: '3',
    name: 'Emma Thompson',
    role: 'Backend Developer',
    company: 'Amazon',
    expertise: ['Python', 'AWS', 'Database Design'],
    rating: 4.9,
    reviews: 156,
    hourlyRate: 90,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Backend specialist with expertise in cloud architecture and database optimization. Dedicated to helping others master backend development.',
    availability: ['Monday', 'Wednesday', 'Friday'],
  },
]

const Mentorship = () => {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [expertiseFilter, setExpertiseFilter] = useState<string[]>([])
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      mentorId: '1',
      mentorName: 'Sarah Chen',
      date: '2024-03-20',
      time: '14:00',
      duration: '1 hour',
      status: 'upcoming',
    },
    {
      id: '2',
      mentorId: '2',
      mentorName: 'Michael Rodriguez',
      date: '2024-03-15',
      time: '10:00',
      duration: '1 hour',
      status: 'completed',
      notes: 'Great session on Vue.js fundamentals',
      rating: 5,
      feedback: 'Very knowledgeable and patient mentor',
    },
  ])
  const [showHistory, setShowHistory] = useState(false)
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)

  const expertiseOptions = Array.from(
    new Set(mentors.flatMap(mentor => mentor.expertise))
  )

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesExpertise = expertiseFilter.length === 0 ||
      expertiseFilter.every(exp => mentor.expertise.includes(exp))
    
    return matchesSearch && matchesExpertise
  })

  const handleBooking = (mentor: Mentor) => {
    setSelectedMentor(mentor)
  }

  const handleSubmitBooking = () => {
    // Here you would typically send the booking data to your backend
    console.log('Booking submitted:', {
      mentor: selectedMentor,
      date: bookingDate,
      time: bookingTime,
    })
    setSelectedMentor(null)
    setBookingDate('')
    setBookingTime('')
  }

  const handleStartCall = (mentor: Mentor) => {
    // Here you would integrate with a video calling service
    alert(`Starting video call with ${mentor.name}`)
  }

  const handleSessionFeedback = (sessionId: string, rating: number, feedback: string) => {
    setSessions(prev =>
      prev.map(session =>
        session.id === sessionId
          ? { ...session, rating, feedback }
          : session
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Find Your Mentor</h1>
          <p className="text-gray-400">Connect with experienced professionals who can guide your career growth</p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search mentors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <div className="flex flex-wrap gap-2">
              {expertiseOptions.map(expertise => (
                <button
                  key={expertise}
                  onClick={() => {
                    setExpertiseFilter(prev =>
                      prev.includes(expertise)
                        ? prev.filter(e => e !== expertise)
                        : [...prev, expertise]
                    )
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    expertiseFilter.includes(expertise)
                      ? 'bg-primary-600 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {expertise}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                showHistory
                  ? 'bg-primary-600 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <HistoryIcon className="w-5 h-5 mr-2" />
              Session History
            </button>
          </div>
        </div>

        {showHistory ? (
          <div className="space-y-4">
            {sessions.map(session => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{session.mentorName}</h3>
                    <p className="text-gray-400">
                      {session.date} at {session.time} ({session.duration})
                    </p>
                    {session.notes && (
                      <p className="text-gray-300 mt-2">{session.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      session.status === 'completed'
                        ? 'bg-green-500/20 text-green-400'
                        : session.status === 'upcoming'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                    </span>
                    {session.status === 'completed' && !session.rating && (
                      <button
                        onClick={() => setSelectedSession(session)}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Rate Session
                      </button>
                    )}
                  </div>
                </div>
                {session.rating && (
                  <div className="mt-4">
                    <div className="flex items-center space-x-1">
                      <StarIcon className="w-5 h-5 text-yellow-400" />
                      <span className="text-white">{session.rating}/5</span>
                    </div>
                    <p className="text-gray-300 mt-2">{session.feedback}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map(mentor => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-primary-500/50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-white">{mentor.name}</h3>
                    <p className="text-gray-400">{mentor.role}</p>
                    <p className="text-gray-500 text-sm">{mentor.company}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center space-x-1">
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                    <span className="text-white">{mentor.rating}</span>
                    <span className="text-gray-400">({mentor.reviews} reviews)</span>
                  </div>
                  <p className="text-gray-300 mt-2">{mentor.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {mentor.expertise.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                      <ClockIcon className="w-5 h-5 mr-1" />
                      <span>${mentor.hourlyRate}/hr</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleBooking(mentor)}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Book Session
                      </button>
                      <button
                        onClick={() => handleStartCall(mentor)}
                        className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <VideoCameraIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Booking Modal */}
        {selectedMentor && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800 rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-semibold text-white">Book a Session</h2>
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Mentor
                  </label>
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedMentor.image}
                      alt={selectedMentor.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-white">{selectedMentor.name}</p>
                      <p className="text-gray-400 text-sm">{selectedMentor.role}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleSubmitBooking}
                    className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Feedback Modal */}
        {selectedSession && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800 rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-semibold text-white">Rate Your Session</h2>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Rating
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button
                        key={rating}
                        onClick={() => handleSessionFeedback(selectedSession.id, rating, '')}
                        className="text-2xl text-gray-400 hover:text-yellow-400 focus:outline-none"
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Feedback
                  </label>
                  <textarea
                    placeholder="Share your experience..."
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 h-32"
                    onChange={(e) => handleSessionFeedback(selectedSession.id, selectedSession.rating || 0, e.target.value)}
                  />
                </div>

                <button
                  onClick={() => setSelectedSession(null)}
                  className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Submit Feedback
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Mentorship 