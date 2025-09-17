// app/utils/firebaseAdmin.js
import admin from "firebase-admin";
import { cookies } from "next/headers"; // For reading auth cookie

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // or use cert() if you're using service account key
  });
}

const firestore = admin.firestore();

/**
 * Extract and verify Firebase ID token from cookies
 */
export const getAuth = async (req) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("__session")?.value;

    if (!token) {
      console.warn("No token found in cookies");
      return null;
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Firebase Admin Auth Error:", error);
    return null;
  }
};

export { firestore, admin };
