import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

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
  return (
    <View>
      <Text style={styles.message}>
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
    color: 'red',
    marginBottom: 10,
  },
});
