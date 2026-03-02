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
const app = express();

// Helps the app understand data sent from forms (like text boxes)
app.use(express.urlencoded({ extended: true }));


// Adds extra security to the app by setting safe HTTP headers
app.use(helmet());

// Lets the app understand JSON data sent in requests
app.use(express.json());

// Hides the "X-Powered-By: Express" header to make the app more secure
app.disable('x-powered-by');


// Middleware for sessions
// Keeps track of tasks while they use the website
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true, // Save a new session even if it's empty
  })
);

app.use(flash()); // Middleware for flash messages

// Middleware to make flash messages accessible in views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Use EJS to make HTML pages look nice
app.set('view engine', 'ejs');
// Tell the app where to find the HTML (EJS) files
app.set('views', './views');

// Routes for the labs
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/tasks', taskRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
