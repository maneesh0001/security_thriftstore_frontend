// src/Components/ProfilePictureUpload.jsx
import React, { useState, useRef } from 'react';
import { Camera, Upload, X, User } from 'lucide-react';
import { toast } from 'react-toastify';
import { uploadProfilePicture, deleteProfilePicture } from '../services/profileService';

const ProfilePictureUpload = ({ currentPicture, onUploadSuccess }) => {
    const [preview, setPreview] = useState(currentPicture ? (currentPicture.startsWith('http') ? currentPicture : `http://localhost:5000${currentPicture}`) : null);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const API_BASE_URL = 'http://localhost:5000';

    // Validate file
    const validateFile = (file) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
            toast.error('Invalid file type. Please upload JPEG, PNG, GIF, or WebP images.');
            return false;
        }

        if (file.size > maxSize) {
            toast.error('File size exceeds 5MB. Please choose a smaller image.');
            return false;
        }

        return true;
    };

    // Handle file selection
    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!validateFile(file)) return;

        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload file
        await uploadFile(file);
    };

    // Handle drag and drop
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (!file) return;

        if (!validateFile(file)) return;

        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload file
        await uploadFile(file);
    };

    // Upload file to server
    const uploadFile = async (file) => {
        try {
            setUploading(true);
            console.log('🔍 [FRONTEND UPLOAD] Starting upload for file:', file.name);
            console.log('🔍 [FRONTEND UPLOAD] File size:', file.size);
            console.log('🔍 [FRONTEND UPLOAD] File type:', file.type);
            
            const response = await uploadProfilePicture(file);
            
            console.log('🔍 [FRONTEND UPLOAD] Server response:', response);
            console.log('🔍 [FRONTEND UPLOAD] Profile picture URL:', response.profilePicture);

            toast.success('Profile picture uploaded successfully!');
            const imageUrl = response.profilePicture.startsWith('http') 
                ? response.profilePicture 
                : `http://localhost:5000${response.profilePicture}`;
            
            console.log('🔍 [FRONTEND UPLOAD] Final image URL:', imageUrl);
            setPreview(imageUrl);

            if (onUploadSuccess) {
                console.log('🔍 [FRONTEND UPLOAD] Calling onUploadSuccess with:', response.profilePicture);
                onUploadSuccess(response.profilePicture);
            }
        } catch (error) {
            console.error('❌ [FRONTEND UPLOAD] Upload error:', error);
            console.error('❌ [FRONTEND UPLOAD] Error response:', error.response?.data);
            toast.error(error.message || 'Failed to upload profile picture');
            setPreview(currentPicture); // Revert to previous picture
        } finally {
            setUploading(false);
        }
    };

    // Handle delete
    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete your profile picture?')) {
            return;
        }

        try {
            setUploading(true);
            await deleteProfilePicture();

            toast.success('Profile picture deleted successfully!');
            setPreview(null);

            if (onUploadSuccess) {
                onUploadSuccess(null);
            }
        } catch (error) {
            console.error('Delete error:', error);
            toast.error(error.message || 'Failed to delete profile picture');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            {/* Profile Picture Display */}
            <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-xl">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            onLoad={() => console.log('🔍 [FRONTEND UPLOAD] Image loaded successfully:', preview)}
                            onError={(e) => {
                                console.error('❌ [FRONTEND UPLOAD] Image load error:', e.target.src);
                                console.error('❌ [FRONTEND UPLOAD] Error details:', e);
                                e.target.style.display = 'none';
                            }}
                        />
                    ) : (
                        <User size={64} className="text-white" />
                    )}
                </div>

                {/* Camera Icon Overlay */}
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Camera size={20} />
                </button>
            </div>

            {/* Upload Area */}
            <div
                className={`w-full max-w-md border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragActive
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-400'
                    } ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !uploading && fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={uploading}
                />

                <Upload className="mx-auto mb-3 text-gray-400" size={32} />

                <p className="text-sm text-gray-600 mb-1">
                    {uploading ? 'Uploading...' : 'Drag and drop or click to upload'}
                </p>
                <p className="text-xs text-gray-500">
                    JPEG, PNG, GIF, or WebP (max 5MB)
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <Upload size={16} />
                    {uploading ? 'Uploading...' : 'Upload New'}
                </button>

                {preview && (
                    <button
                        onClick={handleDelete}
                        disabled={uploading}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <X size={16} />
                        Delete
                    </button>
                )}
            </div>

            {/* Upload Progress */}
            {uploading && (
                <div className="w-full max-w-md">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePictureUpload;
