import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BriefcaseIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  CodeBracketIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline'

const jobs = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "TechCorp International",
    location: "San Francisco, CA",
    type: "Internship",
    duration: "Summer 2024",
    stipend: "$8,000/month",
    skills: ["React", "Node.js", "TypeScript"],
    description: "Join our engineering team to build scalable web applications and gain hands-on experience.",
    applyLink: "https://example.com/techcorp-internship"
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "WebDev Solutions",
    location: "Remote",
    type: "Full-time",
    duration: "Immediate",
    stipend: "$120,000/year",
    skills: ["Python", "Django", "AWS"],
    description: "Looking for an experienced developer to join our growing team and build innovative solutions.",
    applyLink: "https://example.com/webdev-job"
  },
  {
    id: 3,
    title: "Data Science Intern",
    company: "DataScience Institute",
    location: "New York, NY",
    type: "Internship",
    duration: "Summer 2024",
    stipend: "$7,500/month",
    skills: ["Python", "Machine Learning", "SQL"],
    description: "Work on cutting-edge data science projects and learn from industry experts.",
    applyLink: "https://example.com/datascience-internship"
  }
]

const jobTypes = ["All", "Internship", "Full-time", "Part-time"]

export default function JobsInternships() {
  const [selectedType, setSelectedType] = useState("All")

  const filteredJobs = selectedType === "All"
    ? jobs
    : jobs.filter(job => job.type === selectedType)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Jobs & Internships
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Find exciting career opportunities and internships from top tech companies.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg ${
                selectedType === type
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                    {job.type}
                  </span>
                  <span className="text-gray-600 font-medium">{job.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-4">{job.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <BuildingOfficeIcon className="w-5 h-5 mr-2" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <CurrencyDollarIcon className="w-5 h-5 mr-2" />
                    <span>{job.stipend}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <CodeBracketIcon className="w-5 h-5 mr-2" />
                    <span>{job.skills.join(", ")}</span>
                  </div>
                </div>

                <motion.a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Apply Now
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 