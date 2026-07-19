import React from 'react';
import { Mic } from 'lucide-react';
import { QUICK_ACTIONS } from '../constants';

interface ActionDockProps {
  isRecording: boolean;
  isAiThinking: boolean;
  onToggleRecording: () => void;
  onQuickAction: (actionText: string) => void;
}

export const ActionDock: React.FC<ActionDockProps> = React.memo(({ 
  isRecording, 
  isAiThinking, 
  onToggleRecording, 
  onQuickAction 
}) => {
  return (
    <nav className="absolute bottom-0 w-full bg-gradient-to-t from-aura-dark via-aura-dark to-transparent pt-12 flex flex-col items-center pointer-events-none z-20" aria-label="Quick Actions and Voice Input">
      
      {/* Quick Actions Scrollable Grid */}
      <div className="flex overflow-x-auto hide-scrollbar space-x-2 px-6 mb-6 w-full pointer-events-auto" role="list">
        {QUICK_ACTIONS.map(action => (
          <button 
            key={action.label}
            onClick={() => onQuickAction(action.label)}
            disabled={isAiThinking}
            aria-label={`Ask Aura about ${action.label}`}
            className="whitespace-nowrap flex items-center bg-gray-800/90 hover:bg-gray-700 border border-gray-700 rounded-full px-4 py-2 text-xs font-medium text-gray-200 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-aura-primary focus:ring-offset-2 focus:ring-offset-gray-900"
            role="listitem"
          >
            <span className="mr-2 opacity-80" aria-hidden="true">{action.icon}</span>
            {action.label}
          </button>
        ))}
      </div>

      <div className="pb-8 flex flex-col items-center w-full pointer-events-auto">
        <button 
          onClick={onToggleRecording}
          disabled={isAiThinking}
          aria-label={isRecording ? "Stop recording voice message" : "Start recording voice message"}
          aria-pressed={isRecording}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl focus:outline-none focus:ring-4 focus:ring-aura-primary focus:ring-offset-4 focus:ring-offset-aura-dark ${
            isRecording 
              ? 'bg-aura-danger shadow-aura-danger/40 scale-110' 
              : isAiThinking
              ? 'bg-gray-700 shadow-gray-700/40 opacity-50 cursor-not-allowed'
              : 'bg-aura-primary shadow-aura-primary/40 hover:scale-105'
          }`}
        >
          <Mic size={32} className={`text-white ${isRecording ? 'animate-pulse' : ''}`} aria-hidden="true" />
        </button>
        <p className="text-[10px] text-gray-400 mt-4 font-bold tracking-widest uppercase" aria-live="polite">
          {isRecording ? 'Tap to Send' : isAiThinking ? 'Analyzing' : 'Tap to Speak'}
        </p>
      </div>
    </nav>
  );
});

ActionDock.displayName = 'ActionDock';
