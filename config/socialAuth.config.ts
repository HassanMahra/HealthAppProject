// Social Authentication Configuration
// Replace these with your actual app credentials

export const GOOGLE_CONFIG = {
  androidClientId: 'YOUR_GOOGLE_ANDROID_CLIENT_ID', // From Google Cloud Console
  iosClientId: 'YOUR_GOOGLE_IOS_CLIENT_ID', // From Google Cloud Console
  webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID', // From Google Cloud Console
  expoClientId: 'YOUR_EXPO_CLIENT_ID', // Optional, for Expo Go
};

export const FACEBOOK_CONFIG = {
  appId: 'YOUR_FACEBOOK_APP_ID', // From Facebook Developer Console
  appName: 'HealthApp',
};

export const APPLE_CONFIG = {
  // Apple Sign-In doesn't require configuration
  // It uses your app's bundle identifier
};
