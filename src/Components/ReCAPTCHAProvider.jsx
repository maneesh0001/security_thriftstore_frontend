import React, { useState, useEffect } from 'react';

const ReCAPTCHAProvider = ({ children }) => {
    const [ReCaptchaProvider, setReCaptchaProvider] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    useEffect(() => {
        const loadReCaptcha = async () => {
            try {
                // Skip if site key is not configured
                if (!siteKey || siteKey === 'your-recaptcha-site-key') {
                    console.warn('reCAPTCHA site key not configured');
                    setLoading(false);
                    return;
                }

                // Dynamic import to prevent build errors
                const module = await import('react-google-recaptcha-v3');
                setReCaptchaProvider(module.GoogleReCaptchaProvider);
                setLoading(false);
            } catch (err) {
                console.error('Failed to load reCAPTCHA:', err);
                setError(err);
                setLoading(false);
            }
        };

        loadReCaptcha();
    }, [siteKey]);

    if (loading) {
        return <>{children}</>;
    }

    if (error || !ReCaptchaProvider) {
        console.warn('reCAPTCHA not available, continuing without it');
        return <>{children}</>;
    }

    return (
        <ReCaptchaProvider reCaptchaKey={siteKey}>
            {children}
        </ReCaptchaProvider>
    );
};

export default ReCAPTCHAProvider;
