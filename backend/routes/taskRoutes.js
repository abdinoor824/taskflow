import express from 'express';
import Task from '../models/Task.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET all tasks for logged-in user
router.get('/', protect, async (req, res) => {
  const tasks = await Task.find({ user: req.userId });
  res.json(tasks);
});

// CREATE task
router.post('/', protect, async (req, res) => {
  const task = await Task.create({ user: req.userId, title: req.body.title });
  res.status(201).json(task);
});

// UPDATE task
router.put('/:id', protect, async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.userId });
  if (!task) return res.status(404).json({ message: 'Task not found' });

  task.title = req.body.title ?? task.title;
  task.completed = req.body.completed ?? task.completed;
  const updated = await task.save();
  res.json(updated);
});

// DELETE task
router.delete('/:id', protect, async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
});

export default router;