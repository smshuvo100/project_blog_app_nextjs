// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "cloud-firestore-sm.firebaseapp.com",
  databaseURL: "https://cloud-firestore-sm-default-rtdb.firebaseio.com",
  projectId: "cloud-firestore-sm",
  storageBucket: "cloud-firestore-sm.appspot.com",
  messagingSenderId: "153416572774",
  appId: "1:153416572774:web:17d25fe2b2547793f732a7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
