// routes/api.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const summaryController = require('../controllers/summaryController');

router.get('/todos', todoController.getAllTodos);
router.post('/todos', todoController.createTodo);
router.delete('/todos/:id', todoController.deleteTodo);
router.post('/summarize', summaryController.summarizeAndSend);

module.exports = router;