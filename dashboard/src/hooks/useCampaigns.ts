import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Campaign } from '../types';

export function useCampaigns(activeOnly = true) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let q = query(collection(db, 'campaigns'));
    if (activeOnly) {
      q = query(collection(db, 'campaigns'), where('active', '==', true));
    }
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const campaignsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Campaign[];
        setCampaigns(campaignsData);
        setLoading(false);
      },
      (err) => {
        console.error("Error listening to campaigns:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [activeOnly]);

  return { campaigns, loading, error };
}
