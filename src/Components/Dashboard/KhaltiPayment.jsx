// src/Components/Dashboard/KhaltiPayment.jsx
import React, { useState } from 'react';
import KhaltiCheckout from 'khalti-checkout-web';
import { initiatePayment, verifyPayment } from '../../services/paymentService';
import { toast } from 'react-toastify';

const KhaltiPayment = ({ amount, productInfo, onSuccess, onError, onCancel, validateForm }) => {
    const [loading, setLoading] = useState(false);
    const [paymentId, setPaymentId] = useState(null);

    const handlePayment = async () => {
        // Validate form before initiating payment
        if (validateForm && !validateForm()) {
            return;
        }

        try {
            setLoading(true);

            // Convert amount to paisa (Khalti uses paisa, 1 NPR = 100 paisa)
            const amountInPaisa = Math.round(amount * 100);

            // Step 1: Initiate payment with backend
            const initiateResponse = await initiatePayment(amountInPaisa, productInfo);

            // Check if backend returned a payment URL (Khalti ePayment API v2)
            if (initiateResponse.payment_url) {
                 window.location.href = initiateResponse.payment_url;
                 return;
            }

            const { paymentId: newPaymentId, publicKey } = initiateResponse;
            setPaymentId(newPaymentId);

            console.log('Payment initiated:', newPaymentId);
            console.log('Received public key from backend:', publicKey);

            // Validate public key - must be provided by backend
            if (!publicKey || publicKey === 'undefined' || publicKey === 'null' || publicKey.trim() === '') {
                throw new Error('Invalid Khalti public key received from server. Please check backend configuration.');
            }

            // Ensure it's a valid test or live key format
            if (!publicKey.startsWith('test_public_key_') && !publicKey.startsWith('live_public_key_') && publicKey.length !== 32) {
                console.warn('Warning: Khalti public key format may be invalid. Expected test_public_key_ or live_public_key_ prefix, or 32-character key for ePayment API');
            }

            console.log('Using validated public key:', publicKey);

            // Step 2: Configure Khalti Checkout
            const config = {
                publicKey: publicKey,
                productIdentity: newPaymentId,
                productName: productInfo.name || 'Thrift Store Purchase',
                productUrl: window.location.href,
                eventHandler: {
                    // Payment success callback
                    onSuccess: async (payload) => {
                        console.log('Khalti Payment Success:', payload);

                        try {
                            // Step 3: Verify payment with backend
                            const verifyResponse = await verifyPayment(
                                payload.token,
                                payload.amount,
                                newPaymentId
                            );

                            console.log('Payment verified:', verifyResponse);

                            toast.success('Payment successful! 🎉');
                            setLoading(false);

                            // Call success callback
                            if (onSuccess) {
                                onSuccess(verifyResponse);
                            }
                        } catch (error) {
                            console.error('Payment verification failed:', error);
                            toast.error(error.message || 'Payment verification failed');
                            setLoading(false);

                            if (onError) {
                                onError(error);
                            }
                        }
                    },

                    // Payment error callback
                    onError: (error) => {
                        console.error('Khalti Payment Error:', error);
                        toast.error('Payment failed. Please try again.');
                        setLoading(false);

                        if (onError) {
                            onError(error);
                        }
                    },

                    // Payment close/cancel callback
                    onClose: () => {
                        console.log('Khalti checkout closed');
                        toast.info('Payment cancelled');
                        setLoading(false);

                        if (onCancel) {
                            onCancel();
                        }
                    },
                },
                paymentPreference: ['KHALTI', 'EBANKING', 'MOBILE_BANKING', 'CONNECT_IPS', 'SCT'],
            };

            // Step 4: Open Khalti checkout
            const checkout = new KhaltiCheckout(config);
            checkout.show({ amount: amountInPaisa });

        } catch (error) {
            console.error('Payment initiation error:', error);
            toast.error(error.message || 'Failed to initiate payment');
            setLoading(false);

            if (onError) {
                onError(error);
            }
        }
    };

    return (
        <div className="khalti-payment-container">
            <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                        </svg>
                        Pay with Khalti - NPR {amount.toFixed(2)}
                    </>
                )}
            </button>

            {/* Khalti Logo and Info */}
            <div className="mt-3 text-center">
                <p className="text-sm text-gray-600">
                    Secure payment powered by{' '}
                    <span className="font-semibold text-purple-600">Khalti</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    🔒 Test Mode: Use mobile 9800000000, MPIN 1111, OTP 987654
                </p>
            </div>
        </div>
    );
};

export default KhaltiPayment;
