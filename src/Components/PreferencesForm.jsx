// src/Components/PreferencesForm.jsx
import React, { useState, useEffect } from 'react';
import { Bell, Mail, Package, Globe, DollarSign } from 'lucide-react';

const PreferencesForm = ({ initialPreferences, onChange }) => {
    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        orderUpdates: true,
        promotionalEmails: false,
        language: 'en',
        currency: 'NPR',
        ...initialPreferences,
    });

    useEffect(() => {
        if (initialPreferences) {
            setPreferences({ ...preferences, ...initialPreferences });
        }
    }, [initialPreferences]);

    const handleToggle = (field) => {
        const updatedPreferences = {
            ...preferences,
            [field]: !preferences[field],
        };
        setPreferences(updatedPreferences);

        if (onChange) {
            onChange(updatedPreferences);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedPreferences = {
            ...preferences,
            [name]: value,
        };
        setPreferences(updatedPreferences);

        if (onChange) {
            onChange(updatedPreferences);
        }
    };

    const ToggleSwitch = ({ enabled, onToggle }) => (
        <button
            onClick={onToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-purple-600' : 'bg-gray-300'
                }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
            />
        </button>
    );

    return (
        <div className="space-y-6">
            {/* Notification Preferences */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                    <Bell className="text-purple-600" size={24} />
                    <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                </div>

                <div className="space-y-4">
                    {/* Email Notifications */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-start gap-3">
                            <Mail className="text-gray-400 mt-1" size={20} />
                            <div>
                                <p className="font-medium text-gray-900">Email Notifications</p>
                                <p className="text-sm text-gray-500">Receive important updates via email</p>
                            </div>
                        </div>
                        <ToggleSwitch
                            enabled={preferences.emailNotifications}
                            onToggle={() => handleToggle('emailNotifications')}
                        />
                    </div>

                    {/* Order Updates */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-start gap-3">
                            <Package className="text-gray-400 mt-1" size={20} />
                            <div>
                                <p className="font-medium text-gray-900">Order Updates</p>
                                <p className="text-sm text-gray-500">Get notified about order status changes</p>
                            </div>
                        </div>
                        <ToggleSwitch
                            enabled={preferences.orderUpdates}
                            onToggle={() => handleToggle('orderUpdates')}
                        />
                    </div>

                    {/* Promotional Emails */}
                    <div className="flex items-center justify-between py-3">
                        <div className="flex items-start gap-3">
                            <Mail className="text-gray-400 mt-1" size={20} />
                            <div>
                                <p className="font-medium text-gray-900">Promotional Emails</p>
                                <p className="text-sm text-gray-500">Receive special offers and promotions</p>
                            </div>
                        </div>
                        <ToggleSwitch
                            enabled={preferences.promotionalEmails}
                            onToggle={() => handleToggle('promotionalEmails')}
                        />
                    </div>
                </div>
            </div>

            {/* Language and Currency */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                    <Globe className="text-purple-600" size={24} />
                    <h3 className="text-lg font-semibold text-gray-900">Regional Settings</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Language */}
                    <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                            Language
                        </label>
                        <select
                            id="language"
                            name="language"
                            value={preferences.language}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="en">English</option>
                            <option value="ne">Nepali (नेपाली)</option>
                            <option value="hi">Hindi (हिन्दी)</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                        </select>
                    </div>

                    {/* Currency */}
                    <div>
                        <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                            Currency
                        </label>
                        <select
                            id="currency"
                            name="currency"
                            value={preferences.currency}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="NPR">NPR - Nepali Rupee</option>
                            <option value="USD">USD - US Dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="GBP">GBP - British Pound</option>
                            <option value="INR">INR - Indian Rupee</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreferencesForm;
