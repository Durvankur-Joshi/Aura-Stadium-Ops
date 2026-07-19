import React from 'react';
import { Pizza, Activity, Navigation, Flame } from 'lucide-react';
import { Message, MessageSender } from '../types';

/**
 * Default fallback message when the app initially loads.
 */
export const INITIAL_MESSAGE: Message = {
  id: 'msg_1',
  text: "Hi there! I'm Aura, your AI event companion. I can help you find your seat, locate accessible routes, or guide you during an emergency. How can I assist you?",
  sender: MessageSender.AI,
  timestamp: 'Just now'
};

/**
 * Fallback message when the backend is unreachable or throws an error.
 */
export const ERROR_MESSAGE: Message = {
  id: 'msg_error',
  text: "I'm having trouble connecting right now, but please stay safe.",
  sender: MessageSender.AI,
  timestamp: 'Just now'
};

/**
 * Array of supported language options for speech recognition and translation.
 */
export const SUPPORTED_LANGUAGES = [
  { value: 'English', label: 'EN', code: 'en-US' },
  { value: 'Hindi', label: 'HI', code: 'hi-IN' },
  { value: 'Spanish', label: 'ES', code: 'es-ES' },
  { value: 'French', label: 'FR', code: 'fr-FR' }
] as const;

/**
 * Predefined Quick Actions displayed as buttons at the bottom of the chat.
 */
export const QUICK_ACTIONS = [
  { label: 'Food nearby', icon: React.createElement(Pizza, { size: 14 }) },
  { label: 'Wheelchair Route', icon: React.createElement(Activity, { size: 14 }) },
  { label: 'Find my seat', icon: React.createElement(Navigation, { size: 14 }) },
  { label: 'Report Fire', icon: React.createElement(Flame, { size: 14, className: "text-aura-danger" }) }
];

export const BACKEND_FALLBACK_URL = 'https://aura-stadium-ops.onrender.com';
