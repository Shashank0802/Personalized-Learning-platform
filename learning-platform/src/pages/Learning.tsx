import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  BookOpenIcon,
  AcademicCapIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  BeakerIcon,
  CodeBracketIcon,
  CloudIcon,
  CpuChipIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

const categories = ["All", "Programming", "Data Science", "Web Development", "AI/ML", "Cloud Computing"]

const learningResources = [
  {
    icon: CodeBracketIcon,
    title: "Programming Languages",
    description: "Learn various programming languages and frameworks",
    link: "/programming-languages",
    category: "Programming"
  },
  {
    icon: BeakerIcon,
    title: "Data Science",
    description: "Master data analysis and visualization techniques",
    link: "/data-science",
    category: "Data Science"
  },
  {
    icon: GlobeAltIcon,
    title: "Web Development",
    description: "Build modern and responsive web applications",
    link: "/web-development",
    category: "Web Development"
  },
  {
    icon: CpuChipIcon,
    title: "Artificial Intelligence",
    description: "Explore machine learning and AI concepts",
    link: "/ai-ml",
    category: "AI/ML"
  },
  {
    icon: CloudIcon,
    title: "Cloud Computing",
    description: "Learn cloud platforms and services",
    link: "/cloud",
    category: "Cloud Computing"
  },
  {
    icon: ChartBarIcon,
    title: "Progress Tracking",
    description: "Monitor your learning journey and achievements",
    link: "/progress",
    category: "Programming"
  }
]

export default function Learning() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredResources = learningResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[20%] w-[500px] h-[500px] bg-blue-500/30 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob" />
        <div className="absolute right-[10%] top-[30%] w-[500px] h-[500px] bg-primary-500/30 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute left-[50%] bottom-[10%] w-[500px] h-[500px] bg-purple-500/30 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-4000" />
      </div>

      <div className="relative min-h-screen flex flex-col py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex-grow container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-primary-200 to-white bg-clip-text text-transparent">
                Learning Resources
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Access your personalized learning materials and track your progress
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <div className="mb-12 space-y-4">
            <div className="relative max-w-xl mx-auto">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-xl text-white rounded-xl border border-white/10 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              />
            </div>
            <div className="flex justify-center flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                      : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white/[0.05] backdrop-blur-lg rounded-xl p-6 border border-white/[0.1] hover:border-primary-500/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <resource.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-400 mb-6">{resource.description}</p>
                  <Link
                    to={resource.link}
                    className="inline-flex items-center px-4 py-2 bg-primary-500/20 text-primary-400 rounded-xl border border-primary-500/50 hover:bg-primary-500/30 transition-all duration-300"
                  >
                    Explore
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
} 