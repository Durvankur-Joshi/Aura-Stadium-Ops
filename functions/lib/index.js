"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployCampaign = exports.negotiate = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const gemini_1 = require("./ai/gemini");
admin.initializeApp();
const db = admin.firestore();
// 1. The Core AI Negotiation Endpoint (Called by the Fan App)
exports.negotiate = functions.https.onCall(async (data, context) => {
    const { transcript, userId, zoneId } = data;
    if (!transcript || !userId) {
        throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
    }
    // Fetch live campaign rules from Firestore
    const campaignsSnap = await db.collection('campaigns')
        .where('target_zone', '==', zoneId)
        .where('active', '==', true)
        .limit(1)
        .get();
    let budget = 5;
    let availablePerks = ['Standard Discount'];
    if (!campaignsSnap.empty) {
        const campaignData = campaignsSnap.docs[0].data();
        budget = campaignData.budget;
        availablePerks = campaignData.available_perks;
    }
    // Run the Core Intelligence Engine
    const aiResult = await (0, gemini_1.negotiateWithFan)(transcript, budget, availablePerks);
    // Update real-time state based on Gemini's JSON decision
    const userRef = db.collection('users').doc(userId);
    let userUpdatePayload = { sentiment: aiResult.detected_sentiment };
    if (aiResult.negotiation_status === 'accepted') {
        userUpdatePayload.status = 'rerouted';
        userUpdatePayload.reward_code = `AURA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        // 💥 MAGIC MOMENT: The AI convinced the fan to stay, so we relieve the stadium pressure in real-time!
        const zoneRef = db.collection('zones').doc(zoneId);
        await zoneRef.update({
            density: admin.firestore.FieldValue.increment(-1)
        });
    }
    await userRef.set(userUpdatePayload, { merge: true });
    // Return the data to the frontend for speech playback and UI updates
    return {
        speech: aiResult.spoken_response,
        reward_code: userUpdatePayload.reward_code || null,
        status: aiResult.negotiation_status
    };
});
// 2. Deploy Campaign (Endpoint for the Organizer Dashboard)
exports.deployCampaign = functions.https.onCall(async (data, context) => {
    const { zoneId, budget, perks } = data;
    const newId = `camp_${Date.now()}`;
    await db.collection('campaigns').doc(newId).set({
        id: newId,
        target_zone: zoneId,
        budget: budget,
        available_perks: perks,
        active: true
    });
    return { success: true, campaignId: newId };
});
//# sourceMappingURL=index.js.map