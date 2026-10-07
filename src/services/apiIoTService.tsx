import { Device, SensorData } from '../models/IoTModels';
import { request } from './http';
import {
  DeviceDto,
  SensorDataDto,
  mapDevice,
  mapSensors,
} from './apiTypes';

export async function getDevices(): Promise<Device[]> {
  const devices = await request<DeviceDto[]>('/devices');
  return devices.map(mapDevice);
}

export async function getSensorData(): Promise<SensorData> {
  const sensors = await request<SensorDataDto>('/sensors');
  return mapSensors(sensors);
}

export async function updateDeviceStatus(
  id: number,
  status: boolean
): Promise<Device> {
  const device = await request<DeviceDto>(`/devices/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });

  return mapDevice(device);
}
