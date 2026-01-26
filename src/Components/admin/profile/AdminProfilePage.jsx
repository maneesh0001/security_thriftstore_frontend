// src/Components/admin/profile/AdminProfilePage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { User, MapPin, Lock, Settings, Shield, Key, Globe, Users, Camera, Upload, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../auth/AuthProvider';
import ProfilePictureUpload from '../../ProfilePictureUpload';
import AddressForm from '../../AddressForm';
import PrivacySettings from '../../PrivacySettings';
import PreferencesForm from '../../PreferencesForm';
import TwoFactorSettings from '../../TwoFactorSettings';
import { getMyProfile, updateProfile, updatePreferences } from '../../../services/profileService';
import DOMPurify from 'dompurify';

const AdminProfilePage = () => {
    const { user, signIn } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        bio: '',
        dateOfBirth: '',
        gender: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
        },
        socialLinks: {
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: '',
        },
    });
    const [preferences, setPreferences] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await getMyProfile();
            setProfile(response.profile);

            // Populate form data
            setFormData({
                name: response.profile.name || '',
                phone: response.profile.phone || '',
                bio: response.profile.bio || '',
                dateOfBirth: response.profile.dateOfBirth ? response.profile.dateOfBirth.split('T')[0] : '',
                gender: response.profile.gender || '',
                address: response.profile.address || {
                    street: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    country: '',
                },
                socialLinks: response.profile.socialLinks || {
                    facebook: '',
                    twitter: '',
                    instagram: '',
                    linkedin: '',
                },
            });

            setPreferences(response.profile.preferences);
        } catch (error) {
            console.error('Fetch profile error:', error);
            toast.error(error.message || 'Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Handle nested social links
        if (name.startsWith('social_')) {
            const socialField = name.replace('social_', '');
            setFormData(prev => ({
                ...prev,
                socialLinks: {
                    ...prev.socialLinks,
                    [socialField]: value,
                },
            }));
            return;
        }
        
        // Sanitize bio input to prevent XSS attacks
        const sanitizedValue = name === 'bio' 
            ? DOMPurify.sanitize(value, { ALLOWED_TAGS: [] }) // Remove all HTML tags
            : value;
        
        setFormData(prev => ({
            ...prev,
            [name]: sanitizedValue,
        }));
    };

    const handleAddressChange = (address) => {
        setFormData(prev => ({
            ...prev,
            address,
        }));
    };

    const handleSaveProfile = async () => {
        try {
            setSaving(true);
            
            // Ensure address is properly structured
            const profileData = {
                ...formData,
                address: formData.address || {
                    street: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    country: '',
                },
                socialLinks: formData.socialLinks || {
                    facebook: '',
                    twitter: '',
                    instagram: '',
                    linkedin: '',
                }
            };
            
            console.log('🔍 [FRONTEND PROFILE] Saving profile with data:', profileData);
            
            const response = await updateProfile(profileData);
            
            console.log('🔍 [FRONTEND PROFILE] Server response:', response);
            toast.success('Profile updated successfully!');
            setProfile(response.profile);
            
            // Update AuthContext with new profile data
            const updatedUser = {
                ...user,
                name: response.profile.name,
                profilePicture: response.profile.profilePicture,
                phone: response.profile.phone,
                bio: response.profile.bio,
                dateOfBirth: response.profile.dateOfBirth,
                gender: response.profile.gender,
                address: response.profile.address,
                socialLinks: response.profile.socialLinks
            };
            signIn(updatedUser);
        } catch (error) {
            console.error('❌ [FRONTEND PROFILE] Save profile error:', error);
            console.error('❌ [FRONTEND PROFILE] Error response:', error.response?.data);
            
            // Show detailed error message
            if (error.response?.data?.errors) {
                const errorMessages = error.response.data.errors.map(err => `${err.field}: ${err.message}`).join(', ');
                toast.error(`Validation failed: ${errorMessages}`);
            } else {
                toast.error(error.response?.data?.message || error.message || 'Failed to update profile');
            }
        } finally {
            setSaving(false);
        }
    };

    const handlePreferencesChange = (newPreferences) => {
        setPreferences(newPreferences);
    };

    const handleSavePreferences = async () => {
        try {
            setSaving(true);
            await updatePreferences(preferences);
            toast.success('Preferences updated successfully!');
        } catch (error) {
            console.error('Save preferences error:', error);
            toast.error(error.message || 'Failed to update preferences');
        } finally {
            setSaving(false);
        }
    };

    const handleProfilePictureUpdate = (pictureUrl) => {
        setProfile(prev => ({
            ...prev,
            profilePicture: pictureUrl,
        }));
        
        // Update AuthContext with new profile picture
        const updatedUser = {
            ...user,
            profilePicture: pictureUrl
        };
        signIn(updatedUser);
    };

    const tabs = [
        { id: 'profile', label: 'Profile Information', icon: User },
        { id: 'social', label: 'Social Links', icon: Globe },
        { id: 'address', label: 'Address', icon: MapPin },
        { id: 'privacy', label: 'Privacy Settings', icon: Lock },
        { id: 'preferences', label: 'Preferences', icon: Settings },
        { id: 'security', label: 'Security', icon: Shield },
    ];

    if (loading) {
        return (
            <div className="bg-gray-50 text-gray-800 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading admin profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 text-gray-800 min-h-screen">
            <div className="px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <header className="mb-10">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Admin Profile</h1>
                    <p className="text-lg text-gray-500 mt-2">Manage your personal information and security settings.</p>
                </header>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px overflow-x-auto">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                                ? 'border-indigo-600 text-indigo-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        <Icon size={18} />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {/* Profile Information Tab */}
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            {/* Profile Picture */}
                            <div className="pb-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Picture</h2>
                                <ProfilePictureUpload
                                    currentPicture={profile?.profilePicture}
                                    onUploadSuccess={handleProfilePictureUpdate}
                                />
                            </div>

                            {/* Basic Information */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={profile?.email || ''}
                                            disabled
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+977 9800000000"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Gender
                                        </label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                            <option value="prefer-not-to-say">Prefer not to say</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Bio
                                    </label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        rows="4"
                                        maxLength="500"
                                        placeholder="Tell us about yourself..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    ></textarea>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {formData.bio.length}/500 characters
                                    </p>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end pt-6 border-t border-gray-200">
                                <button
                                    onClick={handleSaveProfile}
                                    disabled={saving}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Social Links Tab */}
                    {activeTab === 'social' && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Globe className="text-indigo-600" size={24} />
                                <h3 className="text-lg font-semibold text-gray-900">Social Media Links</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Facebook
                                    </label>
                                    <input
                                        type="url"
                                        name="social_facebook"
                                        value={formData.socialLinks.facebook}
                                        onChange={handleInputChange}
                                        placeholder="https://facebook.com/yourprofile"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Twitter
                                    </label>
                                    <input
                                        type="url"
                                        name="social_twitter"
                                        value={formData.socialLinks.twitter}
                                        onChange={handleInputChange}
                                        placeholder="https://twitter.com/yourprofile"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Instagram
                                    </label>
                                    <input
                                        type="url"
                                        name="social_instagram"
                                        value={formData.socialLinks.instagram}
                                        onChange={handleInputChange}
                                        placeholder="https://instagram.com/yourprofile"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        LinkedIn
                                    </label>
                                    <input
                                        type="url"
                                        name="social_linkedin"
                                        value={formData.socialLinks.linkedin}
                                        onChange={handleInputChange}
                                        placeholder="https://linkedin.com/in/yourprofile"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-6 border-t border-gray-200">
                                <button
                                    onClick={handleSaveProfile}
                                    disabled={saving}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
                                >
                                    {saving ? 'Saving...' : 'Save Social Links'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Address Tab */}
                    {activeTab === 'address' && (
                        <div>
                            <AddressForm
                                initialAddress={formData.address}
                                onChange={handleAddressChange}
                            />
                            <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
                                <button
                                    onClick={handleSaveProfile}
                                    disabled={saving}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
                                >
                                    {saving ? 'Saving...' : 'Save Address'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Privacy Settings Tab */}
                    {activeTab === 'privacy' && (
                        <PrivacySettings
                            initialSettings={profile?.privacySettings}
                            onUpdate={(settings) => {
                                setProfile(prev => ({
                                    ...prev,
                                    privacySettings: settings,
                                }));
                            }}
                        />
                    )}

                    {/* Preferences Tab */}
                    {activeTab === 'preferences' && (
                        <div>
                            <PreferencesForm
                                initialPreferences={preferences}
                                onChange={handlePreferencesChange}
                            />
                            <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
                                <button
                                    onClick={handleSavePreferences}
                                    disabled={saving}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
                                >
                                    {saving ? 'Saving...' : 'Save Preferences'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-blue-800">
                                    Manage your account security settings including password and two-factor authentication.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => navigate('/change-password')}
                                    className="flex items-center gap-3 p-6 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                                >
                                    <Key className="text-indigo-600" size={24} />
                                    <div className="text-left">
                                        <p className="font-semibold text-gray-900">Change Password</p>
                                        <p className="text-sm text-gray-500">Update your account password</p>
                                    </div>
                                </button>
                            </div>

                            {/* Two-Factor Authentication Settings */}
                            <TwoFactorSettings />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminProfilePage;
