// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0Cb2CR8zGl5uG_uUGiUl2cw7TahEmQVI",
  authDomain: "fubex-ef833.firebaseapp.com",
  projectId: "fubex-ef833",
  storageBucket: "fubex-ef833.firebasestorage.app",
  messagingSenderId: "64296286089",
  appId: "1:64296286089:web:e0dc18ff37cf81207f5358",
  measurementId: "G-T522R2J0H7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);