import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Exercise() {
  const { topicId, exerciseId } = useParams();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    // Here you would typically send the code to a backend for evaluation
    // For now, we'll just simulate a response
    setOutput('Test output: Your code has been submitted successfully!');
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Exercise Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Exercise {exerciseId}
          </h1>
          <p className="mt-3 text-xl text-gray-300">
            Practice what you've learned
          </p>
        </div>

        {/* Exercise Content */}
        <div className="space-y-8">
          {/* Problem Description */}
          <div className="bg-white/10 backdrop-blur-xl rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Problem Description</h2>
            <div className="prose prose-invert max-w-none">
              <p>
                Write a function that solves the following problem:
              </p>
              <div className="bg-gray-800 rounded-lg p-4 my-4">
                <p className="text-gray-200">
                  Create a function that takes a string as input and returns the number of vowels
                  in the string. The function should handle both uppercase and lowercase vowels.
                </p>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="bg-white/10 backdrop-blur-xl rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Your Solution</h2>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 bg-gray-800 text-white p-4 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Write your code here..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Submit Solution
            </button>
          </div>

          {/* Output */}
          {isSubmitted && (
            <div className="bg-white/10 backdrop-blur-xl rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">Output</h2>
              <div className="bg-gray-800 rounded-lg p-4">
                <pre className="text-gray-200 whitespace-pre-wrap">{output}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Link
            to={`/topic/${topicId}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600"
          >
            Back to Topic
          </Link>
          <Link
            to={`/topic/${topicId}/exercise/${Number(exerciseId) + 1}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Next Exercise
          </Link>
        </div>
      </div>
    </div>
  );
} 