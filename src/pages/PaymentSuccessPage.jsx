import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyPaymentPidx } from '../services/paymentService';
import { toast } from 'react-toastify';

const PaymentSuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [verifying, setVerifying] = useState(true);

    useEffect(() => {
        const verify = async () => {
            const searchParams = new URLSearchParams(location.search);
            const pidx = searchParams.get('pidx');
            const status = searchParams.get('status');
            
            if (searchParams.get('message') === 'User canceled') {
                toast.info('Payment cancelled');
                navigate('/cart');
                return;
            }

            if (pidx) {
                try {
                    console.log('Verifying payment with PIDX:', pidx);
                    const response = await verifyPaymentPidx(pidx);
                    console.log('Full verification response:', response);
                    console.log('Order info:', response?.order);
                    console.log('Order ID:', response?.orderId);
                    
                    toast.success('Payment verified successfully! 🎉');
                    
                    // Check if there's an order ID in the response
                    if (response?.order?._id) {
                        console.log('Redirecting to order details with order._id:', response.order._id);
                        navigate(`/user/orders/${response.order._id}`);
                    } else if (response?.orderId) {
                        console.log('Redirecting to order details with orderId:', response.orderId);
                        navigate(`/user/orders/${response.orderId}`);
                    } else {
                        console.log('No order ID found, redirecting to order history');
                        // Fallback to order history if no specific order ID
                        navigate('/user/orders');
                    }
                } catch (error) {
                    console.error('Verification error:', error);
                    toast.error(error.message || 'Payment verification failed');
                    navigate('/cart');
                } finally {
                    setVerifying(false);
                }
            } else {
                 setVerifying(false);
                 navigate('/cart');
            }
        };

        verify();
    }, [location, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="p-8 bg-white rounded-lg shadow-md text-center">
                {verifying ? (
                    <>
                        <h2 className="text-2xl font-bold mb-4 text-purple-600">Verifying Payment...</h2>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Please wait while we confirm your payment.</p>
                    </>
                ) : (
                    <h2 className="text-2xl font-bold mb-4">Redirecting...</h2>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
