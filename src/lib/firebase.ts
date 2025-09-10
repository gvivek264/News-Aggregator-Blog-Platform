import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBltGJ9ligaRgmuu0AmEog59n4Wu3v4STw",
  authDomain: "vivek-t.firebaseapp.com",
  projectId: "vivek-t",
  storageBucket: "vivek-t.firebasestorage.app",
  messagingSenderId: "714591297778",
  appId: "1:714591297778:web:3c36d291a7ef78c1c7f06b",
  measurementId: "G-MGYWF8259Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);