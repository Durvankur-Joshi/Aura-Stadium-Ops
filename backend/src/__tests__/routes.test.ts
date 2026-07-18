import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import negotiateRoute from '../routes/negotiate';
import campaignRoute from '../routes/campaign';

// Mock Firebase Admin
vi.mock('firebase-admin', () => {
  return {
    default: {
      initializeApp: vi.fn(),
      credential: { cert: vi.fn() },
      firestore: {
        FieldValue: { increment: vi.fn() },
      }
    }
  };
});

// Mock internal firebase instance
vi.mock('../firebase', () => ({
  db: {
    collection: vi.fn(() => ({
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      get: vi.fn().mockResolvedValue({
        empty: true,
        docs: []
      }),
      doc: vi.fn(() => ({
        set: vi.fn().mockResolvedValue(true),
        update: vi.fn().mockResolvedValue(true)
      }))
    }))
  },
  FieldValue: {
    increment: vi.fn()
  }
}));

// Mock Gemini AI
vi.mock('../ai/gemini', () => ({
  negotiateWithFan: vi.fn().mockResolvedValue({
    spoken_response: 'Test response',
    detected_sentiment: 'neutral',
    negotiation_status: 'informational',
    awarded_perk: null
  })
}));

const app = express();
app.use(express.json());
app.use('/api/negotiate', negotiateRoute);
app.use('/api/deployCampaign', campaignRoute);

describe('Backend API Routes', () => {
  it('POST /api/negotiate returns valid response', async () => {
    const res = await request(app)
      .post('/api/negotiate')
      .send({ transcript: 'Hello', userId: '1', zoneId: 'zone_1' });
    
    expect(res.status).toBe(200);
    expect(res.body.speech).toBe('Test response');
  });

  it('POST /api/negotiate requires transcript', async () => {
    const res = await request(app)
      .post('/api/negotiate')
      .send({ userId: '1', zoneId: 'zone_1' });
    
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Missing required fields');
  });

  it('POST /api/deployCampaign succeeds', async () => {
    const res = await request(app)
      .post('/api/deployCampaign')
      .send({ zoneId: 'zone_1', budget: 10, perks: ['VIP'] });
    
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.campaignId).toBeDefined();
  });
});
