import { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Zone } from '../types';

export function useZones() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'zones'));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const zonesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Zone[];
        setZones(zonesData);
        setLoading(false);
      },
      (err) => {
        console.error("Error listening to zones:", err);
        setError(err);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { zones, loading, error };
}
