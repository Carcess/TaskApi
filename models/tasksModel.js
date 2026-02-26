import { db } from '../database.js';

// Get all tasks
export const getAllTasks = async () => {
  const [rows] = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
  return rows;
};

// Get a single task by ID
export const getTaskById = async (id) => {
  const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
  return rows[0]; // Return the first row (task) if it exists
};


// Create a new task
export const createTask = async (title, description, status = 'pending') => {
  const [result] = await db.query(
    'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
    [title, description, status]
  );
  return result.insertId; // Return the ID of the newly created task
};

export const updateTask = async (id, title, description, status) => {
  await db.query(
    'UPDATE tasks SET title = ?, description = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [title, description, status, id]
  );
};

// Delete a task
export const deleteTask = async (id) => {
  await db.query('DELETE FROM tasks WHERE id = ?', [id]);
};
