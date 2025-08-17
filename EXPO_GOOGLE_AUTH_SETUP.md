# 🚀 Expo Google Authentication Setup Guide

## ✅ What's Been Updated

The app has been successfully migrated from native Google Sign-In to **Expo's managed workflow** using `expo-auth-session`. This means:

- ✅ **No native modules required** - works in Expo Go
- ✅ **Cross-platform support** - Android, iOS, and Web
- ✅ **Managed workflow compatible** - no ejecting needed
- ✅ **Simple Google login button** added to Home screen
- ✅ **Access token logging** to console when successful

## 🔧 How to Configure Google OAuth

### 1. **Google Cloud Console Setup**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google Sign-In API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**

### 2. **Create OAuth 2.0 Client IDs**

You need to create separate client IDs for each platform:

#### **Android Client ID**
- Application type: Android
- Package name: `com.healthappproject.app`
- SHA-1 certificate fingerprint: Get from `expo credentials:manager`

#### **iOS Client ID**
- Application type: iOS
- Bundle ID: `com.healthappproject.app`

#### **Web Client ID**
- Application type: Web application
- Authorized redirect URIs: `https://auth.expo.io/@your-expo-username/HealthAppProject`

### 3. **Update Configuration**

Edit `config/socialAuth.config.ts`:

```typescript
export const GOOGLE_CONFIG = {
  androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
  iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com', 
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  expoClientId: 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com', // Optional
};
```

## 🎯 How to Test

### 1. **Start the Development Server**
```bash
npm start
# or
expo start
```

### 2. **Test in Expo Go**
1. Scan the QR code with Expo Go app
2. Navigate to Home screen (create account or login first)
3. Tap the **"🔍 Test Google Login"** button
4. Complete the Google OAuth flow
5. Check the console for the access token log

### 3. **Expected Behavior**
- OAuth browser opens with Google login
- After successful login, returns to app
- Console shows: `Google Access Token: ya29.a0A...`
- Success alert appears
- User data is registered/updated

## 📱 Platform-Specific Notes

### **Expo Go (Development)**
- Works on all platforms without configuration
- Uses Expo's OAuth proxy for redirect handling
- Perfect for development and testing

### **Standalone Builds**
- Requires actual OAuth client IDs configured
- Uses custom URL scheme: `healthappproject://`
- Redirect URI: `healthappproject://`

### **Web**
- Works in browser with web client ID
- Uses standard OAuth2 flow
- No additional setup needed

## 🔍 Key Changes Made

### **Dependencies**
- ❌ Removed: `@react-native-google-signin/google-signin`
- ✅ Using: `expo-auth-session/providers/google`
- ✅ Using: `expo-auth-session`, `expo-crypto`, `expo-web-browser`

### **Code Structure**
```typescript
// New Expo approach
import * as Google from 'expo-auth-session/providers/google';

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: GOOGLE_CONFIG.androidClientId,
    iosClientId: GOOGLE_CONFIG.iosClientId,
    webClientId: GOOGLE_CONFIG.webClientId,
  });
  return { request, response, promptAsync };
};
```

### **Usage in Components**
```typescript
const { request, response, promptAsync } = useGoogleAuth();

const handleGoogleLogin = async () => {
  const result = await signInWithGoogle(promptAsync);
  console.log('Access Token:', result.accessToken);
};
```

## 🎨 UI Updates

### **Home Screen**
- Added **"🔍 Test Google Login"** button
- Blue Google-style styling
- Logs access token to console on success
- Shows success/error alerts

### **Auth Screens**
- Updated to use new Expo Google auth
- Maintains same UI/UX
- Compatible with managed workflow

## 🚨 Important Notes

### **For Development (Expo Go)**
- No configuration needed initially
- Uses Expo's development OAuth proxy
- Perfect for testing the flow

### **For Production**
- Must configure actual OAuth client IDs
- Update redirect URIs in Google Console
- Test on all target platforms

### **Security**
- Access tokens are logged to console (development only)
- Remove console logs in production
- Store tokens securely if needed

## 🎉 Benefits of Expo Approach

✅ **No Ejecting Required** - stays in managed workflow  
✅ **Cross-Platform** - works on Android, iOS, Web  
✅ **Expo Go Compatible** - test immediately  
✅ **Simpler Setup** - less native configuration  
✅ **Better Maintenance** - managed by Expo team  
✅ **Future Proof** - compatible with latest Expo versions  

## 🧪 Testing Checklist

- [ ] App starts without errors in Expo Go
- [ ] Can create account with email/password
- [ ] Can navigate to Home screen
- [ ] Google login button appears
- [ ] Tapping button opens OAuth flow
- [ ] Successful login returns to app
- [ ] Access token logged to console
- [ ] Success alert shows
- [ ] User data properly stored

The Google authentication is now fully compatible with Expo's managed workflow and ready for development and testing!
