import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Navbar from '../components/Navbar'

const courses = [
  'B.Tech',
  'M.Tech',
  'MCA',
  'BCA',
  'MBA',
  'B.Sc',
  'M.Sc',
  'Other'
]

interface FormData {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  course: string
  tenthMarks: string
  twelfthMarks: string
  currentCGPA: string
  achievements: string
  certifications: string
}

interface FormErrors {
  [key: string]: string
}

export default function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    course: '',
    tenthMarks: '',
    twelfthMarks: '',
    currentCGPA: '',
    achievements: '',
    certifications: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: FormErrors = {}

    // Required field validation
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.course) newErrors.course = 'Course selection is required'

    // Phone number validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits'
    }

    // Email format validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    // Marks validation
    if (formData.tenthMarks && (Number(formData.tenthMarks) < 0 || Number(formData.tenthMarks) > 100)) {
      newErrors.tenthMarks = 'Marks must be between 0 and 100'
    }
    if (formData.twelfthMarks && (Number(formData.twelfthMarks) < 0 || Number(formData.twelfthMarks) > 100)) {
      newErrors.twelfthMarks = 'Marks must be between 0 and 100'
    }

    // CGPA validation
    if (formData.currentCGPA && (Number(formData.currentCGPA) < 0 || Number(formData.currentCGPA) > 10)) {
      newErrors.currentCGPA = 'CGPA must be between 0 and 10'
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const newErrors = validateForm()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setShowSuccess(true)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } catch (error) {
        console.error('Submission error:', error)
      }
    }
    
    setIsSubmitting(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
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

        <div className="relative min-h-screen flex flex-col py-12 px-4 sm:px-6 lg:px-8">
          <div className="absolute top-6 left-6">
            <Link
              to="/"
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="h-6 w-6 mr-2" />
              Back to Home
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-white via-primary-200 to-white bg-clip-text text-transparent">
                  Create an Account
                </span>
              </h2>
              <p className="mt-2 text-gray-400">
                Join our community and start learning today
              </p>
            </div>

            <div className="bg-white/[0.05] backdrop-blur-lg rounded-xl p-8 border border-white/[0.1]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full px-4 py-3 bg-white/10 border ${errors.firstName ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-400 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full px-4 py-3 bg-white/10 border ${errors.lastName ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-400 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full px-4 py-3 bg-white/10 border ${errors.phoneNumber ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-400 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all`}
                      placeholder="Enter 10-digit phone number"
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full px-4 py-3 bg-white/10 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-400 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Course Selection */}
                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-300">
                      Course <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="course"
                      name="course"
                      required
                      value={formData.course}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full px-4 py-3 bg-white/10 border ${errors.course ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-400 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all`}
                    >
                      <option value="" className="bg-gray-900">Select a course</option>
                      {courses.map(course => (
                        <option key={course} value={course} className="bg-gray-900">
                          {course}
                        </option>
                      ))}
                    </select>
                    {errors.course && (
                      <p className="mt-1 text-sm text-red-500">{errors.course}</p>
                    )}
                  </div>

                  {/* 10th Marks */}
                  <div>
                    <label htmlFor="tenthMarks" className="block text-sm font-medium text-gray-300">
                      10th Marks (%)
                    </label>
                    <input
                      id="tenthMarks"
                      name="tenthMarks"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={formData.tenthMarks}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full px-4 py-3 bg-white/10 border ${errors.tenthMarks ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-400 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all`}
                      placeholder="Enter your 10th marks percentage"
                    />
                    {errors.tenthMarks && (
                      <p className="mt-1 text-sm text-red-500">{errors.tenthMarks}</p>
                    )}
                  </div>

                  {/* 12th Marks */}
                  <div>
                    <label htmlFor="twelfthMarks" className="block text-sm font-medium text-gray-300">
                      12th Marks (%)
                    </label>
                    <input
                      id="twelfthMarks"
                      name="twelfthMarks"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={formData.twelfthMarks}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full px-4 py-3 bg-white/10 border ${errors.twelfthMarks ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-400 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all`}
                      placeholder="Enter your 12th marks percentage"
                    />
                    {errors.twelfthMarks && (
                      <p className="mt-1 text-sm text-red-500">{errors.twelfthMarks}</p>
                    )}
                  </div>

                  {/* Current CGPA */}
                  <div>
                    <label htmlFor="currentCGPA" className="block text-sm font-medium text-gray-300">
                      Current CPI/CGPA
                    </label>
                    <input
                      id="currentCGPA"
                      name="currentCGPA"
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={formData.currentCGPA}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full px-4 py-3 bg-white/10 border ${errors.currentCGPA ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-400 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all`}
                      placeholder="Enter your current CGPA"
                    />
                    {errors.currentCGPA && (
                      <p className="mt-1 text-sm text-red-500">{errors.currentCGPA}</p>
                    )}
                  </div>
                </div>

                {/* Previous Achievements */}
                <div>
                  <label htmlFor="achievements" className="block text-sm font-medium text-gray-300">
                    Previous Achievements
                  </label>
                  <textarea
                    id="achievements"
                    name="achievements"
                    rows={3}
                    value={formData.achievements}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
                    placeholder="List your previous achievements (if any)"
                  />
                </div>

                {/* Certifications */}
                <div>
                  <label htmlFor="certifications" className="block text-sm font-medium text-gray-300">
                    Certifications
                  </label>
                  <textarea
                    id="certifications"
                    name="certifications"
                    rows={3}
                    value={formData.certifications}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
                    placeholder="List your certifications (if any)"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 bg-primary-500/20 text-primary-400 rounded-xl border border-primary-500/50 hover:bg-primary-500/30 transition-all duration-300 font-medium ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Sign Up'}
                </button>
              </form>

              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-center"
                >
                  Registration successful! Redirecting...
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
} 