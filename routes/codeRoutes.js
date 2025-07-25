// routes/codeRoutes.js
import express from 'express';
import { runCode, predictDSATag } from '../controllers/codeController.js';

const router = express.Router();

router.post('/run', runCode);
router.post('/predict-tag', predictDSATag);

export default router; 
 