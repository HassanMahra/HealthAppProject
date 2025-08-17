import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getStoredUser } from '../services/auth';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../src/screens/RegisterScreen';
import HomeScreen from '../../screens/HomeScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const [initialRoute, setInitialRoute] = useState<'Login' | 'Home'>('Login');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const user = await getStoredUser();
      if (user) {
        setInitialRoute('Home');
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
          name="Register" 
          component={RegisterScreen}
          options={{
            title: 'Create Account',
            headerShown: false, // Hide header for register screen for cleaner look
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
