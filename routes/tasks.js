import express from 'express';

const router = express.Router();

// In-memory data store
let nextId = 1;
let tasks = [
  { id: nextId++, title: 'First task', completed: false },
];

// Helpers
const findTaskIndex = (id) => tasks.findIndex((t) => t.id === id);
const parseId = (value) => {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
};
const serialize = (task) => task; // placeholder for future shaping

// GET /api/tasks
// Optional filters: ?completed=true|false
router.get('/', (req, res) => {
  const { completed } = req.query;
  let result = tasks;

  if (typeof completed !== 'undefined') {
    if (completed !== 'true' && completed !== 'false') {
      return res.status(400).json({ error: 'completed must be "true" or "false" when provided' });
    }
    const flag = completed === 'true';
    result = tasks.filter((t) => t.completed === flag);
  }

  res.json(result.map(serialize));
});

// GET /api/tasks/:id
router.get('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: 'id must be a positive integer' });

  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(serialize(task));
});

// POST /api/tasks
router.post('/', (req, res) => {
  const { title, completed = false } = req.body || {};
  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'title is required and must be a non-empty string' });
    }
  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'completed must be a boolean' });
  }

  const task = { id: nextId++, title: title.trim(), completed };
  tasks.push(task);
  res.status(201).json(serialize(task));
});

// PUT /api/tasks/:id (replace)
router.put('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: 'id must be a positive integer' });

  const { title, completed } = req.body || {};
  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'title is required and must be a non-empty string' });
  }
  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'completed is required and must be a boolean' });
  }

  const idx = findTaskIndex(id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });

  const updated = { id: tasks[idx].id, title: title.trim(), completed };
  tasks[idx] = updated;
  res.json(serialize(updated));
});

// PATCH /api/tasks/:id (partial update)
router.patch('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: 'id must be a positive integer' });

  const idx = findTaskIndex(id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });

  const payload = req.body || {};
  if ('title' in payload) {
    if (typeof payload.title !== 'string' || !payload.title.trim()) {
      return res.status(400).json({ error: 'title must be a non-empty string' });
    }
    tasks[idx].title = payload.title.trim();
  }
  if ('completed' in payload) {
    if (typeof payload.completed !== 'boolean') {
      return res.status(400).json({ error: 'completed must be a boolean' });
    }
    tasks[idx].completed = payload.completed;
  }

  res.json(serialize(tasks[idx]));
});

// DELETE /api/tasks/:id
router.delete('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: 'id must be a positive integer' });

  const idx = findTaskIndex(id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });

  const removed = tasks.splice(idx, 1)[0];
  res.json(serialize(removed));
});

export default router;
