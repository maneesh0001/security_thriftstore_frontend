import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import TwoFactorVerification from "../../Components/TwoFactorVerification";
import TraditionalCAPTCHA from "../../Components/TraditionalCAPTCHA";

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [require2FA, setRequire2FA] = useState(false);
    const [loginData, setLoginData] = useState(null);
    const [captchaValid, setCaptchaValid] = useState(false);
    const [captchaText, setCaptchaText] = useState('');
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [loginAttempt, setLoginAttempt] = useState(null);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values) => {
            await handleLogin(values);
        },
    });

    const handleLogin = async (values, twoFactorToken = null) => {
        // If CAPTCHA is not shown yet, show it first
        if (!showCaptcha && !twoFactorToken) {
            setLoginAttempt(values);
            setShowCaptcha(true);
            setError("");
            return;
        }

        // If CAPTCHA is shown but not valid, show error
        if (showCaptcha && !captchaValid && !twoFactorToken) {
            setError("Please complete the security verification correctly.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            // Use stored login attempt or current values
            const loginCredentials = loginAttempt || values;
            
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email: loginCredentials.email,
                password: loginCredentials.password,
                twoFactorToken: twoFactorToken,
                captchaText: captchaText,
            }, {
                withCredentials: true // Enable session cookies
            });

            // Check if 2FA is required
            if (response.data.require2FA) {
                setRequire2FA(true);
                setLoginData(loginAttempt || values);
                setIsLoading(false);
                return;
            }

            // Successful login - session is created via HTTP-only cookie
            const { user } = response.data; // No token needed
            localStorage.setItem("user", JSON.stringify(user)); // Store user data for UI

            // Navigate based on role
            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/user");
            }
        } catch (err) {
            setIsLoading(false);

            // Reset CAPTCHA on error
            if (showCaptcha) {
                setShowCaptcha(false);
                setCaptchaValid(false);
                setCaptchaText('');
                setLoginAttempt(null);
            }

            // Handle specific error cases
            if (err.response?.data?.locked) {
                const lockTime = err.response.data.lockTimeRemaining;
                setError(`🔒 Account locked due to multiple failed login attempts. Please try again in ${lockTime} minutes.`);
            } else if (err.response?.data?.emailNotVerified) {
                setError("📧 Please verify your email before logging in. Check your inbox for verification link.");
            } else if (err.response?.data?.passwordExpired) {
                setError("⏰ Your password has expired. You will be redirected to change your password.");
                // Redirect to change password after a short delay
                setTimeout(() => {
                    navigate("/change-password");
                }, 2000);
            } else if (err.response?.data?.captchaRequired) {
                setError("⚠️ Security verification required. Please try again.");
            } else if (err.response?.data?.remainingAttempts !== undefined) {
                const remaining = err.response.data.remainingAttempts;
                setError(`❌ Invalid credentials. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining before account lockout.`);
            } else {
                setError(err.response?.data?.message || "Login failed. Please try again.");
            }
        }
    };

    const handle2FAVerification = async (code) => {
        if (loginData || loginAttempt) {
            await handleLogin(loginData || loginAttempt, code);
        }
    };

    const resetLoginFlow = () => {
        setShowCaptcha(false);
        setCaptchaValid(false);
        setCaptchaText('');
        setLoginAttempt(null);
        setError("");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('https://i.pinimg.com/736x/bb/fe/36/bbfe36ac201b275daa9baf567853d7ee.jpg')] bg-cover bg-center px-4">
            <div className="bg-white bg-opacity-60 backdrop-blur-md shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

                <form onSubmit={formik.handleSubmit} className="space-y-4" noValidate>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.email && formik.errors.email
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-indigo-400"
                                }`}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.password && formik.errors.password
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-indigo-400"
                                }`}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-600 text-sm mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    {/* Forgot Password Link */}
                    <div className="text-right">
                        <Link to="/forgot-password" className="text-sm text-indigo-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Traditional CAPTCHA - Show only after initial login attempt */}
                    {showCaptcha && (
                        <div className="space-y-4">
                            <TraditionalCAPTCHA 
                                onVerify={setCaptchaValid}
                                onCaptchaChange={setCaptchaText}
                            />
                            
                            {/* Reset Button */}
                            <button
                                type="button"
                                onClick={resetLoginFlow}
                                className="w-full text-sm text-gray-600 hover:text-gray-800 hover:underline"
                            >
                                ← Back to login form
                            </button>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full ${isLoading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
                            } text-white font-medium py-2 px-4 rounded-md transition`}
                    >
                        {showCaptcha ? (isLoading ? "Verifying..." : "Verify & Sign In") : (isLoading ? "Signing In..." : "Sign In")}
                    </button>

                    {/* Server error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}
                </form>

                <div className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <button
                        onClick={() => navigate("/signup")}
                        className="text-indigo-600 hover:underline"
                    >
                        Register
                    </button>
                </div>
            </div>

            {/* 2FA Verification Modal */}
            {require2FA && (
                <TwoFactorVerification
                    onVerify={handle2FAVerification}
                    onCancel={() => {
                        setRequire2FA(false);
                        setLoginData(null);
                        setIsLoading(false);
                    }}
                    loading={isLoading}
                />
            )}
        </div>
    );
};

export default LoginPage;
