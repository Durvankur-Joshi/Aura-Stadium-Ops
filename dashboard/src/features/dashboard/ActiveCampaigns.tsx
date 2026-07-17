import React from 'react';
import { Zap, ChevronRight, Plus } from 'lucide-react';
import { Campaign } from '../../types';
import { FirebaseService } from '../../services/firestore';

interface ActiveCampaignsProps {
  campaigns: Campaign[];
}

export const ActiveCampaigns: React.FC<ActiveCampaignsProps> = ({ campaigns }) => {
  // Trigger the Express Backend API to deploy the campaign securely
  const handleDeployAura = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://aura-stadium-ops.onrender.com';
      await fetch(`${backendUrl}/api/deployCampaign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          zoneId: 'south_gate',
          budget: 15,
          perks: ['Free Drink', 'VIP Access']
        })
      });
    } catch (error) {
      console.error("Failed to deploy campaign:", error);
    }
  };

  return (
    <div className="bg-aura-card p-6 rounded-xl border border-gray-800 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Active Campaigns</h3>
          <p className="text-xs text-gray-400 mt-1">Live AI Interventions</p>
        </div>
        <button 
          onClick={handleDeployAura}
          className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors border border-gray-700"
          title="New Campaign"
        >
          <Plus size={18} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {campaigns.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-3">
            <Zap size={32} className="opacity-40" />
            <p className="text-sm text-center">No active AI negotiations.<br/>Stadium is nominal.</p>
          </div>
        ) : (
          campaigns.map(campaign => (
            <div key={campaign.id} className="bg-gray-900/60 p-4 rounded-lg border border-gray-700/50 hover:border-aura-primary/50 transition-colors group cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold text-aura-warning bg-aura-warning/10 px-2 py-1 rounded-full uppercase tracking-wider">
                  {campaign.target_zone.replace('_', ' ')}
                </span>
                <span className="flex items-center text-xs text-gray-400 group-hover:text-aura-primary transition-colors">
                  Details <ChevronRight size={14} className="ml-1" />
                </span>
              </div>
              <p className="text-sm text-gray-200 font-medium mb-2">Egress Shaping Intervention</p>
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>Budget: ${campaign.budget}/fan</span>
                <span className="flex items-center text-aura-success"><Zap size={12} className="mr-1"/> Active</span>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Massive Deploy Button for emergencies */}
      <div className="mt-6 pt-4 border-t border-gray-800">
        <button 
          onClick={handleDeployAura}
          className="w-full bg-gradient-to-r from-aura-primary to-aura-accent hover:opacity-90 text-white font-medium py-3 px-4 rounded-lg shadow-lg shadow-aura-primary/20 transition-all flex items-center justify-center space-x-2"
        >
          <Zap size={18} />
          <span>Deploy Aura Campaign</span>
        </button>
      </div>
    </div>
  );
};
