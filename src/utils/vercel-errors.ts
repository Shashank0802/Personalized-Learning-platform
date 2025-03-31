export interface VercelError {
  code: string;
  statusCode: number;
  category: 'Function' | 'Deployment' | 'Runtime' | 'DNS' | 'Routing' | 'Request' | 'Image' | 'Cache' | 'Internal';
  message: string;
}

export const vercelErrors: Record<string, VercelError> = {
  // Function Errors
  BODY_NOT_A_STRING_FROM_FUNCTION: {
    code: 'BODY_NOT_A_STRING_FROM_FUNCTION',
    statusCode: 502,
    category: 'Function',
    message: 'The function response body is not a valid string'
  },
  MIDDLEWARE_INVOCATION_FAILED: {
    code: 'MIDDLEWARE_INVOCATION_FAILED',
    statusCode: 500,
    category: 'Function',
    message: 'Middleware function invocation failed'
  },
  MIDDLEWARE_INVOCATION_TIMEOUT: {
    code: 'MIDDLEWARE_INVOCATION_TIMEOUT',
    statusCode: 504,
    category: 'Function',
    message: 'Middleware function invocation timed out'
  },
  EDGE_FUNCTION_INVOCATION_FAILED: {
    code: 'EDGE_FUNCTION_INVOCATION_FAILED',
    statusCode: 500,
    category: 'Function',
    message: 'Edge function invocation failed'
  },
  EDGE_FUNCTION_INVOCATION_TIMEOUT: {
    code: 'EDGE_FUNCTION_INVOCATION_TIMEOUT',
    statusCode: 504,
    category: 'Function',
    message: 'Edge function invocation timed out'
  },
  FUNCTION_INVOCATION_FAILED: {
    code: 'FUNCTION_INVOCATION_FAILED',
    statusCode: 500,
    category: 'Function',
    message: 'Function invocation failed'
  },
  FUNCTION_INVOCATION_TIMEOUT: {
    code: 'FUNCTION_INVOCATION_TIMEOUT',
    statusCode: 504,
    category: 'Function',
    message: 'Function invocation timed out'
  },
  FUNCTION_PAYLOAD_TOO_LARGE: {
    code: 'FUNCTION_PAYLOAD_TOO_LARGE',
    statusCode: 413,
    category: 'Function',
    message: 'Function payload is too large'
  },
  FUNCTION_RESPONSE_PAYLOAD_TOO_LARGE: {
    code: 'FUNCTION_RESPONSE_PAYLOAD_TOO_LARGE',
    statusCode: 500,
    category: 'Function',
    message: 'Function response payload is too large'
  },
  FUNCTION_THROTTLED: {
    code: 'FUNCTION_THROTTLED',
    statusCode: 503,
    category: 'Function',
    message: 'Function is being throttled'
  },
  NO_RESPONSE_FROM_FUNCTION: {
    code: 'NO_RESPONSE_FROM_FUNCTION',
    statusCode: 502,
    category: 'Function',
    message: 'No response received from function'
  },

  // Deployment Errors
  DEPLOYMENT_BLOCKED: {
    code: 'DEPLOYMENT_BLOCKED',
    statusCode: 403,
    category: 'Deployment',
    message: 'Deployment is blocked'
  },
  DEPLOYMENT_PAUSED: {
    code: 'DEPLOYMENT_PAUSED',
    statusCode: 503,
    category: 'Deployment',
    message: 'Deployment is paused'
  },
  DEPLOYMENT_DISABLED: {
    code: 'DEPLOYMENT_DISABLED',
    statusCode: 402,
    category: 'Deployment',
    message: 'Deployment is disabled'
  },
  DEPLOYMENT_NOT_FOUND: {
    code: 'DEPLOYMENT_NOT_FOUND',
    statusCode: 404,
    category: 'Deployment',
    message: 'Deployment not found'
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    statusCode: 404,
    category: 'Deployment',
    message: 'Resource not found'
  },
  DEPLOYMENT_DELETED: {
    code: 'DEPLOYMENT_DELETED',
    statusCode: 410,
    category: 'Deployment',
    message: 'Deployment has been deleted'
  },
  DEPLOYMENT_NOT_READY_REDIRECTING: {
    code: 'DEPLOYMENT_NOT_READY_REDIRECTING',
    statusCode: 303,
    category: 'Deployment',
    message: 'Deployment is not ready, redirecting'
  },

  // Runtime Errors
  INFINITE_LOOP_DETECTED: {
    code: 'INFINITE_LOOP_DETECTED',
    statusCode: 508,
    category: 'Runtime',
    message: 'Infinite loop detected in runtime'
  },

  // DNS Errors
  DNS_HOSTNAME_EMPTY: {
    code: 'DNS_HOSTNAME_EMPTY',
    statusCode: 502,
    category: 'DNS',
    message: 'DNS hostname is empty'
  },
  DNS_HOSTNAME_NOT_FOUND: {
    code: 'DNS_HOSTNAME_NOT_FOUND',
    statusCode: 502,
    category: 'DNS',
    message: 'DNS hostname not found'
  },
  DNS_HOSTNAME_RESOLVE_FAILED: {
    code: 'DNS_HOSTNAME_RESOLVE_FAILED',
    statusCode: 502,
    category: 'DNS',
    message: 'DNS hostname resolution failed'
  },
  DNS_HOSTNAME_RESOLVED_PRIVATE: {
    code: 'DNS_HOSTNAME_RESOLVED_PRIVATE',
    statusCode: 404,
    category: 'DNS',
    message: 'DNS hostname resolved to private IP'
  },
  DNS_HOSTNAME_SERVER_ERROR: {
    code: 'DNS_HOSTNAME_SERVER_ERROR',
    statusCode: 502,
    category: 'DNS',
    message: 'DNS server error'
  },

  // Routing Errors
  TOO_MANY_FORKS: {
    code: 'TOO_MANY_FORKS',
    statusCode: 502,
    category: 'Routing',
    message: 'Too many routing forks'
  },
  TOO_MANY_FILESYSTEM_CHECKS: {
    code: 'TOO_MANY_FILESYSTEM_CHECKS',
    statusCode: 502,
    category: 'Routing',
    message: 'Too many filesystem checks'
  },
  ROUTER_CANNOT_MATCH: {
    code: 'ROUTER_CANNOT_MATCH',
    statusCode: 502,
    category: 'Routing',
    message: 'Router cannot match the request'
  },
  ROUTER_EXTERNAL_TARGET_CONNECTION_ERROR: {
    code: 'ROUTER_EXTERNAL_TARGET_CONNECTION_ERROR',
    statusCode: 502,
    category: 'Routing',
    message: 'External target connection error'
  },
  ROUTER_EXTERNAL_TARGET_ERROR: {
    code: 'ROUTER_EXTERNAL_TARGET_ERROR',
    statusCode: 502,
    category: 'Routing',
    message: 'External target error'
  },
  ROUTER_TOO_MANY_HAS_SELECTIONS: {
    code: 'ROUTER_TOO_MANY_HAS_SELECTIONS',
    statusCode: 502,
    category: 'Routing',
    message: 'Too many has selections in router'
  },
  ROUTER_EXTERNAL_TARGET_HANDSHAKE_ERROR: {
    code: 'ROUTER_EXTERNAL_TARGET_HANDSHAKE_ERROR',
    statusCode: 502,
    category: 'Routing',
    message: 'External target handshake error'
  },

  // Request Errors
  INVALID_REQUEST_METHOD: {
    code: 'INVALID_REQUEST_METHOD',
    statusCode: 405,
    category: 'Request',
    message: 'Invalid request method'
  },
  MALFORMED_REQUEST_HEADER: {
    code: 'MALFORMED_REQUEST_HEADER',
    statusCode: 400,
    category: 'Request',
    message: 'Malformed request header'
  },
  REQUEST_HEADER_TOO_LARGE: {
    code: 'REQUEST_HEADER_TOO_LARGE',
    statusCode: 431,
    category: 'Request',
    message: 'Request header too large'
  },
  RESOURCE_NOT_FOUND: {
    code: 'RESOURCE_NOT_FOUND',
    statusCode: 404,
    category: 'Request',
    message: 'Resource not found'
  },
  URL_TOO_LONG: {
    code: 'URL_TOO_LONG',
    statusCode: 414,
    category: 'Request',
    message: 'URL too long'
  },

  // Image Errors
  INVALID_IMAGE_OPTIMIZE_REQUEST: {
    code: 'INVALID_IMAGE_OPTIMIZE_REQUEST',
    statusCode: 400,
    category: 'Image',
    message: 'Invalid image optimization request'
  },
  OPTIMIZED_EXTERNAL_IMAGE_REQUEST_FAILED: {
    code: 'OPTIMIZED_EXTERNAL_IMAGE_REQUEST_FAILED',
    statusCode: 502,
    category: 'Image',
    message: 'External image optimization request failed'
  },
  OPTIMIZED_EXTERNAL_IMAGE_REQUEST_INVALID: {
    code: 'OPTIMIZED_EXTERNAL_IMAGE_REQUEST_INVALID',
    statusCode: 502,
    category: 'Image',
    message: 'Invalid external image optimization request'
  },
  OPTIMIZED_EXTERNAL_IMAGE_REQUEST_UNAUTHORIZED: {
    code: 'OPTIMIZED_EXTERNAL_IMAGE_REQUEST_UNAUTHORIZED',
    statusCode: 502,
    category: 'Image',
    message: 'Unauthorized external image optimization request'
  },
  OPTIMIZED_EXTERNAL_IMAGE_TOO_MANY_REDIRECTS: {
    code: 'OPTIMIZED_EXTERNAL_IMAGE_TOO_MANY_REDIRECTS',
    statusCode: 502,
    category: 'Image',
    message: 'Too many redirects for external image optimization'
  },

  // Cache Errors
  FALLBACK_BODY_TOO_LARGE: {
    code: 'FALLBACK_BODY_TOO_LARGE',
    statusCode: 502,
    category: 'Cache',
    message: 'Fallback body is too large'
  },

  // Internal Platform Errors
  INTERNAL_EDGE_FUNCTION_INVOCATION_FAILED: {
    code: 'INTERNAL_EDGE_FUNCTION_INVOCATION_FAILED',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal edge function invocation failed'
  },
  INTERNAL_EDGE_FUNCTION_INVOCATION_TIMEOUT: {
    code: 'INTERNAL_EDGE_FUNCTION_INVOCATION_TIMEOUT',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal edge function invocation timed out'
  },
  INTERNAL_FUNCTION_INVOCATION_FAILED: {
    code: 'INTERNAL_FUNCTION_INVOCATION_FAILED',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal function invocation failed'
  },
  INTERNAL_FUNCTION_INVOCATION_TIMEOUT: {
    code: 'INTERNAL_FUNCTION_INVOCATION_TIMEOUT',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal function invocation timed out'
  },
  INTERNAL_FUNCTION_NOT_FOUND: {
    code: 'INTERNAL_FUNCTION_NOT_FOUND',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal function not found'
  },
  INTERNAL_FUNCTION_NOT_READY: {
    code: 'INTERNAL_FUNCTION_NOT_READY',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal function not ready'
  },
  INTERNAL_DEPLOYMENT_FETCH_FAILED: {
    code: 'INTERNAL_DEPLOYMENT_FETCH_FAILED',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal deployment fetch failed'
  },
  INTERNAL_UNARCHIVE_FAILED: {
    code: 'INTERNAL_UNARCHIVE_FAILED',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal unarchive operation failed'
  },
  INTERNAL_UNEXPECTED_ERROR: {
    code: 'INTERNAL_UNEXPECTED_ERROR',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal unexpected error occurred'
  },
  INTERNAL_ROUTER_CANNOT_PARSE_PATH: {
    code: 'INTERNAL_ROUTER_CANNOT_PARSE_PATH',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal router cannot parse path'
  },
  INTERNAL_STATIC_REQUEST_FAILED: {
    code: 'INTERNAL_STATIC_REQUEST_FAILED',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal static request failed'
  },
  INTERNAL_OPTIMIZED_IMAGE_REQUEST_FAILED: {
    code: 'INTERNAL_OPTIMIZED_IMAGE_REQUEST_FAILED',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal optimized image request failed'
  },
  INTERNAL_CACHE_ERROR: {
    code: 'INTERNAL_CACHE_ERROR',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal cache error'
  },
  INTERNAL_CACHE_KEY_TOO_LONG: {
    code: 'INTERNAL_CACHE_KEY_TOO_LONG',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal cache key too long'
  },
  INTERNAL_CACHE_LOCK_FULL: {
    code: 'INTERNAL_CACHE_LOCK_FULL',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal cache lock is full'
  },
  INTERNAL_CACHE_LOCK_TIMEOUT: {
    code: 'INTERNAL_CACHE_LOCK_TIMEOUT',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal cache lock timeout'
  },
  INTERNAL_MISSING_RESPONSE_FROM_CACHE: {
    code: 'INTERNAL_MISSING_RESPONSE_FROM_CACHE',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal missing response from cache'
  },
  INTERNAL_FUNCTION_SERVICE_UNAVAILABLE: {
    code: 'INTERNAL_FUNCTION_SERVICE_UNAVAILABLE',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal function service unavailable'
  },
  INTERNAL_MICROFRONTENDS_INVALID_CONFIGURATION_ERROR: {
    code: 'INTERNAL_MICROFRONTENDS_INVALID_CONFIGURATION_ERROR',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal microfrontends invalid configuration error'
  },
  INTERNAL_MICROFRONTENDS_BUILD_ERROR: {
    code: 'INTERNAL_MICROFRONTENDS_BUILD_ERROR',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal microfrontends build error'
  },
  INTERNAL_MICROFRONTENDS_MIDDLEWARE_ERROR: {
    code: 'INTERNAL_MICROFRONTENDS_MIDDLEWARE_ERROR',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal microfrontends middleware error'
  },
  INTERNAL_MICROFRONTENDS_UNEXPECTED_ERROR: {
    code: 'INTERNAL_MICROFRONTENDS_UNEXPECTED_ERROR',
    statusCode: 500,
    category: 'Internal',
    message: 'Internal microfrontends unexpected error'
  }
};

export function getVercelError(code: string): VercelError {
  return vercelErrors[code] || {
    code: 'UNKNOWN_ERROR',
    statusCode: 500,
    category: 'Internal',
    message: 'Unknown error occurred'
  };
}

export function isVercelError(code: string): boolean {
  return code in vercelErrors;
}

export function getErrorByStatusCode(statusCode: number): VercelError[] {
  return Object.values(vercelErrors).filter(error => error.statusCode === statusCode);
}

export function getErrorsByCategory(category: VercelError['category']): VercelError[] {
  return Object.values(vercelErrors).filter(error => error.category === category);
} 