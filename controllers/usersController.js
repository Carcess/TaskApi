import * as UsersModel from '../models/usersModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await UsersModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UsersModel.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const userId = await UsersModel.createUser(username, password, email);
    res.status(201).json({ message: 'User created', userId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const updated = await UsersModel.updateUser(req.params.id, username, password, email);
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await UsersModel.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
