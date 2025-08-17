import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AppNavigator from './src/navigation/AppNavigator';

interface User {
  method: 'email' | 'google';
  email?: string;
  accessToken?: string;
  idToken?: string;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<'Login' | 'Home'>('Login');

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      if (userString) {
        const user: User = JSON.parse(userString);
        if (user && (user.method === 'email' || user.method === 'google')) {
          setInitialRoute('Home');
        }
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      // Default to Login screen on error
      setInitialRoute('Login');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <>
      <AppNavigator />
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
});
