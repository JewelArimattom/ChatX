import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXlfVtbQskMZzfyINAm5wCnYJAfzgaKVA",
  authDomain: "codex-a0fde.firebaseapp.com",
  projectId: "codex-a0fde",
  storageBucket: "codex-a0fde.firebasestorage.app",
  messagingSenderId: "651728663940",
  appId: "1:651728663940:web:2fae3e74fc62bafb7c19d1",
  measurementId: "G-51W0BD53G0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
