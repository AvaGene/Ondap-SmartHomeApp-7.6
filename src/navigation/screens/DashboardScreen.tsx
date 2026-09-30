import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useIoT } from '../../context/IoTContext';
import DeviceCard from '../../components/DeviceCard';
import ErrorBanner from '../../components/ErrorBanner';
import SensorCard from '../../components/SensorCard';


export default function DashboardScreen() {
    const { devices, 
        sensors, 
        toggleDevice,
        devicesError,
        sensorsError } = useIoT();
    const hour = new Date().getHours();
    const greeting = hour < 12
        ? 'Good morning!'
        : hour < 18
            ? 'Good afternoon!'
            : 'Good evening!';

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Text style={styles.greeting}>
                {greeting}
            </Text>

            <Text style={styles.title}>
                IoT Dashboard
            </Text>

            <View style={styles.sensorRow}>

                <SensorCard
                    icon="thermometer-outline"
                    label="Temperature"
                    value={sensors ? `${sensors.temperature}°C` : '--'}
                    compact
                />

                <SensorCard
                    icon="water-outline"
                    label="Humidity"
                    value={sensors ? `${sensors.humidity}%` : '--'}
                    compact
                />

                <SensorCard
                    icon="sunny-outline"
                    label="Light Level"
                    value={sensors ? `${sensors.lightLevel} lux` : '--'}
                    compact
                />

            </View>

            {sensorsError && (
                <ErrorBanner message={sensorsError} />
            )}

            <Text style={styles.sectionTitle}>
                Device Status
            </Text>

            {devicesError && (
                <ErrorBanner message={devicesError} />
            )}

            {devices.map((device) => (
                <DeviceCard
                    key={device.id}
                    device={device}
                    updating={false}
                    disabled={false}
                    onToggle={(value) => toggleDevice(device.id, value)}
                />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
    },

    greeting: {
        fontSize: 14,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 5,
    },

    sensorRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginTop: 25,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 12,
    },

});