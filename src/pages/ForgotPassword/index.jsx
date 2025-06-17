// src/pages/ForgotPassword.jsx
import { Box, Button, Paper, Typography, Link, TextField, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { request } from '../../utils/request';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm();
    // Function to handle adding recovery email
    const onSubmit = async (data) => {

        try {

            const resData = await request({
                method: "post",
                url: "forgot-password",
                data: {
                    email: data.forgotPasswordEmail,
                    useRecoveryEmail: data.isRecovery
                }
            })
            console.log("Response Data:", resData);
            console.log("Response Data status:", resData.status);
            if (resData.status === "success") {
                alert(resData.message);
                reset();
            }else if(resData.status === "error") {
                alert(resData.message)
                reset();
            }
        } catch (error) {
            alert(`${error.message}, Enter email and select correct type of email`);
            reset();
        }
        
    }

    return (

        <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Forgot Password
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Enter your primary or recovery email address below, and we will send you a link to reset your password.
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} fullWidth sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                    fullWidth
                    label="Primary or Recovery Email"
                    variant="standard"
                    margin="normal"
                    {...register("forgotPasswordEmail", { required: "Recovery email is required", pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Enter a valid email address" } })}
                    error={!!errors.recoveryEmail}
                    helperText={errors.recoveryEmail ? errors.recoveryEmail.message : ''}
                />
                <FormControl component="fieldset" margin="normal">
                    <Controller
                        name="isRecovery"
                        control={control}
                        defaultValue="false"
                        render={({ field }) => (
                            <RadioGroup row {...field}>
                                <FormControlLabel value="false" control={<Radio />} label="Primary" />
                                <FormControlLabel value="true" control={<Radio />} label="Recovery" />
                            </RadioGroup>
                        )}
                    />
                </FormControl>
                <Box display="flex" justifyContent="space-between" mt={4}>
                    <Button
                        variant="contained"
                        sx={{ bgcolor: '#1a73e8' }}
                        type='submit'
                    >
                        Send Reset Link
                    </Button>
                </Box>
            </Box>

            <Box
                display="flex"
                alignItems="center"         // vertical alignment
                justifyContent="center"     // horizontal alignment
                mt={4}
                fontSize={14}
            >
                <span>I remembered the password!&nbsp;</span>
                <Link
                    onClick={() => navigate('/login')}
                    underline="none"
                    sx={{ cursor: 'pointer', color: '#1a73e8', fontWeight: 500 }}
                >
                    Log In
                </Link>
            </Box>
        </Paper>
    );
};

export default ForgotPassword;
