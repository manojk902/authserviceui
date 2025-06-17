import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import RecoveryEmail from "../pages/RecoveryEmail";
import EmailVerification from "../pages/EmailVerification";
import Layout from '../Layout';

const NavRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Login />} />
                    <Route path="Login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="email-verification" element={<EmailVerification />} />
                    <Route path="recovery-email" element={<RecoveryEmail />} />
                    <Route path="reset-password" element={<ResetPassword />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default NavRoutes