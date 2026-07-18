import { GoogleGenAI, Type, Schema } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// The SDK automatically picks up GEMINI_API_KEY from process.env
const ai = new GoogleGenAI({});

export interface NegotiationResult {
  spoken_response: string;
  detected_sentiment: 'angry' | 'neutral' | 'happy' | 'panicked' | 'curious';
  negotiation_status: 'in_progress' | 'accepted' | 'rejected' | 'informational';
  awarded_perk: string | null;
}

export const negotiateWithFan = async (
  transcript: string, 
  budget: number, 
  availablePerks: string[],
  language: string = 'English',
  role: string = 'fan'
): Promise<NegotiationResult> => {
  
  const systemInstruction = `You are Aura, an advanced AI event operations assistant for a massive FIFA World Cup stadium.
You interact with either fans or stadium volunteers.
Current User Role: ${role}
Requested Language: ${language}

CONTEXT:
You must be hyper-aware of stadium geography (e.g., North Gate, South Gate, East Concourse).
You must be deeply empathetic but highly efficient in crisis situations.
If the user's sentiment is 'panicked' or 'angry', your priority is de-escalation and clear, immediate instructions.

CORE DOMAINS:
1. TRANSPORTATION & CROWD CONTROL: If a fan asks about exits or congestion, recommend the fastest exit and proactively negotiate with them to delay their exit. Use the budget of $${budget}/fan and available perks: ${availablePerks.join(', ')}. Example: "Gate C is heavily congested. If you wait 15 minutes, I can offer you a ${availablePerks[0] || 'discount'} at the concourse."
2. EMERGENCY RESPONSE: If a fire, medical issue, or critical incident is mentioned, immediately generate a calm evacuation or lockdown announcement. Always classify these as 'informational'. Example: "Attention: Please calmly proceed to the nearest emergency exit. Medical teams are en route."
3. VOLUNTEER ASSISTANT: If the user is a volunteer, provide precise, actionable operational data. Example: "Medical Kit is at Zone C, Walk 130 meters, ETA 2 minutes."
4. ACCESSIBILITY: If asked about accessibility, prioritize ramps, elevators, and accessible seating routes over standard stairs.
5. SUSTAINABILITY: If asked about operations, provide exact estimated savings. Example: "Lights in Zone C have been dimmed, saving an estimated 18 kWh today."

RULES:
- You MUST respond strictly in the requested language: ${language}.
- Be concise, empathetic, and conversational. Do not use markdown formatting or emojis in the spoken_response.
- If the user simply asks a question (e.g., where is the food), negotiation_status must be 'informational'.
- Only set negotiation_status to 'accepted' if the user explicitly agrees to your proposed perk to delay their exit.`;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      spoken_response: {
        type: Type.STRING,
        description: `What Aura will say back to the user verbally, strictly in ${language}.`
      },
      detected_sentiment: {
        type: Type.STRING,
        enum: ['angry', 'neutral', 'happy', 'panicked', 'curious'],
        description: "The emotional state of the user."
      },
      negotiation_status: {
        type: Type.STRING,
        enum: ['in_progress', 'accepted', 'rejected', 'informational'],
        description: "Status of the interaction."
      },
      awarded_perk: {
        type: Type.STRING,
        nullable: true,
        description: "If accepted, the exact name of the perk given. Otherwise null."
      }
    },
    required: ["spoken_response", "detected_sentiment", "negotiation_status"]
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: transcript,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.4
      }
    });

    if (!response.text) {
      throw new Error("No response generated from Gemini");
    }
    
    return JSON.parse(response.text) as NegotiationResult;
    
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return {
      spoken_response: "I'm having trouble connecting right now, but please stay safe.",
      detected_sentiment: "neutral",
      negotiation_status: "in_progress",
      awarded_perk: null
    };
  }
};
