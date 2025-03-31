import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function TopicContent() {
  const { topicId } = useParams();

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Topic Content
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4">
            Explore detailed content and resources for this topic
          </p>
        </div>

        <div className="mt-12">
          {/* Topic Overview */}
          <div className="bg-white/10 backdrop-blur-xl rounded-lg p-6 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Topic Overview</h2>
            <p className="text-gray-300">
              This section provides a comprehensive overview of the topic, including key concepts,
              learning objectives, and prerequisites.
            </p>
          </div>

          {/* Learning Materials */}
          <div className="bg-white/10 backdrop-blur-xl rounded-lg p-6 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Learning Materials</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <h3 className="text-lg font-medium text-white">Introduction</h3>
                  <p className="text-gray-300">Basic concepts and fundamentals</p>
                </div>
                <Link
                  to={`/topic/${topicId}/lesson/1`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  Start Learning
                </Link>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <h3 className="text-lg font-medium text-white">Advanced Concepts</h3>
                  <p className="text-gray-300">Deep dive into complex topics</p>
                </div>
                <Link
                  to={`/topic/${topicId}/lesson/2`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  Start Learning
                </Link>
              </div>
            </div>
          </div>

          {/* Practice Exercises */}
          <div className="bg-white/10 backdrop-blur-xl rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Practice Exercises</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <h3 className="text-lg font-medium text-white">Basic Exercises</h3>
                  <p className="text-gray-300">Practice fundamental concepts</p>
                </div>
                <Link
                  to={`/topic/${topicId}/exercise/1`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  Start Practice
                </Link>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <h3 className="text-lg font-medium text-white">Advanced Challenges</h3>
                  <p className="text-gray-300">Test your knowledge with complex problems</p>
                </div>
                <Link
                  to={`/topic/${topicId}/exercise/2`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  Start Practice
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 