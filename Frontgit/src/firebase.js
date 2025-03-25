import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDGPIpF_dTE4knGtnumBI5H6KT_2nEU5ls",
  authDomain: "study-buddy-77ce3.firebaseapp.com",
  projectId: "study-buddy-77ce3",
  storageBucket: "study-buddy-77ce3.appspot.com", // Fixed typo from your earlier config
  messagingSenderId: "126306071482",
  appId: "1:126306071482:web:0b180b01cc3ef9bd4ba383"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);