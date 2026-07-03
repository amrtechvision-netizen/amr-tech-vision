import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOAWjImi3FQM7h0n4kE24AE8tiRdxXcXo",
  authDomain: "amr-tech-vision.firebaseapp.com",
  projectId: "amr-tech-vision",
  storageBucket: "amr-tech-vision.firebasestorage.app",
  messagingSenderId: "1061366013612",
  appId: "1:1061366013612:web:8f810889692b18ddc0c909",
  measurementId: "G-NX8J4QRSRN",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;