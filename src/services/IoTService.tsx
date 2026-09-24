import {
    Device,
    SensorData,
    Devices,
} from '../models/IoTModels';

const delay = (milliseconds: number) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

const simulateFailure = () => {
    if (Math.random() < 0.1) {
        throw new Error('IoT service request failed.');
    }
};

export async function getSensorData(): Promise<SensorData> {
    await delay(1000);
    simulateFailure();

    return {
        temperature: Math.round(18 + Math.random() * 15),
        humidity: Math.round(40 + Math.random() * 40),
        lightLevel: Math.round(300 + Math.random() * 700),
    };
}

export async function getDevices(): Promise<Device[]> {
    await delay(1000);
    simulateFailure();

    return Devices.map((device) => ({
        ...device,
    }));
}

export async function updateDeviceStatus(
    id: number,
    status: boolean
): Promise<Device> {
    await delay(1000);
    simulateFailure();

    const device = Devices.find((item) => item.id === id);

    if (!device) {
        throw new Error('Device not found.');
    }

    return {
        ...device,
        status,
    };
}