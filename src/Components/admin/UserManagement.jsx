// frontend/src/Components/admin/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Lock, Unlock, Shield, User as UserIcon } from 'lucide-react';
import instance from '../../api/Api';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
    const [editingUser, setEditingUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    // Fetch users
    const fetchUsers = async (page = 1) => {
        try {
            setLoading(true);
            const response = await instance.get(
                `/users?page=${page}&limit=10&search=${searchTerm}&role=${roleFilter}`
            );
            setUsers(response.data.users);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Error fetching users:', error);
            alert(error.response?.data?.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [searchTerm, roleFilter]);

    // Delete user
    const handleDelete = async (userId, userEmail) => {
        if (!window.confirm(`Are you sure you want to delete user: ${userEmail}?`)) return;

        try {
            await instance.delete(`/users/${userId}`);
            alert('User deleted successfully');
            fetchUsers(pagination.page);
        } catch (error) {
            console.error('Error deleting user:', error);
            alert(error.response?.data?.message || 'Failed to delete user');
        }
    };

    // Toggle lock
    const handleToggleLock = async (userId, currentlyLocked) => {
        try {
            await instance.put(
                `/users/${userId}/lock`,
                { locked: !currentlyLocked }
            );
            alert(`User ${!currentlyLocked ? 'locked' : 'unlocked'} successfully`);
            fetchUsers(pagination.page);
        } catch (error) {
            console.error('Error toggling lock:', error);
            alert(error.response?.data?.message || 'Failed to toggle lock');
        }
    };

    // Change role
    const handleRoleChange = async (userId, newRole) => {
        if (!window.confirm(`Change user role to ${newRole}?`)) return;

        try {
            await instance.put(
                `/users/${userId}/role`,
                { role: newRole }
            );
            alert('Role updated successfully');
            fetchUsers(pagination.page);
        } catch (error) {
            console.error('Error changing role:', error);
            alert(error.response?.data?.message || 'Failed to change role');
        }
    };

    // Update user
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await instance.put(
                `/users/${editingUser._id}`,
                { name: editingUser.name, email: editingUser.email }
            );
            alert('User updated successfully');
            setShowEditModal(false);
            fetchUsers(pagination.page);
        } catch (error) {
            console.error('Error updating user:', error);
            alert(error.response?.data?.message || 'Failed to update user');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>User Management</h2>

                {/* Search and Filters */}
                <div style={styles.controls}>
                    <div style={styles.searchContainer}>
                        <Search size={20} style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>

                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">All Roles</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            {loading ? (
                <div style={styles.loading}>Loading users...</div>
            ) : (
                <>
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr style={styles.tableHeader}>
                                    <th style={styles.th}>Name</th>
                                    <th style={styles.th}>Email</th>
                                    <th style={styles.th}>Role</th>
                                    <th style={styles.th}>Status</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} style={styles.tableRow}>
                                        <td style={styles.td}>{user.name}</td>
                                        <td style={styles.td}>{user.email}</td>
                                        <td style={styles.td}>
                                            <span style={{
                                                ...styles.badge,
                                                backgroundColor: user.role === 'admin' ? '#667eea' : '#48bb78',
                                            }}>
                                                {user.role === 'admin' ? <Shield size={14} /> : <UserIcon size={14} />}
                                                <span style={{ marginLeft: '4px' }}>{user.role}</span>
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            <span style={{
                                                ...styles.badge,
                                                backgroundColor: user.isEmailVerified ? '#48bb78' : '#ed8936',
                                            }}>
                                                {user.isEmailVerified ? 'Verified' : 'Unverified'}
                                            </span>
                                            {user.isLocked && (
                                                <span style={{ ...styles.badge, backgroundColor: '#f56565', marginLeft: '4px' }}>
                                                    Locked
                                                </span>
                                            )}
                                        </td>
                                        <td style={styles.td}>
                                            <div style={styles.actions}>
                                                <button
                                                    onClick={() => {
                                                        setEditingUser(user);
                                                        setShowEditModal(true);
                                                    }}
                                                    style={{ ...styles.actionBtn, color: '#4299e1' }}
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleToggleLock(user._id, user.isLocked)}
                                                    style={{ ...styles.actionBtn, color: user.isLocked ? '#48bb78' : '#ed8936' }}
                                                    title={user.isLocked ? 'Unlock' : 'Lock'}
                                                >
                                                    {user.isLocked ? <Unlock size={18} /> : <Lock size={18} />}
                                                </button>
                                                <button
                                                    onClick={() => handleRoleChange(user._id, user.role === 'admin' ? 'user' : 'admin')}
                                                    style={{ ...styles.actionBtn, color: '#667eea' }}
                                                    title="Change Role"
                                                >
                                                    <Shield size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user._id, user.email)}
                                                    style={{ ...styles.actionBtn, color: '#f56565' }}
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div style={styles.pagination}>
                        <button
                            onClick={() => fetchUsers(pagination.page - 1)}
                            disabled={pagination.page === 1}
                            style={styles.paginationBtn}
                        >
                            Previous
                        </button>
                        <span style={styles.paginationInfo}>
                            Page {pagination.page} of {pagination.pages} ({pagination.total} users)
                        </span>
                        <button
                            onClick={() => fetchUsers(pagination.page + 1)}
                            disabled={pagination.page === pagination.pages}
                            style={styles.paginationBtn}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

            {/* Edit Modal */}
            {showEditModal && editingUser && (
                <div style={styles.modalOverlay} onClick={() => setShowEditModal(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h3 style={styles.modalTitle}>Edit User</h3>
                        <form onSubmit={handleUpdate}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Name</label>
                                <input
                                    type="text"
                                    value={editingUser.name}
                                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Email</label>
                                <input
                                    type="email"
                                    value={editingUser.email}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.modalActions}>
                                <button type="submit" style={styles.saveBtn}>Save</button>
                                <button type="button" onClick={() => setShowEditModal(false)} style={styles.cancelBtn}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    header: {
        marginBottom: '24px',
    },
    title: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#1a202c',
        marginBottom: '16px',
    },
    controls: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
    },
    searchContainer: {
        position: 'relative',
        flex: 1,
        minWidth: '250px',
    },
    searchIcon: {
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#a0aec0',
    },
    searchInput: {
        width: '100%',
        padding: '10px 10px 10px 40px',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        fontSize: '14px',
    },
    select: {
        padding: '10px 12px',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        fontSize: '14px',
        backgroundColor: 'white',
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#718096',
    },
    tableContainer: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#f7fafc',
    },
    th: {
        padding: '12px',
        textAlign: 'left',
        fontSize: '12px',
        fontWeight: '600',
        color: '#4a5568',
        textTransform: 'uppercase',
        borderBottom: '2px solid #e2e8f0',
    },
    tableRow: {
        borderBottom: '1px solid #e2e8f0',
    },
    td: {
        padding: '12px',
        fontSize: '14px',
        color: '#2d3748',
    },
    badge: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
        color: 'white',
    },
    actions: {
        display: 'flex',
        gap: '8px',
    },
    actionBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        transition: 'opacity 0.2s',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
        padding: '12px',
        backgroundColor: '#f7fafc',
        borderRadius: '6px',
    },
    paginationBtn: {
        padding: '8px 16px',
        backgroundColor: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
    },
    paginationInfo: {
        fontSize: '14px',
        color: '#4a5568',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        maxWidth: '500px',
        width: '90%',
    },
    modalTitle: {
        fontSize: '20px',
        fontWeight: '700',
        marginBottom: '20px',
        color: '#1a202c',
    },
    formGroup: {
        marginBottom: '16px',
    },
    label: {
        display: 'block',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '6px',
        color: '#4a5568',
    },
    input: {
        width: '100%',
        padding: '10px 12px',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        fontSize: '14px',
    },
    modalActions: {
        display: 'flex',
        gap: '12px',
        marginTop: '20px',
    },
    saveBtn: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
    },
    cancelBtn: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#e2e8f0',
        color: '#4a5568',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
    },
};

export default UserManagement;
