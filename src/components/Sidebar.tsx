import React from 'react';
import { Users, Shield, Layout } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Layout },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Roles', href: '/roles', icon: Shield },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col bg-gradient-to-b from-indigo-900 to-purple-900">
      <div className="flex h-16 items-center justify-center border-b border-indigo-800">
        <Shield className="h-8 w-8 text-indigo-300" />
        <span className="ml-2 text-xl font-bold text-white">RBAC Admin</span>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-800 text-white'
                  : 'text-indigo-100 hover:bg-indigo-800 hover:text-white'
              }`}
            >
              <Icon className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200 ${
                isActive ? 'text-indigo-200' : 'text-indigo-300 group-hover:text-indigo-200'
              }`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}