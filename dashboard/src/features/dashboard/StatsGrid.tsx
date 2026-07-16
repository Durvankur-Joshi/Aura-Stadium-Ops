import React from 'react';
import { Users, AlertTriangle, Zap, Activity, Clock, Car } from 'lucide-react';
import { Zone, User, Campaign } from '../../types';

interface StatsGridProps {
  zones: Zone[];
  users: User[];
  campaigns: Campaign[];
}

export const StatsGrid: React.FC<StatsGridProps> = ({ zones, users, campaigns }) => {
  const criticalZones = zones.filter(z => z.status === 'critical' || z.density > 85).length;
  
  const avgDensity = zones.length > 0 
    ? Math.round(zones.reduce((acc, z) => acc + z.density, 0) / zones.length) 
    : 0;

  // New KPIs expanded as per user requirements
  const stats = [
    {
      title: 'Attendance',
      value: '78,402',
      subtitle: '98% Capacity',
      icon: <Users size={20} className="text-aura-primary" />,
      color: 'bg-aura-primary/10 border-aura-primary/20'
    },
    {
      title: 'Current Density',
      value: `${avgDensity}%`,
      subtitle: 'Across all zones',
      icon: <Activity size={20} className="text-aura-primary" />,
      color: 'bg-aura-primary/10 border-aura-primary/20'
    },
    {
      title: 'Critical Alerts',
      value: criticalZones.toString(),
      subtitle: criticalZones > 0 ? 'Requires immediate action' : 'All clear',
      icon: <AlertTriangle size={20} className={criticalZones > 0 ? "text-aura-danger" : "text-gray-400"} />,
      color: criticalZones > 0 ? 'bg-aura-danger/10 border-aura-danger/20' : 'bg-gray-800/50 border-gray-700'
    },
    {
      title: 'Emergency Status',
      value: 'Nominal',
      subtitle: 'No active threats',
      icon: <Zap size={20} className="text-aura-success" />,
      color: 'bg-aura-success/10 border-aura-success/20'
    },
    {
      title: 'Avg Wait Time',
      value: '14 min',
      subtitle: 'Gate egress',
      icon: <Clock size={20} className="text-aura-warning" />,
      color: 'bg-aura-warning/10 border-aura-warning/20'
    },
    {
      title: 'Parking Available',
      value: '12%',
      subtitle: 'Lots A, B, C',
      icon: <Car size={20} className="text-aura-primary" />,
      color: 'bg-aura-primary/10 border-aura-primary/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className={`p-4 rounded-xl border ${stat.color} flex flex-col justify-between transition-all hover:bg-opacity-80`}>
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-gray-900/50 rounded-lg backdrop-blur-sm">
              {stat.icon}
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-bold text-white mb-0.5">{stat.value}</h4>
            <p className="text-xs font-medium text-gray-300">{stat.title}</p>
            <p className="text-[10px] text-gray-500 mt-1">{stat.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
