// FILE: OrderTable.js

import React, { useState } from 'react';
import { Eye, Edit, Truck, X, MoreVertical } from 'lucide-react';
import orderService from '../../../services/orderService';

const OrderTable = ({ orders }) => {
  // Ensure orders is an array
  const ordersArray = Array.isArray(orders) ? orders : [];
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Get payment status color
  const getPaymentStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Update order status
  const updateStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, { status: newStatus });
      // Refresh orders or update local state
      window.location.reload();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const OrderRow = ({ order }) => {
    // Get product names from items
    const productNames = order.items?.map(item => 
      item.product?.name || 'Unknown Product'
    ).join(', ') || 'No products';

    return (
      <tr className="border-b border-slate-200 hover:bg-slate-50">
        <td className="p-4">
          <div className="font-medium text-slate-900">{order.orderNumber}</div>
          <div className="text-sm text-slate-500">{order.customerName}</div>
          <div className="text-xs text-slate-400">{order.user?.email}</div>
        </td>
        <td className="p-4">
          <div className="max-w-xs">
            <div className="flex items-center space-x-2">
              {/* Show first product image */}
              {order.items?.[0]?.product?.image && (
                <img 
                  src={order.items[0].product.image} 
                  alt={order.items[0].product.name || 'Product'}
                  className="w-10 h-10 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <div className="text-sm text-slate-600 truncate" title={productNames}>
                  {productNames}
                </div>
                <div className="text-xs text-slate-400">
                  {order.items?.length || 0} items
                </div>
              </div>
            </div>
          </div>
        </td>
        <td className="p-4">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </td>
        <td className="p-4">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
            {order.paymentStatus}
          </span>
        </td>
        <td className="p-4 text-slate-600">
          <div className="font-medium">Rs. {order.total?.toFixed(2) || '0.00'}</div>
          <div className="text-xs text-slate-400">{order.orderType}</div>
        </td>
        <td className="p-4 text-slate-600">
          <div className="text-sm">{formatDate(order.orderDate || order.createdAt)}</div>
          {order.estimatedDelivery && (
            <div className="text-xs text-slate-400">
              Est: {formatDate(order.estimatedDelivery)}
            </div>
          )}
        </td>
        <td className="p-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <button 
              onClick={() => {
                setSelectedOrder(order);
                setShowDetails(true);
              }}
              className="p-1 rounded hover:bg-slate-100 text-slate-600"
              title="View Details"
            >
              <Eye size={16} />
            </button>
            <select 
              className="text-xs border rounded px-2 py-1"
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
              title="Update Status"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm border border-slate-200 overflow-x-auto">
      <table className="min-w-full">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            <th className="p-4 text-left text-sm font-semibold text-slate-500 uppercase">Order Info</th>
            <th className="p-4 text-left text-sm font-semibold text-slate-500 uppercase">Products</th>
            <th className="p-4 text-left text-sm font-semibold text-slate-500 uppercase">Status</th>
            <th className="p-4 text-left text-sm font-semibold text-slate-500 uppercase">Payment</th>
            <th className="p-4 text-left text-sm font-semibold text-slate-500 uppercase">Total</th>
            <th className="p-4 text-left text-sm font-semibold text-slate-500 uppercase">Order Date</th>
            <th className="p-4 text-center text-sm font-semibold text-slate-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ordersArray.length === 0 ? (
            <tr>
              <td colSpan="7" className="p-8 text-center text-slate-500">
                No orders found. Orders will appear here when customers place them.
              </td>
            </tr>
          ) : (
            ordersArray.map(order => <OrderRow key={order._id} order={order} />)
          )}
        </tbody>
      </table>
      
      {/* Order Details Modal */}
      {showDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Order Details - {selectedOrder.orderNumber}</h3>
              <button 
                onClick={() => setShowDetails(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Customer Info */}
              <div className="border-b pb-4">
                <h4 className="font-medium mb-2">Customer Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Name:</span>
                    <span className="ml-2">{selectedOrder.customerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Email:</span>
                    <span className="ml-2">{selectedOrder.user?.email}</span>
                  </div>
                </div>
              </div>
              
              {/* Order Items */}
              <div className="border-b pb-4">
                <h4 className="font-medium mb-2">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        {item.product?.image ? (
                          <img 
                            src={item.product.image} 
                            alt={item.product.name || 'Product'}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">{item.product?.name || 'Unknown Product'}</div>
                        <div className="text-sm text-slate-500">
                          Qty: {item.quantity} × Rs. {item.price?.toFixed(2) || '0.00'}
                        </div>
                        {item.product?.description && (
                          <div className="text-xs text-slate-400 mt-1 line-clamp-2">
                            {item.product.description}
                          </div>
                        )}
                      </div>
                      
                      {/* Item Total */}
                      <div className="text-right">
                        <div className="font-medium text-slate-900">
                          Rs. {item.subtotal?.toFixed(2) || '0.00'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="border-b pb-4">
                <h4 className="font-medium mb-2">Order Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>Rs. {selectedOrder.subtotal?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>Rs. {selectedOrder.tax?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>Rs. {selectedOrder.shipping?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount:</span>
                    <span>-Rs. {selectedOrder.discount?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>Rs. {selectedOrder.total?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
              </div>
              
              {/* Shipping Address */}
              {selectedOrder.shippingAddress && (
                <div>
                  <h4 className="font-medium mb-2">Shipping Address</h4>
                  <div className="text-sm text-slate-600">
                    {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}<br />
                    {selectedOrder.shippingAddress.address}<br />
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}<br />
                    {selectedOrder.shippingAddress.postalCode}<br />
                    {selectedOrder.shippingAddress.phone}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
