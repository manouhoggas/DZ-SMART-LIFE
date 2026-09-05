import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";

/**
 * 1. Go to https://console.firebase.google.com → create (or open) a project.
 * 2. Project settings (gear icon) → General → "Your apps" → Add app → Web (</>).
 * 3. Copy the firebaseConfig object it gives you and paste the values below.
 *
 * These values are NOT secret — they identify your project and are meant
 * to live in client-side code. Real access control comes from Firebase
 * Authentication + Security Rules, and from the "Authorized domains" list
 * (see step 5 below) — not from hiding this object.
 *
 * NEVER put an Admin SDK service-account JSON here or in any browser code.
 * That key is a true secret and only belongs on a trusted server.
 */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

/**
 * 4. In the Firebase console: Authentication → Sign-in method → enable
 *    "Google" (and "Email/Password" if you want that option too).
 * 5. Authentication → Settings → Authorized domains → add your GitHub
 *    Pages domain, e.g. your-username.github.io
 *    (localhost is already allowed by default, for local testing).
 */

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  const u = result.user;
  return { name: u.displayName || "", email: u.email || "", provider: "google" };
}

export async function signInOrRegisterWithEmail(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { name: result.user.displayName || email.split("@")[0], email, provider: "email" };
  } catch (err) {
    if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return { name: email.split("@")[0], email, provider: "email" };
    }
    throw err;
  }
}

export function signOutUser() {
  return firebaseSignOut(auth);
}
