import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDp7meB1QsjJ4vbvw9sXXuzNrXOntheeyo",
  authDomain: "bite00.firebaseapp.com",
  projectId: "bite00",
  storageBucket: "bite00.firebasestorage.app",
  messagingSenderId: "971385690514",
  appId: "1:971385690514:web:8a561b89bd75013b36094b",
  measurementId: "G-FR5VBL6VB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const id = auth.currentUser?.uid;

export default app;