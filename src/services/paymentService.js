// src/services/paymentService.js
import instance from '../api/Api';

/**
 * Initiate Khalti payment
 * @param {number} amount - Amount in paisa (1 NPR = 100 paisa)
 * @param {object} productInfo - Product/order information
 * @param {string} orderId - Optional order ID
 * @returns {Promise} Payment initiation response
 */
export const initiatePayment = async (amount, productInfo, orderId = null) => {
    try {
        const response = await instance.post(
            `/payments/khalti/initiate`,
            {
                amount,
                productInfo,
                orderId,
            }
        );
        return response.data;
    } catch (error) {
        console.error('Payment Initiation Error:', error);
        throw error.response?.data || { message: 'Failed to initiate payment' };
    }
};

/**
 * Verify Khalti payment
 * @param {string} token - Khalti payment token
 * @param {number} amount - Amount in paisa
 * @param {string} paymentId - Payment record ID from initiation
 * @returns {Promise} Payment verification response
 */
export const verifyPayment = async (token, amount, paymentId) => {
    try {
        const response = await instance.post(
            `/payments/khalti/verify`,
            {
                token,
                amount,
                paymentId,
            }
        );
        return response.data;
    } catch (error) {
        console.error('Payment Verification Error:', error);
        throw error.response?.data || { message: 'Failed to verify payment' };
    }
};

/**
 * Get payment history for current user
 * @returns {Promise} List of payments
 */
export const getPaymentHistory = async () => {
    try {
        const response = await instance.get(`/payments/history`);
        return response.data;
    } catch (error) {
        console.error('Get Payment History Error:', error);
        throw error.response?.data || { message: 'Failed to fetch payment history' };
    }
};

/**
 * Get payment by ID
 * @param {string} paymentId - Payment ID
 * @returns {Promise} Payment details
 */
export const getPaymentById = async (paymentId) => {
    try {
        const response = await instance.get(`/payments/${paymentId}`);
        return response.data;
    } catch (error) {
        console.error('Get Payment Error:', error);
        throw error.response?.data || { message: 'Failed to fetch payment' };
    }
};

export default {
    initiatePayment,
    verifyPayment,
    getPaymentHistory,
    getPaymentById,
};

/**
 * Verify Khalti payment using PIDX (v2)
 * @param {string} pidx - Khalti payment index
 * @returns {Promise} Payment verification response
 */
export const verifyPaymentPidx = async (pidx) => {
    try {
        console.log('🔍 [PAYMENT SERVICE] Verifying payment with PIDX:', pidx);
        const response = await instance.post(
            `/payments/khalti/verify`,
            { pidx }
        );
        console.log('✅ [PAYMENT SERVICE] Payment verification successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ [PAYMENT SERVICE] Payment Verification Error:', error);
        console.error('❌ [PAYMENT SERVICE] Error response:', error.response?.data);
        throw error.response?.data || { message: 'Failed to verify payment' };
    }
};
