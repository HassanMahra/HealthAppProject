import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getStoredUser, signOutUser, User } from '../src/services/auth';
import { getUserProfile, UserProfile } from '../src/services/userProfile';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUser = await getStoredUser();
      if (storedUser) {
        setUser(storedUser);
        const userProfile = await getUserProfile(storedUser.uid);
        setProfile(userProfile);
      } else {
        // No stored user, redirect to login
        navigation.replace('Login');
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
      navigation.replace('Login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOutUser();
              navigation.replace('Login');
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to logout');
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.usernameText}>
            {profile?.displayName || user?.email?.split('@')[0] || 'User'}!
          </Text>
          <Text style={styles.subtitleText}>
            Ready to continue your health journey?
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎉 Welcome to Health App!</Text>
          <Text style={styles.cardDescription}>
            Your account is set up and ready. You can now explore all the features of the Health App.
          </Text>
          
          <View style={styles.userInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>
                {profile?.displayName || 'Not set'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{user?.email || 'Not available'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Provider:</Text>
              <Text style={styles.infoValue}>
                {user?.provider === 'google' ? 'Google' : 'Email'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>User ID:</Text>
              <Text style={styles.infoValue}>{user?.uid.slice(0, 8)}...</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Explore App Features</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  welcomeSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 24,
    color: '#6B7280',
    marginBottom: 4,
  },
  usernameText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  userInfo: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  infoValue: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
    textAlign: 'right',
  },
  actionButtons: {
    gap: 12,
  },
  googleButton: {
    backgroundColor: '#4285F4',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#4285F4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  googleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#EF4444',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
