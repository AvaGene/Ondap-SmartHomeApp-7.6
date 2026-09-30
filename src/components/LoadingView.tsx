import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';

type LoadingViewProps = {
  message?: string;
};

export default function LoadingView({ message }: LoadingViewProps) {
  const { theme } = useSettings();

  return (
    <View style={styles.container}>
      <ActivityIndicator color={theme.primary} />
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  message: {
    marginTop: 8,
  },
});
