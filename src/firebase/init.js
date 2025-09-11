// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";           // For product images, receipts, etc.
import { getDatabase } from "firebase/database";         // For real-time syncing (e.g. live cart)
import { getMessaging } from "firebase/messaging";       // For push notifications
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyD_HQiyz55G1MTncLNAb_ITb79vGPHnh8U",
  authDomain: "library-bookstore-react.firebaseapp.com",
  projectId: "library-bookstore-react",
  storageBucket: "library-bookstore-react.firebasestorage.app",
  messagingSenderId: "92267367420",
  appId: "1:92267367420:web:c246ffb8a4e40fe87cc079",
  measurementId: "G-0XLZMXZ6EW"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth =getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const realtime = getDatabase(app);
const messaging = getMessaging(app)
const functions = getFunctions(app);


logEvent(analytics, "app_initialized");


export { app, analytics, auth, db, storage, realtime, messaging, functions };