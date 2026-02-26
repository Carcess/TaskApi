// Importerar alla funktioner från usersModel.js
import * as UsersModel from '../models/usersModel.js';

// Funktion för att hämta alla användare
export const getAllUsers = async (req, res) => {
  try {
    // Hämtar alla användare från modellen (databasen)
    const users = await UsersModel.getAllUsers();
    res.json(users); // Skickar användarna som ett JSON-svar till klienten
  } catch (error) {
    // Skickar ett felmeddelande om något går fel
    res.status(500).json({ error: 'Kunde inte hämta användare' });
  }
};

// Funktion för att hämta en specifik användare baserat på ID
export const getUserById = async (req, res) => {
  try {
    // Hämtar användaren med det ID som skickats i URL:en
    const user = await UsersModel.getUserById(req.params.id);
    if (!user) {
      // Om användaren inte hittas, skicka ett felmeddelande
      return res.status(404).json({ error: 'Användare hittades inte' });
    }
    res.json(user); // Skickar den hittade användaren som svar
  } catch (error) {
    // Hanterar fel om något går snett
    res.status(500).json({ error: 'Kunde inte hämta användaren' });
  }
};

// Funktion för att skapa en ny användare
export const createUser = async (req, res) => {
  try {
    // Hämtar användarnamn, lösenord och e-post från request-body
    const { username, password, email } = req.body;

    // Skapar en ny användare i databasen
    const userId = await UsersModel.createUser(username, password, email);

    // Skickar ett svar med ett meddelande och det nya användarens ID
    res.status(201).json({ message: 'Användare skapad', userId });
  } catch (error) {
    // Hanterar fel om något går snett
    res.status(500).json({ error: 'Kunde inte skapa användare' });
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
