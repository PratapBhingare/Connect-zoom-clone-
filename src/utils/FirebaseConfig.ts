// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM-7KsIbQyzm9fBhCnMkSpn_RJWJcvXys",
  authDomain: "clone-zoom-386ac.firebaseapp.com",
  projectId: "clone-zoom-386ac",
  storageBucket: "clone-zoom-386ac.appspot.com",
  messagingSenderId: "894821786355",
  appId: "1:894821786355:web:81ca276499477762f3cd86",
  measurementId: "G-FRFV9M7XRK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");
