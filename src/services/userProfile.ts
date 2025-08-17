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
    const userDoc = await getDoc(userDocRef);
    
    // Only create if profile doesn't exist
    if (!userDoc.exists()) {
      const profileData: Omit<UserProfile, 'createdAt'> & { createdAt: any } = {
        uid: user.uid,
        email: user.email,
        provider: user.provider,
        displayName: user.displayName || user.email?.split('@')[0] || 'User',
        createdAt: serverTimestamp(),
        onboardingDone: false,
      };
      
      await setDoc(userDocRef, profileData);
      console.log('User profile created successfully');
    }
  } catch (error) {
    console.error('Failed to create user profile:', error);
    throw new Error('Failed to create user profile');
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
