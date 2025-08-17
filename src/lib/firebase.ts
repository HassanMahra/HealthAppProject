import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - replace with your actual config values
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY', // TODO: Replace with your actual API key
  authDomain: 'YOUR_AUTH_DOMAIN', // TODO: Replace with your actual auth domain
  projectId: 'YOUR_PROJECT_ID', // TODO: Replace with your actual project ID
  storageBucket: 'YOUR_STORAGE_BUCKET', // TODO: Replace with your actual storage bucket
  messagingSenderId: 'YOUR_SENDER_ID', // TODO: Replace with your actual sender ID
  appId: 'YOUR_APP_ID', // TODO: Replace with your actual app ID
};

// Initialize Firebase app (singleton pattern)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
