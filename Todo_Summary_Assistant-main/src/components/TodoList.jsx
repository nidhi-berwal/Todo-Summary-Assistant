// src/components/TodoList.jsx
import React, { useState, useEffect } from 'react';
import { getTodos, deleteTodo } from '../api/todoApi';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import SummaryButton from './SummaryButton';
import { Box, Typography, List, CircularProgress } from '@mui/material';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Todo Summary Assistant
      </Typography>
      
      <AddTodo onAdd={fetchTodos} />
      
      <List>
        {todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onDelete={handleDelete} 
          />
        ))}
      </List>
      
      <SummaryButton />
    </Box>
  );
};

export default TodoList;