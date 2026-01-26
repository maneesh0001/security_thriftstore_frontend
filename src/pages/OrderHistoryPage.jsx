import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMyOrders } from '../services/orderService';

const OrderHistoryPage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                console.log('Fetching orders...');
                const response = await getMyOrders();
                console.log('Orders response:', response);
                
                // Handle both old format (array) and new format (object with orders array)
                if (Array.isArray(response)) {
                    // Old format - direct array
                    setOrders(response);
                } else if (response && response.orders) {
                    // New format - object with orders array and pagination
                    setOrders(response.orders);
                } else {
                    // Fallback - empty array
                    setOrders([]);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                console.error('Error response:', error.response);
                toast.error(error.response?.data?.message || 'Failed to load orders');
                setOrders([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
                <p className="text-gray-600">View and track your orders</p>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <div className="text-gray-400 mb-4">
                        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-4">Start shopping to see your orders here</p>
                    <button
                        onClick={() => navigate('/user/dashboard')}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            {/* Order Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {order.orderNumber || `Order #${order._id.slice(-8)}`}
                                        </h3>
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'processing' || order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                                            order.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                                        </span>
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                                            order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {order.paymentStatus ? order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1) : 'Pending'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        {new Date(order.orderDate || order.createdAt).toLocaleDateString()} • {order.items?.length || 0} items • Rs. {order.total?.toFixed(2) || '0.00'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate(`/user/orders/${order._id}`)}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
                                >
                                    View Details
                                </button>
                            </div>

                            {/* Order Items Preview */}
                            <div className="space-y-4">
                                {/* Main Product Image */}
                                {order.items?.length > 0 && (
                                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                                        {order.items[0].product?.image && (
                                            <img
                                                src={order.items[0].product.image.startsWith('http') ? order.items[0].product.image : `http://localhost:5000${order.items[0].product.image}`}
                                                alt={order.items[0].product?.name || 'Product'}
                                                className="w-20 h-20 rounded-xl object-cover flex-shrink-0 shadow-md"
                                            />
                                        )}
                                        <div className="flex-grow">
                                            <h4 className="font-semibold text-gray-900 text-lg mb-1">
                                                {order.items[0].product?.name || 'Product'}
                                            </h4>
                                            <p className="text-sm text-gray-600 mb-2">
                                                Qty: {order.items[0].quantity} • Rs. {(order.items[0].price || order.items[0].product?.price || 0).toFixed(2)} each
                                            </p>
                                            {order.items[0].product?.condition && (
                                                <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                                                    {order.items[0].product.condition}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-purple-600">
                                                Rs. {((order.items[0].price || order.items[0].product?.price || 0) * order.items[0].quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Additional Items (if any) */}
                                {order.items?.length > 1 && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {order.items.slice(1, 4).map((item, index) => (
                                            <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                {item.product?.image && (
                                                    <img
                                                        src={item.product.image.startsWith('http') ? item.product.image : `http://localhost:5000${item.product.image}`}
                                                        alt={item.product?.name || 'Product'}
                                                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                                                    />
                                                )}
                                                <div className="flex-grow min-w-0">
                                                    <p className="text-xs font-medium text-gray-900 truncate">
                                                        {item.product?.name || 'Product'}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        Qty: {item.quantity}
                                                    </p>
                                                </div>
                                                <div className="text-xs font-medium text-gray-900">
                                                    Rs. {((item.price || item.product?.price || 0) * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                        
                                        {order.items.length > 4 && (
                                            <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg text-center">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-600">
                                                        +{order.items.length - 4} more
                                                    </p>
                                                    <p className="text-xs text-gray-500">items</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistoryPage;
