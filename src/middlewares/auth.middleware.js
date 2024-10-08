import { verify } from '../utils/helper.js';

/**
 * Authentication middleware for protecting routes.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {function} next - The next middleware function in the chain.
 */
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // 2. Extract Token from Authorization Header
    const bearerToken = token.split(' ')[1];

    const decoded = await verify(bearerToken, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send('Invalid Token');
  }
};
