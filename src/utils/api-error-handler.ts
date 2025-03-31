import { NextApiRequest, NextApiResponse } from 'next';
import { getVercelError, isVercelError } from './vercel-errors';

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    statusCode: number;
    category: string;
  };
}

export function withErrorHandler(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error: any) {
      // Check if it's a Vercel error
      const vercelErrorCode = error.code || error.message;
      
      if (isVercelError(vercelErrorCode)) {
        const vercelError = getVercelError(vercelErrorCode);
        return res.status(vercelError.statusCode).json({
          error: {
            code: vercelError.code,
            message: vercelError.message,
            statusCode: vercelError.statusCode,
            category: vercelError.category
          }
        });
      }

      // Handle other types of errors
      console.error('API Error:', error);
      return res.status(500).json({
        error: {
          code: 'INTERNAL_UNEXPECTED_ERROR',
          message: 'An unexpected error occurred',
          statusCode: 500,
          category: 'Internal'
        }
      });
    }
  };
}

// Example usage:
/*
export default withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  // Your API route logic here
  throw new Error('FUNCTION_INVOCATION_FAILED');
});
*/ 