import React from 'react';
import { Home, Users, Map, Settings, ShieldAlert } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/', icon: <Home size={20} /> },
    { name: 'Heatmap', path: '/heatmap', icon: <Map size={20} /> },
    { name: 'Crowd Control', path: '/control', icon: <Users size={20} /> },
    { name: 'Incidents', path: '/incidents', icon: <ShieldAlert size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-aura-card border-r border-gray-800 hidden md:flex flex-col z-20">
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white tracking-wide">
          AURA <span className="text-aura-primary">OPS</span>
        </h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-aura-primary/10 text-aura-primary' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
