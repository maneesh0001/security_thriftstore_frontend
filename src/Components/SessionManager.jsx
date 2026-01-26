import React, { useEffect, useRef, useState } from 'react';
import SessionTimeoutModal from './SessionTimeoutModal';
import axios from 'axios';

const SessionManager = ({ children, isAuthenticated }) => {
    const [showWarning, setShowWarning] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes in seconds
    const lastActivityRef = useRef(Date.now());
    const warningTimerRef = useRef(null);
    const logoutTimerRef = useRef(null);
    const activityCheckRef = useRef(null);

    const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds
    const WARNING_TIME = 28 * 60 * 1000; // 28 minutes (show warning 2 min before timeout)

    // Reset activity timestamp
    const updateActivity = () => {
        lastActivityRef.current = Date.now();
        resetTimers();
    };

    // Debounced activity tracker (max once per minute)
    const trackActivity = useRef(
        (() => {
            let timeout;
            return () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    updateActivity();
                    // Refresh session on backend
                    refreshSession();
                }, 60000); // Debounce for 1 minute
            };
        })()
    ).current;

    // Refresh session on backend
    const refreshSession = async () => {
        try {
            await axios.post(
                'http://localhost:5000/api/auth/refresh-session',
                {},
                { withCredentials: true }
            );
            console.log('[SESSION] Session refreshed');
        } catch (error) {
            console.error('[SESSION] Error refreshing session:', error);
            if (error.response?.data?.sessionExpired) {
                handleLogout();
            }
        }
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            await axios.post(
                'http://localhost:5000/api/auth/logout',
                {},
                { withCredentials: true }
            );
        } catch (error) {
            console.error('[SESSION] Error during logout:', error);
        }

        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirect to login
        window.location.href = '/login';
    };

    // Reset timers
    const resetTimers = () => {
        // Clear existing timers
        if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
        if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
        if (activityCheckRef.current) clearInterval(activityCheckRef.current);

        // Hide warning if shown
        setShowWarning(false);

        // Set warning timer (28 minutes)
        warningTimerRef.current = setTimeout(() => {
            setShowWarning(true);
            setTimeRemaining(120); // 2 minutes

            // Start countdown
            activityCheckRef.current = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        handleLogout();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }, WARNING_TIME);

        // Set logout timer (30 minutes)
        logoutTimerRef.current = setTimeout(() => {
            handleLogout();
        }, SESSION_TIMEOUT);
    };

    // Handle "Stay Logged In" button
    const handleStayLoggedIn = () => {
        updateActivity();
        refreshSession();
        setShowWarning(false);
    };

    useEffect(() => {
        if (!isAuthenticated) {
            // Clear timers if not authenticated
            if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
            if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
            if (activityCheckRef.current) clearInterval(activityCheckRef.current);
            return;
        }

        // Activity event listeners
        const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];

        events.forEach((event) => {
            window.addEventListener(event, trackActivity);
        });

        // Initialize timers
        resetTimers();

        // Cleanup
        return () => {
            events.forEach((event) => {
                window.removeEventListener(event, trackActivity);
            });

            if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
            if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
            if (activityCheckRef.current) clearInterval(activityCheckRef.current);
        };
    }, [isAuthenticated]);

    return (
        <>
            {children}
            {showWarning && (
                <SessionTimeoutModal
                    timeRemaining={timeRemaining}
                    onStayLoggedIn={handleStayLoggedIn}
                    onLogout={handleLogout}
                />
            )}
        </>
    );
};

export default SessionManager;
