// src/services/orderService.js
import instance from '../api/Api';

/**
 * Get current user's orders with filtering
 * @param {Object} filters - Filter options (status, orderType, page, limit)
 * @returns {Promise} Paginated list of user orders
 */
export const getMyOrders = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.orderType) params.append('orderType', filters.orderType);
        if (filters.page) params.append('page', filters.page);
        if (filters.limit) params.append('limit', filters.limit);

        const response = await instance.get(`/orders/myorders?${params}`);
        return response.data;
    } catch (error) {
        console.error('Get Orders Error:', error);
        throw error.response?.data || { message: 'Failed to fetch orders' };
    }
};

/**
 * Get order by ID with full details
 * @param {string} orderId - Order ID
 * @returns {Promise} Order details with populated data
 */
export const getOrderById = async (orderId) => {
    try {
        const response = await instance.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Get Order Error:', error);
        throw error.response?.data || { message: 'Failed to fetch order' };
    }
};

/**
 * Create a new order with enhanced features
 * @param {Object} orderData - Complete order data
 * @returns {Promise} Created order with populated data
 */
export const createOrder = async (orderData) => {
    try {
        const response = await instance.post('/orders', orderData);
        return response.data;
    } catch (error) {
        console.error('Create Order Error:', error);
        throw error.response?.data || { message: 'Failed to create order' };
    }
};

/**
 * Cancel an order
 * @param {string} orderId - Order ID
 * @param {string} reason - Cancellation reason
 * @returns {Promise} Updated order
 */
export const cancelOrder = async (orderId, reason) => {
    try {
        const response = await instance.patch(`/orders/${orderId}/cancel`, { reason });
        return response.data;
    } catch (error) {
        console.error('Cancel Order Error:', error);
        throw error.response?.data || { message: 'Failed to cancel order' };
    }
};

/**
 * Track order with timeline
 * @param {string} orderId - Order ID
 * @returns {Promise} Order tracking information with timeline
 */
export const trackOrder = async (orderId) => {
    try {
        const response = await instance.get(`/orders/${orderId}/track`);
        return response.data;
    } catch (error) {
        console.error('Track Order Error:', error);
        throw error.response?.data || { message: 'Failed to track order' };
    }
};

/**
 * Get order statistics (Admin only)
 * @returns {Promise} Order statistics and analytics
 */
export const getOrderStats = async () => {
    try {
        const response = await instance.get('/orders/stats');
        return response.data;
    } catch (error) {
        console.error('Get Order Stats Error:', error);
        throw error.response?.data || { message: 'Failed to fetch order statistics' };
    }
};

/**
 * Update order status (Admin only)
 * @param {string} orderId - Order ID
 * @param {Object} updateData - Status update data
 * @returns {Promise} Updated order
 */
export const updateOrderStatus = async (orderId, updateData) => {
    try {
        const response = await instance.patch(`/orders/${orderId}/status`, updateData);
        return response.data;
    } catch (error) {
        console.error('Update Order Status Error:', error);
        throw error.response?.data || { message: 'Failed to update order status' };
    }
};

/**
 * Get all orders with filtering (Admin only)
 * @param {Object} filters - Filter options
 * @returns {Promise} Paginated list of orders
 */
export const getAllOrders = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.paymentStatus) params.append('paymentStatus', filters.paymentStatus);
        if (filters.orderType) params.append('orderType', filters.orderType);
        if (filters.priority) params.append('priority', filters.priority);
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);
        if (filters.page) params.append('page', filters.page);
        if (filters.limit) params.append('limit', filters.limit);

        const response = await instance.get(`/orders?${params}`);
        return response.data;
    } catch (error) {
        console.error('Get All Orders Error:', error);
        throw error.response?.data || { message: 'Failed to fetch orders' };
    }
};

/**
 * Update order (Admin only)
 * @param {string} orderId - Order ID
 * @param {Object} updateData - Order update data
 * @returns {Promise} Updated order
 */
export const updateOrder = async (orderId, updateData) => {
    try {
        const response = await instance.put(`/orders/${orderId}`, updateData);
        return response.data;
    } catch (error) {
        console.error('Update Order Error:', error);
        throw error.response?.data || { message: 'Failed to update order' };
    }
};

/**
 * Delete order (Admin only)
 * @param {string} orderId - Order ID
 * @returns {Promise} Deletion confirmation
 */
export const deleteOrder = async (orderId) => {
    try {
        const response = await instance.delete(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Delete Order Error:', error);
        throw error.response?.data || { message: 'Failed to delete order' };
    }
};

export default {
    getMyOrders,
    getOrderById,
    createOrder,
    cancelOrder,
    trackOrder,
    getOrderStats,
    updateOrderStatus,
    getAllOrders,
    updateOrder,
    deleteOrder,
};
