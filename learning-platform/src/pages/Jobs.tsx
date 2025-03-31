import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  AdjustmentsHorizontalIcon,
  ArrowsUpDownIcon,
} from '@heroicons/react/24/outline'

const jobTypes = ["All", "Full-time", "Part-time", "Internship", "Contract"]
const locations = ["All", "Remote", "Onsite", "Hybrid"]

const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Tech Company Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    workType: "Hybrid",
    salary: "$120,000/year",
    description: "Join our team of talented engineers and work on cutting-edge projects.",
    deadline: "2024-04-15",
    skills: ["React", "Node.js", "TypeScript"]
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "AI Solutions",
    location: "Remote",
    type: "Full-time",
    workType: "Remote",
    salary: "$130,000/year",
    description: "Work on machine learning models and data analysis projects.",
    deadline: "2024-04-20",
    skills: ["Python", "Machine Learning", "SQL"]
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "Web Tech",
    location: "New York, NY",
    type: "Full-time",
    workType: "Onsite",
    salary: "$110,000/year",
    description: "Create beautiful and responsive web applications using modern frameworks.",
    deadline: "2024-04-10",
    skills: ["React", "JavaScript", "CSS"]
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "Cloud Systems",
    location: "Remote",
    type: "Contract",
    workType: "Remote",
    salary: "$100/hour",
    description: "Manage and improve our cloud infrastructure and deployment processes.",
    deadline: "2024-04-25",
    skills: ["AWS", "Docker", "Kubernetes"]
  }
]

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const [sortBy, setSortBy] = useState("deadline") // deadline, salary

  const filteredJobs = jobs
    .filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesType = selectedType === "All" || job.type === selectedType
      const matchesLocation = selectedLocation === "All" || job.workType === selectedLocation
      return matchesSearch && matchesType && matchesLocation
    })
    .sort((a, b) => {
      if (sortBy === "deadline") {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      }
      return 0
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
                Job Opportunities
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Find the perfect job or internship that matches your skills and interests
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <div className="mb-12 space-y-4">
            <div className="relative max-w-xl mx-auto">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs by title, company, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-xl text-white rounded-xl border border-white/10 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              />
            </div>
            <div className="flex justify-center flex-wrap gap-2">
              {jobTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedType === type
                      ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                      : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="flex justify-center flex-wrap gap-2">
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => setSelectedLocation(location)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedLocation === location
                      ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                      : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {location}
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
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white/[0.05] backdrop-blur-lg rounded-xl p-6 border border-white/[0.1] hover:border-primary-500/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BriefcaseIcon className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-gray-400 mb-6">{job.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-400">
                      <BuildingOfficeIcon className="w-5 h-5 mr-2" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <MapPinIcon className="w-5 h-5 mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <CurrencyDollarIcon className="w-5 h-5 mr-2" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <ClockIcon className="w-5 h-5 mr-2" />
                      <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-white/5 text-gray-400 rounded-xl text-sm border border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/jobs-internships"
                    className="inline-flex items-center px-4 py-2 bg-primary-500/20 text-primary-400 rounded-xl border border-primary-500/50 hover:bg-primary-500/30 transition-all duration-300"
                  >
                    Apply Now
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