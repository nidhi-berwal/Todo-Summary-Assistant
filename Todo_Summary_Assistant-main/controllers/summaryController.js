// controllers/summaryController.js
const Todo = require('../models/Todo');
const { summarizeTodos } = require('../services/openaiService');
const { sendToSlack } = require('../services/slackService');

exports.summarizeAndSend = async (req, res) => {
  try {
    const pendingTodos = await Todo.getPending();
    
    if (pendingTodos.length === 0) {
      return res.status(400).json({ error: 'No pending todos to summarize' });
    }
    
    const summary = await summarizeTodos(pendingTodos);
    const success = await sendToSlack(`*Todo Summary*:\n${summary}`);
    
    if (success) {
      res.json({ 
        success: true, 
        message: 'Summary sent to Slack successfully',
        summary 
      });
    } else {
      res.status(500).json({ error: 'Failed to send summary to Slack' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};