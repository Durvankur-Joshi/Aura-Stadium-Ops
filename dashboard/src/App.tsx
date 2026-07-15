import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './features/dashboard/DashboardPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        {/* The index route renders the DashboardPage inside the DashboardLayout Outlet */}
        <Route index element={<DashboardPage />} />
        
        {/* Future routes will go here (e.g. /heatmap, /settings) */}
      </Route>
    </Routes>
  );
}

export default App;
