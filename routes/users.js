import express from 'express'; // Importerar Express för att hantera HTTP-förfrågningar
import { verifyJWT } from '../middleware/auth.js'; // Importerar middleware för att verifiera JWT-token
import * as UsersController from '../controllers/usersController.js'; // Importerar alla funktioner från usersController

const router = express.Router(); // Skapar en ny router-instans

// Route för att hämta alla användare (skyddad med JWT-verifiering)
router.get('/', verifyJWT, UsersController.getAllUsers);

// Route för att hämta en specifik användare baserat på ID (skyddad med JWT-verifiering)
router.get('/:id', verifyJWT, UsersController.getUserById);

export default router; // Exporterar routern så att den kan användas i andra delar av applikationen