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
