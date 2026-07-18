import { Router, Request, Response } from 'express';
import { db, FieldValue } from '../firebase';
import { negotiateWithFan } from '../ai/gemini';
import { NegotiationRequest } from '../types';

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { transcript, userId, zoneId, language = 'English', role = 'fan' } = req.body as NegotiationRequest;

    if (!transcript || !userId || !zoneId) {
      res.status(400).json({ error: 'Missing required fields (transcript, userId, zoneId)' });
      return;
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
    const aiResult = await negotiateWithFan(transcript, budget, availablePerks, language, role);

    // Update real-time state based on Gemini's JSON decision
    const userRef = db.collection('users').doc(userId);
    let userUpdatePayload: Record<string, string> = { sentiment: aiResult.detected_sentiment };

    if (aiResult.negotiation_status === 'accepted') {
      userUpdatePayload.status = 'rerouted';
      userUpdatePayload.reward_code = `AURA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      // The AI convinced the fan to stay, so we relieve the stadium pressure in real-time
      const zoneRef = db.collection('zones').doc(zoneId);
      await zoneRef.update({
        density: FieldValue.increment(-1)
      });
    }
    await userRef.set(userUpdatePayload, { merge: true });

    // Return exact same JSON payload expected by Fan App
    res.json({
      speech: aiResult.spoken_response,
      reward_code: userUpdatePayload.reward_code || null,
      status: aiResult.negotiation_status
    });

  } catch (error) {
    console.error('Error in /api/negotiate:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
