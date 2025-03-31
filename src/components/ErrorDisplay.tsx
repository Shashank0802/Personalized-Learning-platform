import React from 'react';
import { VercelError } from '../utils/vercel-errors';

interface ErrorDisplayProps {
  error: VercelError;
  onRetry?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  const getErrorColor = (statusCode: number) => {
    if (statusCode >= 500) return 'bg-red-50 text-red-700 border-red-200';
    if (statusCode >= 400) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    return 'bg-blue-50 text-blue-700 border-blue-200';
  };

  return (
    <div className={`p-4 rounded-lg border ${getErrorColor(error.statusCode)}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {error.statusCode >= 500 ? (
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          ) : error.statusCode >= 400 ? (
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium">
            {error.message}
          </h3>
          <div className="mt-2 text-sm">
            <p>Error Code: {error.code}</p>
            <p>Category: {error.category}</p>
            <p>Status Code: {error.statusCode}</p>
          </div>
        </div>
      </div>
      {onRetry && (
        <div className="mt-4">
          <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}; 