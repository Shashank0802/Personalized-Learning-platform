import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Learning from './pages/Learning'
import ProgrammingLanguages from './pages/ProgrammingLanguages'
import TopicContent from './pages/TopicContent'
import Opportunities from './pages/Opportunities'
import Competitions from './pages/Competitions'
import JobsInternships from './pages/JobsInternships'
import SignUp from './pages/SignUp'
import Landing from './pages/Landing'
import Jobs from './pages/Jobs'
import ResumeBuilder from './pages/ResumeBuilder'
import Mentorship from './pages/Mentorship'
import Blogs from './pages/Blogs'
import Welcome from './pages/Welcome'
import Interests from './pages/Interests'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import {
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon,
  SparklesIcon,
  ArrowRightIcon,
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  ChartBarSquareIcon,
  UserPlusIcon,
  HeartIcon,
  AcademicCapIcon as GraduationCapIcon,
  ChartBarIcon as ProgressIcon,
  ArrowRightIcon as ArrowRightIconSolid,
  ShareIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  Bars3Icon,
  TrophyIcon,
  BriefcaseIcon,
  InformationCircleIcon,
  XMarkIcon,
  UserIcon,
  StarIcon,
  HomeIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'
import { Toaster } from 'react-hot-toast'

// Data arrays
const features = [
  {
    icon: RocketLaunchIcon,
    title: "All-in-One Learning Hub",
    description: "Access courses, notes, and resources in one place. Everything you need to learn effectively."
  },
  {
    icon: SparklesIcon,
    title: "AI-Powered Personalized Learning",
    description: "Get smart recommendations tailored to your learning style and goals."
  },
  {
    icon: ChartBarSquareIcon,
    title: "Interactive Quizzes & Progress Tracking",
    description: "Learn efficiently with interactive quizzes and track your progress in real-time."
  }
]

const steps = [
  {
    title: "Sign Up",
    description: "Create your account in minutes and join our learning community"
  },
  {
    title: "Choose Interests",
    description: "Select topics you want to learn and set your learning goals"
  },
  {
    title: "Get Personalized Paths",
    description: "AI suggests the best resources and learning paths for you"
  }
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Computer Science Student",
    content: "The AI-powered recommendations are spot-on! I'm learning faster than ever."
  },
  {
    name: "Michael Rodriguez",
    role: "Business Student",
    content: "The personalized learning paths made all the difference in my studies."
  },
  {
    name: "Emma Thompson",
    role: "Engineering Student",
    content: "Best learning platform I've used. The progress tracking is amazing!"
  }
]

const navigation = [
  { name: 'Home', href: '/', icon: AcademicCapIcon },
  { name: 'Learning', href: '/learning', icon: AcademicCapIcon },
  { name: 'Jobs', href: '/jobs', icon: BriefcaseIcon },
  { name: 'Competitions', href: '/competitions', icon: TrophyIcon },
  { name: 'Resume Builder', href: '/resume-builder', icon: DocumentTextIcon },
  { name: 'Mentorship', href: '/mentorship', icon: UserGroupIcon },
  { name: 'Blogs', href: '/blogs', icon: BookOpenIcon },
]

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'

  if (isAuthPage) {
    return null; // Don't show navbar on auth pages
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <AcademicCapIcon className="w-8 h-8 text-primary-500" />
            <span className="text-xl font-bold text-white">LearnPro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-primary-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            <Link
              to="/signup"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.href
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            <Link
              to="/signup"
              className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-900">
        <Toaster position="top-right" />
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/programming-languages" element={<ProgrammingLanguages />} />
            <Route path="/topic/:topicId" element={<TopicContent />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/competitions" element={<Competitions />} />
            <Route path="/jobs-internships" element={<JobsInternships />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/interests" element={<Interests />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/blogs" element={<Blogs />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App