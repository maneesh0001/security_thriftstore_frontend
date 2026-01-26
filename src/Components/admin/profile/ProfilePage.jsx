// Redirect to the new comprehensive admin profile page
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to the new comprehensive admin profile page
        navigate('/admin/profile');
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Redirecting to admin profile...</p>
            </div>
        </div>
    );
};

export default ProfilePage;
