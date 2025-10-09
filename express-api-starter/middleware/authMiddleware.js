export const authMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!process.env.API_KEY) {
    console.warn('API_KEY not set in environment; rejecting protected requests.');
    return res.status(500).json({ message: 'Server misconfigured (no API key set)' });
  }
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};
