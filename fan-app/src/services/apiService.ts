import { BackendResponse } from '../types';
import { BACKEND_FALLBACK_URL } from '../constants';

/**
 * Service to handle communication with the Aura Backend API.
 */
export const ApiService = {
  /**
   * Sends a user transcript to the Gemini AI backend for negotiation.
   * @param text The user's spoken or quick action text
   * @param language The user's selected language
   * @returns A promise that resolves to the BackendResponse
   */
  async negotiateWithAi(text: string, language: string): Promise<BackendResponse> {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || BACKEND_FALLBACK_URL;
    
    const response = await fetch(`${backendUrl}/api/negotiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transcript: text,
        userId: 'user_42_mock',
        zoneId: 'south_gate',
        language: language
      })
    });

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }

    return response.json();
  }
};
