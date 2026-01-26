// src/Components/TwoFactorSetup.jsx
import React, { useState } from 'react';
import axios from 'axios';

const TwoFactorSetup = ({ onClose, onSuccess }) => {
    const [step, setStep] = useState('setup'); // 'setup', 'verify', 'backup'
    const [qrCode, setQrCode] = useState('');
    const [manualKey, setManualKey] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [backupCodes, setBackupCodes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Step 1: Setup 2FA and get QR code
    const handleSetup = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(
                'http://localhost:5000/api/2fa/setup',
                {},
                { withCredentials: true } // Use session cookies instead of JWT
            );

            setQrCode(response.data.qrCode);
            setManualKey(response.data.manualEntryKey);
            setStep('verify');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to setup 2FA');
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify and enable 2FA
    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(
                'http://localhost:5000/api/2fa/enable',
                { token: verificationCode },
                { withCredentials: true } // Use session cookies instead of JWT
            );

            setBackupCodes(response.data.backupCodes);
            setStep('backup');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid verification code');
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Download backup codes
    const downloadBackupCodes = () => {
        const content = `Thrift Store - Two-Factor Authentication Backup Codes\n\nGenerated: ${new Date().toLocaleString()}\n\nIMPORTANT: Keep these codes safe! Each code can only be used once.\n\n${backupCodes.map((code, i) => `${i + 1}. ${code}`).join('\n')}\n\nIf you lose access to your authenticator app, you can use these codes to log in.`;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'thriftstore-backup-codes.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleComplete = () => {
        if (onSuccess) onSuccess();
        if (onClose) onClose();
    };

    React.useEffect(() => {
        if (step === 'setup') {
            handleSetup();
        }
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    {step === 'setup' && 'Setting up 2FA...'}
                    {step === 'verify' && 'Scan QR Code'}
                    {step === 'backup' && 'Save Backup Codes'}
                </h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {/* Step 1: QR Code Display */}
                {step === 'verify' && (
                    <div>
                        <p className="text-gray-600 mb-4">
                            Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                        </p>
                        {qrCode && (
                            <div className="flex justify-center mb-4">
                                <img src={qrCode} alt="2FA QR Code" className="border rounded" />
                            </div>
                        )}
                        <div className="bg-gray-100 p-3 rounded mb-4">
                            <p className="text-sm text-gray-600 mb-1">Manual Entry Key:</p>
                            <code className="text-sm font-mono break-all">{manualKey}</code>
                        </div>

                        <form onSubmit={handleVerify}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enter 6-digit code from your app:
                            </label>
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 text-center text-2xl tracking-widest"
                                placeholder="000000"
                                maxLength="6"
                                required
                            />
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    disabled={loading || verificationCode.length !== 6}
                                >
                                    {loading ? 'Verifying...' : 'Verify & Enable'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Step 2: Backup Codes */}
                {step === 'backup' && (
                    <div>
                        <div className="bg-yellow-50 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-4">
                            <p className="font-semibold">⚠️ Important!</p>
                            <p className="text-sm">Save these backup codes in a safe place. Each code can only be used once.</p>
                        </div>

                        <div className="bg-gray-100 p-4 rounded mb-4 max-h-60 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-2">
                                {backupCodes.map((code, index) => (
                                    <div key={index} className="font-mono text-sm bg-white p-2 rounded">
                                        {code}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={downloadBackupCodes}
                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                📥 Download Codes
                            </button>
                            <button
                                onClick={handleComplete}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}

                {loading && step === 'setup' && (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-gray-600 mt-4">Setting up 2FA...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TwoFactorSetup;
