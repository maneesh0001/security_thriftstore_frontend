import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getOrderById } from '../services/orderService';

const OrderDetailsPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await getOrderById(orderId);
                setOrder(response);
            } catch (error) {
                console.error('Error fetching order details:', error);
                toast.error('Failed to load order details');
                navigate('/user/orders');
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h2>
                <button
                    onClick={() => navigate('/user/orders')}
                    className="text-purple-600 hover:text-purple-800"
                >
                    Back to Orders
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Details</h1>
                <p className="text-gray-600">Order ID: {order._id}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Order Information</h3>
                    <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p><span className="font-medium">Status:</span> 
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                                {order.status}
                            </span>
                        </p>
                        <p><span className="font-medium">Payment Status:</span> 
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                                order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                                order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                {order.paymentStatus}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
                    <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Name:</span> {order.customerName}</p>
                        <p><span className="font-medium">Email:</span> {order.user?.email}</p>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Payment Information</h3>
                    <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Method:</span> Khalti</p>
                        <p><span className="font-medium">Amount:</span> Rs. {order.total?.toFixed(2) || '0.00'}</p>
                        {order.paymentId && (
                            <p><span className="font-medium">Payment ID:</span> #{order.paymentId.slice(-8)}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Quantity
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {order.items?.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {item.product?.image && (
                                                <img
                                                    src={item.product.image.startsWith('http') ? item.product.image : `http://localhost:5000${item.product.image}`}
                                                    alt={item.product.name}
                                                    className="h-16 w-16 rounded-lg mr-4 object-cover flex-shrink-0"
                                                />
                                            )}
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {item.product?.name || 'Product'}
                                                </div>
                                                {item.product?.condition && (
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        Condition: {item.product.condition}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {item.quantity}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        Rs. {item.product?.price?.toFixed(2) || '0.00'}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Rs. {((item.product?.price || 0) * item.quantity).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-50">
                            <tr>
                                <th colSpan="3" className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                                    Total:
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">
                                    Rs. {order.total?.toFixed(2) || '0.00'}
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={() => navigate('/user/orders')}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                    Back to Orders
                </button>
                <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                    Print Order
                </button>
            </div>
        </div>
    );
};

export default OrderDetailsPage;
