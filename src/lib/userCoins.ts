import { collection, doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from './firebase';

interface UserCoinsResult {
  success: boolean;
  userId?: string;
  error?: string;
}

// Función para normalizar el email (convertir a minúsculas y eliminar espacios)
const normalizeEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

// Función para asignar monedas iniciales a un usuario
export const assignInitialCoins = async (
  email: string,
  name: string,
  initialCoins: number = 350
): Promise<UserCoinsResult> => {
  try {
    const normalizedEmail = normalizeEmail(email);
    const userCoinsCollection = collection(db, 'userCoins');
    const userDocRef = doc(userCoinsCollection, normalizedEmail);

    // Verificar si el usuario ya tiene monedas asignadas
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // Si el usuario ya existe, actualizar solo si no tiene monedas
      const userData = userDoc.data();
      if (!userData.coins || userData.coins === 0) {
        await updateDoc(userDocRef, {
          coins: increment(initialCoins),
          lastUpdated: new Date().toISOString(),
          name: name // Actualizar el nombre por si ha cambiado
        });
      }
    } else {
      // Si el usuario no existe, crear nuevo documento
      await setDoc(userDocRef, {
        email: normalizedEmail,
        name: name,
        coins: initialCoins,
        isWaitlistUser: true,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        source: 'waitlist_signup'
      });
    }

    return {
      success: true,
      userId: normalizedEmail
    };
  } catch (error) {
    console.error('Error al asignar monedas:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
};

// Función para obtener el balance de monedas de un usuario
export const getUserCoins = async (email: string): Promise<number> => {
  try {
    const normalizedEmail = normalizeEmail(email);
    const userDocRef = doc(collection(db, 'userCoins'), normalizedEmail);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data().coins || 0;
    }
    return 0;
  } catch (error) {
    console.error('Error al obtener monedas:', error);
    return 0;
  }
};