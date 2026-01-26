import React from 'react';
import { AlertTriangle } from 'lucide-react';

const StockAlertCard = ({ alerts = [] }) => { // Default to empty array if alerts is undefined or null
    // Function to get dynamic classes based on alert level
    const getAlertClasses = (level) => {
        switch (level) {
            case 'critical':
                return {
                    bg: 'bg-red-50',
                    iconColor: 'text-red-500',
                    textColor: 'text-red-700',
                    statusColor: 'text-red-500 font-semibold',
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-50',
                    iconColor: 'text-yellow-500',
                    textColor: 'text-yellow-800',
                    statusColor: 'text-yellow-600',
                };
            default:
                return {
                    bg: 'bg-gray-50',
                    iconColor: 'text-gray-500',
                    textColor: 'text-gray-800',
                    statusColor: 'text-gray-600',
                };
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 lg:col-span-4">
            <h3 className="text-xl font-bold text-gray-800">Inventory Alerts</h3>
            <p className="text-sm text-gray-500 mb-4">Items requiring attention</p>

            {/* Show a fallback message if no alerts exist */}
            {alerts.length === 0 ? (
                <p className="text-center text-gray-500">No alerts available</p>
            ) : (
                <div className="space-y-3">
                    {alerts.map((alert, index) => {
                        const classes = getAlertClasses(alert.level);
                        return (
                            <div key={index} className={`flex items-center p-4 rounded-lg ${classes.bg}`}>
                                <AlertTriangle className={`w-6 h-6 mr-4 ${classes.iconColor}`} />
                                <div>
                                    <p className={`font-semibold ${classes.textColor}`}>{alert.name}</p>
                                    <p className={`text-sm ${classes.statusColor}`}>{alert.status}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default StockAlertCard;
