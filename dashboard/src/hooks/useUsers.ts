import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { User } from '../types';

export function useUsers(zoneId?: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If a zoneId is provided, we only listen to users in that specific zone
    let q = query(collection(db, 'users'));
    if (zoneId) {
      q = query(collection(db, 'users'), where('zoneId', '==', zoneId));
    }
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const usersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as User[];
        setUsers(usersData);
        setLoading(false);
      },
      (err) => {
        console.error("Error listening to users:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [zoneId]);

  return { users, loading, error };
}
