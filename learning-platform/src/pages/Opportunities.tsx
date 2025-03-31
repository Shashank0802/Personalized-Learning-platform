import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrophyIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  BriefcaseIcon,
  ClockIcon,
  CurrencyDollarIcon,
  LinkIcon,
  ChartBarIcon,
  CodeBracketIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

// Dummy data for competitions
const competitions = [
  {
    id: 1,
    name: "HackTheCode 2025",
    date: "April 10, 2025",
    organizer: "XYZ Tech",
    difficulty: "Intermediate",
    registrationLink: "https://hackthecode.xyz",
    prize: "$10,000",
    techStack: ["React", "Node.js", "MongoDB", "AWS"],
    type: "Hackathon"
  },
  {
    id: 2,
    name: "AI Innovation Challenge",
    date: "May 5, 2025",
    organizer: "ABC Labs",
    difficulty: "Advanced",
    registrationLink: "https://ai-challenge.abc",
    prize: "$5,000",
    techStack: ["Python", "TensorFlow", "PyTorch", "AWS"],
    type: "Competition"
  },
  {
    id: 3,
    name: "Data Science Quiz",
    date: "March 30, 2025",
    organizer: "CodeSphere",
    difficulty: "Beginner",
    registrationLink: "https://datascience.quiz",
    prize: "$1,000",
    techStack: ["Python", "Pandas", "NumPy", "Scikit-learn"],
    type: "Quiz"
  }
];

// Dummy data for jobs/internships
const opportunities = [
  {
    id: 1,
    company: "Google",
    title: "Software Engineer Intern",
    location: "Remote",
    skills: ["Python", "Machine Learning", "React.js", "Cloud Computing"],
    deadline: "April 20, 2025",
    stipend: "$8,000/month",
    type: "Internship"
  },
  {
    id: 2,
    company: "Microsoft",
    title: "Data Analyst",
    location: "Onsite",
    skills: ["SQL", "PowerBI", "Python", "Data Visualization"],
    deadline: "April 30, 2025",
    stipend: "$120,000/year",
    type: "Full-time"
  },
  {
    id: 3,
    company: "StartupX",
    title: "Full Stack Developer",
    location: "Hybrid",
    skills: ["JavaScript", "Node.js", "AWS", "React"],
    deadline: "March 28, 2025",
    stipend: "$90,000/year",
    type: "Full-time"
  }
];

function Opportunities() {
  const [activeTab, setActiveTab] = useState('competitions');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Opportunities
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Discover coding competitions, hackathons, and career opportunities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setActiveTab('competitions')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === 'competitions'
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <TrophyIcon className="w-5 h-5 inline-block mr-2" />
            Competitions
          </button>
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === 'opportunities'
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BriefcaseIcon className="w-5 h-5 inline-block mr-2" />
            Jobs & Internships
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeTab === 'competitions' ? (
            competitions.map((competition) => (
              <motion.div
                key={competition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium">
                    {competition.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    competition.difficulty === 'Beginner' ? 'bg-green-100 text-green-600' :
                    competition.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {competition.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{competition.name}</h3>
                <div className="space-y-2 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    {competition.date}
                  </div>
                  <div className="flex items-center">
                    <BuildingOfficeIcon className="w-5 h-5 mr-2" />
                    {competition.organizer}
                  </div>
                  {competition.prize && (
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="w-5 h-5 mr-2" />
                      Prize: {competition.prize}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {competition.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={competition.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Register Now
                </a>
              </motion.div>
            ))
          ) : (
            opportunities.map((opportunity) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium">
                    {opportunity.type}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                    {opportunity.location}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{opportunity.title}</h3>
                <div className="text-gray-600 mb-4">{opportunity.company}</div>
                <div className="space-y-2 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    Deadline: {opportunity.deadline}
                  </div>
                  {opportunity.stipend && (
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="w-5 h-5 mr-2" />
                      {opportunity.stipend}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Skills Required:</h4>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="block w-full text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Apply Now
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Opportunities; 