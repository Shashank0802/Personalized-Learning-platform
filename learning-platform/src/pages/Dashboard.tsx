import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Welcome back, {user?.firstName || 'there'}!
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4">
            Your personalized learning dashboard
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Learning Progress Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-lg p-6 border border-white/20">
            <h3 className="text-lg font-medium text-white">Learning Progress</h3>
            <p className="mt-2 text-gray-300">Track your learning journey and achievements</p>
            <div className="mt-6">
              <Link
                to="/learning"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                View Progress
              </Link>
            </div>
          </div>

          {/* Job Opportunities Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-lg p-6 border border-white/20">
            <h3 className="text-lg font-medium text-white">Job Opportunities</h3>
            <p className="mt-2 text-gray-300">Find jobs and internships that match your skills</p>
            <div className="mt-6">
              <Link
                to="/jobs"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Browse Jobs
              </Link>
            </div>
          </div>

          {/* Competitions Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-lg p-6 border border-white/20">
            <h3 className="text-lg font-medium text-white">Competitions</h3>
            <p className="mt-2 text-gray-300">Participate in coding competitions and hackathons</p>
            <div className="mt-6">
              <Link
                to="/competitions"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                View Competitions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 