import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLtT0ZVtrLuNK0EQoyA69k13WfsYIEw4k",
  authDomain: "react-native-firebase-1f512.firebaseapp.com",
  projectId: "react-native-firebase-1f512",
  storageBucket: "react-native-firebase-1f512.firebasestorage.app",
  messagingSenderId: "408773415691",
  appId: "1:408773415691:web:f546990303c88b63b5480e",
  measurementId: "G-RP7KLMQY4L"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Aquí creamos la instancia de Firestore

export { db };



