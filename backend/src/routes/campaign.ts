import { Router, Request, Response } from 'express';
import { db } from '../firebase';
import { CampaignRequest } from '../types';

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { zoneId, budget, perks } = req.body as CampaignRequest;

    if (!zoneId || budget === undefined || !perks) {
      res.status(400).json({ error: 'Missing required fields (zoneId, budget, perks)' });
      return;
    }

    const newId = `camp_${Date.now()}`;
    await db.collection('campaigns').doc(newId).set({
      id: newId,
      target_zone: zoneId,
      budget: budget,
      available_perks: perks,
      active: true
    });

    res.json({ success: true, campaignId: newId });
  } catch (error) {
    console.error('Error in /api/deployCampaign:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
