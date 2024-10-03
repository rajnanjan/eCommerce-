import { verify } from '../utils/helper.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.status(403).send('Access denied.');

    const decoded = await verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send('Invalid Token');
  }
};
