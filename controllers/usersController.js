import * as UsersModel from '../models/usersModel.js';
import { createUser as createUserModel } from '../models/usersModel.js';

// Funktion för att hämta alla användare
export const getAllUsers = async (req, res) => {
  try {
    // Hämtar alla användare från modellen (databasen)
    const users = await UsersModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Kunde inte hämta användare' });
  }
};

// Funktion för att hämta en specifik användare baserat på ID
export const getUserById = async (req, res) => {
  try {
    // Hämtar användaren med det ID som skickats i URL:en
    const user = await UsersModel.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Användare hittades inte' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Kunde inte hämta användaren' });
  }
};

// Funktion för att skapa en ny användare
export const createUser = async (req, res) => {
  const { username, password, email } = req.body;

  // Validate input
  if (!username || !password || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Call the model function to insert the user into the database
    const userId = await createUserModel(username, password, email);

    // Respond with success
    return res.status(201).json({ message: 'User created successfully', userId });
  } catch (error) {
    console.error('Error creating user:', error.message);

    // Handle any errors
    return res.status(500).json({ error: 'Failed to create user' });
  }
};

// Funktion för att uppdatera en befintlig användare
export const updateUser = async (req, res) => {
  try {
    // Hämtar nya värden för användarnamn, lösenord och e-post från request-body
    const { username, password, email } = req.body;

    // Uppdaterar användaren i databasen baserat på ID som skickats i URL:en
    const updated = await UsersModel.updateUser(req.params.id, username, password, email);

    if (!updated) {
      // Om användaren inte hittas, skicka ett felmeddelande
      return res.status(404).json({ error: 'Användare hittades inte' });
    }

    // Skickar ett svar med ett meddelande om att användaren uppdaterats
    res.json({ message: 'Användare uppdaterad' });
  } catch (error) {
    // Hanterar fel om något går snett
    res.status(500).json({ error: 'Kunde inte uppdatera användare' });
  }
};

// Funktion för att ta bort en användare
export const deleteUser = async (req, res) => {
  try {
    // Tar bort användaren med det ID som skickats i URL:en
    const deleted = await UsersModel.deleteUser(req.params.id);

    if (!deleted) {
      // Om användaren inte hittas, skicka ett felmeddelande
      return res.status(404).json({ error: 'Användare hittades inte' });
    }

    // Skickar ett svar med ett meddelande om att användaren tagits bort
    res.json({ message: 'Användare borttagen' });
  } catch (error) {
    // Hanterar fel om något går snett
    res.status(500).json({ error: 'Kunde inte ta bort användare' });
  }
};
