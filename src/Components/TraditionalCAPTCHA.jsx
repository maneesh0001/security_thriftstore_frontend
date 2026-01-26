import React, { useState, useEffect } from 'react';

const TraditionalCAPTCHA = ({ onVerify, onCaptchaChange }) => {
    const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isValid, setIsValid] = useState(null); // null = not validated yet, true = valid, false = invalid
    const [showError, setShowError] = useState(false);

    // Generate random CAPTCHA text
    const generateCaptcha = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaText(captcha);
        setUserInput('');
        setIsValid(null);
        setShowError(false);
        onCaptchaChange('');
        onVerify(false);
    };

    // Initialize CAPTCHA on mount
    useEffect(() => {
        generateCaptcha();
    }, []);

    // Validate user input
    const validateCaptcha = (input) => {
        setUserInput(input);
        
        if (input.length === 0) {
            setIsValid(null);
            setShowError(false);
            onCaptchaChange('');
            onVerify(false);
            return;
        }

        if (input.length < 6) {
            setIsValid(false);
            setShowError(false);
            onCaptchaChange('');
            onVerify(false);
            return;
        }

        const valid = input.toUpperCase() === captchaText.toUpperCase();
        setIsValid(valid);
        setShowError(!valid);
        onCaptchaChange(valid ? captchaText : '');
        onVerify(valid);
    };

    // Format CAPTCHA for display (add spaces)
    const displayCaptcha = captchaText.split('').join(' ');

    return (
        <div className="captcha-container bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                    Security Verification
                </label>
                <button
                    type="button"
                    onClick={generateCaptcha}
                    className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline"
                >
                    Reload Captcha
                </button>
            </div>
            
            {/* CAPTCHA Display */}
            <div className="bg-white border-2 border-gray-300 rounded p-3 mb-3 text-center">
                <div className="text-2xl font-mono font-bold text-gray-800 tracking-widest select-none">
                    {displayCaptcha}
                </div>
            </div>

            {/* User Input */}
            <div>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => validateCaptcha(e.target.value)}
                    placeholder="Enter the characters above"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm ${
                        isValid === true 
                            ? 'border-green-500 focus:ring-green-400' 
                            : isValid === false 
                            ? 'border-red-500 focus:ring-red-400'
                            : 'border-gray-300 focus:ring-indigo-400'
                    }`}
                    maxLength={6}
                />
                
                {/* Validation Messages */}
                {isValid === true && (
                    <div className="text-xs text-green-600 mt-1">
                        ✓ Verification successful
                    </div>
                )}
                
                {showError && isValid === false && (
                    <div className="text-xs text-red-600 mt-1">
                        ✗ Invalid CAPTCHA. Please try again.
                    </div>
                )}
            </div>

            {/* Instructions */}
            <div className="text-xs text-gray-500 mt-2">
                Enter the characters shown above (case-insensitive)
            </div>
        </div>
    );
};

export default TraditionalCAPTCHA;
