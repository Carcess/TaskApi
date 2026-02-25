import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { db } from './database.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

dotenv.config();
const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.disable('x-powered-by');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/users', userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
