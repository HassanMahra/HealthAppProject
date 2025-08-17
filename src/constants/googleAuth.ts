// Google OAuth configuration
// TODO: Replace these placeholders with your actual Google OAuth client IDs
// You can get these from the Google Cloud Console: https://console.cloud.google.com/

export const GOOGLE_CONFIG = {
  // Expo client ID (for development)
  expoClientId: 'YOUR_EXPO_CLIENT_ID', // TODO: Replace with your Expo client ID
  
  // iOS client ID (for iOS builds)
  iosClientId: 'YOUR_IOS_CLIENT_ID', // TODO: Replace with your iOS client ID
  
  // Android client ID (for Android builds)
  androidClientId: 'YOUR_ANDROID_CLIENT_ID', // TODO: Replace with your Android client ID
  
  // Web client ID (required for Firebase Auth)
  webClientId: 'YOUR_WEB_CLIENT_ID', // TODO: Replace with your web client ID
};

// Instructions for setup:
// 1. Go to Google Cloud Console
// 2. Create a new project or select existing one
// 3. Enable Google+ API
// 4. Create OAuth 2.0 credentials for each platform
// 5. Replace the placeholder values above with your actual client IDs
