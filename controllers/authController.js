// controllers/authController.js

import { verifyFirebaseToken } from '../config/firebase.js';
import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load env vars

// 🔹 Google OAuth Login
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

    // 🔐 Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        uid: user.uid,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
      token,
    });
  } catch (err) {
    console.error('Login failed:', err.message);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// 🔹 Signup with Email & Password
export const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// 🔹 Login with Email & Password
export const loginWithEmailPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// logout functionality
export const logoutUser = async (req, res) => {
  try {
    // If you're using cookies, clear the token cookie
    // res.clearCookie('token');

    // If token is stored in localStorage, simply instruct client to remove it
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error('Logout error:', err.message);
    res.status(500).json({ error: 'Logout failed' });
  }
};
