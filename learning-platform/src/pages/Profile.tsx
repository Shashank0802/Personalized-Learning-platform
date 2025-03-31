import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  UserCircleIcon,
  AcademicCapIcon,
  BookOpenIcon,
  TrophyIcon,
  ChartBarIcon,
  ArrowLeftOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline'
import Navbar from '../components/Navbar'
import {
  getUserProfile,
  getUserAchievements,
  getUserLearningTopics,
  updateUserProfile,
  saveChatMessage,
  getChatHistory,
  type User,
  type Achievement,
  type LearningTopic,
  type ChatMessage
} from '../utils/db'

interface Progress {
  overallProgress: number
  completedCourses: number
  totalCourses: number
  hoursSpent: number
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [messageInput, setMessageInput] = useState('')
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [learningTopics, setLearningTopics] = useState<LearningTopic[]>([])
  const [progress, setProgress] = useState<Progress>({
    overallProgress: 0,
    completedCourses: 0,
    totalCourses: 0,
    hoursSpent: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userId = localStorage.getItem('userId') // Get from auth context in a real app
    if (!userId) {
      // Redirect to login if not authenticated
      window.location.href = '/login'
      return
    }

    const fetchUserData = async () => {
      try {
        const [profile, userAchievements, topics, chatHistory] = await Promise.all([
          getUserProfile(userId),
          getUserAchievements(userId),
          getUserLearningTopics(userId),
          getChatHistory(userId)
        ])

        if (profile) {
          setUserProfile(profile)
        }

        setAchievements(userAchievements)
        setLearningTopics(topics)
        setChatMessages(chatHistory)

        // Calculate overall progress
        const completedTopics = topics.filter(topic => topic.progress === 100).length
        setProgress({
          overallProgress: topics.reduce((acc, topic) => acc + topic.progress, 0) / topics.length,
          completedCourses: completedTopics,
          totalCourses: topics.length,
          hoursSpent: Math.floor(Math.random() * 100) // This should come from actual tracking
        })

        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching user data:', error)
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && userProfile) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const result = reader.result as string
        const success = await updateUserProfile({
          id: userProfile.id,
          profilePhoto: result
        })

        if (success) {
          setUserProfile(prev => prev ? {
            ...prev,
            profilePhoto: result
          } : null)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !userProfile) return

    const userMessage = await saveChatMessage(
      userProfile.id,
      messageInput,
      true
    )

    if (userMessage) {
      setChatMessages(prev => [...prev, userMessage])
      setMessageInput('')

      // Simulate bot response
      setTimeout(async () => {
        const botMessage = await saveChatMessage(
          userProfile.id,
          "I'm here to help! How can I assist you with your learning journey?",
          false
        )
        if (botMessage) {
          setChatMessages(prev => [...prev, botMessage])
        }
      }, 1000)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white">Error loading profile</div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        {/* Animated Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[10%] top-[20%] w-[500px] h-[500px] bg-blue-500/30 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob" />
          <div className="absolute right-[10%] top-[30%] w-[500px] h-[500px] bg-primary-500/30 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-2000" />
          <div className="absolute left-[50%] bottom-[10%] w-[500px] h-[500px] bg-purple-500/30 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-4000" />
        </div>

        <div className="relative flex min-h-screen">
          {/* Sidebar */}
          <div className="w-64 bg-white/[0.05] backdrop-blur-lg border-r border-white/[0.1] p-6 flex flex-col">
            {/* Profile Photo */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                {userProfile.profilePhoto ? (
                  <img
                    src={userProfile.profilePhoto}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-primary-500/50"
                  />
                ) : (
                  <UserCircleIcon className="w-24 h-24 text-gray-400" />
                )}
                <label className="absolute bottom-0 right-0 bg-primary-500/20 p-2 rounded-full cursor-pointer border border-primary-500/50 hover:bg-primary-500/30 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <UserCircleIcon className="w-4 h-4 text-primary-400" />
                </label>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white">
                {userProfile.firstName} {userProfile.lastName}
              </h2>
              <p className="text-gray-400">@{userProfile.username}</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center px-4 py-3 rounded-xl mb-2 ${
                  activeTab === 'dashboard'
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                    : 'text-gray-400 hover:bg-white/5'
                } transition-all`}
              >
                <ChartBarIcon className="w-5 h-5 mr-3" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('learning')}
                className={`w-full flex items-center px-4 py-3 rounded-xl mb-2 ${
                  activeTab === 'learning'
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                    : 'text-gray-400 hover:bg-white/5'
                } transition-all`}
              >
                <BookOpenIcon className="w-5 h-5 mr-3" />
                Your Learning
              </button>
              <button
                onClick={() => setActiveTab('achievements')}
                className={`w-full flex items-center px-4 py-3 rounded-xl mb-2 ${
                  activeTab === 'achievements'
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                    : 'text-gray-400 hover:bg-white/5'
                } transition-all`}
              >
                <TrophyIcon className="w-5 h-5 mr-3" />
                Achievements
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`w-full flex items-center px-4 py-3 rounded-xl mb-2 ${
                  activeTab === 'progress'
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                    : 'text-gray-400 hover:bg-white/5'
                } transition-all`}
              >
                <ChartBarIcon className="w-5 h-5 mr-3" />
                Progress
              </button>
            </nav>

            {/* Logout Button */}
            <button className="flex items-center px-4 py-3 text-gray-400 hover:bg-white/5 rounded-xl transition-all">
              <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {/* Progress Overview */}
                  <div className="col-span-full bg-white/[0.05] backdrop-blur-lg rounded-xl p-6 border border-white/[0.1]">
                    <h3 className="text-xl font-semibold text-white mb-4">Progress Overview</h3>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-primary-400">{progress.overallProgress}%</p>
                        <p className="text-gray-400">Overall Progress</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-primary-400">{progress.completedCourses}</p>
                        <p className="text-gray-400">Completed Courses</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-primary-400">{progress.hoursSpent}</p>
                        <p className="text-gray-400">Hours Spent</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Learning */}
                  <div className="bg-white/[0.05] backdrop-blur-lg rounded-xl p-6 border border-white/[0.1]">
                    <h3 className="text-xl font-semibold text-white mb-4">Recent Learning</h3>
                    <div className="space-y-4">
                      {learningTopics.map(topic => (
                        <div key={topic.id} className="flex items-center">
                          <BookOpenIcon className="w-8 h-8 text-primary-400 mr-3" />
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{topic.title}</h4>
                            <div className="mt-1 h-2 bg-white/10 rounded-full">
                              <div
                                className="h-full bg-primary-500 rounded-full"
                                style={{ width: `${topic.progress}%` }}
                              />
                            </div>
                          </div>
                          <span className="ml-4 text-gray-400">{topic.progress}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Achievements */}
                  <div className="bg-white/[0.05] backdrop-blur-lg rounded-xl p-6 border border-white/[0.1]">
                    <h3 className="text-xl font-semibold text-white mb-4">Recent Achievements</h3>
                    <div className="space-y-4">
                      {achievements.map(achievement => (
                        <div key={achievement.id} className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center border border-primary-500/50">
                            <span className="text-xl">{achievement.icon}</span>
                          </div>
                          <div className="ml-3">
                            <h4 className="text-white font-medium">{achievement.title}</h4>
                            <p className="text-sm text-gray-400">{achievement.description}</p>
                            <p className="text-xs text-gray-500 mt-1">{new Date(achievement.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'learning' && (
                <motion.div
                  key="learning"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {learningTopics.map(topic => (
                    <div
                      key={topic.id}
                      className="bg-white/[0.05] backdrop-blur-lg rounded-xl p-6 border border-white/[0.1]"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white">{topic.title}</h3>
                        <span className="text-gray-400">Last accessed: {new Date(topic.lastAccessed).toLocaleDateString()}</span>
                      </div>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary-500/20 text-primary-400">
                              Progress
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-primary-400">
                              {topic.progress}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-white/10">
                          <div
                            style={{ width: `${topic.progress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'achievements' && (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {achievements.map(achievement => (
                    <div
                      key={achievement.id}
                      className="bg-white/[0.05] backdrop-blur-lg rounded-xl p-6 border border-white/[0.1]"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center border border-primary-500/50">
                          <span className="text-2xl">{achievement.icon}</span>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-semibold text-white">{achievement.title}</h3>
                          <p className="text-gray-400">{achievement.description}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">Achieved on {new Date(achievement.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'progress' && (
                <motion.div
                  key="progress"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white/[0.05] backdrop-blur-lg rounded-xl p-6 border border-white/[0.1]">
                    <h3 className="text-xl font-semibold text-white mb-6">Overall Progress</h3>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary-500/20 text-primary-400">
                            Course Completion
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-primary-400">
                            {progress.overallProgress}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-white/10">
                        <div
                          style={{ width: `${progress.overallProgress}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-white/[0.05] rounded-xl p-4 border border-white/[0.1]">
                        <p className="text-gray-400">Completed Courses</p>
                        <p className="text-2xl font-bold text-white mt-2">
                          {progress.completedCourses} / {progress.totalCourses}
                        </p>
                      </div>
                      <div className="bg-white/[0.05] rounded-xl p-4 border border-white/[0.1]">
                        <p className="text-gray-400">Hours Spent</p>
                        <p className="text-2xl font-bold text-white mt-2">
                          {progress.hoursSpent}
                        </p>
                      </div>
                      <div className="bg-white/[0.05] rounded-xl p-4 border border-white/[0.1]">
                        <p className="text-gray-400">Active Days</p>
                        <p className="text-2xl font-bold text-white mt-2">15</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Chatbot */}
          <div className="fixed bottom-6 right-6 z-50">
            {!isChatOpen && (
              <button
                onClick={() => setIsChatOpen(true)}
                className="bg-primary-500/20 p-4 rounded-full border border-primary-500/50 hover:bg-primary-500/30 transition-all"
              >
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-primary-400" />
              </button>
            )}

            {isChatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-96 h-[500px] bg-white/[0.05] backdrop-blur-lg rounded-xl border border-white/[0.1] flex flex-col"
              >
                <div className="p-4 border-b border-white/[0.1] flex items-center justify-between">
                  <h3 className="text-white font-semibold">Learning Assistant</h3>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {chatMessages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-xl ${
                          message.isUser
                            ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                            : 'bg-white/[0.05] text-white border border-white/[0.1]'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-white/[0.1]">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 outline-none"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-primary-500/20 p-2 rounded-xl border border-primary-500/50 hover:bg-primary-500/30 transition-all"
                    >
                      <PaperAirplaneIcon className="w-5 h-5 text-primary-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  )
} 