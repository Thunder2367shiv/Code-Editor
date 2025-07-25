// controllers/authController.js
import { verifyFirebaseToken } from '../config/firebase.js';
import { User } from '../models/User.js';

export const loginWithGoogle = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decoded = await verifyFirebaseToken(idToken);
 
    let user = await User.findOne({ where: { uid: decoded.uid } });

    if (!user) {
      user = await User.create({
        uid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Login failed:', err.message);
    res.status(401).json({ error: 'Unauthorized' });
  }
};
