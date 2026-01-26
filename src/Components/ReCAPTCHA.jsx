import React, { useState, useEffect, useCallback } from 'react';

const ReCAPTCHA = ({ onVerify, action = 'submit' }) => {
    const [executeRecaptcha, setExecuteRecaptcha] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadReCaptcha = async () => {
            try {
                // Dynamic import to prevent build errors
                const module = await import('react-google-recaptcha-v3');
                const hook = module.useReCaptcha;
                
                // Create a wrapper component to use the hook
                const ReCaptchaWrapper = () => {
                    const { executeRecaptcha: execute } = hook();
                    return execute;
                };
                
                setExecuteRecaptcha(() => ReCaptchaWrapper);
                setLoaded(true);
            } catch (err) {
                console.error('Failed to load reCAPTCHA hook:', err);
                setError(err);
                setLoaded(true);
                onVerify(null); // Notify parent that reCAPTCHA failed
            }
        };

        loadReCaptcha();
    }, [onVerify]);

    const handleVerify = useCallback(async () => {
        if (!loaded || error) {
            onVerify(null);
            return;
        }

        if (!executeRecaptcha) {
            console.warn('reCAPTCHA not loaded');
            onVerify(null);
            return;
        }

        setIsVerifying(true);
        try {
            const execute = executeRecaptcha();
            const token = await execute(action);
            onVerify(token);
        } catch (err) {
            console.error('reCAPTCHA verification failed:', err);
            onVerify(null);
        } finally {
            setIsVerifying(false);
        }
    }, [executeRecaptcha, action, onVerify, loaded, error]);

    // Auto-execute on mount for invisible reCAPTCHA
    useEffect(() => {
        if (loaded && !error) {
            handleVerify();
        }
    }, [handleVerify, loaded, error]);

    if (error) {
        return (
            <div className="recaptcha-container">
                <div className="text-xs text-gray-500 mt-1">
                    Security verification temporarily unavailable.
                </div>
            </div>
        );
    }

    return (
        <div className="recaptcha-container">
            {isVerifying && (
                <div className="flex items-center justify-center p-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600 mr-2"></div>
                    <span className="text-xs text-gray-600">Verifying...</span>
                </div>
            )}
            <div className="text-xs text-gray-500 mt-1">
                This site is protected by reCAPTCHA and the Google{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    Privacy Policy
                </a>{' '}
                and{' '}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    Terms of Service
                </a>{' '}
                apply.
            </div>
        </div>
    );
};

export default ReCAPTCHA;
