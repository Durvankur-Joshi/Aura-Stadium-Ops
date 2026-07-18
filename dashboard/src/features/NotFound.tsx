import React from 'react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-aura-dark flex flex-col items-center justify-center text-white" role="main" aria-label="404 Page Not Found">
      <div className="bg-gray-900/60 p-12 rounded-3xl border border-gray-800 text-center shadow-2xl backdrop-blur-sm">
        <h1 className="text-6xl font-bold text-aura-primary mb-4 animate-bounce">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Zone Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-sm">The stadium sector you are looking for does not exist or has been cordoned off.</p>
        <a 
          href="/"
          className="bg-aura-primary hover:bg-aura-accent text-white px-6 py-3 rounded-lg font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-aura-primary"
        >
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};
