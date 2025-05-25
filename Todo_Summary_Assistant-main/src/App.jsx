// src/App.js
import React from 'react';
import TodoList from './components/TodoList';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <TodoList />
      </Container>
    </>
  );
}

export default App;