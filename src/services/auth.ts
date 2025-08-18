import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithCredential, 
  signOut,
  GoogleAuthProvider,
  User as FirebaseUser
} from 'firebase/auth';
import * as SecureStore from 'expo-secure-store';
import { auth } from '../lib/firebase';
import { createUserProfile } from './userProfile';

export interface User {
  uid: string;
  email: string | null;
  provider: 'email' | 'google';
  displayName: string | null;
}

const USER_STORAGE_KEY = 'user';

// Convert Firebase User to our User interface
const normalizeUser = (firebaseUser: FirebaseUser, provider: 'email' | 'google'): User => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  provider,
  displayName: firebaseUser.displayName,
});

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = normalizeUser(userCredential.user, 'email');
    
    // Ensure user profile exists in Firestore
    await createUserProfile(user);
    
    // Store user locally
    await storeUser(user);
    
    return user;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign in');
  }
};

// Register with email and password
export const registerWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = normalizeUser(userCredential.user, 'email');
    
    // Create user profile in Firestore
    await createUserProfile(user);
    
    // Store user locally
    await storeUser(user);
    
    return user;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create account');
  }
};

// Sign in with Google
export const signInWithGoogle = async ({ 
  idToken, 
  accessToken 
}: { 
  idToken: string; 
  accessToken?: string; 
}): Promise<User> => {
  try {
    const credential = GoogleAuthProvider.credential(idToken, accessToken);
    const userCredential = await signInWithCredential(auth, credential);
    const user = normalizeUser(userCredential.user, 'google');
    
    // Ensure user profile exists in Firestore
    await createUserProfile(user);
    
    // Store user locally
    await storeUser(user);
    
    return user;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign in with Google');
  }
};

// Sign out user
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    await clearStoredUser();
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign out');
  }
};

// Store user in secure storage
export const storeUser = async (user: User): Promise<void> => {
  try {
    await SecureStore.setItemAsync(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to store user:', error);
  }
};

// Get stored user from secure storage
export const getStoredUser = async (): Promise<User | null> => {
  try {
    const userString = await SecureStore.getItemAsync(USER_STORAGE_KEY);
    return userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error('Failed to get stored user:', error);
    return null;
  }
};

// Clear stored user from secure storage
export const clearStoredUser = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(USER_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear stored user:', error);
  }
};

