export interface MoodEntry {
  id: string;
  emoji: string;
  mood: number; // 1-5 scale
  note?: string;
  timestamp: number;
}

export const MOOD_EMOJIS = ['😫', '😔', '😐', '😊', '😄'] as const;
export const MOOD_LABELS = ['Very Bad', 'Bad', 'Okay', 'Good', 'Great'] as const;

export type MoodScale = 1 | 2 | 3 | 4 | 5;
