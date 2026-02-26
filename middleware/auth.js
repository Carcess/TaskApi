import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware för att verifiera API-nyckel
export const verifyAPIKey = (req, res, next) => {
  // Här hämtar vi API-nyckeln från headers eller query-parametern
  const apiKey = req.headers['x-api-key'] || req.query.api_key;

  // Kontrollerar om API-nyckeln saknas eller är ogiltig
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' }); // Returnerar ett fel om nyckeln är ogiltig
  }

  next(); // Om API-nyckeln är korrekt, fortsätt till nästa middleware
};

// Middleware för att verifiera JWT-token
export const verifyJWT = (req, res, next) => {
  // Hämtar token från Authorization-headern (om den finns)
  const token = req.headers.authorization?.split(' ')[1];

  // Kontrollerar om token saknas
  if (!token) {
    return res.status(401).json({ error: 'Ingen token angiven' }); // Returnerar ett fel om ingen token tillhandahålls
  }

  // Verifierar token med hjälp av hemlig nyckel från .env
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Ogiltig token' }); // Returnerar ett fel om token är ogiltig
    }

    req.user = decoded; // Lägger till den avkodade användarinformationen i request-objektet
    next(); // Fortsätt till nästa middleware eller route om vi lägger till en till
  });
};
