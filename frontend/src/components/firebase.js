// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYj1w074ZkePaiJLdE3Dl94WuHGeLAXfw",
  authDomain: "krishna-codespherex.firebaseapp.com",
  projectId: "krishna-codespherex",
  storageBucket: "krishna-codespherex.firebasestorage.app",
  messagingSenderId: "1080764567989",
  appId: "1:1080764567989:web:a3608180d97546581dc9fc",
  measurementId: "G-W6B53X6H87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };