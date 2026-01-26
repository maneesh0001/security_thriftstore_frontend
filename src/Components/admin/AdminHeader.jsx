



// import React, { useState } from "react";
// import {
//     Search,
//     Bell,
//     User,
//     LayoutGrid,
//     LogOut,
//     Settings,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import DarkModeToggle from "../../Components/admin/DarkModeToggle";

// const AdminHeader = () => {
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [hasNotification] = useState(true); // demo only

//     const toggleDropdown = () => setShowDropdown(!showDropdown);

//     return (
//         <header className="bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-md w-full">
//             <div className="mx-auto flex items-center justify-between px-6 py-3">
//                 {/* Left: Menu Icon */}
//                 <div className="flex items-center gap-4">
//                     <button className="p-2 rounded-md bg-white dark:bg-gray-800 shadow-sm hover:bg-blue-100 dark:hover:bg-gray-700 transition">
//                         <LayoutGrid className="h-6 w-6 text-blue-600 dark:text-white" />
//                     </button>
//                 </div>

//                 {/* Center: Search Bar */}
//                 <div className="flex-1 max-w-xl mx-8">
//                     <div className="relative">
//                         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                             <Search className="h-5 w-5 text-blue-400 dark:text-gray-400" />
//                         </div>
//                         <input
//                             type="search"
//                             placeholder="Search products, orders, users..."
//                             className="block w-full rounded-full border border-blue-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder-blue-300 dark:placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
//                         />
//                     </div>
//                 </div>

//                 {/* Right: Icons & User */}
//                 <div className="relative flex items-center gap-4">
//                     {/* 🔔 Bell */}
//                     <button className="relative p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:bg-blue-100 dark:hover:bg-gray-700 transition">
//                         <Bell className="h-6 w-6 text-blue-600 dark:text-white" />
//                         {hasNotification && (
//                             <span className="absolute top-1 right-1 flex h-2 w-2">
//                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
//                                 <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
//                             </span>
//                         )}
//                     </button>

//                     {/* 🌙 Theme Toggle */}
//                     <DarkModeToggle />

//                     {/* 👤 Avatar Dropdown */}
//                     <div className="relative">
//                         <button
//                             onClick={toggleDropdown}
//                             className="p-1 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:bg-blue-100 dark:hover:bg-gray-700 transition"
//                         >
//                             <img
//                                 src="https://i.pravatar.cc/40"
//                                 alt="User Avatar"
//                                 className="h-8 w-8 rounded-full"
//                             />
//                         </button>

//                         {showDropdown && (
//                             <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-lg z-50">
//                                 <div className="py-2">
//                                     <Link
//                                         to="/admin/profile"
//                                         className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
//                                         onClick={() => setShowDropdown(false)}
//                                     >
//                                         <User className="inline-block mr-2 w-4 h-4" /> Profile
//                                     </Link>

//                                     <Link
//                                         to="/admin/settings"
//                                         className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
//                                         onClick={() => setShowDropdown(false)}
//                                     >
//                                         <Settings className="inline-block mr-2 w-4 h-4" /> Settings
//                                     </Link>

//                                     <button
//                                         className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-red-400"
//                                         // TODO: add logout handler here
//                                     >
//                                         <LogOut className="inline-block mr-2 w-4 h-4" /> Logout
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default AdminHeader;



import React, { useState, useContext } from "react";
import {
    Search,
    Bell,
    User,
    LayoutGrid,
    LogOut,
    Settings,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "../../Components/admin/DarkModeToggle";
import { AuthContext } from "../../auth/AuthProvider";

const AdminHeader = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [hasNotification] = useState(true); // demo only
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    // Get user profile image or use default
    const getProfileImage = () => {
        if (user?.profilePicture) {
            return user.profilePicture;
        }
        if (user?.profileImage) {
            return user.profileImage;
        }
        if (user?.image) {
            return user.image;
        }
        // Fallback to user-specific avatar or default
        if (user?.email) {
            return `https://i.pravatar.cc/40?u=${user.email}`;
        }
        return "https://i.pravatar.cc/40";
    };

    const handleLogout = () => {
        // Optional: clear auth tokens or any user state
        localStorage.removeItem("authToken");
        // Redirect to login
        navigate("/login");
    };

    return (
        <header className="bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-md w-full">
            <div className="mx-auto flex items-center justify-between px-6 py-3">
                {/* Left: Menu Icon */}
                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-md bg-white dark:bg-gray-800 shadow-sm hover:bg-blue-100 dark:hover:bg-gray-700 transition">
                        <LayoutGrid className="h-6 w-6 text-blue-600 dark:text-white" />
                    </button>
                </div>

                {/* Center: Search Bar */}
                <div className="flex-1 max-w-xl mx-8">
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-5 w-5 text-blue-400 dark:text-gray-400" />
                        </div>
                        <input
                            type="search"
                            placeholder="Search products, orders, users..."
                            className="block w-full rounded-full border border-blue-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder-blue-300 dark:placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Right: Icons & User */}
                <div className="relative flex items-center gap-4">
                    {/* 🔔 Bell */}
                    <button className="relative p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:bg-blue-100 dark:hover:bg-gray-700 transition">
                        <Bell className="h-6 w-6 text-blue-600 dark:text-white" />
                        {hasNotification && (
                            <span className="absolute top-1 right-1 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                        )}
                    </button>

                    {/* 🌙 Theme Toggle */}
                    <DarkModeToggle />

                    {/* 👤 Avatar Dropdown */}
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="p-1 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:bg-blue-100 dark:hover:bg-gray-700 transition"
                        >
                            <img
                                src={getProfileImage()}
                                alt="User Avatar"
                                className="h-8 w-8 rounded-full object-cover"
                                onError={(e) => {
                                    e.target.src = `https://i.pravatar.cc/40?u=${user?.email || 'default'}`;
                                }}
                            />
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-lg z-50">
                                <div className="py-2">
                                    <Link
                                        to="/admin/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <User className="inline-block mr-2 w-4 h-4" /> Profile
                                    </Link>

                                    <Link
                                        to="/admin/settings"
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <Settings className="inline-block mr-2 w-4 h-4" /> Settings
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-red-400"
                                    >
                                        <LogOut className="inline-block mr-2 w-4 h-4" /> Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
