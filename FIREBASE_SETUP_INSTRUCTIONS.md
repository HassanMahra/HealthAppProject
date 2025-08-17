# Firebase Setup Instructions

## Overview
This app now uses Firebase Authentication and Firestore for user management and data storage. Follow these steps to complete the setup.

## 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication and Firestore Database

### Enable Authentication Methods
1. Go to Authentication > Sign-in method
2. Enable "Email/Password"
3. Enable "Google" (optional but recommended)

### Setup Firestore
1. Go to Firestore Database
2. Create database in test mode (you can secure it later)
3. The app will automatically create a `users` collection

## 2. Get Firebase Configuration

1. Go to Project Settings > General
2. Scroll down to "Your apps"
3. Add a web app if you haven't already
4. Copy the Firebase config object
5. Replace the placeholder values in `src/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: 'your-api-key-here',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: '123456789',
  appId: 'your-app-id-here',
};
```

## 3. Google OAuth Setup (Optional)

If you want to enable Google Sign-In:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client IDs
5. Create credentials for each platform you need:
   - Web application (for Firebase)
   - Android application (if building for Android)
   - iOS application (if building for iOS)

6. Update `src/constants/googleAuth.ts` with your client IDs:

```typescript
export const GOOGLE_CONFIG = {
  expoClientId: 'your-expo-client-id',
  iosClientId: 'your-ios-client-id', 
  androidClientId: 'your-android-client-id',
  webClientId: 'your-web-client-id', // This one is required for Firebase
};
```

## 4. Test the App

1. Run `npm start` or `expo start`
2. Try creating an account with email/password
3. Try signing in with the created account
4. Test Google Sign-In if configured
5. Check that user profile is created in Firestore

## Features Implemented

✅ Email/Password Authentication  
✅ Google Sign-In Integration  
✅ Secure local storage with expo-secure-store  
✅ Firestore user profiles  
✅ Automatic profile creation on first login  
✅ Navigation with authentication gate  
✅ Clean error handling and validation  
✅ Loading states and user feedback  

## File Structure

```
src/
├── lib/
│   └── firebase.ts           # Firebase initialization
├── services/
│   ├── auth.ts              # Authentication functions
│   └── userProfile.ts       # Firestore user profile management
├── screens/
│   └── RegisterScreen.tsx   # Email registration screen
├── navigation/
│   └── AppNavigator.tsx     # Updated with auth gate
└── constants/
    └── googleAuth.ts        # Google OAuth configuration
```

## Security Notes

- Firebase config values are safe to be public (they're not secret keys)
- The actual security comes from Firebase Security Rules
- Consider setting up proper Firestore security rules for production
- The app uses expo-secure-store for local user session persistence

## Next Steps

1. Replace all placeholder values with actual Firebase config
2. Set up Google OAuth if needed
3. Configure Firebase Security Rules for production
4. Add additional user profile fields as needed
5. Implement password reset functionality
6. Add email verification if required
