import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config(); // Laddar miljövariabler från .env-filen
const router = express.Router(); // Skapar en ny router-instans för att definiera routes

// Hårdkodad användare med hashat lösenord
const user = { 
  username: 'doe', // Användarnamn
  password: await bcrypt.hash('doe', 10), // Hashar lösenordet "doe" med 10 saltomgångar
};

// inloggningsroute
router.post('/login', async (req, res) => {
  const { username, password } = req.body; // Hämtar användarnamn och lösenord från request-body

  // Kontrollerar om användarnamnet matchar den hårdkodade användaren
  if (username !== user.username) {
    return res.status(404).json({ error: 'Användare hittades inte' }); // Returnerar fel om användaren inte finns
  }

  // Jämför det angivna lösenordet med det hashade lösenordet
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Ogiltiga inloggningsuppgifter' }); // Returnerar fel om lösenordet är fel
  }

  // Skapar en JWT-token med användarnamnet som payload och en giltighetstid på 1 timme
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Skickar tillbaka token som svar
  res.status(200).json({ token });
});

export default router; // Exporterar routern så att den kan användas i andra delar av applikationen
