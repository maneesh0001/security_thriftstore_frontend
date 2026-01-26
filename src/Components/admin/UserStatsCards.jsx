// frontend/src/Components/admin/UserStatsCards.jsx
import React, { useState, useEffect } from 'react';
import { Users, UserCheck, Shield, Lock } from 'lucide-react';
import instance from '../../api/Api';

const UserStatsCards = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        adminUsers: 0,
        lockedUsers: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await instance.get('/users/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching user stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const cards = [
        {
            title: 'Total Users',
            value: stats.totalUsers,
            icon: <Users size={24} />,
            color: '#667eea',
            bgColor: '#eef2ff',
        },
        {
            title: 'Active Users',
            value: stats.activeUsers,
            icon: <UserCheck size={24} />,
            color: '#48bb78',
            bgColor: '#f0fff4',
        },
        {
            title: 'Admin Users',
            value: stats.adminUsers,
            icon: <Shield size={24} />,
            color: '#9f7aea',
            bgColor: '#faf5ff',
        },
        {
            title: 'Locked Accounts',
            value: stats.lockedUsers,
            icon: <Lock size={24} />,
            color: '#f56565',
            bgColor: '#fff5f5',
        },
    ];

    if (loading) {
        return <div style={styles.loading}>Loading statistics...</div>;
    }

    return (
        <div style={styles.container}>
            {cards.map((card, index) => (
                <div key={index} style={styles.card}>
                    <div style={{ ...styles.iconContainer, backgroundColor: card.bgColor }}>
                        <div style={{ color: card.color }}>{card.icon}</div>
                    </div>
                    <div style={styles.content}>
                        <p style={styles.title}>{card.title}</p>
                        <p style={{ ...styles.value, color: card.color }}>{card.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '24px',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
    },
    iconContainer: {
        width: '56px',
        height: '56px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: '14px',
        color: '#718096',
        marginBottom: '4px',
        fontWeight: '500',
    },
    value: {
        fontSize: '28px',
        fontWeight: '700',
        margin: 0,
    },
    loading: {
        textAlign: 'center',
        padding: '20px',
        color: '#718096',
    },
};

export default UserStatsCards;
