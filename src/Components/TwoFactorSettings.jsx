// src/Components/TwoFactorSettings.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TwoFactorSetup from './TwoFactorSetup';

const TwoFactorSettings = () => {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [backupCodesCount, setBackupCodesCount] = useState(0);
    const [showSetup, setShowSetup] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check2FAStatus();
    }, []);

    const check2FAStatus = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/2fa/status', {
                withCredentials: true // Use session cookies instead of JWT
            });
            setTwoFactorEnabled(response.data.twoFactorEnabled);
            setBackupCodesCount(response.data.backupCodesCount);
        } catch (error) {
            console.error('Error checking 2FA status:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDisable2FA = async () => {
        const password = prompt('Enter your password to disable 2FA:');
        if (!password) return;

        try {
            await axios.post(
                'http://localhost:5000/api/2fa/disable',
                { password },
                { withCredentials: true } // Use session cookies instead of JWT
            );
            setTwoFactorEnabled(false);
            setBackupCodesCount(0);
            alert('✅ 2FA disabled successfully');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to disable 2FA');
        }
    };

    const handleRegenerateBackupCodes = async () => {
        const password = prompt('Enter your password to regenerate backup codes:');
        if (!password) return;

        try {
            const response = await axios.post(
                'http://localhost:5000/api/2fa/backup-codes',
                { password },
                { withCredentials: true } // Use session cookies instead of JWT
            );

            // Download new backup codes
            const codes = response.data.backupCodes;
            const content = `Thrift Store - Two-Factor Authentication Backup Codes\n\nGenerated: ${new Date().toLocaleString()}\n\n${codes.map((code, i) => `${i + 1}. ${code}`).join('\n')}`;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'thriftstore-backup-codes-new.txt';
            a.click();
            URL.revokeObjectURL(url);

            setBackupCodesCount(codes.length);
            alert('✅ New backup codes generated and downloaded!');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to regenerate backup codes');
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Two-Factor Authentication</h3>
            <p className="text-gray-600 mb-4">
                Add an extra layer of security to your account with 2FA
            </p>

            {twoFactorEnabled ? (
                <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-semibold text-green-800">2FA is enabled</span>
                        </div>
                        <p className="text-sm text-green-700">
                            Your account is protected with two-factor authentication
                        </p>
                        <p className="text-sm text-green-600 mt-2">
                            Backup codes remaining: <strong>{backupCodesCount}</strong>
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleRegenerateBackupCodes}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                        >
                            Regenerate Backup Codes
                        </button>
                        <button
                            onClick={handleDisable2FA}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                        >
                            Disable 2FA
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span className="font-semibold text-yellow-800">2FA is not enabled</span>
                        </div>
                        <p className="text-sm text-yellow-700">
                            Enable 2FA to add an extra layer of security to your account
                        </p>
                    </div>

                    <button
                        onClick={() => setShowSetup(true)}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
                    >
                        Enable Two-Factor Authentication
                    </button>
                </div>
            )}

            {showSetup && (
                <TwoFactorSetup
                    onClose={() => setShowSetup(false)}
                    onSuccess={() => {
                        setShowSetup(false);
                        check2FAStatus();
                    }}
                />
            )}
        </div>
    );
};

export default TwoFactorSettings;
