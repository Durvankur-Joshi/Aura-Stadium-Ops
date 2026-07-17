import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBM5_Eoth1BoEHcghthYMKQ0t-msZ57Jwo",
  authDomain: "aura-stadium-ops.firebaseapp.com",
  projectId: "aura-stadium-ops",
  storageBucket: "aura-stadium-ops.firebasestorage.app",
  messagingSenderId: "606849951812",
  appId: "1:606849951812:web:71892041091b39b623b411",
  measurementId: "G-E4N7737TQP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
