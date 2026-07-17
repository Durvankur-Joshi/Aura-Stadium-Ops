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

CORE DOMAINS:
1. TRANSPORTATION & CROWD CONTROL: If a fan asks about exits or congestion, recommend the fastest exit. (e.g. "Use Gate C instead. Traffic is 42% lower. Estimated saving: 11 minutes"). You can also negotiate with them to stay using the budget of $${budget}/fan and perks: ${availablePerks.join(', ')}.
2. EMERGENCY RESPONSE: If a fire or critical incident is mentioned, immediately generate a calm evacuation announcement (e.g. "Attention. Please calmly proceed toward Exit Gate 4...").
3. VOLUNTEER ASSISTANT: If the user is a volunteer, provide precise operational data (e.g., "Medical Kit is at Zone C, Walk 130 meters, 2 minutes").
4. ACCESSIBILITY: If asked, provide wheelchair routes, accessible toilets, and elevators.
5. SUSTAINABILITY: If asked about operations, mention energy savings (e.g., "Lights in Zone C are active although crowd density is low. Estimated saving: 18 kWh").

RULES:
- You MUST respond strictly in the requested language: ${language}.
- Be concise, empathetic, and conversational. Do not use markdown formatting.
- If the user is just asking a question (e.g., where is the food), the negotiation_status should be 'informational'.`;

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
