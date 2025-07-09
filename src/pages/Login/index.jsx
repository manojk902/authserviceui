import { useEffect, useState } from 'react';
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
import { toast } from 'react-toastify';

const redirections = {
    portfolio: ["http://localhost:3001", "http://localhost:3000", "https://stage.driveosx.com"],
    testingsite: ["http://localhost:3001", "http://localhost:3000", "https://stage.driveosx.com"],
};

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const appName = searchParams.get('appName');
    const redirectUrl = searchParams.get('redirectUrl');
    const status = searchParams.get('status');
    const id = searchParams.get('id');

    // Validate and store appName and redirectUrl on mount
    useEffect(() => {
        if (appName && redirectUrl) {
            const isValidRedirect = redirections[appName]?.includes(redirectUrl);

            if (isValidRedirect) {
                localStorage.setItem("appName", appName);
                localStorage.setItem("redirectUrl", redirectUrl);
                console.log("✅ Valid redirect saved to localStorage");
            } else {
                toast.warn("Invalid redirect URL for the specified app name.");
                localStorage.removeItem("appName");
                localStorage.removeItem("redirectUrl");
            }
        }
    }, [appName, redirectUrl]);

    const getAppName = localStorage.getItem("appName");
    const getRedirectUrl = localStorage.getItem("redirectUrl");

    console.log("LOGIN Reditect url:", getRedirectUrl);

    const onSubmit = async (data) => {
        if (!getAppName || !getRedirectUrl || !redirections[getAppName]?.includes(getRedirectUrl)) {
            toast.warn("Redirect configuration is invalid or missing.");
            return;
        }

        try {
            const resData = await request({
                method: "post",
                url: "login",
                data: {
                    email: data.email,
                    password: data.password,
                    app_name: getAppName,
                }
            });

            if (resData.status === "success") {
                localStorage.setItem("token", resData.token);

                if (status === "activation-success" && id === resData.user.id.toString()) {
                    toast.success(resData.message);
                    navigate(`/recovery-email?id=${id}`);
                } else {
                    toast.success(resData.message);
                    window.location.href = `${getRedirectUrl}?token=${resData.token}`;
                    localStorage.removeItem("appName");
                    localStorage.removeItem("redirectUrl");
                }
                reset();
            } else {
                toast.error(resData.message || "Login failed");
                reset();
            }

        } catch (error) {
            console.error("Error during login:", error);
            toast.error("An error occurred during login. Please try again.");
            reset();
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>Log In</Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                    fullWidth
                    label="Email"
                    variant="standard"
                    margin="normal"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Enter a valid email address"
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />

                <TextField
                    fullWidth
                    label="Password"
                    variant="standard"
                    margin="normal"
                    type={showPassword ? 'text' : 'password'}
                    {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" }
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
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
