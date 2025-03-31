import { NextPage } from 'next';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { getVercelError } from '../utils/vercel-errors';

interface ErrorProps {
  statusCode?: number;
  errorCode?: string;
}

const Error: NextPage<ErrorProps> = ({ statusCode, errorCode }) => {
  const error = errorCode ? getVercelError(errorCode) : {
    code: 'UNKNOWN_ERROR',
    statusCode: statusCode || 500,
    category: 'Internal',
    message: 'An unexpected error occurred'
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
        </div>
      </div>
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const errorCode = err?.code || res?.headers?.['x-vercel-error'];
  
  return { statusCode, errorCode };
};

export default Error; 