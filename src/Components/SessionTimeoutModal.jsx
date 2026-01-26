import React from 'react';
import './SessionTimeoutModal.css';

const SessionTimeoutModal = ({ timeRemaining, onStayLoggedIn, onLogout }) => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return (
        <div className="session-timeout-overlay">
            <div className="session-timeout-modal">
                <div className="modal-icon">
                    <svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                </div>

                <h2>Session Expiring Soon</h2>

                <p className="timeout-message">
                    Your session will expire due to inactivity in:
                </p>

                <div className="countdown-timer">
                    <span className="time-display">
                        {minutes}:{seconds.toString().padStart(2, '0')}
                    </span>
                </div>

                <p className="timeout-info">
                    You will be automatically logged out for security reasons.
                </p>

                <div className="modal-actions">
                    <button className="btn-stay" onClick={onStayLoggedIn}>
                        Stay Logged In
                    </button>
                    <button className="btn-logout" onClick={onLogout}>
                        Logout Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SessionTimeoutModal;
