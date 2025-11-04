export const errorHandler = (err, req, res, next) => {
  // Allow custom errors with status codes
  const status = err.status || err.code || 500;
  const message = err.message || 'Internal Server Error';
  if (status >= 500) {
    console.error(err.stack || err);
  }
  res.status(status).json({ message });
};
