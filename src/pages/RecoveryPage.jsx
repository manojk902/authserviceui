// src/pages/RecoveryPage.jsx

import React from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RecoveryPage = () => {
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
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Email Recovery
        </Typography>
        <Typography variant="body2" mb={3}>
          You can add a recovery option. You can also skip it.
        </Typography>

        <TextField
          fullWidth
          label="Recovery Email or Phone"
          variant="outlined"
          margin="normal"
        />

        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button
            variant="text"
            onClick={() => navigate('/login')}
          >
            Skip
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#1a73e8' }}
            onClick={() => navigate('/login')}
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default RecoveryPage;
