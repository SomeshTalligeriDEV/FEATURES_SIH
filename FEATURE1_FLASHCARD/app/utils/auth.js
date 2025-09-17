import { auth, provider, db } from "./firebaseConfig"; // fixed path
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Google Sign-In Function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User Info:", user);

    // Firestore user doc check/create
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        premium: false,
        dailyUploads: 0,
        lastUpload: null,
      });
      console.log("User added to Firestore with initial limits");
    }

    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return null;
  }
};

// Sign-Out Function
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Sign-Out Error:", error);
  }
};
