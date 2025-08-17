import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

interface User {
  method: 'email' | 'google';
  email?: string;
  accessToken?: string;
  idToken?: string;
}

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const [initialRoute, setInitialRoute] = useState<'Login' | 'Home'>('Login');
  const [isReady, setIsReady] = useState(false);

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
      setIsReady(true);
    }
  };

  if (!isReady) {
    return null; // Let App.tsx handle the loading state
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3B82F6',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            title: 'Welcome',
            headerShown: false, // Hide header for login screen for cleaner look
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'Home',
            headerLeft: () => null, // Prevent going back to login
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
