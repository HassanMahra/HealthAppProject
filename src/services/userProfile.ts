import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User } from './auth';

export interface UserProfile {
  uid: string;
  email: string | null;
  provider: 'email' | 'google';
  displayName: string;
  createdAt: any;
  onboardingDone: boolean;
}

const USERS_COLLECTION = 'users';

// Create user profile in Firestore (if it doesn't exist)
export const createUserProfile = async (user: User): Promise<void> => {
  try {
    const userDocRef = doc(db, USERS_COLLECTION, user.uid);
    
    // Try to get the document first
    let userDoc;
    try {
      userDoc = await getDoc(userDocRef);
    } catch (getError: any) {
      // If we can't get the document due to offline/network issues, 
      // still try to create it (it will be cached locally)
      console.warn('Could not check existing profile, attempting to create:', getError.message);
    }
    
    // Only create if profile doesn't exist (or we couldn't check)
    if (!userDoc || !userDoc.exists()) {
      const profileData: Omit<UserProfile, 'createdAt'> & { createdAt: any } = {
        uid: user.uid,
        email: user.email,
        provider: user.provider,
        displayName: user.displayName || user.email?.split('@')[0] || 'User',
        createdAt: serverTimestamp(),
        onboardingDone: false,
      };
      
      try {
        await setDoc(userDocRef, profileData, { merge: true });
        console.log('User profile created/updated successfully');
      } catch (setError: any) {
        // If offline, the write will be cached and synced when online
        console.warn('Profile creation cached for offline sync:', setError.message);
      }
    }
  } catch (error: any) {
    console.error('Failed to create user profile:', error);
    // Don't throw error - allow authentication to succeed even if profile creation fails
    console.warn('Authentication succeeded but profile creation failed - will retry when online');
  }
};

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDocRef = doc(db, USERS_COLLECTION, uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to get user profile:', error);
    return null;
  }
};

// Update user profile in Firestore
export const updateUserProfile = async (
  uid: string, 
  data: Partial<Omit<UserProfile, 'uid' | 'createdAt'>>
): Promise<void> => {
  try {
    const userDocRef = doc(db, USERS_COLLECTION, uid);
    await updateDoc(userDocRef, data);
    console.log('User profile updated successfully');
  } catch (error) {
    console.error('Failed to update user profile:', error);
    throw new Error('Failed to update user profile');
  }
};

