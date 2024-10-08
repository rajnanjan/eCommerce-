/**
 * Error middleware for handling errors in Express applications.

 * @param {Error} err - The error object.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {function} next - The next middleware function in the chain.
 */
export const errorMiddleware = (err, req, res, next) => {
  const error = { ...err };

  // Check for database-related errors
  if (
    Object.hasOwn(error, 'schema') ||
    Object.hasOwn(error, 'table') ||
    Object.hasOwn(error, 'column')
  ) {
    error.message = `DATABASE::${error.code}::${error.detail}`;
    error.code = 500; // Set a generic 500 status code for database errors
  }

  // Handle specific error codes
  if (error.code === 'ECONNREFUSED') {
    error.message = 'Connection refused';
    error.code = 503; // Service unavailable
  } else if (String(error.code).length > 3) {
    error.code = 500; // Internal server error
  }

  // Set default message and code if not provided
  const message = error.message || 'Internal Server Error';
  const code = error.code || 500;

  const response = {
    status: false,
    data: message
  };

  res.status(code).json(response);
};
