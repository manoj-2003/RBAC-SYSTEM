import React from 'react';
import { User, Role } from '../types';
import { Edit, Trash2 } from 'lucide-react';

interface UserListProps {
  users: User[];
  roles: Role[];
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

export default function UserList({ users, roles, onEditUser, onDeleteUser }: UserListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-indigo-900 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-indigo-900 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-indigo-900 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-indigo-900 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-indigo-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img className="h-10 w-10 rounded-full ring-2 ring-indigo-100" src={user.avatar} alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                  {roles.find((role) => role.id === user.roleId)?.name}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex space-x-3">
                  <button
                    onClick={() => onEditUser(user)}
                    className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-900 transition-colors duration-150"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}