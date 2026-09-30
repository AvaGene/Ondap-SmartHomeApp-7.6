import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet } from 'react-native';

type SensorCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  description?: string;
  compact?: boolean;
};

export default function SensorCard({
  icon,
  label,
  value,
  description,
  compact = false,
}: SensorCardProps) {
  return (
    <View style={[styles.card, compact ? styles.compactCard : styles.fullCard]}>
      <View style={[styles.header, compact ? styles.compactHeader : styles.fullHeader]}>
        <Ionicons name={icon} size={compact ? 22 : 30} />
        <Text style={compact ? styles.compactLabel : styles.fullLabel}>
          {label}
        </Text>
      </View>

      <Text style={compact ? styles.compactValue : styles.fullValue}>
        {value}
      </Text>

      {description && (
        <Text style={styles.description}>
          {description}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eeeeee',
  },

  compactCard: {
    flex: 1,
    minWidth: 90,
    padding: 20,
    borderRadius: 12,
  },

  fullCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  compactHeader: {
    gap: 6,
  },

  fullHeader: {
    gap: 10,
  },

  compactLabel: {
    fontSize: 14,
  },

  fullLabel: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  compactValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },

  fullValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
  },

  description: {
    fontSize: 13,
    marginTop: 5,
  },
});
