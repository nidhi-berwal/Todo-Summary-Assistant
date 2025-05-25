// src/api/todoApi.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api'; 

export const getTodos = async () => {
  const response = await axios.get(`${API_BASE}/todos`);
  return response.data;
};

export const addTodo = async (title) => {
  const response = await axios.post(`${API_BASE}/todos`, { title });
  return response.data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_BASE}/todos/${id}`);
};

export const summarizeTodos = async () => {
  const response = await axios.post(`${API_BASE}/summarize`);
  return response.data;
};