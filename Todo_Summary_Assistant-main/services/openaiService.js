// services/openaiService.js
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function summarizeTodos(todos) {
  try {
    const todoList = todos.map(t => `- ${t.title}`).join('\n');
    
    const prompt = `
      I have the following pending todo items:
      ${todoList}
      
      Please provide a concise, motivational summary of these tasks.
      Group similar tasks together if possible.
      Keep it under 3 sentences.
      Make it sound encouraging and productive.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 150
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI error:', error);
    throw new Error('Failed to generate summary');
  }
}

module.exports = { summarizeTodos };