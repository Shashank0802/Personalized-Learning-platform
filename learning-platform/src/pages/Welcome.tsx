import { Link } from 'react-router-dom'

interface WelcomeProps {
  firstName?: string
}

export default function Welcome({ firstName = 'there' }: WelcomeProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Welcome, {firstName}!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Let's get started with your learning journey.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <Link
            to="/interests"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Choose Your Interests
          </Link>
          <Link
            to="/dashboard"
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-700 text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
} 