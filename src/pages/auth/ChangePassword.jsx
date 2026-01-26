// frontend/src/pages/auth/ChangePassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import PasswordStrengthMeter from '../../Components/PasswordStrengthMeter';

const ChangePassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validate passwords match
        if (formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/password/change', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include session cookies
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                setError(data.message || 'Failed to change password');

                // Show specific error for password in history
                if (data.passwordInHistory) {
                    setError('You cannot reuse any of your last 5 passwords. Please choose a different password.');
                }

                // Show validation errors if any
                if (data.errors && data.errors.length > 0) {
                    setError(data.errors.map(err => err.message).join(', '));
                }
            }
        } catch (error) {
            console.error('Change password error:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords({
            ...showPasswords,
            [field]: !showPasswords[field],
        });
    };

    if (success) {
        return (
            <div style={styles.container}>
                <div style={styles.successCard}>
                    <CheckCircle size={64} style={{ color: '#28a745', marginBottom: '20px' }} />
                    <h2 style={styles.successTitle}>Password Changed Successfully!</h2>
                    <p style={styles.successMessage}>
                        Your password has been updated. Redirecting to dashboard...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <Lock size={40} style={{ color: '#667eea' }} />
                    <h2 style={styles.title}>Change Password</h2>
                    <p style={styles.subtitle}>
                        Update your password to keep your account secure
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {error && (
                        <div style={styles.errorAlert}>
                            {error}
                        </div>
                    )}

                    {/* Current Password */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Current Password</label>
                        <div style={styles.passwordInputContainer}>
                            <input
                                type={showPasswords.current ? 'text' : 'password'}
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                required
                                style={styles.input}
                                placeholder="Enter your current password"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('current')}
                                style={styles.eyeButton}
                            >
                                {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>New Password</label>
                        <div style={styles.passwordInputContainer}>
                            <input
                                type={showPasswords.new ? 'text' : 'password'}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                                style={styles.input}
                                placeholder="Enter your new password"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('new')}
                                style={styles.eyeButton}
                            >
                                {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Password Strength Meter */}
                        <PasswordStrengthMeter password={formData.newPassword} />
                    </div>

                    {/* Confirm New Password */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Confirm New Password</label>
                        <div style={styles.passwordInputContainer}>
                            <input
                                type={showPasswords.confirm ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                style={styles.input}
                                placeholder="Confirm your new password"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirm')}
                                style={styles.eyeButton}
                            >
                                {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.submitButton,
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {loading ? 'Changing Password...' : 'Change Password'}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        style={styles.cancelButton}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
    },
    successCard: {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        padding: '60px 40px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
    },
    header: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    title: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#333',
        marginTop: '15px',
        marginBottom: '10px',
    },
    subtitle: {
        fontSize: '14px',
        color: '#666',
        margin: 0,
    },
    successTitle: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#28a745',
        marginBottom: '10px',
    },
    successMessage: {
        fontSize: '16px',
        color: '#666',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '8px',
    },
    passwordInputContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: '12px',
        paddingRight: '45px',
        fontSize: '14px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    eyeButton: {
        position: 'absolute',
        right: '12px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#666',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
    },
    submitButton: {
        padding: '14px',
        backgroundColor: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        marginTop: '10px',
    },
    cancelButton: {
        padding: '12px',
        backgroundColor: 'transparent',
        color: '#667eea',
        border: '1px solid #667eea',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    errorAlert: {
        padding: '12px',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        borderRadius: '6px',
        fontSize: '14px',
        border: '1px solid #f5c6cb',
    },
};

export default ChangePassword;
