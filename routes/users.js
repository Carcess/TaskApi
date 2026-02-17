import express from 'express';
import { db } from '../database.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const [users] = await db.query('SELECT * FROM users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (user.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const [result] = await db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [
      username,
      password,
      email,
    ]);
    res.status(201).json({ message: 'User created', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const [result] = await db.query('UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?', [
      username,
      password,
      email,
      req.params.id,
    ]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

export default router;
