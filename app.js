import express from 'express';
import { db } from './database.js';
import userRoutes from './routes/users.js'; // Import the users route

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Use the users route
app.use('/api/users', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
