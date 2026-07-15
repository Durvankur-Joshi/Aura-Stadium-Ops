import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Service layer to handle all direct write mutations to Firestore.
 * Isolating this keeps our components clean and makes testing easier.
 */
export const FirebaseService = {
  // Update a specific zone's data
  updateZone: async (zoneId: string, data: any) => {
    const ref = doc(db, 'zones', zoneId);
    return updateDoc(ref, data);
  },

  // Deploy a new AI negotiation campaign
  deployCampaign: async (campaignId: string, data: any) => {
    const ref = doc(db, 'campaigns', campaignId);
    return setDoc(ref, data);
  },
  
  // End an active campaign
  endCampaign: async (campaignId: string) => {
    const ref = doc(db, 'campaigns', campaignId);
    return updateDoc(ref, { active: false });
  }
};
