/** ASSUMED backend contract. Update these DTOs and mappers if the API shape changes. */
import { Device, SensorData } from '../models/IoTModels';

export type DeviceDto = {
  id: number;
  name: string;
  type: string;
  icon: string;
  status: boolean;
};

export type SensorDataDto = {
  temperature: number;
  humidity: number;
  light_level: number;
};

export function mapDevice(device: DeviceDto): Device {
  return {
    id: device.id,
    name: device.name,
    type: device.type,
    status: device.status,
  };
}

export function mapSensors(sensors: SensorDataDto): SensorData {
  return {
    temperature: sensors.temperature,
    humidity: sensors.humidity,
    lightLevel: sensors.light_level,
  };
}
