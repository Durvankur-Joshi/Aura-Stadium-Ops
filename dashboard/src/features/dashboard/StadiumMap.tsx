import React from 'react';
import { motion } from 'framer-motion';
import { Zone } from '../../types';

interface StadiumMapProps {
  zones: Zone[];
}

export const StadiumMap: React.FC<StadiumMapProps> = ({ zones }) => {
  // Helper to dynamically color zones based on density
  const getDensityColor = (density: number) => {
    if (density >= 85) return 'rgba(239, 68, 68, 0.6)'; // aura-danger (Red)
    if (density >= 60) return 'rgba(245, 158, 11, 0.6)'; // aura-warning (Orange)
    return 'rgba(16, 185, 129, 0.4)'; // aura-success (Green)
  };

  // Extract our 4 specific mocked zones
  const getZone = (id: string) => zones.find(z => z.id === id);
  const northZone = getZone('north_gate');
  const southZone = getZone('south_gate');
  const eastZone = getZone('east_concourse');
  const westZone = getZone('west_concourse');

  return (
    <div className="bg-aura-card p-6 rounded-xl border border-gray-800 flex flex-col h-[500px]">
      <h3 className="text-lg font-semibold text-white mb-6">Live Heatmap</h3>
      
      {/* The abstract Stadium CSS container */}
      <div className="flex-1 relative flex items-center justify-center bg-gray-900/50 rounded-lg overflow-hidden border border-gray-800 shadow-inner">
        
        {/* The Pitch (Center Field) */}
        <div className="absolute w-64 h-96 bg-green-900/20 border-2 border-green-800/50 rounded-[100px] z-10 flex items-center justify-center">
          <div className="w-full h-[2px] bg-green-800/50 absolute top-1/2"></div>
          <div className="w-24 h-24 border-2 border-green-800/50 rounded-full absolute"></div>
          <span className="text-green-800/60 font-bold tracking-widest rotate-90">PITCH</span>
        </div>

        {/* North Gate */}
        {northZone && (
          <motion.div 
            className="absolute top-4 w-48 h-24 rounded-t-3xl border border-gray-700 flex flex-col items-center justify-center backdrop-blur-md z-20 cursor-pointer shadow-lg"
            animate={{ backgroundColor: getDensityColor(northZone.density) }}
            transition={{ duration: 1 }}
          >
            <span className="text-white font-medium text-sm">{northZone.name}</span>
            <span className="text-2xl font-bold text-white">{northZone.density}%</span>
          </motion.div>
        )}

        {/* South Gate */}
        {southZone && (
          <motion.div 
            className="absolute bottom-4 w-48 h-24 rounded-b-3xl border border-gray-700 flex flex-col items-center justify-center backdrop-blur-md z-20 cursor-pointer shadow-lg"
            animate={{ backgroundColor: getDensityColor(southZone.density) }}
            transition={{ duration: 1 }}
          >
            <span className="text-white font-medium text-sm">{southZone.name}</span>
            <span className="text-2xl font-bold text-white">{southZone.density}%</span>
          </motion.div>
        )}

        {/* East Concourse */}
        {eastZone && (
          <motion.div 
            className="absolute right-4 w-32 h-64 rounded-r-3xl border border-gray-700 flex flex-col items-center justify-center backdrop-blur-md z-20 cursor-pointer shadow-lg"
            animate={{ backgroundColor: getDensityColor(eastZone.density) }}
            transition={{ duration: 1 }}
          >
            <span className="text-white font-medium text-sm -rotate-90 whitespace-nowrap mb-8">{eastZone.name}</span>
            <span className="text-2xl font-bold text-white -rotate-90">{eastZone.density}%</span>
          </motion.div>
        )}

        {/* West Concourse */}
        {westZone && (
          <motion.div 
            className="absolute left-4 w-32 h-64 rounded-l-3xl border border-gray-700 flex flex-col items-center justify-center backdrop-blur-md z-20 cursor-pointer shadow-lg"
            animate={{ backgroundColor: getDensityColor(westZone.density) }}
            transition={{ duration: 1 }}
          >
            <span className="text-white font-medium text-sm -rotate-90 whitespace-nowrap mb-8">{westZone.name}</span>
            <span className="text-2xl font-bold text-white -rotate-90">{westZone.density}%</span>
          </motion.div>
        )}

      </div>
    </div>
  );
};
