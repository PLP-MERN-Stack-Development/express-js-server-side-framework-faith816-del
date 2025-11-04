import { AuthError } from "../utils/errors.js";

export const authMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!process.env.API_KEY) {
    console.warn('API_KEY not set in environment; rejecting protected requests.');
    return next(new AuthError('Server misconfigured (no API key set)', 500));
  }
  if (apiKey !== process.env.API_KEY) {
    return next(new AuthError('Unauthorized', 401));
  }
  next();
};
