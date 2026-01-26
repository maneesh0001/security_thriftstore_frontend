

import React, { useState, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import OrderTable from './OrderTable';
import orderService from '../../../services/orderService'; 

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    orderService.getAllOrders()
      .then(response => {
        setOrders(response.orders || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch orders:", error);
        setLoading(false);
      });
  }, []);

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Orders</h1>
            <p className="mt-1 text-slate-500">View and manage all customer orders in one place.</p>
          </div>
          <div className="flex items-center gap-2">
            
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Plus size={16} />
              <span>Add Order</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        {loading ? <LoadingSpinner /> : <OrderTable orders={orders} />}
      </div>
    </div>
  );
};

export default OrderPage;
