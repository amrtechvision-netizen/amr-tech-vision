import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

console.log("FIREBASE_PROJECT_ID =", process.env.FIREBASE_PROJECT_ID);
console.log("FIREBASE_CLIENT_EMAIL =", process.env.FIREBASE_CLIENT_EMAIL);
console.log(
  "FIREBASE_PRIVATE_KEY exists =",
  !!process.env.FIREBASE_PRIVATE_KEY
);

const adminApp =
  getApps().length === 0
    ? initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      })
    : getApps()[0];

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);