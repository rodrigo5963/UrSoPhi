// src/lib/firebase.ts
"use client";

// npm package imports for Firebase
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getAI, getGenerativeModel, GoogleAIBackend, ResponseModality } from "firebase/ai";
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from "firebase/firestore";

// ---------------------------------------------------------------------------
// Firebase configuration (values come from env variables; fallback to empty strings
// for local development). This prevents undefined causing a runtime error.
// ---------------------------------------------------------------------------
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
};

// ---------------------------------------------------------------------------
// Initialize Firebase only once (avoid "Firebase app already exists" errors).
// ---------------------------------------------------------------------------
export const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

// ---------------------------------------------------------------------------
// Simple email/password authentication helpers
// ---------------------------------------------------------------------------
export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const signUp = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback: (user: any) => void) =>
  onAuthStateChanged(auth, callback);

// ---------------------------------------------------------------------------
// Gemini AI models (text and image)
// ---------------------------------------------------------------------------
export const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });
export const textModel = getGenerativeModel(ai, { model: "gemini-2.5-flash" });
export const imageModel = getGenerativeModel(ai, {
  model: "gemini-2.5-flash-image",
  generationConfig: { responseModalities: [ResponseModality.TEXT, ResponseModality.IMAGE] },
});

// ---------------------------------------------------------------------------
// Firestore (Data Connect) helpers – store generated content for history
// ---------------------------------------------------------------------------
export const db = getFirestore(firebaseApp);
export const generationsCol = collection(db, "generations");

export async function saveGeneration(data: { prompt: string; type: "text" | "image"; result: string }) {
  await addDoc(generationsCol, { ...data, createdAt: new Date() });
}

export async function fetchRecent(limitN = 20) {
  const q = query(generationsCol, orderBy("createdAt", "desc"), limit(limitN));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
}
