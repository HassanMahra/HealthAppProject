# Authentication Setup Guide

This guide will help you configure social authentication for your Health App.

## 🚀 Quick Start

The authentication system is already implemented and ready to use! You can:

1. **Run the app**: `npm start` or `expo start`
2. **Test basic auth**: Create accounts and login with email/password
3. **Configure social auth**: Follow the steps below for Google, Apple, and Facebook

## 📱 Features Implemented

✅ **Email/Password Authentication**
- Secure password storage using react-native-keychain
- User registration and login
- Form validation
- Beautiful UI with modern design

✅ **Social Authentication Support**
- Google Sign-In
- Apple Sign-In (iOS only)
- Facebook Login

✅ **Navigation & State Management**
- Stack navigation for auth flow
- Tab navigation for authenticated users
- Auth context for global state management
- Persistent login sessions

✅ **Security Features**
- Secure credential storage with Keychain/Keystore
- User data stored in AsyncStorage
- Proper error handling

## 🔧 Social Authentication Configuration

### Google Sign-In Setup

1. **Create Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Google Sign-In API**:
   - Enable "Google Sign-In API" in APIs & Services

3. **Create OAuth 2.0 Credentials**:
   - Go to Credentials → Create Credentials → OAuth 2.0 Client ID
   - Create credentials for:
     - Web application (for Expo)
     - Android app (if building standalone)
     - iOS app (if building standalone)

4. **Update Configuration**:
   ```typescript
   // config/socialAuth.config.ts
   export const GOOGLE_CONFIG = {
     webClientId: 'YOUR_ACTUAL_WEB_CLIENT_ID',
     iosClientId: 'YOUR_ACTUAL_IOS_CLIENT_ID', // Optional
     offlineAccess: true,
   };
   ```

### Apple Sign-In Setup

1. **Apple Developer Account Required**:
   - You need a paid Apple Developer account

2. **Configure App ID**:
   - In Apple Developer Console, enable "Sign In with Apple" for your App ID

3. **Update app.json**:
   ```json
   {
     "expo": {
       "ios": {
         "usesAppleSignIn": true
       }
     }
   }
   ```

### Facebook Login Setup

1. **Create Facebook App**:
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create a new app

2. **Configure Facebook Login**:
   - Add Facebook Login product to your app
   - Configure OAuth redirect URIs

3. **Update Configuration**:
   ```typescript
   // config/socialAuth.config.ts
   export const FACEBOOK_CONFIG = {
     appId: 'YOUR_FACEBOOK_APP_ID',
     appName: 'HealthApp',
   };
   ```

4. **Update app.json**:
   ```json
   {
     "expo": {
       "facebookAppId": "YOUR_FACEBOOK_APP_ID",
       "facebookAutoInitEnabled": true,
       "facebookAutoLogAppEventsEnabled": true,
       "facebookAdvertiserIDCollectionEnabled": true
     }
   }
   ```

## 📁 Project Structure

```
HealthAppProject/
├── contexts/
│   └── AuthContext.tsx          # Global auth state management
├── screens/
│   ├── SignUpScreen.tsx         # Registration screen
│   ├── LoginScreen.tsx          # Login screen
│   └── HomeScreen.tsx           # Welcome screen after login
├── utils/
│   ├── authStorage.ts           # Auth utilities & storage
│   └── socialAuth.ts            # Social authentication
├── config/
│   └── socialAuth.config.ts     # Social auth configuration
└── App.tsx                      # Main app with navigation
```

## 🎨 UI Features

- **Modern Design**: Clean, professional interface with consistent styling
- **Responsive Layout**: Keyboard-aware scrolling and proper spacing
- **Loading States**: Activity indicators during authentication
- **Error Handling**: User-friendly error messages
- **Social Buttons**: Easy-to-use social login buttons
- **Form Validation**: Real-time form validation with helpful messages

## 🔒 Security Features

- **Secure Storage**: Passwords stored in device keychain/keystore
- **Form Validation**: Email format, password strength validation
- **Error Handling**: Proper error boundaries and user feedback
- **Session Management**: Persistent login sessions with secure logout

## 🧪 Testing the App

1. **Start the development server**:
   ```bash
   npm start
   # or
   expo start
   ```

2. **Test Email/Password Auth**:
   - Create a new account with username, email, and password
   - Login with the created credentials
   - Navigate between screens

3. **Test Social Auth** (after configuration):
   - Tap social login buttons
   - Complete OAuth flow
   - Verify user data is properly stored

## 📱 Platform-Specific Notes

### iOS
- Apple Sign-In is only available on iOS
- Requires iOS 13+ for Apple Sign-In
- May require additional configuration for standalone builds

### Android
- Google Sign-In requires SHA-1 fingerprint configuration
- Facebook Login requires key hash configuration
- Test on device or emulator with Google Play Services

### Web
- Social logins work in Expo web with proper OAuth configuration
- Some features may be limited compared to native platforms

## 🚨 Important Notes

1. **Replace Placeholder Values**: Update all placeholder IDs in `config/socialAuth.config.ts`
2. **Test Thoroughly**: Test on both development and production builds
3. **Handle Errors**: The app includes comprehensive error handling
4. **Security**: Never commit real API keys to version control

## 🎯 Next Steps

1. Configure your social authentication providers
2. Test the complete authentication flow
3. Customize the UI to match your brand
4. Add additional features like password reset
5. Implement user profile management

The authentication system is production-ready and follows React Native best practices!
