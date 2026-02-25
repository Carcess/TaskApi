import express from 'express';
import { verifyJWT } from '../middleware/auth.js';
import * as UsersController from '../controllers/usersController.js';

const router = express.Router();

// GET all users
router.get('/', verifyJWT, UsersController.getAllUsers);

// GET a single user by ID
router.get('/:id', verifyJWT, UsersController.getUserById);

export default router;
