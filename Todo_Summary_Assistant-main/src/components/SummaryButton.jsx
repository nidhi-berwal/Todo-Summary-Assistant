// src/components/SummaryButton.jsx
import React, { useState } from 'react';
import { summarizeTodos } from '../api/todoApi';
import { 
  Button, 
  Snackbar, 
  Alert, 
  CircularProgress 
} from '@mui/material';

const SummaryButton = () => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    try {
      setLoading(true);
      const result = await summarizeTodos();
      setSuccess(true);
      setMessage(result.message);
    } catch (error) {
      setSuccess(false);
      setMessage(error.response?.data?.error || 'Failed to send summary');
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClick}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} /> : null}
        fullWidth
        sx={{ mt: 2 }}
      >
        {loading ? 'Processing...' : 'Summarize and Send to Slack'}
      </Button>
      
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={success ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SummaryButton;