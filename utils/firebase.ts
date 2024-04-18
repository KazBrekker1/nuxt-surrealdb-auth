import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4BPpeGCatNfEBAKKOonytkPKcjXRxRpY",
  authDomain: "haven-9fe66.firebaseapp.com",
  projectId: "haven-9fe66",
  storageBucket: "haven-9fe66.appspot.com",
  messagingSenderId: "855176270793",
  appId: "1:855176270793:web:d43d4eed5ef4cfb36e4e18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
