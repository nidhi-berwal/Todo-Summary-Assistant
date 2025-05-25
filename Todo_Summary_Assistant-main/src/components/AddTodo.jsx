// src/components/AddTodo.jsx
import React, { useState } from 'react';
import { addTodo } from '../api/todoApi';
import { 
  Box, 
  TextField, 
  Button, 
  Stack 
} from '@mui/material';

const AddTodo = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    try {
      setLoading(true);
      await addTodo(title);
      setTitle('');
      onAdd();
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mb={3}>
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="Add a new todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || !title.trim()}
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default AddTodo;