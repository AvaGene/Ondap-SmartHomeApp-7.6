import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';

type EmptyStateProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  message?: string;
};

export default function EmptyState({
  icon,
  title,
  message,
}: EmptyStateProps) {
  const { theme } = useSettings();

  return (
    <View style={styles.container}>
      <Ionicons
        name={icon}
        size={36}
        color={theme.primary}
        accessibilityLabel={title}
      />
      <Text style={[styles.title, { color: theme.text }]}>
        {title}
      </Text>
      {message && (
        <Text style={[styles.message, { color: theme.subtext }]}>
          {message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },

  message: {
    marginTop: 5,
    textAlign: 'center',
  },
});
