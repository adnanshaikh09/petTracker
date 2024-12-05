// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCPierdy6hgaTynQA2cKJ6gxOBNxZDyrnA",
    authDomain: "sem3advtopicslab3.firebaseapp.com",
    databaseURL: "https://sem3advtopicslab3-default-rtdb.firebaseio.com",
    projectId: "sem3advtopicslab3",
    storageBucket: "sem3advtopicslab3.firebasestorage.app",
    messagingSenderId: "931569171718",
    appId: "1:931569171718:web:83efbd454736e925ca7287",
    measurementId: "G-MHM1GN8CW8"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore instance
