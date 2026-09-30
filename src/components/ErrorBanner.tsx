import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';

type ErrorBannerProps = {
  message: string;
  onRetry?: () => void;
  retryDisabled?: boolean;
};

export default function ErrorBanner({
  message,
  onRetry,
  retryDisabled = false,
}: ErrorBannerProps) {
  const { theme } = useSettings();

  return (
    <View>
      <Text style={[styles.message, { color: theme.danger }]}>
        {message}
      </Text>

      {onRetry && (
        <Button
          title="Retry"
          onPress={onRetry}
          disabled={retryDisabled}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    marginBottom: 10,
  },
});
