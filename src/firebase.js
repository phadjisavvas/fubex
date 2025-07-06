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
  appId: "YOUR_APP_ID"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Firebase Auth instance to use in other files
export const auth = getAuth(app);
