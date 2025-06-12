// src/pages/ForgotPassword.jsx
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const ForgotPassword = () => {
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
      <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Password reset link has been sent to your primary email.
        </Typography>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
