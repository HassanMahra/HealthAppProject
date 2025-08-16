import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoodEntry } from '../types/mood';

const MOOD_STORAGE_KEY = 'mood_entries';

export const saveMoodEntry = async (entry: MoodEntry): Promise<void> => {
  try {
    const existingEntries = await getMoodEntries();
    const updatedEntries = [entry, ...existingEntries];
    await AsyncStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(updatedEntries));
  } catch (error) {
    console.error('Error saving mood entry:', error);
    throw error;
  }
};

export const getMoodEntries = async (): Promise<MoodEntry[]> => {
  try {
    const entriesJson = await AsyncStorage.getItem(MOOD_STORAGE_KEY);
    if (!entriesJson) return [];
    
    const entries: MoodEntry[] = JSON.parse(entriesJson);
    // Sort by timestamp, newest first
    return entries.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Error loading mood entries:', error);
    return [];
  }
};

export const getRecentMoodEntries = async (limit: number = 7): Promise<MoodEntry[]> => {
  try {
    const allEntries = await getMoodEntries();
    return allEntries.slice(0, limit);
  } catch (error) {
    console.error('Error loading recent mood entries:', error);
    return [];
  }
};

export const clearAllMoodEntries = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(MOOD_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing mood entries:', error);
    throw error;
  }
};
