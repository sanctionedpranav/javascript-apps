// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApleJir0OIA7H23crEhMTvo__7xKuex7M",
  authDomain: "task-manager-47883.firebaseapp.com",
  projectId: "task-manager-47883",
  storageBucket: "task-manager-47883.firebasestorage.app",
  messagingSenderId: "950166646550",
  appId: "1:950166646550:web:f56a95d1543195e1566a37",
  measurementId: "G-HKBGGJDF7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);