import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBm20LnuKowcEeV0R4UayexrsUvQaAmZr4",
    authDomain: "gymgraph-ac95d.firebaseapp.com",
    projectId: "gymgraph-ac95d",
    storageBucket: "gymgraph-ac95d.appspot.com",
    messagingSenderId: "569702322733",
    appId: "1:569702322733:web:912d38d9bb22dd09171ea4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);