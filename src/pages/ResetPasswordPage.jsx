// src/pages/ResetPasswordPage.jsx

import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = () => {
    if (newPassword === confirmPassword && newPassword.trim() !== '') {
      // 🔐 You can add actual password update logic here
      navigate('/login');
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
          Reset Your Password
        </Typography>

        <TextField
          fullWidth
          label="New Password"
          type="password"
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, bgcolor: '#1a73e8' }}
          onClick={handleReset}
        >
          Confirm
        </Button>
      </Paper>
    </Box>
  );
};

export default ResetPasswordPage;
