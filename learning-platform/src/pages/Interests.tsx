import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  CpuChipIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CloudIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  TrophyIcon,
  CommandLineIcon,
  WifiIcon,
  CodeBracketSquareIcon,
} from '@heroicons/react/24/outline'

interface Interest {
  id: string
  title: string
  description: string
  icon: any
  color: string
  hoverColor: string
}

const interests: Interest[] = [
  {
    id: 'ai-ml',
    title: 'Artificial Intelligence & Machine Learning',
    description: 'Master AI algorithms, neural networks, and machine learning models',
    icon: CpuChipIcon,
    color: 'from-purple-500 to-pink-500',
    hoverColor: 'from-purple-600 to-pink-600',
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Learn data analysis, visualization, and statistical modeling',
    icon: ChartBarIcon,
    color: 'from-blue-500 to-cyan-500',
    hoverColor: 'from-blue-600 to-cyan-600',
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    description: 'Protect systems and networks from digital threats',
    icon: ShieldCheckIcon,
    color: 'from-red-500 to-orange-500',
    hoverColor: 'from-red-600 to-orange-600',
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing',
    description: 'Master cloud platforms and distributed systems',
    icon: CloudIcon,
    color: 'from-sky-500 to-blue-500',
    hoverColor: 'from-sky-600 to-blue-600',
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Build modern web applications and responsive websites',
    icon: CodeBracketIcon,
    color: 'from-green-500 to-emerald-500',
    hoverColor: 'from-green-600 to-emerald-600',
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development',
    description: 'Create cross-platform mobile applications',
    icon: DevicePhoneMobileIcon,
    color: 'from-indigo-500 to-purple-500',
    hoverColor: 'from-indigo-600 to-purple-600',
  },
  {
    id: 'blockchain',
    title: 'Blockchain & Web3',
    description: 'Develop decentralized applications and smart contracts',
    icon: CurrencyDollarIcon,
    color: 'from-yellow-500 to-amber-500',
    hoverColor: 'from-yellow-600 to-amber-600',
  },
  {
    id: 'devops',
    title: 'DevOps & CI/CD',
    description: 'Automate development and deployment processes',
    icon: ArrowPathIcon,
    color: 'from-pink-500 to-rose-500',
    hoverColor: 'from-pink-600 to-rose-600',
  },
  {
    id: 'competitive-programming',
    title: 'Competitive Programming',
    description: 'Solve complex algorithmic problems and participate in coding contests',
    icon: TrophyIcon,
    color: 'from-orange-500 to-red-500',
    hoverColor: 'from-orange-600 to-red-600',
  },
  {
    id: 'software-development',
    title: 'Software Development',
    description: 'Master software engineering principles and best practices',
    icon: CommandLineIcon,
    color: 'from-cyan-500 to-teal-500',
    hoverColor: 'from-cyan-600 to-teal-600',
  },
  {
    id: 'networks',
    title: 'Computer Networks & Security',
    description: 'Understand network protocols and security mechanisms',
    icon: WifiIcon,
    color: 'from-violet-500 to-purple-500',
    hoverColor: 'from-violet-600 to-purple-600',
  },
]

const Interests = () => {
  const navigate = useNavigate()
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id)
        ? prev.filter(interest => interest !== id)
        : [...prev, id]
    )
  }

  const handleContinue = () => {
    // Here you would typically save the selected interests to your backend
    console.log('Selected interests:', selectedInterests)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Select Your Areas of Interest
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg"
            >
              Choose the topics you want to learn about. You can select multiple interests.
            </motion.p>
          </div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 h-1 bg-white/5 rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '50%' }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="h-full bg-primary-600 rounded-full"
                />
              </div>
              <span className="ml-4 text-gray-400">Step 2 of 2</span>
            </div>
          </motion.div>

          {/* Interest Cards Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {interests.map((interest, index) => (
              <motion.div
                key={interest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                onClick={() => toggleInterest(interest.id)}
                className={`relative group cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 ${
                  selectedInterests.includes(interest.id)
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-white/10 hover:border-primary-500/50'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${interest.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="p-6 relative">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${interest.color} w-fit mb-4`}>
                    <interest.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{interest.title}</h3>
                  <p className="text-gray-400">{interest.description}</p>
                </div>
                {selectedInterests.includes(interest.id) && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <button
              onClick={handleContinue}
              disabled={selectedInterests.length === 0}
              className={`px-8 py-3 rounded-lg text-lg font-medium transition-colors ${
                selectedInterests.length === 0
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              Continue to Dashboard →
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Interests 