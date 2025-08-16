# Mental Health MVP - Mood Check Feature

A simple React Native app focused on daily mood tracking with local storage persistence.

## Features Implemented

### 🌟 Mood Check Screen
- **5-emoji mood scale**: Users can select from 5 different emoji moods (😫 😔 😐 😊 😄)
- **Optional note**: One-line text input for additional context (100 character limit)
- **Save functionality**: Stores mood entries locally using AsyncStorage
- **Clear UI/UX**: Large touch targets and intuitive interface
- **Timestamps**: Automatic timestamp recording for each mood entry

### 📊 History Screen
- **Last 7 entries**: Shows the most recent mood entries
- **Smart date formatting**: Displays "Today", "Yesterday", or formatted dates
- **Time stamps**: Shows exact time of each mood entry
- **Notes display**: Shows optional notes when available
- **Clear history**: Option to delete all stored entries
- **Empty state**: Helpful message when no entries exist

### 💾 Data Persistence
- **AsyncStorage integration**: All data persists across app restarts
- **Local storage only**: No backend required
- **Automatic sorting**: Entries sorted by timestamp (newest first)
- **Error handling**: Graceful error handling for storage operations

### 🧭 Navigation
- **Bottom tab navigation**: Easy switching between Mood and History screens
- **Clean UI**: Modern design with blue accent colors (#3498db)
- **Responsive**: Works on different screen sizes

## Technical Implementation

### Tech Stack
- **React Native** with Expo
- **TypeScript** for type safety
- **AsyncStorage** for local data persistence
- **React Navigation** for screen navigation

### Architecture
```
├── screens/
│   ├── MoodScreen.tsx      # Main mood input screen
│   └── HistoryScreen.tsx   # Mood history display
├── types/
│   └── mood.ts            # TypeScript interfaces and constants
├── utils/
│   └── moodStorage.ts     # AsyncStorage utility functions
└── src/components/
    └── TabIcon.tsx        # Tab bar icon component
```

### Data Structure
```typescript
interface MoodEntry {
  id: string;          // Unique identifier
  emoji: string;       // Selected emoji
  mood: number;        // 1-5 scale
  note?: string;       // Optional note
  timestamp: number;   // Unix timestamp
}
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run web     # For web development
   npm run android # For Android (requires Android Studio)
   npm run ios     # For iOS (requires Xcode on macOS)
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Usage

1. **Track your mood**: Open the app and select one of the 5 emoji moods
2. **Add a note** (optional): Write a brief note about your day
3. **Save**: Tap "Save Mood" to store your entry
4. **View history**: Switch to the "History" tab to see your last 7 entries
5. **Clear data**: Use "Clear All History" if you want to start fresh

## Acceptance Criteria ✅

- ✅ App shows 5 emojis for mood selection
- ✅ Optional one-line note input with character limit
- ✅ Save button creates local entries with emoji, note, and timestamp
- ✅ History screen lists last 7 entries
- ✅ Data persists across app restarts using AsyncStorage
- ✅ Clear UI/UX with big touch targets and simple text
- ✅ Bottom tab navigation between screens
- ✅ Error handling and loading states

## Future Enhancements

This MVP foundation enables future features like:
- 📈 Mood analytics and charts
- 📤 Data export functionality
- 📅 Calendar view
- 🔔 Daily reminders
- 📊 Weekly/monthly trends
- 🎨 Theme customization

## Branch Information

- **Branch**: `feature/mood-check`
- **Commit**: `feat(mood): add mood-check screen with local storage and history`
