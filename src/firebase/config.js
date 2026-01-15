import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your Firebase config - get this from Firebase Console
// Go to: https://console.firebase.google.com/
// Project Settings > General > Your apps > Web app > Copy the config

const firebaseConfig = {
  apiKey: "AIzaSyAvSa0-mDUnqoTMoyKsl2iX093WwJ3vCRU",
  authDomain: "cooking-app-c276d.firebaseapp.com",
  projectId: "cooking-app-c276d",
  storageBucket: "cooking-app-c276d.firebasestorage.app",
  messagingSenderId: "557626457565",
  appId: "1:557626457565:web:b246bdb6dfaabeb097ca34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)
