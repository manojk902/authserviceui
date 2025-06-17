
import { Box, Paper, Typography, Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const EmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const id = searchParams.get('id');

  useEffect(() => {
    if (status === 'success' && id) {
      navigate(`/recovery-email?id=${id}`);
    }
  },[status,id, navigate])



  return (

    <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 2, textAlign: 'center' }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Verifying your account…
      </Typography>
      <Typography variant="body2" mb={3}>
        Please check your email and click on a verification link to complete the sign-up process.
      </Typography>

      {/* ✅ Optional manual button */}

    </Paper>
  );
}

export default EmailVerification;
