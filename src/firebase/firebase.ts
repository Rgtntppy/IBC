// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTz9zeamHCK_gOVi_RezCm07FPIRjxeNU",
  authDomain: "ibc-northernkantoregion.firebaseapp.com",
  projectId: "ibc-northernkantoregion",
  storageBucket: "ibc-northernkantoregion.firebasestorage.app",
  messagingSenderId: "160355291263",
  appId: "1:160355291263:web:1743ada06cd3c576e26f4a",
  measurementId: "G-SJKJSV93KC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// const analytics = getAnalytics(app);