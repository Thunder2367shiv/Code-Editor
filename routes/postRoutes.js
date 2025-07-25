// routes/postRoutes.js
import express from 'express';
import {
  createPost,
  getAllPosts,
  likePost,
  dislikePost,
  addComment,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
 
router.post('/create', protect, createPost);
router.get('/all', getAllPosts);
router.post('/like', protect, likePost);
router.post('/dislike', protect, dislikePost);
router.post('/comment', protect, addComment);

export default router;
