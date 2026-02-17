import { db } from '../database.js';

// Get all users
export const getAllUsers = async () => {
  const [users] = await db.query('SELECT * FROM users');
  return users;
};

// Get a single user by ID
export const getUserById = async (id) => {
  const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return user[0];
};

// Create a new user
export const createUser = async (username, password, email) => {
  const [result] = await db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [
    username,
    password,
    email,
  ]);
  return result.insertId;
};

// Update an existing user
export const updateUser = async (id, username, password, email) => {
  const [result] = await db.query('UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?', [
    username,
    password,
    email,
    id,
  ]);
  return result.affectedRows;
};

// Delete a user
export const deleteUser = async (id) => {
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows;
};
