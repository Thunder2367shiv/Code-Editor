// routes/errorSuggestRoutes.js
import express from 'express';
import { suggestErrorFix } from '../controllers/errorSuggestController.js';

const router = express.Router();

router.post('/suggest-fix', suggestErrorFix);

export default router;
 