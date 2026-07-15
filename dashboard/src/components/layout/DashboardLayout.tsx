import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-aura-dark overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {/* React Router Outlet renders our actual page content here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};
