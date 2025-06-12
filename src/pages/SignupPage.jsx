// src/pages/SignupPage.jsx

import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
        <Box textAlign="center" mb={2}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
            alt="Google Logo"
            style={{ width: 80 }}
          />
        </Box>

        <Typography variant="h5" fontWeight="bold" mb={2}>
          Sign Up
        </Typography>

        <TextField fullWidth label="First Name" variant="outlined" margin="normal" />
        <TextField fullWidth label="Last Name" variant="outlined" margin="normal" />
        <TextField fullWidth label="Email Address" variant="outlined" margin="normal" />
        <TextField
          fullWidth
          label="Create Password"
          variant="outlined"
          margin="normal"
          type={showPassword ? 'text' : 'password'}
        />

        <Box display="flex" alignItems="center" mt={1} mb={3}>
          <input
            type="checkbox"
            id="showPassword"
            onChange={(e) => setShowPassword(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          <label htmlFor="showPassword">Show Password</label>
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{ bgcolor: '#1a73e8' }}
          onClick={() => navigate('/email-verification')} // ✅ Redirect to email verification page
        >
          Sign Up
        </Button>

        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            Already have an account?{' '}
            <Link
              onClick={() => navigate('/login')}
              underline="hover"
              sx={{ cursor: 'pointer', color: '#1a73e8', fontWeight: 500 }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignupPage;
