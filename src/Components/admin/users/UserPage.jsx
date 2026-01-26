// frontend/src/Components/admin/users/UserPage.jsx
import React from 'react';
import UserStatsCards from '../UserStatsCards';
import UserManagement from '../UserManagement';

const UserPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>User Management</h1>
        <p style={styles.subtitle}>Manage user accounts, roles, and permissions</p>
      </div>

      {/* User Statistics */}
      <UserStatsCards />

      {/* User Management Table */}
      <UserManagement />
    </div>
  );
};

const styles = {
  container: {
    padding: '24px',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#718096',
  },
};

export default UserPage;
