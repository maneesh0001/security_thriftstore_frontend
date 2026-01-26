// import React from 'react';

// const RecentOrdersCard = () => {
//     const orders = [
//         { id: '#ORD-001', name: 'Sarah Johnson', status: 'delivered', price: '$45.99', time: '2 hours ago' },
//         { id: '#ORD-002', name: 'Mike Chen', status: 'shipped', price: '$23.50', time: '4 hours ago' },
//         { id: '#ORD-003', name: 'Emma Davis', status: 'pending', price: '$67.25', time: '6 hours ago' },
//         { id: '#ORD-004', name: 'John Smith', status: 'processing', price: '$34.75', time: '8 hours ago' },
//     ];

//     const getStatusClass = (status) => {
//         switch (status) {
//             case 'delivered':
//                 return 'bg-black text-white';
//             case 'shipped':
//                 return 'bg-gray-200 text-gray-800';
//             case 'pending':
//                 return 'bg-red-500 text-white';
//             case 'processing':
//                 return 'bg-white text-gray-800 border border-gray-300';
//             default:
//                 return 'bg-gray-100 text-gray-800';
//         }
//     };

//     return (
//         <div className="bg-white p-6 rounded-xl border border-gray-200 lg:col-span-4">
//             <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
//             <p className="text-sm text-gray-500 mb-4">Latest customer orders</p>
//             <div className="space-y-4">
//                 {orders.map(order => (
//                     <div key={order.id} className="flex items-center justify-between">
//                         <div className="flex-shrink-0">
//                             <p className="font-bold text-gray-800">{order.id}</p>
//                             <p className="text-sm text-gray-500">{order.name}</p>
//                         </div>
//                         <div className="flex items-center space-x-4">
//                             <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(order.status)}`}>
//                                 {order.status}
//                             </span>
//                             <div className="text-right flex-shrink-0">
//                                 <p className="font-bold text-gray-800">{order.price}</p>
//                                 <p className="text-sm text-gray-500">{order.time}</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default RecentOrdersCard;






import React from 'react';
import {
  CheckCircle,
  Truck,
  Clock,
  Loader2,
} from 'lucide-react';

const RecentOrdersCard = () => {
  const orders = [
    { id: '#ORD-001', name: 'Sarah Johnson', status: 'delivered', price: '$45.99', time: '2 hours ago' },
    { id: '#ORD-002', name: 'Mike Chen', status: 'shipped', price: '$23.50', time: '4 hours ago' },
    { id: '#ORD-003', name: 'Emma Davis', status: 'pending', price: '$67.25', time: '6 hours ago' },
    { id: '#ORD-004', name: 'John Smith', status: 'processing', price: '$34.75', time: '8 hours ago' },
  ];

  const getStatusProps = (status) => {
    switch (status) {
      case 'delivered':
        return {
          bg: 'bg-gradient-to-r from-green-400 to-green-600',
          text: 'text-white',
          icon: <CheckCircle className="w-4 h-4 mr-1" />,
          shadow: 'shadow-md',
        };
      case 'shipped':
        return {
          bg: 'bg-gradient-to-r from-blue-400 to-blue-600',
          text: 'text-white',
          icon: <Truck className="w-4 h-4 mr-1" />,
          shadow: 'shadow-md',
        };
      case 'pending':
        return {
          bg: 'bg-gradient-to-r from-red-400 to-red-600',
          text: 'text-white',
          icon: <Clock className="w-4 h-4 mr-1" />,
          shadow: 'shadow-md',
        };
      case 'processing':
        return {
          bg: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
          text: 'text-white',
          icon: <Loader2 className="w-4 h-4 mr-1 animate-spin" />,
          shadow: 'shadow-md',
        };
      default:
        return {
          bg: 'bg-gray-200',
          text: 'text-gray-800',
          icon: null,
          shadow: '',
        };
    }
  };

  return (
    <div className="bg-white dark:bg-blue-900 p-6 rounded-3xl border border-bl-200 dark:border--700 shadow-lg lg:col-span-4">
      <h3 className="text-2xl font-extrabold text-sky to-blue-300-900 dark:text-gray-100 mb-1">Recent Orders</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Latest customer orders</p>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {orders.map((order, idx) => {
          const status = getStatusProps(order.status);
          return (
            <div
              key={order.id}
              className={`flex items-center justify-between py-4 px-3 rounded-xl
                ${idx % 2 === 0 ? 'bg-gray-50 dark:bg-yellow-800' : 'bg-transparent'}
                hover:bg-gray-100 dark:hover:bg-gray-700
                transition-colors cursor-pointer`}
            >
              <div className="flex flex-col">
                <p className="font-semibold text-gray-900 dark:text-gray-100">{order.id}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{order.name}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`flex items-center px-4 py-1 rounded-full font-semibold tracking-wide
                  ${status.bg} ${status.text} ${status.shadow}`}
                >
                  {status.icon}
                  {order.status}
                </span>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-900 dark:text-gray-100">{order.price}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{order.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentOrdersCard;
