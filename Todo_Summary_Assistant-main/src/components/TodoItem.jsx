// src/components/TodoItem.jsx
import React from 'react';
import { ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoItem = ({ todo, onDelete }) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton 
          edge="end" 
          aria-label="delete"
          onClick={() => onDelete(todo.id)}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={
          <Typography 
            style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none' 
            }}
          >
            {todo.title}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default TodoItem;