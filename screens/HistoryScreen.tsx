import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MoodEntry } from '../types/mood';
import { getRecentMoodEntries, clearAllMoodEntries } from '../utils/moodStorage';
import { useFocusEffect } from '@react-navigation/native';

export default function HistoryScreen() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMoodEntries = async () => {
    try {
      setIsLoading(true);
      const entries = await getRecentMoodEntries(7);
      setMoodEntries(entries);
    } catch (error) {
      console.error('Error loading mood entries:', error);
      Alert.alert('Error', 'Failed to load mood history');
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadMoodEntries();
    }, [])
  );

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to delete all mood entries? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllMoodEntries();
              setMoodEntries([]);
              Alert.alert('Success', 'All mood entries have been deleted');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear history');
            }
          },
        },
      ]
    );
  };

  const renderMoodEntry = ({ item }: { item: MoodEntry }) => (
    <View style={styles.entryContainer}>
      <View style={styles.entryHeader}>
        <View style={styles.moodInfo}>
          <Text style={styles.moodEmoji}>{item.emoji}</Text>
          <View style={styles.entryDetails}>
            <Text style={styles.dateText}>{formatDate(item.timestamp)}</Text>
            <Text style={styles.timeText}>{formatTime(item.timestamp)}</Text>
          </View>
        </View>
      </View>
      {item.note && (
        <Text style={styles.noteText}>{item.note}</Text>
      )}
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Loading your mood history...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mood History</Text>
        <Text style={styles.subtitle}>Your last 7 entries</Text>
      </View>

      {moodEntries.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📊</Text>
          <Text style={styles.emptyTitle}>No mood entries yet</Text>
          <Text style={styles.emptySubtitle}>
            Start tracking your mood to see your history here
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={moodEntries}
            renderItem={renderMoodEntry}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
          
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearHistory}
            activeOpacity={0.7}
          >
            <Text style={styles.clearButtonText}>Clear All History</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  listContainer: {
    padding: 20,
    paddingTop: 10,
  },
  entryContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  moodEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  entryDetails: {
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 2,
  },
  timeText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  noteText: {
    fontSize: 14,
    color: '#34495e',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 22,
  },
  clearButton: {
    margin: 20,
    padding: 16,
    backgroundColor: '#e74c3c',
    borderRadius: 12,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
