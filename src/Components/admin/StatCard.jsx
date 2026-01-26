// import React from 'react';
// import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

// const StatCard = ({ title, value, change, changeType, icon }) => {
//     const isPositive = changeType === 'positive';
//     const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;
//     const changeColor = isPositive ? 'text-green-500' : 'text-red-500';

//     return (
//         <div className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col justify-between">
//             <div className="flex justify-between items-start">
//                 <span className="text-sm text-gray-500">{title}</span>
//                 <div className="text-gray-400">{icon}</div>
//             </div>
//             <div>
//                 <h2 className="text-3xl font-bold text-gray-800 mt-2">{value}</h2>
//                 <div className="flex items-center mt-1 text-sm">
//                     <ChangeIcon className={`w-4 h-4 mr-1 ${changeColor}`} />
//                     <span className={`${changeColor} font-semibold`}>{change}</span>
//                     <span className="text-gray-500 ml-1">from last month</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StatCard;



import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, change, changeType, icon }) => {
  const isPositive = changeType === 'positive';
  const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;
  const changeColor = isPositive ? 'text-green-500' : 'text-red-500';

  return (
    <div
      className="
        bg-white dark:bg-sky-800
        p-6 rounded-2xl border border-gray-200 dark:border-sky-700
        shadow-md hover:shadow-xl transition-shadow duration-300
        flex flex-col justify-between"
    >
      <div className="flex justify-between items-start">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </span>
        <div
          className={`
            p-3 rounded-full bg-gradient-to-tr 
            ${isPositive ? 'from-green-400 to-green-600' : 'from-red-400 to-red-600'} 
            shadow-lg text-white
          `}
        >
          {icon}
        </div>
      </div>
      <div>
        <h2 className="text-4xl font-extrabold text-sky to-blue-300 dark:text-gray-100 mt-3">
          {value}
        </h2>
        <div className="flex items-center mt-2 text-sm font-semibold">
          <ChangeIcon className={`w-5 h-5 mr-1 ${changeColor}`} />
          <span className={`${changeColor} tracking-wide`}>{change}</span>
          <span className="text-sky-400 dark:text-sky-500 ml-2 font-normal">
            from last month
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
