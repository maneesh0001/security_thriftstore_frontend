// FILE: InventoryAlertTable.jsx

import React from 'react';

const InventoryAlertTable = ({ alerts }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Low Stock':
        return 'text-yellow-600 bg-yellow-100';
      case 'Out of Stock':
        return 'text-red-600 bg-red-100';
      case 'Sufficient':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-slate-600 bg-slate-100';
    }
  };

  const AlertRow = ({ alert }) => (
    <tr className="border-b border-slate-200 hover:bg-slate-50">
      <td className="p-4 text-slate-700 font-medium">{alert.productName}</td>
      <td className="p-4 text-slate-600">{alert.currentStock}</td>
      <td className="p-4 text-slate-600">{alert.threshold}</td>
      <td className="p-4">
        <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(alert.status)}`}>
          {alert.status}
        </span>
      </td>
      <td className="p-4 text-center">
        <button className="p-2 rounded-full hover:bg-slate-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="text-slate-500" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
      </td>
    </tr>
  );

  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm border border-slate-200 overflow-x-auto">
      <table className="min-w-full">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            <th className="p-4 text-left text-sm font-semibold text-slate-500 uppercase">Product</th>
            <th className="p-4 text-left text-sm font-semibold text-slate-500 uppercase">Stock</th>
            <th className="p-4 text-left text-sm font-semibold text-slate-500 uppercase">Threshold</th>
            <th className="p-4 text-left text-sm font-semibold text-slate-500 uppercase">Status</th>
            <th className="p-4 text-center text-sm font-semibold text-slate-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map(alert => <AlertRow key={alert.id} alert={alert} />)}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryAlertTable;
