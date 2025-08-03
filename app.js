// app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
 
// Route imports
import authRoutes from './routes/authRoutes.js';
import codeRoutes from './routes/codeRoutes.js';
import postRoutes from './routes/postRoutes.js';
import errorSuggestRoutes from './routes/errorSuggestRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/code', codeRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/errors', errorSuggestRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Global Error Handler (MUST be after routes)
app.use(errorHandler);

export default app;
