// controllers/postController.js
import { CodeSnippet } from '../models/CodeSnippet.js';
import { Like } from '../models/Like.js';
import { Comment } from '../models/Comment.js';

export const createPost = async (req, res) => {
  const { code, title, tags, language, userId } = req.body;

  try { 
    const post = await CodeSnippet.create({
      code,
      title,
      tags,
      language,
      userId,
    });

    res.status(201).json({ message: 'Post created', post });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post', details: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await CodeSnippet.findAll({ include: ['user', 'comments', 'likes'] });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const likePost = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const [like, created] = await Like.findOrCreate({ where: { postId, userId } });
    if (!created) {
      return res.status(400).json({ message: 'Already liked' });
    }
    res.status(200).json({ message: 'Liked post' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to like post' });
  }
};

export const dislikePost = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const deleted = await Like.destroy({ where: { postId, userId } });
    res.status(200).json({ message: 'Disliked post', deleted });
  } catch (err) {
    res.status(500).json({ error: 'Failed to dislike post' });
  }
};

export const addComment = async (req, res) => {
  const { postId, userId, comment } = req.body;

  try {
    const newComment = await Comment.create({ postId, userId, text: comment });
    res.status(201).json({ message: 'Comment added', comment: newComment });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};
