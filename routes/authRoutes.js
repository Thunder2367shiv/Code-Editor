// routes/authRoutes.js
import express from 'express';
import { loginWithGoogle, signupUser, loginWithEmailPassword, logoutUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/google', loginWithGoogle);
router.post('/signup', signupUser); 
router.post('/login', loginWithEmailPassword); 
router.get('/logout', logoutUser); 

export default router;
