
import { Box, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmailVerificationPage = () => {
  const navigate = useNavigate();

  // useEffect(() => {
    // ✅ Optional: Auto-redirect after 3 seconds
    // const timer = setTimeout(() => {
    //   navigate('/recovery');
    // }, 3000);

  //   return () => clearTimeout(timer); // Cleanup
  // }, [navigate]);

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
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Verifying your account…
        </Typography>
        <Typography variant="body2" mb={3}>
          Please check your email for a verification link to complete the sign-up process.
        </Typography>

        {/* ✅ Optional manual button */}
        <Button
          variant="contained"
          sx={{ bgcolor: '#1a73e8' }}
          onClick={() => navigate('/recovery')}
        >
          Continue
        </Button>
      </Paper>
    </Box>
  );
}

export default EmailVerificationPage;
