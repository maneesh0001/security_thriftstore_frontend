// FILE: InventoryAlertPage.jsx

import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import InventoryAlertTable from './InventoryAlertTable';
import inventoryService from '../../../services/inventoryService'; 


const InventoryAlertPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    inventoryService.getAlerts()
      .then(data => {
        setAlerts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch inventory alerts:", error);
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
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Inventory Alerts</h1>
            <p className="mt-1 text-slate-500">Monitor low-stock and out-of-stock products.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        {loading ? <LoadingSpinner /> : <InventoryAlertTable alerts={alerts} />}
      </div>
    </div>
  );
};

export default InventoryAlertPage;
