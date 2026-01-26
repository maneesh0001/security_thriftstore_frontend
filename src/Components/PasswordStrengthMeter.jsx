// frontend/src/Components/PasswordStrengthMeter.jsx
import React, { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';
import { Check, X } from 'lucide-react';

const PasswordStrengthMeter = ({ password }) => {
    const [strength, setStrength] = useState(null);
    const [requirements, setRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        symbol: false,
    });

    useEffect(() => {
        if (!password) {
            setStrength(null);
            setRequirements({
                length: false,
                uppercase: false,
                lowercase: false,
                number: false,
                symbol: false,
            });
            return;
        }

        // Check password strength using zxcvbn
        const result = zxcvbn(password);
        setStrength(result);

        // Check password requirements
        setRequirements({
            length: password.length >= 12,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            symbol: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password),
        });
    }, [password]);

    const getStrengthLabel = (score) => {
        const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
        return labels[score] || '';
    };

    const getStrengthColor = (score) => {
        const colors = [
            '#dc3545', // Very Weak - Red
            '#dc3545', // Weak - Red
            '#fd7e14', // Fair - Orange
            '#ffc107', // Good - Yellow
            '#28a745', // Strong - Green
        ];
        return colors[score] || '#6c757d';
    };

    const getStrengthWidth = (score) => {
        return `${(score + 1) * 20}%`;
    };

    if (!password) return null;

    return (
        <div className="password-strength-meter" style={styles.container}>
            {/* Strength Bar */}
            <div style={styles.barContainer}>
                <div
                    style={{
                        ...styles.bar,
                        width: strength ? getStrengthWidth(strength.score) : '0%',
                        backgroundColor: strength ? getStrengthColor(strength.score) : '#6c757d',
                    }}
                />
            </div>

            {/* Strength Label */}
            {strength && (
                <div style={styles.labelContainer}>
                    <span style={{ ...styles.label, color: getStrengthColor(strength.score) }}>
                        {getStrengthLabel(strength.score)}
                    </span>
                    {strength.feedback.warning && (
                        <span style={styles.warning}>{strength.feedback.warning}</span>
                    )}
                </div>
            )}

            {/* Requirements Checklist */}
            <div style={styles.requirementsContainer}>
                <p style={styles.requirementsTitle}>Password Requirements:</p>
                <div style={styles.requirementsList}>
                    <RequirementItem
                        met={requirements.length}
                        text="At least 12 characters"
                    />
                    <RequirementItem
                        met={requirements.uppercase}
                        text="One uppercase letter (A-Z)"
                    />
                    <RequirementItem
                        met={requirements.lowercase}
                        text="One lowercase letter (a-z)"
                    />
                    <RequirementItem
                        met={requirements.number}
                        text="One number (0-9)"
                    />
                    <RequirementItem
                        met={requirements.symbol}
                        text="One special symbol (!@#$%^&*...)"
                    />
                </div>
            </div>

            {/* Suggestions */}
            {strength && strength.feedback.suggestions && strength.feedback.suggestions.length > 0 && (
                <div style={styles.suggestionsContainer}>
                    <p style={styles.suggestionsTitle}>Suggestions:</p>
                    <ul style={styles.suggestionsList}>
                        {strength.feedback.suggestions.map((suggestion, index) => (
                            <li key={index} style={styles.suggestionItem}>{suggestion}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const RequirementItem = ({ met, text }) => (
    <div style={styles.requirementItem}>
        {met ? (
            <Check size={16} style={{ color: '#28a745', marginRight: '8px' }} />
        ) : (
            <X size={16} style={{ color: '#dc3545', marginRight: '8px' }} />
        )}
        <span style={{ color: met ? '#28a745' : '#6c757d', fontSize: '14px' }}>
            {text}
        </span>
    </div>
);

const styles = {
    container: {
        marginTop: '10px',
        marginBottom: '15px',
    },
    barContainer: {
        width: '100%',
        height: '8px',
        backgroundColor: '#e9ecef',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '8px',
    },
    bar: {
        height: '100%',
        transition: 'width 0.3s ease, background-color 0.3s ease',
        borderRadius: '4px',
    },
    labelContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
    },
    label: {
        fontSize: '14px',
        fontWeight: '600',
    },
    warning: {
        fontSize: '12px',
        color: '#dc3545',
        fontStyle: 'italic',
    },
    requirementsContainer: {
        marginTop: '15px',
        padding: '12px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        border: '1px solid #dee2e6',
    },
    requirementsTitle: {
        fontSize: '13px',
        fontWeight: '600',
        marginBottom: '8px',
        color: '#495057',
    },
    requirementsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    requirementItem: {
        display: 'flex',
        alignItems: 'center',
    },
    suggestionsContainer: {
        marginTop: '12px',
        padding: '10px',
        backgroundColor: '#fff3cd',
        borderRadius: '6px',
        border: '1px solid #ffc107',
    },
    suggestionsTitle: {
        fontSize: '13px',
        fontWeight: '600',
        marginBottom: '6px',
        color: '#856404',
    },
    suggestionsList: {
        margin: 0,
        paddingLeft: '20px',
    },
    suggestionItem: {
        fontSize: '12px',
        color: '#856404',
        marginBottom: '4px',
    },
};

export default PasswordStrengthMeter;
