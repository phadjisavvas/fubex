// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace these with your real config values from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyC0Cb2CR8zGl5uG_uUGiUl2cw7TahEmQVI",
  authDomain: "Fubex.firebaseapp.com",
  projectId: "fubex-ef833",
  storageBucket: "fubex.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "1:64296286089:web:e0dc18ff37cf81207f5358"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Firebase Auth instance to use in other files
export const auth = getAuth(app);
