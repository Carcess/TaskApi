import express from 'express';
import { verifyAPIKey, verifyJWT } from '../middleware/auth.js';

const router = express.Router();

// Protected route (API Key + JWT)
router.get('/protected', verifyAPIKey, verifyJWT, (req, res) => {
  res.status(200).json({
    message: `Welcome ${req.user.username}, you have access to this protected route!`,
  });
});

export default router;
