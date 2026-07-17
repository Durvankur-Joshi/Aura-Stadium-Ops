export interface NegotiationRequest {
  transcript: string;
  userId: string;
  zoneId: string;
  language?: string;
  role?: string;
}

export interface CampaignRequest {
  zoneId: string;
  budget: number;
  perks: string[];
}
