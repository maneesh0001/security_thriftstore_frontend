// FILE: UserTable.jsx

import React from 'react';
import { useDeleteUser } from '../../../hooks/admin/useDeleteUsersHook';
import { useUsers } from '../../../hooks/admin/useGetUsersHook';

const UserTable = () => {
  const { data: users, isLoading, isError } = useUsers();
  
  const { mutate: deleteUser } = useDeleteUser();

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

  const UserRow = ({ user }) => (
    <tr className="border-b border-slate-200 hover:bg-slate-50">
      <td className="p-4 text-slate-700 font-medium">{user.name}</td>
      <td className="p-4 text-slate-600">{user.email}</td>
      <td className="p-4 text-slate-600">{user.role}</td>
      <td className="p-4 text-slate-600">{new Date(user.createdAt).toLocaleDateString()}</td>
      <td className="p-4 text-center">
        <button
          onClick={() => handleDelete(user._id)}
          className="p-2 text-red-600 hover:bg-slate-200 rounded-full"
          title="Delete user"
        >
          🗑️
        </button>
      </td>
    </tr>
  );



  if (isLoading) return <p className="mt-4 text-gray-600">Loading users...</p>;
  if (isError) return <p className="mt-4 text-red-500">Error loading users.</p>;

  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm border border-slate-200 overflow-x-auto">
      <table className="min-w-full">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            <th className="p-4 text-left text-sm font-semibold text-slate-500 uppercase">Name</th>
            <th className="p-4 text-left text-sm font-semibold text-slate-500 uppercase">Email</th>
            <th className="p-4 text-left text-sm font-semibold text-slate-500 uppercase">Role</th>
            <th className="p-4 text-left text-sm font-semibold text-slate-500 uppercase">Joined</th>
            <th className="p-4 text-center text-sm font-semibold text-slate-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
