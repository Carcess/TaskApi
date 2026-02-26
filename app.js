import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { db } from './database.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import taskRoutes from './routes/tasks.js';
import session from 'express-session';
import flash from 'connect-flash';

dotenv.config();
const app = express(); // Skapar en ny Express-applikation

app.use(express.urlencoded({ extended: true })); // To parse form data

// Middleware
app.use(helmet()); // Använder Helmet för att säkra HTTP-headers
app.use(express.json()); // Gör det möjligt för applikationen att hantera JSON-data i inkommande förfrågningar
app.disable('x-powered-by'); // Döljer information om att servern körs på Express för att öka säkerheten

// Middleware for sessions
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash()); // Middleware for flash messages

// Middleware to make flash messages accessible in views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Set EJS as the template engine
app.set('view engine', 'ejs');
// Set the directory where EJS files will be located
app.set('views', './views');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/tasks', taskRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
