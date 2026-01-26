// src/services/profileService.js
import instance from '../api/Api';

/**
 * Get current user's profile
 * @returns {Promise} User profile data
 */
export const getMyProfile = async () => {
    try {
        const response = await instance.get(`/profile/me`);
        return response.data;
    } catch (error) {
        console.error('Get Profile Error:', error);
        throw error.response?.data || { message: 'Failed to fetch profile' };
    }
};

/**
 * Update user profile
 * @param {object} profileData - Profile data to update
 * @returns {Promise} Updated profile
 */
export const updateProfile = async (profileData) => {
    try {
        const response = await instance.put(`/profile/me`, profileData);
        return response.data;
    } catch (error) {
        console.error('Update Profile Error:', error);
        throw error.response?.data || { message: 'Failed to update profile' };
    }
};

/**
 * Upload profile picture
 * @param {File} file - Image file to upload
 * @returns {Promise} Upload response with image URL
 */
export const uploadProfilePicture = async (file) => {
    try {
        const formData = new FormData();
        formData.append('profilePicture', file);

        const response = await instance.post(`/profile/picture`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Upload Profile Picture Error:', error);
        throw error.response?.data || { message: 'Failed to upload profile picture' };
    }
};

/**
 * Delete profile picture
 * @returns {Promise} Delete response
 */
export const deleteProfilePicture = async () => {
    try {
        const response = await instance.delete(`/profile/picture`);
        return response.data;
    } catch (error) {
        console.error('Delete Profile Picture Error:', error);
        throw error.response?.data || { message: 'Failed to delete profile picture' };
    }
};

/**
 * Update privacy settings
 * @param {object} privacySettings - Privacy settings object
 * @returns {Promise} Updated privacy settings
 */
export const updatePrivacySettings = async (privacySettings) => {
    try {
        const response = await instance.put(`/profile/privacy`, { privacySettings });
        return response.data;
    } catch (error) {
        console.error('Update Privacy Settings Error:', error);
        throw error.response?.data || { message: 'Failed to update privacy settings' };
    }
};

/**
 * Update user preferences
 * @param {object} preferences - User preferences object
 * @returns {Promise} Updated preferences
 */
export const updatePreferences = async (preferences) => {
    try {
        const response = await instance.put(`/profile/preferences`, { preferences });
        return response.data;
    } catch (error) {
        console.error('Update Preferences Error:', error);
        throw error.response?.data || { message: 'Failed to update preferences' };
    }
};

/**
 * Get public profile of a user
 * @param {string} userId - User ID
 * @returns {Promise} Public profile data
 */
export const getPublicProfile = async (userId) => {
    try {
        const response = await instance.get(`/profile/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Get Public Profile Error:', error);
        throw error.response?.data || { message: 'Failed to fetch public profile' };
    }
};

export default {
    getMyProfile,
    updateProfile,
    uploadProfilePicture,
    deleteProfilePicture,
    updatePrivacySettings,
    updatePreferences,
    getPublicProfile,
};
