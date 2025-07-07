// src/pages/Signup.jsx

import { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { request } from '../../utils/request'

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const appName = searchParams.get('appName');
    const redirectUrl = searchParams.get('redirectUrl');

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

     // Check if appName and redirectUrl are provided
    // and store them in localStorage if they are valid
    if (appName && redirectUrl) {
        const redirections = {
            portfolio: ["http://localhost:3001", "http://localhost:3000"],
            TestingSite: ["http://localhost:3001", "http://localhost:3000"],
        }
        if (redirections[appName]) {
            const isValidRedirect = redirections[appName].includes(redirectUrl);
            if (isValidRedirect) {
                localStorage.setItem("appName", appName)
                localStorage.setItem("redirectUrl", redirectUrl)
                console.log("use effect console signnup")

            } else {
                console.error("Invalid redirect URL for the specified app name.");
                return;
            }
        }
        // localStorage.setItem("appName", appName)
        // localStorage.setItem("redirectUrl", redirectUrl)
        // console.log("use effect console sihnup")
    }

    // Retrieve appName and redirectUrl from localStorage
    const getAppName = localStorage.getItem("appName");
    const getRedirectUrl = localStorage.getItem("redirectUrl");

    console.log("get all data signup page ->", getAppName, getRedirectUrl)
    // Function to handle sign form submission
    const onSubmit = async (data) => {
        try {
            const resData = await request({
                method: "post",
                url: "signup",
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password,
                    appName: getAppName,
                }
            });
            console.log("Response Data:", resData);
            if (resData.status === "user_exists") {
                alert(resData.message);
                reset();
                navigate(`/login`);

            }
            else if (resData.status === "success") {
                alert(resData.message);
                reset();
                navigate('/email-verification');
            } else {
                alert(resData.message)
                console.error("Signup failed:", resData.data);
                reset();

            }
        } catch (error) {
            console.log("Error during signup:", error);
            reset();
        }
    }

    return (

        <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 2 }}>


            <Typography variant="h5" fontWeight="bold" mb={2}>
                Sign Up
            </Typography>

            <Box component="form" fullWidth onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                    fullWidth
                    type="text"
                    label="First Name"
                    variant="standard"
                    margin="normal"
                    {...register("firstName", { required: "First name is required" })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                />

                <TextField
                    fullWidth
                    type="text"
                    label="Last Name"
                    variant="standard"
                    margin="normal"
                    {...register("lastName", { required: "Last name is required" })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                />

                <TextField
                    fullWidth
                    type="email"
                    label="Email Address"
                    variant="standard"
                    margin="normal"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Enter a valid email address",
                        },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />

                <TextField
                    fullWidth
                    label="Create Password"
                    variant="standard"
                    margin="normal"
                    type={showPassword ? 'text' : 'password'}
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
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
                    type="submit"
                >
                    Sign Up
                </Button>
            </Box>


            <Box mt={3} textAlign="center">
                <Typography variant="body2">
                    Already have an account?{' '}
                    <Link
                        onClick={() => navigate(`/login`)}
                        underline="none"
                        sx={{ cursor: 'pointer', color: '#1a73e8', fontWeight: 500 }}
                    >
                        Sign In
                    </Link>
                </Typography>
            </Box>
        </Paper>
    );
};

export default Signup;
