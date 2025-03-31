import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Lesson() {
  const { topicId, lessonId } = useParams();

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Lesson Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Lesson {lessonId}
          </h1>
          <p className="mt-3 text-xl text-gray-300">
            Understanding the fundamentals
          </p>
        </div>

        {/* Lesson Content */}
        <div className="bg-white/10 backdrop-blur-xl rounded-lg p-6 border border-white/20 mb-8">
          <div className="prose prose-invert max-w-none">
            <h2>Introduction</h2>
            <p>
              Welcome to this lesson. Here you'll learn about the key concepts and principles
              that form the foundation of this topic.
            </p>

            <h2>Key Concepts</h2>
            <ul>
              <li>First key concept</li>
              <li>Second key concept</li>
              <li>Third key concept</li>
            </ul>

            <h2>Examples</h2>
            <p>
              Let's look at some practical examples to better understand these concepts.
            </p>

            <div className="bg-gray-800 rounded-lg p-4 my-4">
              <pre className="text-sm text-gray-200">
                <code>
                  {`// Example code here
function example() {
  console.log("Hello, World!");
}`}
                </code>
              </pre>
            </div>

            <h2>Practice</h2>
            <p>
              Now it's time to practice what you've learned. Try solving the following
              exercises to reinforce your understanding.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link
            to={`/topic/${topicId}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600"
          >
            Back to Topic
          </Link>
          <Link
            to={`/topic/${topicId}/lesson/${Number(lessonId) + 1}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Next Lesson
          </Link>
        </div>
      </div>
    </div>
  );
} 