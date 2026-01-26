// src/Components/TwoFactorVerification.jsx
import React, { useState } from 'react';

const TwoFactorVerification = ({ onVerify, onCancel, loading }) => {
    const [code, setCode] = useState('');
    const [useBackupCode, setUseBackupCode] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onVerify) {
            onVerify(code);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    Two-Factor Authentication
                </h2>

                <p className="text-gray-600 mb-6">
                    {useBackupCode
                        ? 'Enter one of your backup codes:'
                        : 'Enter the 6-digit code from your authenticator app:'}
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => {
                            const value = useBackupCode
                                ? e.target.value.toUpperCase().slice(0, 8)
                                : e.target.value.replace(/\D/g, '').slice(0, 6);
                            setCode(value);
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 text-center text-2xl tracking-widest font-mono"
                        placeholder={useBackupCode ? 'XXXXXXXX' : '000000'}
                        maxLength={useBackupCode ? 8 : 6}
                        autoFocus
                        required
                    />

                    <button
                        type="button"
                        onClick={() => {
                            setUseBackupCode(!useBackupCode);
                            setCode('');
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 mb-4 block"
                    >
                        {useBackupCode ? '← Use authenticator code' : 'Use backup code instead'}
                    </button>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            disabled={loading || code.length < (useBackupCode ? 8 : 6)}
                        >
                            {loading ? 'Verifying...' : 'Verify'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TwoFactorVerification;
