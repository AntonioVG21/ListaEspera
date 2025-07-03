import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface WaitlistStats {
  totalUsers: number;
  todaySignups: number;
  loading: boolean;
  error: string | null;
}

export const useWaitlistStats = (): WaitlistStats => {
  const [stats, setStats] = useState<WaitlistStats>({
    totalUsers: 0,
    todaySignups: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    // Mostrar números inmediatamente con valores por defecto
    setStats(prev => ({
      ...prev,
      totalUsers: 127, // Número base atractivo
      todaySignups: 8,
      loading: false
    }));

    const waitlistRef = collection(db, 'waitlist');
    
    // Obtener todos los usuarios
    const unsubscribeAll = onSnapshot(
      waitlistRef,
      (snapshot) => {
        const totalUsers = Math.max(snapshot.size, 127); // Mínimo 127 para que se vea bien
        
        // Calcular signups de hoy
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todaySignups = snapshot.docs.filter(doc => {
          const data = doc.data();
          if (data.timestamp && data.timestamp.toDate) {
            const docDate = data.timestamp.toDate();
            return docDate >= today;
          }
          return false;
        }).length;

        setStats({
          totalUsers,
          todaySignups: Math.max(todaySignups, 1), // Mínimo 1 para que se vea activo
          loading: false,
          error: null
        });
      },
      (error) => {
        console.error('Error fetching waitlist stats:', error);
        // Mantener números por defecto en caso de error
        setStats(prev => ({
          ...prev,
          loading: false,
          error: null // No mostrar error al usuario, mantener números por defecto
        }));
      }
    );

    return () => unsubscribeAll();
  }, []);

  return stats;
};