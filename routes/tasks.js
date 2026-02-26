import express from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../models/tasksModel.js';


const router = express.Router();

// Example route for tasks
router.get('/', (req, res) => {
  res.render('index');
});

//Route for /friday
router.get('/friday', (req, res) => {
  const queryDate = req.query.date;
  const date = queryDate ? new Date(queryDate) : new Date();
  //const date = queryDate ? new Date(queryDate) : new Date('2026-02-27');
  const dayOfWeek = date.getDay();
  const isFriday = dayOfWeek === 5;

  res.render('friday', {
    date: date.toDateString(),
    isFriday,
  });
});

// Show all tasks (new route)
router.get('/all', async (req, res) => {
  const tasks = await getAllTasks();
  res.render('tasks', { tasks }); // Render tasks page with the list of tasks
});

// Route to render the "Create New Task" form
router.get('/create', (req, res) => {
  res.render('createTask'); // Render the form for creating a new task
});

// Route to handle creating a new task
router.post('/create', async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const newTaskId = await createTask(title, description, status);
    req.flash('success_msg', 'Task created successfully!');
    res.redirect(`/tasks/${newTaskId}`); // Redirect to the new task's page
  } catch (error) {
    console.error('Error creating task:', error);
    req.flash('error_msg', 'Failed to create task.');
    res.redirect('/tasks/create'); // Redirect back to the form
  }
});


// Route to fetch a task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await getTaskById(req.params.id);
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.render('task', { task });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).send('An error occurred while fetching the task.');
  }
});



// Render form to edit a task
router.get('/edit/:id', async (req, res) => {
  const task = await getTaskById(req.params.id);
  if (!task) {
    return res.status(404).send('Task not found');
  }
  res.render('editTask', { task });
});

// Update a task
router.post('/edit/:id', async (req, res) => {
  const { title, description, status } = req.body;
  try {
    await updateTask(req.params.id, title, description, status);
    req.flash('success_msg', 'Task updated successfully!');
  } catch (error) {
    console.error('Error updating task:', error);
    req.flash('error_msg', 'Failed to update task.');
  }
  res.redirect('/tasks/all');
});


// Delete a task
router.post('/delete/:id', async (req, res) => {
  try {
    await deleteTask(req.params.id);
    req.flash('success_msg', 'Task deleted successfully!');
  } catch (error) {
    console.error('Error deleting task:', error);
    req.flash('error_msg', 'Failed to delete task.');
  }
  res.redirect('/tasks/all');
});



// Export the router
export default router;
