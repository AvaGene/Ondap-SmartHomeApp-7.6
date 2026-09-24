import React, {
    createContext,
    useContext,
    useState,
} from 'react';

import {
    Device,
    SensorData,
    Devices,
} from '../models/IoTModels';

type IoTContextType = {
    devices: Device[];
    sensors: SensorData;
    isConnected: boolean;
    isLoading: boolean;
    error: string | null;
    updatingDevices: Record<number, boolean>;
    toggleDevice: (id: number, value: boolean) => Promise<void>;
    connectGateway: () => void;
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

    const [sensors] = useState<SensorData>({
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

        try {
            // Simulate a device command taking one second.
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setDevices((currentDevices) =>
                currentDevices.map((device) =>
                    device.id === id
                        ? { ...device, status: value }
                        : device
                )
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