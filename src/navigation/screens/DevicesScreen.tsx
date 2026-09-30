import React from 'react';

import {
  Text,
  StyleSheet,
  ScrollView,
  Button,
  RefreshControl,
} from 'react-native';

import { useIoT } from '../../context/IoTContext';
import DeviceCard from '../../components/DeviceCard';
import EmptyState from '../../components/EmptyState';
import ErrorBanner from '../../components/ErrorBanner';
import LoadingView from '../../components/LoadingView';
import { useSettings } from '../../context/SettingsContext';

export default function DevicesScreen() {

  const {
    devices,
    isConnected,
    updatingDevices,
    toggleDevice,
    deviceLoading,
    loadDevices,
    devicesError,
  } = useIoT();
  const { theme } = useSettings();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      refreshControl={(
        <RefreshControl
          refreshing={deviceLoading}
          onRefresh={loadDevices}
        />
      )}
    >

      <Text style={[styles.title, { color: theme.text }]}>
        Devices
      </Text>

      <Text style={[styles.subtitle, { color: theme.subtext }]}>
        Control your connected devices
      </Text>

      {!isConnected && (
        <Text style={[styles.connectionNotice, { color: theme.subtext }]}>
          Not connected to the gateway. Go to Settings &gt; Connect Gateway to control devices.
        </Text>
      )}

      {devicesError && (
        <ErrorBanner
          message={devicesError}
          onRetry={loadDevices}
          retryDisabled={deviceLoading}
        />
      )}

      {deviceLoading && devices.length === 0 ? (
        <LoadingView message="Loading devices..." />
      ) : devices.length === 0 ? (
        <EmptyState
          icon="hardware-chip-outline"
          title="No devices found"
          message="Pull down to reload."
        />
      ) : (
        devices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            updating={Boolean(updatingDevices[device.id])}
            disabled={
              deviceLoading ||
              !isConnected ||
              Boolean(updatingDevices[device.id])
            }
            onToggle={(value) => toggleDevice(device.id, value)}
            showType
          />
        ))
      )}

      <Button
        title="Reload Devices"
        onPress={loadDevices}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 25,
  },

  connectionNotice: {
    fontSize: 12,
    marginBottom: 12,
  },

});