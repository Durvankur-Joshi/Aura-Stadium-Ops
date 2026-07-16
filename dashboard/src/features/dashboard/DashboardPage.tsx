import React from 'react';
import { useZones } from '../../hooks/useZones';
import { useUsers } from '../../hooks/useUsers';
import { useCampaigns } from '../../hooks/useCampaigns';
import { StatsGrid } from './StatsGrid';
import { StadiumMap } from './StadiumMap';
import { ActiveCampaigns } from './ActiveCampaigns';
import { AIInsights } from './AIInsights';

export const DashboardPage: React.FC = () => {
  const { zones, loading: zonesLoading } = useZones();
  const { users, loading: usersLoading } = useUsers();
  const { campaigns, loading: campaignsLoading } = useCampaigns();

  if (zonesLoading || usersLoading || campaignsLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-aura-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-white tracking-tight">Stadium Overview</h2>
        <p className="text-gray-400 mt-1">Real-time crowd intelligence and active GenAI negotiations.</p>
      </header>
      
      {/* 1. Live Statistics Cards (Now 6 KPIs) */}
      <StatsGrid zones={zones} users={users} campaigns={campaigns} />

      {/* 2. Main Grid: Map, AI Insights, & Campaigns Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Col: Stadium Map */}
        <div className="xl:col-span-2">
          <StadiumMap zones={zones} />
        </div>

        {/* Right Col: AI Insights + Active Campaigns */}
        <div className="xl:col-span-1 flex flex-col space-y-6 h-[500px]">
          <div className="shrink-0">
            <AIInsights />
          </div>
          <div className="flex-1 min-h-0">
            <ActiveCampaigns campaigns={campaigns} />
          </div>
        </div>

      </div>
    </div>
  );
};
