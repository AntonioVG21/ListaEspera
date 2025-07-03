// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8gP9my3yU9GOsquxz3SW_0c7mUj0pQOE",
  authDomain: "listadeesperafotogo.firebaseapp.com",
  projectId: "listadeesperafotogo",
  storageBucket: "listadeesperafotogo.firebasestorage.app",
  messagingSenderId: "637862029444",
  appId: "1:637862029444:web:2ef96526cff095ff93bad1",
  measurementId: "G-5HZXTM8C1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);