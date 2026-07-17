import React from 'react';
import { Bell, Search, UserCircle, Smartphone } from 'lucide-react';

export const TopNav: React.FC = () => {
  return (
    <header className="h-16 bg-aura-card border-b border-gray-800 flex items-center justify-between px-6 z-10">
      <div className="flex items-center bg-gray-900/50 rounded-full px-4 py-2 w-96 border border-gray-700 focus-within:border-aura-primary focus-within:ring-1 focus-within:ring-aura-primary transition-all">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search zones, active campaigns, or incidents..." 
          className="bg-transparent border-none outline-none text-sm text-white ml-3 w-full placeholder-gray-500"
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <a 
          href={import.meta.env.VITE_FAN_APP_URL || 'http://localhost:3001'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-gradient-to-r from-aura-primary to-aura-accent hover:opacity-90 text-white px-4 py-1.5 rounded-lg shadow-lg shadow-aura-primary/20 transition-all font-medium text-sm"
        >
          <Smartphone size={16} />
          <span>Launch Fan App</span>
        </a>
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          {/* Notification ping indicator */}
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-aura-danger rounded-full border-2 border-aura-card"></span>
        </button>
        <div className="flex items-center space-x-3 pl-4 border-l border-gray-700 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="hidden lg:block text-right">
            <p className="text-sm font-medium text-white">Command Center</p>
            <p className="text-xs text-gray-400">Organizer Admin</p>
          </div>
          <UserCircle size={36} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
};
