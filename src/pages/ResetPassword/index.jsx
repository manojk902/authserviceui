// src/pages/ResetPassword.jsx

import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { request } from '../../utils/request';
const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const resetPasswordToken = searchParams.get('resetPasswordToken');
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit =async (data) => {
        try {
            const resData =await request({
                method: "post",
                url: "reset-password",
                data: {
                    resetPasswordToken: resetPasswordToken,
                    newPassword: data.newPassword
                }
            })
            console.log("Response Data:", resData);
            if (resData.status === "success") {
                alert(resData.message);
                reset();
                navigate('/login');
            }else{
                alert(resData.message);
                reset();
                navigate('/forgot-password');
            }
        } catch (error) {
            alert("Error during resetting password:", error);
            reset();
        }

    };

    return (

        <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
                Enter your new password
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} fullWidth sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    margin="normal"
                    variant='standard'
                    {...register("newPassword", { required: "New password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword ? errors.newPassword.message : ''}
                />

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, bgcolor: '#1a73e8' }}
                    type='submit'
                >
                    Confirm
                </Button>
            </Box>

        </Paper>
    );
};

export default ResetPassword;
