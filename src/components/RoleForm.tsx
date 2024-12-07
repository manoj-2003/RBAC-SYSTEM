import React, { useState, useEffect } from 'react';
import { Role, Permission, Resource } from '../types';
import { resources } from '../data/mockData';

interface RoleFormProps {
  role?: Role;
  onSubmit: (roleData: Partial<Role>) => void;
  onCancel: () => void;
}

export default function RoleForm({ role, onSubmit, onCancel }: RoleFormProps) {
  const [formData, setFormData] = useState<Partial<Role>>({
    name: '',
    description: '',
    permissions: {},
  });

  useEffect(() => {
    if (role) {
      setFormData(role);
    }
  }, [role]);

  const handlePermissionChange = (resource: string, permission: Permission, checked: boolean) => {
    const currentPermissions = formData.permissions?.[resource] || [];
    const newPermissions = checked
      ? [...currentPermissions, permission]
      : currentPermissions.filter((p) => p !== permission);

    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [resource]: newPermissions,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const permissions: Permission[] = ['create', 'read', 'update', 'delete'];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
        <div className="space-y-4">
          {resources.map((resource) => (
            <div key={resource.id} className="border rounded-md p-4">
              <h4 className="font-medium mb-2">{resource.name}</h4>
              <div className="flex flex-wrap gap-4">
                {permissions.map((permission) => (
                  <label key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.permissions?.[resource.id]?.includes(permission) || false}
                      onChange={(e) =>
                        handlePermissionChange(resource.id, permission, e.target.checked)
                      }
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600 capitalize">{permission}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          {role ? 'Update' : 'Create'} Role
        </button>
      </div>
    </form>
  );
}