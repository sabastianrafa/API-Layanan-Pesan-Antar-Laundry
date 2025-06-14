/**
 * Error handler global untuk menangani semua error
 */
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Default error response
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || [];

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message
    }));
  }

  if (err.code === 'P2002') { // Prisma unique constraint error
    statusCode = 409;
    message = 'Conflict Error';
    errors = [{
      field: err.meta?.target?.[0] || 'unknown',
      message: `${err.meta?.target?.[0] || 'Field'} already exists`
    }];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};