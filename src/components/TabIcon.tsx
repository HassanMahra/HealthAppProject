import React from 'react';
import { Text } from 'react-native';

interface TabIconProps {
  emoji: string;
  size: number;
  color: string;
}

export default function TabIcon({ emoji, size, color }: TabIconProps) {
  return (
    <Text style={{ fontSize: size, color: 'black' }}>
      {emoji}
    </Text>
  );
}
