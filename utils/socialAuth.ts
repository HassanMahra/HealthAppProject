import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { registerUser, User } from './authStorage';
import { GOOGLE_CONFIG } from '../config/socialAuth.config';

// Complete the auth session for web
WebBrowser.maybeCompleteAuthSession();

// Google Sign-In Hook
export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: GOOGLE_CONFIG.androidClientId,
    iosClientId: GOOGLE_CONFIG.iosClientId,
    webClientId: GOOGLE_CONFIG.webClientId,
    expoClientId: GOOGLE_CONFIG.expoClientId,
  });

  return { request, response, promptAsync };
};

// Google Sign-In Function
export const signInWithGoogle = async (promptAsync: () => Promise<AuthSession.AuthSessionResult>): Promise<{ user: User; accessToken: string }> => {
  try {
    const result = await promptAsync();
    
    if (result.type === 'success') {
      const { access_token } = result.params;
      
      // Log the access token to console as requested
      console.log('Google Access Token:', access_token);
      
      // Fetch user info from Google API
      const userInfoResponse = await fetch(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
      );
      const userInfo = await userInfoResponse.json();
      
      // Register or login user with Google data
      const user = await registerUser(
        userInfo.name || 'Google User',
        userInfo.email,
        'google_auth_' + userInfo.id
      );
      
      return { user, accessToken: access_token };
    } else if (result.type === 'cancel') {
      throw new Error('Google sign-in was cancelled');
    } else {
      throw new Error('Google sign-in failed');
    }
  } catch (error: any) {
    console.error('Google sign-in error:', error);
    throw new Error('Google sign-in failed: ' + error.message);
  }
};

// Configure Google Sign-In (no longer needed with expo-auth-session, but keeping for compatibility)
export const configureGoogleSignIn = () => {
  // No configuration needed for expo-auth-session
  console.log('Google Sign-In configured for Expo managed workflow');
};

// Apple Sign-In
export const signInWithApple = async (): Promise<User> => {
  try {
    // Check if Apple authentication is available
    const isAvailable = await appleAuth.isAvailableAsync();
    if (!isAvailable) {
      throw new Error('Apple Sign-In is not available on this device');
    }

    // Perform the sign-in request
    const appleAuthRequestResponse = await appleAuth.requestAsync({
      requestedScopes: [
        appleAuth.Scope.FULL_NAME,
        appleAuth.Scope.EMAIL,
      ],
    });

    // Check if the authentication was successful
    if (appleAuthRequestResponse.identityToken) {
      const { fullName, email } = appleAuthRequestResponse;
      const username = fullName?.givenName && fullName?.familyName 
        ? `${fullName.givenName} ${fullName.familyName}`
        : 'Apple User';
      
      // Register or login user with Apple data
      const user = await registerUser(
        username,
        email || 'apple_user@example.com',
        'apple_auth_' + appleAuthRequestResponse.user
      );
      
      return user;
    } else {
      throw new Error('Apple sign-in failed');
    }
  } catch (error: any) {
    if (error.code === '1001') {
      throw new Error('Apple sign-in cancelled');
    } else {
      throw new Error('Apple sign-in failed: ' + error.message);
    }
  }
};

// Facebook Sign-In
export const signInWithFacebook = async (): Promise<User> => {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    
    if (result.isCancelled) {
      throw new Error('Facebook sign-in cancelled');
    }

    // Get the access token
    const data = await AccessToken.getCurrentAccessToken();
    
    if (!data) {
      throw new Error('Failed to get Facebook access token');
    }

    // Fetch user info from Facebook Graph API
    const response = await fetch(`https://graph.facebook.com/me?access_token=${data.accessToken}&fields=id,name,email`);
    const userInfo = await response.json();
    
    // Register or login user with Facebook data
    const user = await registerUser(
      userInfo.name || 'Facebook User',
      userInfo.email || 'facebook_user@example.com',
      'facebook_auth_' + userInfo.id
    );
    
    return user;
  } catch (error: any) {
    throw new Error('Facebook sign-in failed: ' + error.message);
  }
};

// Sign out from all social platforms
export const signOutFromSocial = async (): Promise<void> => {
  try {
    // Google Sign-Out (expo-auth-session doesn't require explicit sign-out)
    console.log('Google sign-out handled by clearing local session');
    
    // Facebook Sign-Out
    LoginManager.logOut();
    
    // Apple doesn't need explicit sign-out
  } catch (error) {
    console.error('Error signing out from social platforms:', error);
  }
};
