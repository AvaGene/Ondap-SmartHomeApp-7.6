import { Device, SensorData } from '../models/IoTModels';

const delay = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const simulateFailure = () => {
  if (Math.random() < 0.5) {
    throw new Error('IoT service request failed.');
  }
};

const mockDevices: Device[] = [
  {
    id: 1,
    name: 'Living Room Light',
    type: 'Smart Light',
    status: true,
  },
  {
    id: 2,
    name: 'Bedroom Fan',
    type: 'Smart Fan',
    status: false,
  },
  {
    id: 3,
    name: 'Front Door Lock',
    type: 'Smart Lock',
    status: true,
  },
];

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

  return mockDevices.map((device) => ({ ...device }));
}

export async function updateDeviceStatus(
  id: number,
  status: boolean
): Promise<Device> {
  await delay(1000);
  simulateFailure();

  const device = mockDevices.find((item) => item.id === id);

  if (!device) {
    throw new Error('Device not found.');
  }

  device.status = status;
  return { ...device };
}
