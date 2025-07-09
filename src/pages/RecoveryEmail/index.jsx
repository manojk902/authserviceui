// src/pages/RecoveryEmail.jsx

import React from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { request } from '../../utils/request';

const RecoveryEmail = () => {
    const [searchParams] = useSearchParams();

    const getRedirectUrl = localStorage.getItem("redirectUrl") // Default redirect URL if not set
    console.log("get all data recovery email->", getRedirectUrl)
    const token = localStorage.getItem("token"); // Get token from local storage
    console.log("Local storage Redirect URL:", getRedirectUrl);
    console.log("RECOVERY Reditect url:", getRedirectUrl);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // Function to handle adding recovery email
    const onSubmit = async (data) => {
        try {
            const id = searchParams.get('id');
            if (!id) {
                throw new Error("ID parameter is missing in the URL");
            }
            const resData = await request({
                method: "post",
                url: "recovery-email",
                data: {
                    id: id,
                    recoveryEmail: data.recoveryEmail
                }
            })
            console.log("Response Data:", resData);
            console.log("Response Data status:", resData.status);
            if (resData.status === "success") {
                alert(resData.message);
                window.location.href = `${getRedirectUrl}?token${token}`;
                localStorage.removeItem("appName");
                localStorage.removeItem("redirectUrl");
                reset();
            } else {
                console.error("Failed to add recovery email:", resData.message);
                reset();
            }
        } catch (error) {
            console.log("Error during adding recovery email:", error);
            reset();
        }
        console.log('Recovery email added successfully!', data); // Placeholder for actual logic
        reset();
    }

    return (

        <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={1}>
                Email Recovery (Optional)
            </Typography>
            <Typography variant="body2" mb={3}>
                Add a recovery email to help secure your account. You can skip this step if you prefer.
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} fullWidth sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                    fullWidth
                    label="Recovery Email"
                    variant="standard"
                    margin="normal"
                    {...register("recoveryEmail", { required: "Recovery email is required", pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Enter a valid email address" } })}
                    error={!!errors.recoveryEmail}
                    helperText={errors.recoveryEmail ? errors.recoveryEmail.message : ''}
                />

                <Box display="flex" justifyContent="space-between" mt={4}>
                    <Button
                        variant="text"
                        type='button'
                        onClick={() => window.location.href = `${getRedirectUrl}?token=${token}`}
                    >
                        Skip & Go to Site
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ bgcolor: '#1a73e8' }}
                        type='submit'
                    >
                        Add
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default RecoveryEmail;
