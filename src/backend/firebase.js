// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_gN68S5Tld11PNjgS1Q1flATvNkG9Lmw",
  authDomain: "tech-haven-music-380-ecfb5.firebaseapp.com",
  projectId: "tech-haven-music-380-ecfb5",
  storageBucket: "tech-haven-music-380-ecfb5.firebasestorage.app",
  messagingSenderId: "209949124793",
  appId: "1:209949124793:web:2254eb7b3cfa08ce661368"
};



// Initialize Firebase

const firebaseapp = initializeApp(firebaseConfig);
export let __AUTH = getAuth(firebaseapp);
export let __DB= getFirestore(firebaseapp);
