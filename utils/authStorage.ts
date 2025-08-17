import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

export interface User {
  id: string;
  username: string;
  email: string;
}

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

// Hash password (simple implementation for demo - use proper hashing in production)
const hashPassword = async (password: string): Promise<string> => {
  // In a real app, use bcrypt or similar
  return btoa(password);
};

// Save user credentials securely
export const saveUserCredentials = async (email: string, password: string): Promise<void> => {
  try {
    await Keychain.setGenericPassword(email, password, {
      service: 'HealthApp',
    });
  } catch (error) {
    console.error('Error saving credentials:', error);
    throw error;
  }
};

// Get user credentials
export const getUserCredentials = async (): Promise<{ username: string; password: string } | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: 'HealthApp',
    });
    if (credentials) {
      return {
        username: credentials.username,
        password: credentials.password,
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting credentials:', error);
    return null;
  }
};

// Clear user credentials
export const clearUserCredentials = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword({
      service: 'HealthApp',
    });
  } catch (error) {
    console.error('Error clearing credentials:', error);
  }
};

// Register a new user
export const registerUser = async (username: string, email: string, password: string): Promise<User> => {
  try {
    // Get existing users
    const usersData = await AsyncStorage.getItem(USERS_KEY);
    const users: User[] = usersData ? JSON.parse(usersData) : [];
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
    };
    
    // Add to users array
    users.push(newUser);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Save credentials securely
    await saveUserCredentials(email, password);
    
    // Set as current user
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    
    return newUser;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    // Get existing users
    const usersData = await AsyncStorage.getItem(USERS_KEY);
    const users: User[] = usersData ? JSON.parse(usersData) : [];
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Verify credentials (in a real app, compare hashed passwords)
    const credentials = await getUserCredentials();
    if (!credentials || credentials.username !== email) {
      throw new Error('Invalid credentials');
    }
    
    // Set as current user
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    
    return user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const userData = await AsyncStorage.getItem(CURRENT_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
    await clearUserCredentials();
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
