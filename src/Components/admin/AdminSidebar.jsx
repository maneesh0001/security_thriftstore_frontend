// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import {
//     Home, Package, ShoppingCart, Users, AlertTriangle, Settings, Package2
// } from 'lucide-react';

// // NavLink Component
// const NavLink = ({ icon, children, isActive = false, hasAlert = false, alertCount = 0, path }) => (
//     <Link
//         to={path}
//         className={`flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${isActive ? 'bg-gray-100 font-semibold' : ''}`}
//     >
//         {icon}
//         <span className="ml-4 flex-1">{children}</span>
//         {hasAlert && (
//             <span className="bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                 {alertCount}
//             </span>
//         )}
//     </Link>
// );

// const AdminSidebar = () => {
//     const location = useLocation();

//     // Define sections and links
//     const sections = [
//         {
//             label: 'Main',
//             links: [
//                 { label: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/admin/dashboard', isActive: location.pathname === '/admin/dashboard' },
//                 { label: 'Products', icon: <Package className="h-5 w-5" />, path: '/admin/products', isActive: location.pathname === '/admin/products' },
//                 { label: 'Orders', icon: <ShoppingCart className="h-5 w-5" />, path: '/admin/orders', isActive: location.pathname === '/admin/orders' },
//                 { label: 'Users', icon: <Users className="h-5 w-5" />, path: '/admin/users', isActive: location.pathname === '/admin/users' },
//             ]
//         },
//         {
//             label: 'Management',
//             links: [
//                 { label: 'Inventory Alerts', icon: <AlertTriangle className="h-5 w-5" />, hasAlert: true, alertCount: 3, path: '/admin/alerts' },
//                 { label: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/admin/settings', isActive: location.pathname === '/admin/settings' },
//             ]
//         }
//     ];

//     return (
//         <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
//             {/* Header */}
//             <div className="p-4 border-b border-gray-200">
//                 <div className="flex items-center">
//                     <div className="bg-green-500 p-2 rounded-lg">
//                         <Package2 className="text-white h-6 w-6" />
//                     </div>
//                     <div className="ml-3">
//                         <h1 className="text-lg font-bold text-gray-800">ThriftStore</h1>
//                         <p className="text-sm text-gray-500">Admin Panel</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Navigation */}
//             <nav className="flex-1 p-4 space-y-6">
//                 {sections.map((section, index) => (
//                     <div key={index}>
//                         <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{section.label}</h3>
//                         <div className="mt-2 space-y-1">
//                             {section.links.map((link, index) => (
//                                 <NavLink
//                                     key={index}
//                                     icon={link.icon}
//                                     isActive={link.isActive}
//                                     hasAlert={link.hasAlert}
//                                     alertCount={link.alertCount}
//                                     path={link.path}
//                                 >
//                                     {link.label}
//                                 </NavLink>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </nav>
//         </aside>
//     );
// };

// export default AdminSidebar;



import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  AlertTriangle,
  Settings,
  Package2,
} from 'lucide-react';

const NavLink = ({
  icon,
  children,
  isActive = false,
  hasAlert = false,
  alertCount = 0,
  path,
}) => (
  <Link
    to={path}
    className={`
      flex items-center p-3 rounded-lg transition
      duration-300 ease-in-out
      ${
        isActive
          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md text-white'
          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
      }
      transform ${isActive ? 'scale-105' : 'hover:scale-105'}
      `}
  >
    <div className="flex-shrink-0">{icon}</div>
    <span className="ml-4 flex-1 font-medium">{children}</span>
    {hasAlert && (
      <span
        className="relative flex items-center justify-center w-5 h-5 text-xs font-semibold text-white rounded-full bg-red-500
                   animate-pulse"
        title={`${alertCount} alerts`}
      >
        {alertCount}
        <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-red-400 animate-ping"></span>
      </span>
    )}
  </Link>
);

const AdminSidebar = () => {
  const location = useLocation();

  const sections = [
    {
      label: 'Main',
      links: [
        {
          label: 'Dashboard',
          icon: <Home className="h-5 w-5" />,
          path: '/admin/dashboard',
          isActive: location.pathname === '/admin/dashboard',
        },
        {
          label: 'Products',
          icon: <Package className="h-5 w-5" />,
          path: '/admin/products',
          isActive: location.pathname === '/admin/products',
        },
        {
          label: 'Orders',
          icon: <ShoppingCart className="h-5 w-5" />,
          path: '/admin/orders',
          isActive: location.pathname === '/admin/orders',
        },
        {
          label: 'Users',
          icon: <Users className="h-5 w-5" />,
          path: '/admin/users',
          isActive: location.pathname === '/admin/users',
        },
      ],
    },
    {
      label: 'Management',
      links: [
        {
          label: 'Inventory Alerts',
          icon: <AlertTriangle className="h-5 w-5" />,
          hasAlert: true,
          alertCount: 3,
          path: '/admin/alerts',
          isActive: location.pathname === '/admin/alerts',
        },
        {
          label: 'Settings',
          icon: <Settings className="h-5 w-5" />,
          path: '/admin/settings',
          isActive: location.pathname === '/admin/settings',
        },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col
                      dark:bg-gray-900 dark:border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center space-x-3
                      dark:border-gray-700">
        <div className="bg-cyan-600 p-2 rounded-lg shadow-lg">
          <Package2 className="text-white h-6 w-6" />
        </div>
        <div>
          <h1 className="text-lg font-extrabold text-gray-800 dark:text-white">
            ThriftStore
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {sections.map((section, index) => (
          <div key={index}>
            <h3
              className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3
                         dark:text-gray-500"
            >
              {section.label}
            </h3>
            <div className="space-y-1">
              {section.links.map((link, idx) => (
                <NavLink
                  key={idx}
                  icon={link.icon}
                  isActive={link.isActive}
                  hasAlert={link.hasAlert}
                  alertCount={link.alertCount}
                  path={link.path}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
