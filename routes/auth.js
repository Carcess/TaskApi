import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Hardcoded user
const user = { username: 'doe', password: await bcrypt.hash('doe', 10) };

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (username !== user.username) {
    return res.status(404).json({ error: 'User not found' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
});

export default router;
