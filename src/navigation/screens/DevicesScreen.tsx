import React from 'react';

import {
  Text,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';

import { useIoT } from '../../context/IoTContext';
import DeviceCard from '../../components/DeviceCard';
import ErrorBanner from '../../components/ErrorBanner';
import LoadingView from '../../components/LoadingView';

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

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Devices
      </Text>

      <Text style={styles.subtitle}>
        Control your connected devices
      </Text>

      {devicesError && (
        <ErrorBanner
          message={devicesError}
          onRetry={loadDevices}
          retryDisabled={deviceLoading}
        />
      )}

      {deviceLoading ? (
        <LoadingView message="Loading devices..." />
      ) : (
        <>
          {devices.map((device) => (
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
          ))}
        </>
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

});