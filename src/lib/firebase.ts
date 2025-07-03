// lib/firebase.ts

import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


// Configuración de Firebase
const firebaseConfig = {

  apiKey: "AIzaSyC8gP9my3yU9GOsquxz3SW_0c7mUj0pQOE",
  authDomain: "listadeesperafotogo.firebaseapp.com",
  projectId: "listadeesperafotogo",
  storageBucket: "listadeesperafotogo.firebasestorage.app",
  messagingSenderId: "637862029444",
  appId: "1:637862029444:web:2ef96526cff095ff93bad1",
  measurementId: "G-5HZXTM8C1J",
};

// Inicializa Firebase solo una vez (importante en desarrollo con hot reload)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Exportar Firestore para usar en otros archivos
export const db = getFirestore(app);

// Opcional: Exportar Analytics si quieres usarlo
export const analytics = getAnalytics(app);
