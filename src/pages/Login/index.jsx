// src/pages/Login.jsx
import { useState } from 'react';
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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { request } from '../../utils/request';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const appName = searchParams.get('appName');
    const redirectUrl = searchParams.get('redirectUrl');
    const status = searchParams.get('status');
    const id = searchParams.get('id');
    const { register, handleSubmit, formState: { errors }, reset } = useForm();


    // Check if appName and redirectUrl are provided
    // and store them in localStorage if they are valid
    if (appName && redirectUrl) {
        const redirections = {
            portfolio: ["http://localhost:3001", "http://localhost:3000","https://stage.driveosx.com"],
            TestingSite: ["http://localhost:3001", "http://localhost:3000","https://stage.driveosx.com"],
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

    console.log("all get data login page", getAppName, getRedirectUrl)
    // Function to handle login form submission
    const onSubmit = async (data) => {
        try {

            const resData = await request({
                method: "post",
                url: "login",
                data: {
                    email: data.email,
                    password: data.password,
                    app_name: getAppName,
                }
            })
            console.log("Response Data:", resData);
            if (resData.status === "success") {
                localStorage.setItem("token", resData.token);
                console.log("before Redirecting to recovery email with ID:", typeof (status), typeof (id), typeof (Number(resData.user.id)));

                if (status === "activation-success" && id === resData.user.id.toString()) {
                    alert(resData.message);
                    console.log("with status after Redirecting to recovery email with ID:", status, id, resData.user.id);
                    navigate(`/recovery-email?id=${id}`);
                    reset();
                } else {
                    alert(resData.message);
                    console.log("no status after Redirecting to recovery email with ID:", status, id, resData.user.id);
                    window.location.href = (`${getRedirectUrl}?token=${resData.token}`);
                    reset();
                }

            } else if (resData.status === "user_not_found") {
                alert(resData.message);
                reset();
            } else if (resData.status === "fill_all_feilds") {
                alert(resData.message)
                reset();
            } else if (resData.status === "account_locked") {
                alert(resData.message);
                reset();
            } else if (resData.status === "invalid_password") {
                alert(resData.message);
                reset();
            } else if (resData.status === "user_suspended") {
                alert(resData.message);
                reset();
            } else if (resData.status === "user_deactivated") {
                alert(resData.message);
                reset();
            } else if (resData.status === "user_deleted") {
                alert(resData.message);
                reset();
            } else if (resData.status === "user_not_verified") {
                alert(resData.message);
                reset();
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again.");
            reset();
        }
    }

    return (

        <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
                Log In
            </Typography>

            <Box component="form" fullWidth onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                    fullWidth
                    label="Email "
                    variant="standard"
                    margin="normal"
                    {...register("email", { required: "Email is required", pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Enter a valid email address" } })}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                />

                <TextField
                    fullWidth
                    label="Password"
                    variant="standard"
                    margin="normal"
                    type={showPassword ? 'text' : 'password'}
                    {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
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

                <Button fullWidth variant="contained" sx={{ bgcolor: '#1a73e8' }} type='submit'>
                    Sign in
                </Button>
            </Box>

            <Box mt={3} textAlign="center">
                <Typography variant="body2">
                    Don’t have an account?{' '}
                    <Link
                        onClick={() => navigate('/signup')}
                        underline="none"
                        sx={{ cursor: 'pointer', color: '#1a73e8', fontWeight: 500 }}
                    >
                        Sign up
                    </Link>
                </Typography>
            </Box>
        </Paper>
    );
};

export default Login;
