import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Role } from '../types';
import { users as initialUsers, roles as initialRoles } from '../data/mockData';

interface AppContextType {
  users: User[];
  roles: Role[];
  addUser: (user: Partial<User>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Partial<Role>) => void;
  updateRole: (id: string, role: Partial<Role>) => void;
  deleteRole: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [roles, setRoles] = useState<Role[]>(initialRoles);

  const addUser = (userData: Partial<User>) => {
    const newUser: User = {
      id: String(users.length + 1),
      ...userData,
    } as User;
    setUsers([...users, newUser]);
  };

  const updateUser = (id: string, userData: Partial<User>) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, ...userData } : user)));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const addRole = (roleData: Partial<Role>) => {
    const newRole: Role = {
      id: String(roles.length + 1),
      ...roleData,
    } as Role;
    setRoles([...roles, newRole]);
  };

  const updateRole = (id: string, roleData: Partial<Role>) => {
    setRoles(roles.map((role) => (role.id === id ? { ...role, ...roleData } : role)));
  };

  const deleteRole = (id: string) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        users,
        roles,
        addUser,
        updateUser,
        deleteUser,
        addRole,
        updateRole,
        deleteRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}