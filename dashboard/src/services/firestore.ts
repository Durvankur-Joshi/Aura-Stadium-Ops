import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Zone, Campaign } from '../types';

/**
 * Service layer to handle all direct write mutations to Firestore.
 * Isolating this keeps our components clean and makes testing easier.
 */
export const FirebaseService = {
  // Update a specific zone's data
  updateZone: async (zoneId: string, data: Partial<Zone>) => {
    const ref = doc(db, 'zones', zoneId);
    await updateDoc(ref, data);
  },

  // Deploy an Aura Campaign
  deployCampaign: async (campaignId: string, data: Campaign) => {
    const ref = doc(db, 'campaigns', campaignId);
    return setDoc(ref, data);
  },
  
  // End an active campaign
  endCampaign: async (campaignId: string) => {
    const ref = doc(db, 'campaigns', campaignId);
    return updateDoc(ref, { active: false });
  }
};
