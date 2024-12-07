import React, { useState } from 'react';
import RoleList from '../components/RoleList';
import RoleForm from '../components/RoleForm';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';
import { Role } from '../types';
import { Plus } from 'lucide-react';

export default function Roles() {
  const { roles, addRole, updateRole, deleteRole } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | undefined>();

  const handleAddRole = () => {
    setSelectedRole(undefined);
    setIsModalOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleDeleteRole = (roleId: string) => {
    if (confirm('Are you sure you want to delete this role?')) {
      deleteRole(roleId);
    }
  };

  const handleSubmit = (roleData: Partial<Role>) => {
    if (selectedRole) {
      updateRole(selectedRole.id, roleData);
    } else {
      addRole(roleData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Roles</h1>
        <button
          onClick={handleAddRole}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Role
        </button>
      </div>
      <RoleList
        roles={roles}
        onEditRole={handleEditRole}
        onDeleteRole={handleDeleteRole}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedRole ? 'Edit Role' : 'Add Role'}
      >
        <RoleForm
          role={selectedRole}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}