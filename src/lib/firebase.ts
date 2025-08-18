import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGQpBGdZmm1WAlxK3qHTyeuu5u0Cv7XP4",
  authDomain: "mentalhealthproject-7bd91.firebaseapp.com",
  projectId: "mentalhealthproject-7bd91",
  storageBucket: "mentalhealthproject-7bd91.firebasestorage.app",
  messagingSenderId: "120287694034",
  appId: "1:120287694034:web:9cecb26c378a73a583310b",
  measurementId: "G-76B0LQKJCD"
};

// Initialize Firebase app (singleton pattern)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
// Ensure auth is properly connected
auth.useDeviceLanguage();

// Initialize Firestore with offline support
export const db = getFirestore(app);

// Enable network by default and handle connectivity
const initializeFirestore = async () => {
  try {
    await enableNetwork(db);
    console.log('Firestore network enabled');
  } catch (error) {
    console.warn('Firestore network initialization failed:', error);
  }
};

// Initialize Firestore network
initializeFirestore();

// Initialize Analytics (optional - only works in web environment)
let analytics;
try {
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (error) {
  // Analytics not supported in React Native environment
  console.log('Firebase Analytics not available in this environment');
}

export { analytics };
export default app;
