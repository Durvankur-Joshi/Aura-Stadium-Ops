import React from 'react';
import { Users, AlertTriangle, Zap, Activity } from 'lucide-react';
import { Zone, User, Campaign } from '../../types';

interface StatsGridProps {
  zones: Zone[];
  users: User[];
  campaigns: Campaign[];
}

export const StatsGrid: React.FC<StatsGridProps> = ({ zones, users, campaigns }) => {
  const criticalZones = zones.filter(z => z.status === 'critical' || z.density > 85).length;
  const activeCampaigns = campaigns.length;
  
  // Calculate average density across all zones
  const avgDensity = zones.length > 0 
    ? Math.round(zones.reduce((acc, z) => acc + z.density, 0) / zones.length) 
    : 0;

  const stats = [
    {
      title: 'Monitored Fans',
      value: users.length.toLocaleString(),
      subtitle: '+12% from last hour',
      icon: <Users size={24} className="text-aura-primary" />,
      color: 'bg-aura-primary/10 border-aura-primary/20'
    },
    {
      title: 'Avg. Stadium Density',
      value: `${avgDensity}%`,
      subtitle: 'Capacity limits stable',
      icon: <Activity size={24} className="text-aura-success" />,
      color: 'bg-aura-success/10 border-aura-success/20'
    },
    {
      title: 'Critical Zones',
      value: criticalZones.toString(),
      subtitle: criticalZones > 0 ? 'Requires immediate action' : 'All clear',
      icon: <AlertTriangle size={24} className={criticalZones > 0 ? "text-aura-danger" : "text-gray-400"} />,
      color: criticalZones > 0 ? 'bg-aura-danger/10 border-aura-danger/20' : 'bg-gray-800/50 border-gray-700'
    },
    {
      title: 'Active AI Campaigns',
      value: activeCampaigns.toString(),
      subtitle: 'Currently shaping egress',
      icon: <Zap size={24} className="text-aura-warning" />,
      color: activeCampaigns > 0 ? 'bg-aura-warning/10 border-aura-warning/20' : 'bg-gray-800/50 border-gray-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div key={idx} className={`p-6 rounded-xl border ${stat.color} flex flex-col justify-between transition-all hover:bg-opacity-80`}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-gray-900/50 rounded-lg backdrop-blur-sm">
              {stat.icon}
            </div>
          </div>
          <div>
            <h4 className="text-3xl font-bold text-white mb-1">{stat.value}</h4>
            <p className="text-sm font-medium text-gray-300">{stat.title}</p>
            <p className="text-xs text-gray-500 mt-2">{stat.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
