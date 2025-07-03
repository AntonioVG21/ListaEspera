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
    // Mostrar números iniciales mientras se carga la data real
    setStats(prev => ({
      ...prev,
      totalUsers: 127, // Valor inicial que se actualizará con datos reales
      todaySignups: 8,
      loading: true
    }));

    const waitlistRef = collection(db, 'waitlist');
    
    // Obtener todos los usuarios en tiempo real
    const unsubscribeAll = onSnapshot(
      waitlistRef,
      (snapshot) => {
        // Usar el tamaño real de la colección sin el mínimo forzado
        const totalUsers = snapshot.size;
        
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
          error: 'Error al cargar estadísticas'
        }));
      }
    );

    return () => unsubscribeAll();
  }, []);

  return stats;
};