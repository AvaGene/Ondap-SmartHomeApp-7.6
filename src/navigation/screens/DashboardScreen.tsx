import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
} from 'react-native';
import { useIoT } from '../../context/IoTContext';
import DeviceCard from '../../components/DeviceCard';
import EmptyState from '../../components/EmptyState';
import ErrorBanner from '../../components/ErrorBanner';
import LoadingView from '../../components/LoadingView';
import SensorCard from '../../components/SensorCard';


export default function DashboardScreen() {
    const { devices, 
        sensors, 
        toggleDevice,
        isConnected,
        updatingDevices,
        deviceLoading,
        loadDevices,
        sensorLoading,
        refreshSensors,
        devicesError,
        sensorsError } = useIoT();
    const hour = new Date().getHours();
    const greeting = hour < 12
        ? 'Good morning!'
        : hour < 18
            ? 'Good afternoon!'
            : 'Good evening!';
    const refreshDashboard = async () => {
        await Promise.all([loadDevices(), refreshSensors()]);
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={(
                <RefreshControl
                    refreshing={deviceLoading || sensorLoading}
                    onRefresh={refreshDashboard}
                />
            )}
        >

            <Text style={styles.greeting}>
                {greeting}
            </Text>

            <Text style={styles.title}>
                IoT Dashboard
            </Text>

            {!isConnected && (
                <Text style={styles.connectionNotice}>
                    Not connected to the gateway. Go to Settings &gt; Connect Gateway to control devices.
                </Text>
            )}

            {sensorsError && (
                <ErrorBanner
                    message={sensorsError}
                    onRetry={refreshSensors}
                    retryDisabled={sensorLoading}
                />
            )}

            {sensorLoading && !sensors ? (
                <LoadingView message="Loading sensors..." />
            ) : (
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
            )}

            <Text style={styles.sectionTitle}>
                Device Status
            </Text>

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
                            !isConnected ||
                            deviceLoading ||
                            Boolean(updatingDevices[device.id])
                        }
                        onToggle={(value) => toggleDevice(device.id, value)}
                    />
                ))
            )}
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

    connectionNotice: {
        fontSize: 12,
        marginTop: 10,
    },

});