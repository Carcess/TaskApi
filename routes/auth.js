import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { verifyAPIKey } from '../middleware/auth.js'; // Import the API key middleware

dotenv.config(); // Load environment variables

const router = express.Router(); // Create a new router instance

// Hardcoded user with hashed password (for testing purposes)
const user = { 
  username: 'doe', 
  password: await bcrypt.hash('doe', 10), // Hashed password
};

// Login route with API key verification middleware
router.post('/login', verifyAPIKey, async (req, res) => {
  const { username, password } = req.body; // Extract username and password from request body

  // Check if the username matches the hardcoded user
  if (username !== user.username) {
    return res.status(404).json({ error: 'Användare hittades inte' }); // User not found
  }

  // Compare the provided password with the hashed password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Ogiltiga inloggningsuppgifter' }); // Invalid credentials
  }

  // Generate a JWT token
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Send the token back as the response
  res.status(200).json({ token });
});

export default router;
