import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import {
    Device,
    SensorData,
    Devices,
} from '../models/IoTModels';

import {
    getDevices,
    getSensorData,
    updateDeviceStatus,
} from '../services/IoTService';

type IoTContextType = {
    devices: Device[];
    sensors: SensorData;
    isConnected: boolean;
    isLoading: boolean;
    error: string | null;
    updatingDevices: Record<number, boolean>;
    toggleDevice: (id: number, value: boolean) => Promise<void>;
    connectGateway: () => void;
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

    const [devices, setDevices] = useState<Device[]>(Devices);

    const [sensors, setSensors] = useState<SensorData>({
        temperature: 100,
        humidity: 100,
        lightLevel: 100,
    });

    const [updatingDevices, setUpdatingDevices] = useState<Record<number, boolean>>({});

    const toggleDevice = async (id: number, value: boolean) => {
        if (!isConnected) {
            return;
        }

        setUpdatingDevices((current) => ({
            ...current,
            [id]: true,
        }));

        setError(null);

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
            setError(
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

    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const connectGateway = () => {
        setIsLoading(true);
        setError(null);

        try {
            // Replace this with actual connection logic later
            setIsConnected(true);
        } catch {
            setError('Failed to connect to the gateway.');
            setIsConnected(false);
        } finally {
            setIsLoading(false);
        }
    };

    const [sensorLoading, setSensorLoading] = useState(false);
    const refreshSensors = async () => {
        setSensorLoading(true);
        setError(null);

        try {
            const newSensors = await getSensorData();
            setSensors(newSensors);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Failed to load sensor data.'
            );
        } finally {
            setSensorLoading(false);
        }
    };

    const [deviceLoading, setDeviceLoading] = useState(false);

    const loadDevices = async () => {
        setDeviceLoading(true);
        setError(null);

        try {
            const loadedDevices = await getDevices();
            setDevices(loadedDevices);
        } catch (error) {
            setError(
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
    }, []);

    return (
        <IoTContext.Provider
            value={{
                devices,
                sensors,
                isConnected,
                isLoading,
                error,
                updatingDevices,
                toggleDevice,
                connectGateway,
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