import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user data exists in localStorage
        // Note: Authentication is handled by session cookies, not tokens
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }

        setLoading(false);
    }, []);

    const signIn = async (userData) => {
        // Store user data for UI state (not for authentication)
        // Authentication is handled by HTTP-only session cookies
        // Merge with existing user data to preserve all fields
        const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
        const mergedUser = { ...existingUser, ...userData };
        
        localStorage.setItem("user", JSON.stringify(mergedUser));
        setUser(mergedUser);
        setIsAuthenticated(true);
    };

    const signOut = async () => {
        try {
            // Call backend to destroy session
            await fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                credentials: 'include' // Send session cookie
            });
        } catch (error) {
            console.error('Logout error:', error);
            // Continue with local cleanup even if backend call fails
        }

        // Clear user data from localStorage
        // Session is destroyed on the backend via logout endpoint
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
