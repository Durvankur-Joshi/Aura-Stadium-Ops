import React from 'react';
import { ShieldCheck, MapPin } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../constants';

interface ChatHeaderProps {
  language: string;
  onLanguageChange: (lang: string) => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = React.memo(({ language, onLanguageChange }) => {
  return (
    <header className="p-6 pb-4 pt-8 flex justify-between items-center z-10 bg-gradient-to-b from-aura-dark to-transparent">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Aura Companion</h1>
        <div className="flex items-center text-[11px] font-medium text-aura-success mt-1">
          <ShieldCheck size={12} className="mr-1" aria-hidden="true" /> Secure Connection
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <select 
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          aria-label="Select Language"
          className="bg-gray-800 text-xs font-semibold text-white px-2 py-1.5 rounded-md border border-gray-700 outline-none cursor-pointer focus:ring-2 focus:ring-aura-primary focus:border-transparent transition-all"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>{lang.label}</option>
          ))}
        </select>
        <div className="bg-gray-800/80 rounded-full px-3 py-1.5 flex items-center border border-gray-700 backdrop-blur-md">
          <MapPin size={12} className="text-aura-primary mr-1.5" aria-hidden="true" />
          <span className="text-xs font-semibold">South Gate</span>
        </div>
      </div>
    </header>
  );
});

ChatHeader.displayName = 'ChatHeader';
