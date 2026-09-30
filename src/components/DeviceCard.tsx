import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Switch, Text, View, StyleSheet } from 'react-native';
import { Device } from '../models/IoTModels';
import { getDeviceIcon } from '../models/deviceIcons';
import { useSettings } from '../context/SettingsContext';

type DeviceCardProps = {
  device: Device;
  updating: boolean;
  disabled: boolean;
  onToggle: (value: boolean) => void;
  showType?: boolean;
};

export default function DeviceCard({
  device,
  updating,
  disabled,
  onToggle,
  showType = false,
}: DeviceCardProps) {
  const { theme } = useSettings();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
        showType ? styles.fullCard : styles.compactCard,
      ]}
    >
      <View style={styles.info}>
        <View style={[styles.iconContainer, showType ? styles.fullIconContainer : styles.compactIconContainer]}>
          <Ionicons name={getDeviceIcon(device.type)} size={28} color={theme.text} />
        </View>

        <View style={styles.details}>
          <Text style={[styles.name, { color: theme.text }]}>
            {device.name}
          </Text>

          {showType && (
            <Text style={[styles.type, { color: theme.subtext }]}>
              {device.type}
            </Text>
          )}

          <Text style={[styles.state, { color: theme.subtext }]}>
            {updating ? 'Updating...' : device.status ? 'ON' : 'OFF'}
          </Text>
        </View>
      </View>

      <Switch
        value={device.status}
        disabled={disabled}
        trackColor={{ false: theme.border, true: theme.primary }}
        onValueChange={onToggle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  compactCard: {
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },

  fullCard: {
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
  },

  info: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  compactIconContainer: {
    marginRight: 12,
  },

  fullIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },

  details: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  type: {
    fontSize: 13,
    marginTop: 3,
  },

  state: {
    fontSize: 12,
    marginTop: 5,
  },
});
