// middlewares/authMiddleware.js
import { verifyFirebaseToken } from '../config/firebase.js';
import { User } from '../models/User.js';

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  } 

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await verifyFirebaseToken(token);

    const user = await User.findOne({ where: { uid: decoded.uid } });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token', details: error.message });
  }
};
