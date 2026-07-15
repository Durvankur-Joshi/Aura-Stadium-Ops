import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-aura-dark flex flex-col items-center justify-center p-4">
      <div className="bg-aura-card p-8 rounded-xl shadow-2xl border border-gray-800 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-aura-primary mb-4">Aura Dashboard</h1>
        <p className="text-gray-400 mb-6">Skeleton initialized successfully.</p>
        <div className="flex items-center justify-center space-x-2 text-aura-success bg-aura-success/10 px-4 py-2 rounded-lg">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aura-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-aura-success"></span>
          </span>
          <span className="text-sm font-medium">System Ready</span>
        </div>
      </div>
    </div>
  );
}

export default App;
