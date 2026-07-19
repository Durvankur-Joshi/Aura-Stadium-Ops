import React from 'react';
import { Message, MessageSender } from '../types';

interface MessageBubbleProps {
  msg: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = React.memo(({ msg }) => {
  const isUser = msg.sender === MessageSender.USER;
  
  return (
    <div className={`flex flex-col max-w-[85%] animate-in slide-in-from-bottom-2 fade-in duration-300 ${isUser ? 'items-end self-end' : 'items-start'}`}>
      <div className={`p-4 shadow-lg backdrop-blur-md ${
        isUser 
          ? 'bg-aura-primary text-white rounded-2xl rounded-tr-sm shadow-aura-primary/20' 
          : 'bg-aura-card border border-gray-700/60 rounded-2xl rounded-tl-sm'
      }`}>
        <p className="text-sm leading-relaxed text-gray-200">{msg.text}</p>
      </div>
      <span className="text-[10px] font-medium text-gray-500 mt-2 mx-2">
        {isUser ? 'You' : 'Aura AI'} • <span className="sr-only">Sent at</span> {msg.timestamp}
      </span>
    </div>
  );
});

MessageBubble.displayName = 'MessageBubble';
