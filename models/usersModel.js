import { db } from '../database.js'; // Importerar databasanslutningen

// Funktion för att hämta alla användare
export const getAllUsers = async () => {
  const [users] = await db.query('SELECT * FROM users');
  return users;
};

// Funktion för att hämta en specifik användare baserat på ID
export const getUserById = async (id) => {
  const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return user[0];
};

// Funktion för att skapa en ny användare
export const createUser = async (username, password, email) => {
  const [result] = await db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [
    username, 
    password, 
    email,    
  ]);
  return result.insertId;
};

// Funktion för att uppdatera en befintlig användare
export const updateUser = async (id, username, password, email) => {
  const [result] = await db.query('UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?', [
    username, 
    password, 
    email,    
    id,       
  ]);
  return result.affectedRows;
};

// Funktion för att ta bort en användare
export const deleteUser = async (id) => {
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows;
};
