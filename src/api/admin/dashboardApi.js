// API calls for admin dashboard data
import instance from '../Api';

// Get dashboard statistics
export const getDashboardStats = async () => {
  try {
    const response = await instance.get('/admin/dashboard/stats');
    return response.data;
  } catch (error) {
    console.error('Dashboard Stats Error:', error);
    throw error.response?.data || { message: 'Failed to fetch dashboard stats' };
  }
};

// Get recent orders for dashboard
export const getRecentOrders = async (limit = 5) => {
  try {
    const response = await instance.get(`/admin/orders/recent?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Recent Orders Error:', error);
    throw error.response?.data || { message: 'Failed to fetch recent orders' };
  }
};

// Get sales data for charts
export const getSalesData = async (period = '6months') => {
  try {
    const response = await instance.get(`/admin/sales/data?period=${period}`);
    return response.data;
  } catch (error) {
    console.error('Sales Data Error:', error);
    throw error.response?.data || { message: 'Failed to fetch sales data' };
  }
};

// Get category sales data
export const getCategorySales = async () => {
  try {
    const response = await instance.get('/admin/sales/by-category');
    return response.data;
  } catch (error) {
    console.error('Category Sales Error:', error);
    throw error.response?.data || { message: 'Failed to fetch category sales' };
  }
};

// Get stock alerts
export const getStockAlerts = async () => {
  try {
    const response = await instance.get('/admin/inventory/alerts');
    return response.data;
  } catch (error) {
    console.error('Stock Alerts Error:', error);
    throw error.response?.data || { message: 'Failed to fetch stock alerts' };
  }
};

export default {
  getDashboardStats,
  getRecentOrders,
  getSalesData,
  getCategorySales,
  getStockAlerts,
};
