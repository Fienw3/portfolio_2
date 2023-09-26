// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"; // <- needed for DB

import { getAuth } from "firebase/auth"; // <- needed for auth (later)

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC55qkFnQJffWLBCjPzYDBRf0tMHBDweRE",
  authDomain: "inclassadvjs.firebaseapp.com",
  projectId: "inclassadvjs",
  storageBucket: "inclassadvjs.appspot.com",
  messagingSenderId: "589233081065",
  appId: "1:589233081065:web:3dc37aee8d67df10023e78"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

 const auth = getAuth(app); // <- needed for auth (later)
 export { auth }

export const db = getFirestore(app); // <- needed for DB so we can use it in our application components