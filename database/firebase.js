import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABI_vo0bpk1KoT3TZMVpTkMadA3hpPj_A",
  authDomain: "unilink-fc7e9.firebaseapp.com",
  projectId: "unilink-fc7e9",
  storageBucket: "unilink-fc7e9.firebasestorage.app",
  messagingSenderId: "532926208946",
  appId: "1:532926208946:web:ba6f1bfdba89c4ac5ce2ab"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };