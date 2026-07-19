import React from 'react';
import { Ticket } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface RewardCardProps {
  rewardCode: string;
}

export const RewardCard: React.FC<RewardCardProps> = React.memo(({ rewardCode }) => {
  return (
    <div className="mt-8 flex flex-col items-center bg-white rounded-2xl p-6 shadow-2xl shadow-aura-success/20 animate-in zoom-in fade-in duration-500" role="alert" aria-live="assertive">
      <div className="bg-aura-success/10 text-aura-success p-2 rounded-full mb-4">
        <Ticket size={32} aria-hidden="true" />
      </div>
      <h3 className="text-gray-900 font-bold text-lg mb-1">Exclusive Perk Unlocked</h3>
      <p className="text-gray-500 text-xs text-center mb-6">Scan this code at the East Concourse Bar</p>
      
      <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl">
        <QRCodeSVG value={rewardCode} size={180} />
      </div>
      
      <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-6 font-bold" aria-label={`Reward code is ${rewardCode}`}>
        {rewardCode}
      </p>
    </div>
  );
});

RewardCard.displayName = 'RewardCard';
