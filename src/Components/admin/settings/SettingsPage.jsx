
// import React, { useState } from 'react';
// import { User, Lock, Store } from 'lucide-react'; // Added Store for the new design

// const SettingsPage = () => {
//     // State to manage the active tab
//     const [activeTab, setActiveTab] = useState('profile');

//     // State for the Store Profile form
//     const [storeProfile, setStoreProfile] = useState({
//         name: 'My Awesome Thrift Store',
//         email: 'contact@awesomethrift.com',
//         description: 'Your one-stop shop for curated second-hand treasures.',
//     });

//     // State for the Change Password form
//     const [password, setPassword] = useState({
//         current: '',
//         new: '',
//         confirm: '',
//     });

//     // State for password mismatch error
//     const [passwordError, setPasswordError] = useState('');

//     // Handler for profile input changes
//     const handleProfileChange = (e) => {
//         const { id, value } = e.target;
//         setStoreProfile(prevState => ({ ...prevState, [id]: value }));
//     };

//     // Handler for password input changes
//     const handlePasswordChange = (e) => {
//         const { id, value } = e.target;
//         setPassword(prevState => ({ ...prevState, [id]: value }));
//         if (passwordError) {
//             setPasswordError('');
//         }
//     };

//     // Handler for profile form submission
//     const handleProfileSubmit = (e) => {
//         e.preventDefault();
//         console.log('Saving profile:', storeProfile);
//         // Example: settingsService.updateProfile(storeProfile);
//     };

//     // Handler for password form submission
//     const handlePasswordSubmit = (e) => {
//         e.preventDefault();
//         if (password.new !== password.confirm) {
//             setPasswordError("New passwords don't match!");
//             return;
//         }
//         setPasswordError('');
//         console.log('Updating password');
//         // Example: settingsService.changePassword(password);
//     };

//     // Reusable NavLink component for the sidebar
//     const NavLink = ({ id, label, Icon }) => (
//         <button
//             onClick={() => setActiveTab(id)}
//             className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
//                 activeTab === id
//                     ? 'bg-green-600 text-white shadow-md'
//                     : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
//             }`}
//         >
//             <Icon size={20} className="mr-3 flex-shrink-0" />
//             <span className="font-medium">{label}</span>
//         </button>
//     );

//     return (
//         <div className="bg-gray-50 text-gray-800 min-h-screen">
//             {/* The container below is now full-width */}
//             <div className="px-4 sm:px-6 lg:px-8 py-12">
//                 {/* Header */}
//                 <header className="mb-10">
//                     <h1 className="text-4xl font-bold tracking-tight text-gray-900">Settings</h1>
//                     <p className="text-lg text-gray-500 mt-2">Manage your store profile and security settings.</p>
//                 </header>

//                 <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
//                     {/* Sidebar Navigation */}
//                     <aside className="md:w-64 lg:w-72 flex-shrink-0">
//                         <nav className="space-y-2">
//                             <NavLink id="profile" label="Store Profile" Icon={Store} />
//                             <NavLink id="security" label="Security" Icon={Lock} />
//                         </nav>
//                     </aside>

//                     {/* Main Content Area */}
//                     <main className="flex-1">
//                         <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
//                             {/* Profile Settings Content */}
//                             {activeTab === 'profile' && (
//                                 <section>
//                                     <form id="store-profile" onSubmit={handleProfileSubmit}>
//                                         <h2 className="text-2xl font-semibold mb-2 text-gray-900">Store Profile</h2>
//                                         <p className="text-gray-500 mb-8">Update your store's public details.</p>
//                                         <div className="space-y-6">
//                                             <div>
//                                                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
//                                                 <input type="text" id="name" value={storeProfile.name} onChange={handleProfileChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
//                                             </div>
//                                             <div>
//                                                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
//                                                 <input type="email" id="email" value={storeProfile.email} onChange={handleProfileChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
//                                             </div>
//                                             <div>
//                                                 <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Store Description</label>
//                                                 <textarea id="description" rows="4" value={storeProfile.description} onChange={handleProfileChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
//                                             </div>
//                                         </div>
//                                         <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
//                                             <button type="submit" className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-semibold shadow-sm transition-transform transform hover:scale-105">Save Changes</button>
//                                         </div>
//                                     </form>
//                                 </section>
//                             )}

//                             {/* Security Settings Content */}
//                             {activeTab === 'security' && (
//                                 <section>
//                                     <form id="security" onSubmit={handlePasswordSubmit}>
//                                         <h2 className="text-2xl font-semibold mb-2 text-gray-900">Change Password</h2>
//                                         <p className="text-gray-500 mb-8">For your security, we recommend using a strong password.</p>
//                                         <div className="space-y-6">
//                                             <div>
//                                                 <label htmlFor="current" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
//                                                 <input type="password" id="current" value={password.current} onChange={handlePasswordChange} placeholder="••••••••" className="mt-1 block w-full max-w-md rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
//                                             </div>
//                                             <div>
//                                                 <label htmlFor="new" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
//                                                 <input type="password" id="new" value={password.new} onChange={handlePasswordChange} placeholder="••••••••" className="mt-1 block w-full max-w-md rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
//                                             </div>
//                                             <div>
//                                                 <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
//                                                 <input type="password" id="confirm" value={password.confirm} onChange={handlePasswordChange} placeholder="••••••••" className={`mt-1 block w-full max-w-md rounded-lg border-gray-300 shadow-sm sm:text-sm ${passwordError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-indigo-500 focus:ring-indigo-500'}`} />
//                                                 {passwordError && <p className="mt-2 text-sm text-red-600">{passwordError}</p>}
//                                             </div>
//                                         </div>
//                                         <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
//                                             <button type="submit" className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-semibold shadow-sm transition-transform transform hover:scale-105">Update Password</button>
//                                         </div>
//                                     </form>
//                                 </section>
//                             )}
//                         </div>
//                     </main>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SettingsPage;




import React, { useState } from 'react';
import { Lock } from 'lucide-react'; // Only Lock is needed now

const SettingsPage = () => {
    // State for the Change Password form
    const [password, setPassword] = useState({
        current: '',
        new: '',
        confirm: '',
    });

    // State for password mismatch error
    const [passwordError, setPasswordError] = useState('');

    // Handler for password input changes
    const handlePasswordChange = (e) => {
        const { id, value } = e.target;
        setPassword(prevState => ({ ...prevState, [id]: value }));
        if (passwordError) {
            setPasswordError('');
        }
    };

    // Handler for password form submission
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password.new !== password.confirm) {
            setPasswordError("New passwords don't match!");
            return;
        }
        setPasswordError('');
        console.log('Updating password');
        // In a real application, you would send this data to your backend
        // Example: settingsService.changePassword(password);
        alert('Password updated successfully!'); // Using alert for demo, replace with a proper notification
        // Clear the form after submission
        setPassword({ current: '', new: '', confirm: '' });
    };

    return (
        <div className="bg-gray-50 text-gray-800 min-h-screen">
            <div className="px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <header className="mb-10">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Security Settings</h1>
                    <p className="text-lg text-gray-500 mt-2">Manage your account's security and change your password.</p>
                </header>

                <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
                    {/* Sidebar Navigation (simplified) */}
                    <aside className="md:w-64 lg:w-72 flex-shrink-0">
                        <nav className="space-y-2">
                            {/* Only Security link remains */}
                            <button
                                className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 bg-green-600 text-white shadow-md`}
                            >
                                <Lock size={20} className="mr-3 flex-shrink-0" />
                                <span className="font-medium">Security</span>
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                            {/* Security Settings Content */}
                            <section>
                                <form id="security" onSubmit={handlePasswordSubmit}>
                                    <h2 className="text-2xl font-semibold mb-2 text-gray-900">Change Password</h2>
                                    <p className="text-gray-500 mb-8">For your security, we recommend using a strong password.</p>
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="current" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                            <input type="password" id="current" value={password.current} onChange={handlePasswordChange} placeholder="••••••••" className="mt-1 block w-full max-w-md rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                        </div>
                                        <div>
                                            <label htmlFor="new" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                            <input type="password" id="new" value={password.new} onChange={handlePasswordChange} placeholder="••••••••" className="mt-1 block w-full max-w-md rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                        </div>
                                        <div>
                                            <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                            <input type="password" id="confirm" value={password.confirm} onChange={handlePasswordChange} placeholder="••••••••" className={`mt-1 block w-full max-w-md rounded-lg border-gray-300 shadow-sm sm:text-sm ${passwordError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-indigo-500 focus:ring-indigo-500'}`} />
                                            {passwordError && <p className="mt-2 text-sm text-red-600">{passwordError}</p>}
                                        </div>
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                                        <button type="submit" className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-semibold shadow-sm transition-transform transform hover:scale-105">Update Password</button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
