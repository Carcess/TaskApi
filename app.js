import express from 'express';
import tasksRouter from './routes/tasks.js';

const app = express();
app.use(express.json());

//Health check
app.get('/health', (req, res) => {
    res.json({status: 'ok'});
});

// Tasks API
app.use('/api/tasks', tasksRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});