import { db } from '../database.js'; // Importerar databasanslutningen

// Funktion för att hämta alla användare
export const getAllUsers = async () => {
  // Kör en SQL-fråga för att hämta alla användare från databasen
  const [users] = await db.query('SELECT * FROM users');
  return users; // Returnerar listan med användare
};

// Funktion för att hämta en specifik användare baserat på ID
export const getUserById = async (id) => {
  // Kör en SQL-fråga för att hämta en användare med ett specifikt ID
  const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return user[0]; // Returnerar den första användaren (om den finns)
};

// Funktion för att skapa en ny användare
export const createUser = async (username, password, email) => {
  // Kör en SQL-fråga för att lägga till en ny användare i databasen
  const [result] = await db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [
    username, 
    password, 
    email,    
  ]);
  return result.insertId; // Returnerar ID:t för den nyss skapade användaren
};

// Funktion för att uppdatera en befintlig användare
export const updateUser = async (id, username, password, email) => {
  // Kör en SQL-fråga för att uppdatera användarens information i databasen
  const [result] = await db.query('UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?', [
    username, 
    password, 
    email,    
    id,       
  ]);
  return result.affectedRows; // Returnerar antalet rader som uppdaterades
};

// Funktion för att ta bort en användare
export const deleteUser = async (id) => {
  // Kör en SQL-fråga för att ta bort en användare baserat på ID
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows; // Returnerar antalet rader som togs bort
};
