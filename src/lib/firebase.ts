import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCWcGEDsysKttGpEdtXPmthLtMZ5YeP2cQ",
    authDomain: "boardinfinity-7bc93.firebaseapp.com",
    projectId: "boardinfinity-7bc93",
    storageBucket: "boardinfinity-7bc93.appspot.com",
    messagingSenderId: "44315747818",
    appId: "1:44315747818:web:10535b8ed88e0f476c7e93",
    measurementId: "G-PSJD6Z2G3C"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };