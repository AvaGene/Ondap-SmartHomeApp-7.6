import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';

import { useIoT } from '../../context/IoTContext';
import ErrorBanner from '../../components/ErrorBanner';
import LoadingView from '../../components/LoadingView';
import SensorCard from '../../components/SensorCard';

export default function SensorsScreen() {

  const { sensors, sensorLoading, refreshSensors, sensorsError } = useIoT();
  
  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <Text style={styles.title}>
        Sensors
      </Text>

      <Text style={styles.subtitle}>
        Monitor your environment
      </Text>

      <SensorCard
        icon="thermometer-outline"
        label="Temperature"
        value={sensors ? `${sensors.temperature}°C` : '--'}
        description="Current room temperature"
      />

      <SensorCard
        icon="water-outline"
        label="Humidity"
        value={sensors ? `${sensors.humidity}%` : '--'}
        description="Current relative humidity"
      />

      <SensorCard
        icon="sunny-outline"
        label="Light Level"
        value={sensors ? `${sensors.lightLevel} lux` : '--'}
        description="Current ambient light"
      />

      <Button
        title={sensorLoading ? 'Refreshing...' : 'Refresh Sensors'}
        onPress={refreshSensors}
        disabled={sensorLoading}
      />

      {sensorLoading && (
        <LoadingView message="Refreshing Sensors..." />
      )}

      {sensorsError && (
        <ErrorBanner
          message={sensorsError}
          onRetry={refreshSensors}
          retryDisabled={sensorLoading}
        />
      )}

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