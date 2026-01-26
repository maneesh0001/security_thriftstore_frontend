// frontend/src/Components/PasswordExpiryWarning.jsx
import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, Lock, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PasswordExpiryWarning = () => {
    const navigate = useNavigate();
    const [showWarning, setShowWarning] = useState(false);
    const [daysRemaining, setDaysRemaining] = useState(null);
    const [isExpired, setIsExpired] = useState(false);
    const [daysOverdue, setDaysOverdue] = useState(null);

    useEffect(() => {
        checkPasswordExpiry();
        
        // Check every hour
        const interval = setInterval(checkPasswordExpiry, 60 * 60 * 1000);
        
        return () => clearInterval(interval);
    }, []);

    const checkPasswordExpiry = async () => {
        try {
            const response = await axios.get('/api/password/expiry-status', {
                withCredentials: true
            });

            if (response.data.warning) {
                setShowWarning(true);
                setDaysRemaining(response.data.daysUntilExpiry);
                setIsExpired(false);
                
                // Show warning toast for non-expired passwords
                if (response.data.daysUntilExpiry <= 7) {
                    toast.warning(
                        `Your password will expire in ${response.data.daysUntilExpiry} days. Please consider changing it.`,
                        {
                            toastId: 'password-expiry-warning',
                            autoClose: 10000,
                            closeButton: true
                        }
                    );
                }
            } else if (response.data.expired) {
                setShowWarning(true);
                setIsExpired(true);
                setDaysOverdue(response.data.daysOverdue);
                
                toast.error(
                    'Your password has expired. Please change your password immediately.',
                    {
                        toastId: 'password-expired',
                        autoClose: false,
                        closeButton: true
                    }
                );
            }
        } catch (error) {
            // Check if error is due to expired password from API responses
            if (error.response?.data?.code === 'PASSWORD_EXPIRED') {
                setShowWarning(true);
                setIsExpired(true);
                setDaysOverdue(error.response.data.daysOverdue);
                
                toast.error(
                    'Your password has expired. Please change your password to continue.',
                    {
                        toastId: 'password-expired',
                        autoClose: false,
                        closeButton: true
                    }
                );
            }
        }
    };

    const handleChangePassword = () => {
        navigate('/change-password');
    };

    const handleDismiss = () => {
        if (!isExpired) {
            setShowWarning(false);
            toast.dismiss('password-expiry-warning');
        }
    };

    // Don't show if no warning needed
    if (!showWarning || (daysRemaining && daysRemaining > 7)) {
        return null;
    }

    const getWarningColor = () => {
        if (isExpired) return '#dc3545'; // Red
        if (daysRemaining <= 3) return '#dc3545'; // Red
        if (daysRemaining <= 5) return '#fd7e14'; // Orange
        return '#ffc107'; // Yellow
    };

    return (
        <div style={{ 
            ...styles.container, 
            borderLeftColor: getWarningColor(),
            backgroundColor: isExpired ? '#f8d7da' : '#fff3cd'
        }}>
            <div style={styles.content}>
                {isExpired ? (
                    <Lock size={20} style={{ color: getWarningColor(), marginRight: '12px' }} />
                ) : (
                    <Clock size={20} style={{ color: getWarningColor(), marginRight: '12px' }} />
                )}
                <div style={styles.textContainer}>
                    <p style={styles.title}>
                        {isExpired ? 'Password Expired' : 'Password Expiry Warning'}
                    </p>
                    <p style={styles.message}>
                        {isExpired ? (
                            <>
                                Your password expired <strong>{daysOverdue} day{daysOverdue !== 1 ? 's' : ''}</strong> ago.
                                You must change your password to continue using the application.
                            </>
                        ) : (
                            <>
                                Your password will expire in <strong>{daysRemaining} day{daysRemaining !== 1 ? 's' : ''}</strong>.
                                Please change it to maintain account security.
                            </>
                        )}
                    </p>
                </div>
                <div style={styles.buttonContainer}>
                    <button
                        onClick={handleChangePassword}
                        style={{
                            ...styles.changeButton,
                            backgroundColor: getWarningColor()
                        }}
                    >
                        {isExpired ? (
                            <>
                                <Lock size={14} style={{ marginRight: '6px' }} />
                                Change Now
                            </>
                        ) : (
                            <>
                                <AlertTriangle size={14} style={{ marginRight: '6px' }} />
                                Change Password
                            </>
                        )}
                    </button>
                    {!isExpired && (
                        <button
                            onClick={handleDismiss}
                            style={styles.dismissButton}
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        maxWidth: '400px',
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderLeft: '4px solid #ffc107',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        animation: 'slideIn 0.3s ease-out'
    },
    content: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: '16px'
    },
    textContainer: {
        flex: 1,
        marginRight: '12px'
    },
    title: {
        margin: '0 0 8px 0',
        fontSize: '14px',
        fontWeight: '600',
        color: '#856404'
    },
    message: {
        margin: 0,
        fontSize: '13px',
        color: '#856404',
        lineHeight: '1.4'
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    changeButton: {
        padding: '6px 12px',
        fontSize: '12px',
        fontWeight: '500',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        transition: 'opacity 0.2s'
    },
    dismissButton: {
        padding: '6px',
        fontSize: '12px',
        color: '#856404',
        backgroundColor: 'transparent',
        border: '1px solid #856404',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.2s'
    }
};

export default PasswordExpiryWarning;
