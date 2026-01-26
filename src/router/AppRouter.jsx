// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import LandingPage from "../pages/auth/LandingPage";
// import SignupPage from "../pages/auth/SignupPage";
// import LoginPage from "../pages/auth/loginpage";
// import ProtectedRoute from "../pages/auth/ProtectedRoute";
// import MainLayout from "../layouts/MainLayout";
// import AdminLayout from "../layouts/AdminLayout";
// import DashboardPage from "../pages/DashboardPage";
// import ProductPage from "../Components/admin/products/ProductPage";
// import OrderPage from "../Components/admin/orders/OrderPage";
// import { User } from "lucide-react";
// import UserPage from "../Components/admin/users/UserPage";
// import InventoryAlertPage from "../Components/admin/InventoryAlert/InventoryAlertPage";
// import SettingsPage from "../Components/admin/settings/SettingsPage";
// import Cart from "../Components/Dashboard/Cart";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";

// export default function AppRouter() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="/signup" element={<SignupPage />} />
//                 <Route path="/" element={<LandingPage />} />
//                 <Route path="/cart" element={<Cart/>} />

//                 <Route path="/admin/*" element={
//                     <ProtectedRoute allowedRoles={["admin"]}>
//                         <AdminLayout />
//                     </ProtectedRoute>
//                 } >
//                     <Route index element={<Navigate to="admin/dashboard" replace />} />
//                     <Route path="dashboard" element={<DashboardPage />} />
//                     <Route path="products" element={<ProductPage />} /> 
//                     <Route path="orders" element={<OrderPage />} /> 
//                     <Route path="users" element={<UserPage />} />
//                     <Route path="alerts" element={<InventoryAlertPage />} />
//                     <Route path="settings" element={<SettingsPage />} />






//                 </Route>

//                 <Route path="/user/*" element={
//                     <ProtectedRoute allowedRoles={["user"]}>
//                         <MainLayout />
//                     </ProtectedRoute>
//                 } />
//             </Routes>
//         </BrowserRouter>

//     );
// }




import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/auth/LandingPage";
import SignupPage from "../pages/auth/SignupPage";
import LoginPage from "../pages/auth/LoginPage";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import UnauthorizedPage from "../pages/auth/UnauthorizedPage";
import EmailVerification from "../pages/auth/EmailVerification";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ChangePassword from "../pages/auth/ChangePassword";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import HomePage from "../Components/Dashboard/HomePage";
import DashboardPage from "../pages/DashboardPage";
import ProductPage from "../Components/admin/products/ProductPage";
import OrderPage from "../Components/admin/orders/OrderPage";
import UserPage from "../Components/admin/users/UserPage";
import InventoryAlertPage from "../Components/admin/InventoryAlert/InventoryAlertPage";
import SettingsPage from "../Components/admin/settings/SettingsPage";
import ProfilePage from "../pages/ProfilePage";
import AdminProfilePage from "../Components/admin/profile/AdminProfilePage";
import Cart from "../Components/Dashboard/Cart";
import CheckoutPage from "../Components/Dashboard/CheckoutPage";
import OrderHistoryPage from "../pages/OrderHistoryPage";
import OrderDetailsPage from "../pages/OrderDetailsPage";

export default function AppRouter() {
    return (
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />

                {/* Email Verification & Password Reset Routes */}
                <Route path="/verify-email/:token" element={<EmailVerification />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/change-password" element={<ChangePassword />} />

                <Route path="/payment/success" element={<PaymentSuccessPage />} />
                {/* Profile Route - Accessible to all authenticated users */}
                <Route path="/profile" element={
                    <ProtectedRoute allowedRoles={["admin", "user"]}>
                        <ProfilePage />
                    </ProtectedRoute>
                } />

                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="products" element={<ProductPage />} />
                    <Route path="orders" element={<OrderPage />} />
                    <Route path="users" element={<UserPage />} />
                    <Route path="alerts" element={<InventoryAlertPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="profile" element={<AdminProfilePage />} /> {/* Added comprehensive admin profile route */}
                </Route>

                <Route
                    path="/user/*"
                    element={
                        <ProtectedRoute allowedRoles={["user"]}>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<HomePage />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                    <Route path="orders" element={<OrderHistoryPage />} />
                    <Route path="orders/:orderId" element={<OrderDetailsPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
