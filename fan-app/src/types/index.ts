export interface Zone {
  id: string;
  name: string;
  density: number;
  status: 'normal' | 'warning' | 'critical';
  active_campaign: string | null;
}

export interface User {
  id: string;
  zoneId: string;
  status: 'leaving' | 'negotiating' | 'rerouted';
  sentiment: string;
  reward_code: string | null;
}

export interface Campaign {
  id: string;
  target_zone: string;
  budget: number;
  available_perks: string[];
  active: boolean;
}

/**
 * Indicates the sender of a chat message.
 */
export enum MessageSender {
  USER = 'user',
  AI = 'ai'
}

/**
 * A discrete message object used in the Fan App chat interface.
 */
export interface Message {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: string;
}

/**
 * Standardized response object from the Express backend API.
 */
export interface BackendResponse {
  speech: string;
  reward_code?: string;
  status: string;
}

/**
 * Web Speech API standard event type.
 */
export interface SpeechEvent extends Event {
  results: { [index: number]: { [index: number]: { transcript: string } } };
}
