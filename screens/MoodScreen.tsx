import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MoodEntry, MOOD_EMOJIS, MOOD_LABELS, MoodScale } from '../types/mood';
import { saveMoodEntry } from '../utils/moodStorage';

export default function MoodScreen() {
  const [selectedMood, setSelectedMood] = useState<MoodScale | null>(null);
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleMoodSelect = (mood: MoodScale) => {
    setSelectedMood(mood);
  };

  const handleSave = async () => {
    if (!selectedMood) {
      Alert.alert('Please select a mood', 'Choose how you\'re feeling today');
      return;
    }

    setIsLoading(true);
    try {
      const entry: MoodEntry = {
        id: Date.now().toString(),
        emoji: MOOD_EMOJIS[selectedMood - 1],
        mood: selectedMood,
        note: note.trim() || undefined,
        timestamp: Date.now(),
      };

      await saveMoodEntry(entry);
      
      Alert.alert(
        'Mood Saved!',
        'Your mood has been recorded successfully.',
        [
          {
            text: 'OK',
            onPress: () => {
              setSelectedMood(null);
              setNote('');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save your mood. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>How are you feeling?</Text>
        <Text style={styles.subtitle}>Select your mood today</Text>

        <View style={styles.moodContainer}>
          {MOOD_EMOJIS.map((emoji, index) => {
            const moodValue = (index + 1) as MoodScale;
            const isSelected = selectedMood === moodValue;
            
            return (
              <TouchableOpacity
                key={moodValue}
                style={[
                  styles.moodButton,
                  isSelected && styles.moodButtonSelected,
                ]}
                onPress={() => handleMoodSelect(moodValue)}
                activeOpacity={0.7}
              >
                <Text style={styles.moodEmoji}>{emoji}</Text>
                <Text style={[
                  styles.moodLabel,
                  isSelected && styles.moodLabelSelected,
                ]}>
                  {MOOD_LABELS[index]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.noteLabel}>Add a note (optional)</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="What's on your mind?"
            value={note}
            onChangeText={setNote}
            maxLength={100}
            multiline={false}
            returnKeyType="done"
          />
          <Text style={styles.characterCount}>{note.length}/100</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.saveButton,
            (!selectedMood || isLoading) && styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={!selectedMood || isLoading}
          activeOpacity={0.8}
        >
          <Text style={[
            styles.saveButtonText,
            (!selectedMood || isLoading) && styles.saveButtonTextDisabled,
          ]}>
            {isLoading ? 'Saving...' : 'Save Mood'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
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
    marginBottom: 40,
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  moodButton: {
    width: '18%',
    aspectRatio: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderWidth: 2,
    borderColor: '#e1e8ed',
    marginBottom: 10,
  },
  moodButtonSelected: {
    borderColor: '#3498db',
    backgroundColor: '#ebf3fd',
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 11,
    color: '#7f8c8d',
    textAlign: 'center',
    fontWeight: '500',
  },
  moodLabelSelected: {
    color: '#3498db',
    fontWeight: '600',
  },
  noteContainer: {
    marginBottom: 40,
  },
  noteLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  noteInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e1e8ed',
    color: '#2c3e50',
    minHeight: 50,
  },
  characterCount: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'right',
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  saveButtonTextDisabled: {
    color: '#ecf0f1',
  },
});
