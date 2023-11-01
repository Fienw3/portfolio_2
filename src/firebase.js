// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"; // <- needed for DB

import { getAuth } from "firebase/auth"; // <- needed for auth (later)

import 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn1cfusiCCiijTeFHQo9H-RxrVpKQ5GG0",
  authDomain: "portfolio2-12f71.firebaseapp.com",
  projectId: "portfolio2-12f71",
  storageBucket: "portfolio2-12f71.appspot.com",
  messagingSenderId: "129629370134",
  appId: "1:129629370134:web:7aaaefd80dc4b7ebd18237"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

 const auth = getAuth(app); // <- needed for auth (later)
 export { auth }

export const db = getFirestore(app); // <- needed for DB so we can use it in our application components
