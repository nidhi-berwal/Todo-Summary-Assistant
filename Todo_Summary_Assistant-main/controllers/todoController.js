// controllers/todoController.js
const Todo = require('../models/Todo');

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.getAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const newTodo = await Todo.create({ 
      title, 
      completed: false 
    });
    
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.delete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};