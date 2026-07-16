import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const AIInsights: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-aura-card to-gray-900 p-6 rounded-xl border border-aura-primary/30 shadow-lg shadow-aura-primary/10 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-aura-primary/10 rounded-full blur-3xl"></div>
      
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="text-aura-primary" size={20} />
        <h3 className="text-lg font-bold text-white tracking-wide">Today's AI Recommendation</h3>
      </div>
      
      <div className="bg-black/40 p-4 rounded-lg border border-gray-700/50 mb-4 backdrop-blur-sm">
        <p className="text-sm text-gray-200 leading-relaxed font-medium">
          <span className="text-aura-warning font-bold">Zone D</span> is expected to exceed safe occupancy in <span className="text-white font-bold">22 minutes</span>.
        </p>
      </div>

      <div className="flex flex-col space-y-3 mb-5">
        <div className="flex items-center text-sm text-gray-300 bg-gray-800/50 p-2 rounded-md border border-gray-700/30">
          <div className="w-1.5 h-1.5 rounded-full bg-aura-primary mr-3"></div>
          Deploy 8 volunteers to Zone D.
        </div>
        <div className="flex items-center text-sm text-gray-300 bg-gray-800/50 p-2 rounded-md border border-gray-700/30">
          <div className="w-1.5 h-1.5 rounded-full bg-aura-primary mr-3"></div>
          Open Gate 5 for rapid egress.
        </div>
      </div>

      <div className="flex justify-between items-end border-t border-gray-800 pt-4">
        <div>
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Expected Congestion Reduction</p>
          <p className="text-2xl font-black text-aura-success">38%</p>
        </div>
        
        <button className="bg-aura-primary hover:bg-blue-600 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center group">
          Execute Protocol <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
