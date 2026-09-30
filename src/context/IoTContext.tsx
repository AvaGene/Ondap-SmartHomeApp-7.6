import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    Device,
    SensorData,
} from '../models/IoTModels';

import {
    getDevices,
    getSensorData,
    updateDeviceStatus,
} from '../services/IoTService';
import { useSettings } from './SettingsContext';

type IoTContextType = {
    devices: Device[];
    sensors: SensorData | null;
    isConnected: boolean;
    isLoading: boolean;
    devicesError: string | null;
    sensorsError: string | null;
    gatewayError: string | null;
    updatingDevices: Record<number, boolean>;
    toggleDevice: (id: number, value: boolean) => Promise<void>;
    connectGateway: () => Promise<void>;
    disconnectGateway: () => void;
    sensorLoading: boolean;
    refreshSensors: () => Promise<void>;
    deviceLoading: boolean;
    loadDevices: () => Promise<void>;
};

const IoTContext = createContext<IoTContextType | undefined>(
    undefined
);

export function IoTProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { autoConnect, settingsLoaded } = useSettings();
    const autoConnectAttempted = useRef(false);

    const [devices, setDevices] = useState<Device[]>([]);

    const [sensors, setSensors] = useState<SensorData | null>(null);

    const [updatingDevices, setUpdatingDevices] = useState<Record<number, boolean>>({});
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [devicesError, setDevicesError] = useState<string | null>(null);
    const [sensorsError, setSensorsError] = useState<string | null>(null);
    const [gatewayError, setGatewayError] = useState<string | null>(null);
    const [sensorLoading, setSensorLoading] = useState(false);
    const [deviceLoading, setDeviceLoading] = useState(false);

    const toggleDevice = async (id: number, value: boolean) => {
        if (!isConnected) {
            setDevicesError('Connect to the gateway first.');
            return;
        }

        const previousDevice = devices.find((device) => device.id === id);

        setUpdatingDevices((current) => ({
            ...current,
            [id]: true,
        }));

        setDevicesError(null);
        setDevices((currentDevices) =>
            currentDevices.map((device) =>
                device.id === id
                    ? { ...device, status: value }
                    : device
            )
        );

        try {
            const updatedDevice = await updateDeviceStatus(id, value);

            setDevices((currentDevices) =>
                currentDevices.map((device) =>
                    device.id === updatedDevice.id
                        ? updatedDevice
                        : device
                )
            );
        } catch (error) {
            if (previousDevice) {
                setDevices((currentDevices) =>
                    currentDevices.map((device) =>
                        device.id === id
                            ? { ...device, status: previousDevice.status }
                            : device
                    )
                );
            }

            setDevicesError(
                error instanceof Error
                    ? error.message
                    : 'Failed to update device.'
            );
        } finally {
            setUpdatingDevices((current) => ({
                ...current,
                [id]: false,
            }));
        }
    };

    const connectGateway = async () => {
        setIsLoading(true);
        setGatewayError(null);

        try {
            await new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() < 0.1) {
                        reject(new Error('Failed to connect to the gateway.'));
                        return;
                    }

                    resolve();
                }, 300);
            });
            setIsConnected(true);
        } catch (error) {
            setGatewayError(
                error instanceof Error
                    ? error.message
                    : 'Failed to connect to the gateway.'
            );
            setIsConnected(false);
        } finally {
            setIsLoading(false);
        }
    };

    const disconnectGateway = () => {
        setIsConnected(false);
        setGatewayError(null);
    };

    const refreshSensors = async () => {
        setSensorLoading(true);
        setSensorsError(null);

        try {
            const newSensors = await getSensorData();
            setSensors(newSensors);
        } catch (error) {
            setSensorsError(
                error instanceof Error
                    ? error.message
                    : 'Failed to load sensor data.'
            );
        } finally {
            setSensorLoading(false);
        }
    };

    const loadDevices = async () => {
        setDeviceLoading(true);
        setDevicesError(null);

        try {
            const loadedDevices = await getDevices();
            setDevices(loadedDevices);
        } catch (error) {
            setDevicesError(
                error instanceof Error
                    ? error.message
                    : 'Unable to retrieve devices.'
            );
        } finally {
            setDeviceLoading(false);
        }
    };

    useEffect(() => {
        void loadDevices();
        void refreshSensors();
    }, []);

    useEffect(() => {
        if (
            settingsLoaded &&
            autoConnect &&
            !autoConnectAttempted.current
        ) {
            autoConnectAttempted.current = true;
            void connectGateway();
        }
    }, [autoConnect, settingsLoaded]);

    return (
        <IoTContext.Provider
            value={{
                devices,
                sensors,
                isConnected,
                isLoading,
                devicesError,
                sensorsError,
                gatewayError,
                updatingDevices,
                toggleDevice,
                connectGateway,
                disconnectGateway,
                sensorLoading,
                refreshSensors,
                deviceLoading,
                loadDevices,
            }}
        >
            {children}
        </IoTContext.Provider>
    );
}

export function useIoT() {

    const context = useContext(IoTContext);

    if (!context) {
        throw new Error(
            'useIoT must be used inside IoTProvider'
        );
    }

    return context;
}