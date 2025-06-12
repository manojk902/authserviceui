// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
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
          Sign In
        </Typography>

        <TextField fullWidth label="Email or phone" variant="outlined" margin="normal" />
        <TextField
          fullWidth
          label="Enter Your Password"
          variant="outlined"
          margin="normal"
          type={showPassword ? 'text' : 'password'}
        />

        <FormControlLabel
          control={<Checkbox onChange={(e) => setShowPassword(e.target.checked)} />}
          label="Show Password"
          sx={{ mt: 1 }}
        />

        <Box display="flex" justifyContent="space-between" mt={1} mb={3}>
          <Link
            onClick={() => navigate('/forgot-password')}
            variant="body2"
            underline="hover"
            sx={{ cursor: 'pointer' }}
          >
            Forget password?
          </Link>
        </Box>

        <Button fullWidth variant="contained" sx={{ bgcolor: '#1a73e8' }}>
          Sign in
        </Button>

        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            Don’t have an account?{' '}
            <Link
              onClick={() => navigate('/signup')}
              underline="hover"
              sx={{ cursor: 'pointer', color: '#1a73e8', fontWeight: 500 }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
