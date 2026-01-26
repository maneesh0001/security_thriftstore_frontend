// src/Components/PrivacySettings.jsx
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, Globe, Users } from 'lucide-react';
import { toast } from 'react-toastify';
import { updatePrivacySettings } from '../services/profileService';

const PrivacySettings = ({ initialSettings, onUpdate }) => {
    const [settings, setSettings] = useState({
        showEmail: 'private',
        showPhone: 'private',
        showAddress: 'private',
        showDateOfBirth: 'private',
        profileVisibility: 'public',
        ...initialSettings,
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (initialSettings) {
            setSettings({ ...settings, ...initialSettings });
        }
    }, [initialSettings]);

    const privacyLevels = [
        { value: 'public', label: 'Public', icon: Globe, color: 'text-green-600', description: 'Everyone can see' },
        { value: 'contacts', label: 'Contacts', icon: Users, color: 'text-blue-600', description: 'Only your contacts' },
        { value: 'private', label: 'Private', icon: Lock, color: 'text-red-600', description: 'Only you' },
    ];

    const profileVisibilityOptions = [
        { value: 'public', label: 'Public', icon: Globe, color: 'text-green-600', description: 'Anyone can view your profile' },
        { value: 'private', label: 'Private', icon: Lock, color: 'text-red-600', description: 'Only you can view your profile' },
    ];

    const handleChange = (field, value) => {
        setSettings(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const response = await updatePrivacySettings(settings);
            toast.success('Privacy settings updated successfully!');

            if (onUpdate) {
                onUpdate(response.privacySettings);
            }
        } catch (error) {
            console.error('Save privacy settings error:', error);
            toast.error(error.message || 'Failed to update privacy settings');
        } finally {
            setSaving(false);
        }
    };

    const PrivacyOption = ({ field, label, description }) => (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
                    <p className="text-sm text-gray-500 mt-1">{description}</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {privacyLevels.map((level) => {
                    const Icon = level.icon;
                    const isSelected = settings[field] === level.value;

                    return (
                        <button
                            key={level.value}
                            onClick={() => handleChange(field, level.value)}
                            className={`p-4 rounded-lg border-2 transition-all ${isSelected
                                    ? 'border-purple-500 bg-purple-50'
                                    : 'border-gray-200 hover:border-purple-300'
                                }`}
                        >
                            <Icon className={`mx-auto mb-2 ${isSelected ? 'text-purple-600' : level.color}`} size={24} />
                            <p className={`text-sm font-medium ${isSelected ? 'text-purple-600' : 'text-gray-700'}`}>
                                {level.label}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{level.description}</p>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Profile Visibility */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Profile Visibility</h3>
                    <p className="text-sm text-gray-500 mt-1">Control who can view your entire profile</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {profileVisibilityOptions.map((option) => {
                        const Icon = option.icon;
                        const isSelected = settings.profileVisibility === option.value;

                        return (
                            <button
                                key={option.value}
                                onClick={() => handleChange('profileVisibility', option.value)}
                                className={`p-4 rounded-lg border-2 transition-all ${isSelected
                                        ? 'border-purple-500 bg-purple-50'
                                        : 'border-gray-200 hover:border-purple-300'
                                    }`}
                            >
                                <Icon className={`mx-auto mb-2 ${isSelected ? 'text-purple-600' : option.color}`} size={28} />
                                <p className={`text-base font-medium ${isSelected ? 'text-purple-600' : 'text-gray-700'}`}>
                                    {option.label}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Individual Field Privacy */}
            <PrivacyOption
                field="showEmail"
                label="Email Address"
                description="Who can see your email address"
            />

            <PrivacyOption
                field="showPhone"
                label="Phone Number"
                description="Who can see your phone number"
            />

            <PrivacyOption
                field="showAddress"
                label="Address"
                description="Who can see your address"
            />

            <PrivacyOption
                field="showDateOfBirth"
                label="Date of Birth"
                description="Who can see your date of birth"
            />

            {/* Save Button */}
            <div className="flex justify-end pt-4">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
                >
                    {saving ? 'Saving...' : 'Save Privacy Settings'}
                </button>
            </div>
        </div>
    );
};

export default PrivacySettings;
