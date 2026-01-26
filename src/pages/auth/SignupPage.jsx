import React, { useState } from "react";
import useSignupHook from "../../hooks/useSignupHook";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordStrengthMeter from "../../Components/PasswordStrengthMeter";
import TraditionalCAPTCHA from "../../Components/TraditionalCAPTCHA";

const SignupPage = () => {
  const { mutate, isLoading, error } = useSignupHook();
  const [captchaValid, setCaptchaValid] = useState(false);
  const [captchaText, setCaptchaText] = useState('');

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(12, "Password must be at least 12 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/, "Password must contain at least one special symbol")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      // Validate CAPTCHA before proceeding
      if (!captchaValid) {
        alert("Please complete the security verification correctly.");
        return;
      }

      mutate(
        {
          name: values.name,
          email: values.email,
          password: values.password,
          captchaText: captchaText,
        },
        {
          onSuccess: () => {
            formik.resetForm();
            // Show email verification message
            alert("✅ Registration successful! Please check your email to verify your account before logging in.");
          },
        }
      );
    },
  });

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 px-4">
    <div className="min-h-screen flex items-center justify-center bg-[url('https://i.pinimg.com/736x/bb/fe/36/bbfe36ac201b275daa9baf567853d7ee.jpg')] bg-cover bg-center px-4">
      {/* <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"> */}
      <div className="bg-white bg-opacity-60 backdrop-blur-md shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4" noValidate>

          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.name && formik.errors.name
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-indigo-400"
                }`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
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

            {/* Password Strength Meter */}
            <PasswordStrengthMeter password={formik.values.password} />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-indigo-400"
                }`}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${isLoading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
              } text-white font-medium py-2 px-4 rounded-md transition`}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Server Error */}
          {error && (
            <p className="text-red-600 text-center mt-2">
              {error.message || "Signup failed. Please try again."}
            </p>
          )}
        </form>

        <div className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
