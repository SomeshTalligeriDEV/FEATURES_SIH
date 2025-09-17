import { auth } from "./firebaseAdmin"; // Admin SDK

export async function getAuth(req) {
  const idToken = req.headers.get("Authorization")?.split("Bearer ")[1];
  if (!idToken) return null;

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    return { uid: decodedToken.uid };
  } catch (error) {
    console.error("Auth verification failed:", error);
    return null;
  }
}
