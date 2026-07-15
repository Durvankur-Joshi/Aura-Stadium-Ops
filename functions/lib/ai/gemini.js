"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.negotiateWithFan = void 0;
const genai_1 = require("@google/genai");
// Initialize the SDK. It automatically picks up GEMINI_API_KEY from the environment.
const ai = new genai_1.GoogleGenAI({});
const negotiateWithFan = async (fanTranscript, budget, availablePerks) => {
    const systemInstruction = `You are Aura, an event safety assistant for a massive stadium. 
The user is currently stuck in a dangerously crowded exit zone. Your goal is to convince them to stay in the stadium for 20 more minutes to ease the egress traffic.
You have a budget of $${budget} per fan. You can offer any of these perks: ${availablePerks.join(', ')}.

Be highly empathetic, concise, and conversational. Do not sound like a robot. Do not use markdown formatting.
Analyze the user's sentiment carefully. If they sound panicked, forget the perks and reassure them immediately.`;
    // We force Gemini to output strict JSON matching our backend architecture
    const responseSchema = {
        type: genai_1.Type.OBJECT,
        properties: {
            spoken_response: {
                type: genai_1.Type.STRING,
                description: "What Aura will say back to the user verbally."
            },
            detected_sentiment: {
                type: genai_1.Type.STRING,
                enum: ['angry', 'neutral', 'happy', 'panicked'],
                description: "The emotional state of the user."
            },
            negotiation_status: {
                type: genai_1.Type.STRING,
                enum: ['in_progress', 'accepted', 'rejected'],
                description: "Whether the user accepted the deal, rejected it completely, or if you are still negotiating."
            },
            awarded_perk: {
                type: genai_1.Type.STRING,
                nullable: true,
                description: "If accepted, the exact name of the perk given. Otherwise null."
            }
        },
        required: ["spoken_response", "detected_sentiment", "negotiation_status"]
    };
    try {
        // We use Gemini 2.5 Flash for the lowest possible latency during voice conversations
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: fanTranscript,
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
        return JSON.parse(response.text);
    }
    catch (error) {
        console.error("Gemini AI Error:", error);
        // Graceful fallback during a hackathon demo if network fails
        return {
            spoken_response: "I'm having trouble connecting right now, but please stay safe and follow the digital signage.",
            detected_sentiment: "neutral",
            negotiation_status: "in_progress",
            awarded_perk: null
        };
    }
};
exports.negotiateWithFan = negotiateWithFan;
//# sourceMappingURL=gemini.js.map