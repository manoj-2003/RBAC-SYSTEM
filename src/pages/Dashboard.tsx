import React from 'react';
import { Users, Shield, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { users, roles } = useApp();

  const stats = [
    {
      name: 'Total Users',
      value: users.length,
      icon: Users,
      change: '+4.75%',
      changeType: 'increase',
    },
    {
      name: 'Active Roles',
      value: roles.length,
      icon: Shield,
      change: '+2.02%',
      changeType: 'increase',
    },
    {
      name: 'Security Alerts',
      value: '0',
      icon: AlertCircle,
      change: '-10%',
      changeType: 'decrease',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {item.change}
                </p>
              </dd>
            </div>
          );
        })}
      </div>
    </div>
  );
}