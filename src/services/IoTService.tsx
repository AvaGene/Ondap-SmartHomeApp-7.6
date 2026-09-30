import { USE_MOCK } from '../config';
import * as apiIoTService from './apiIoTService';
import * as mockIoTService from './mockIoTService';
import { Device, SensorData } from '../models/IoTModels';

const service = USE_MOCK ? mockIoTService : apiIoTService;

export async function getSensorData(): Promise<SensorData> {
    return service.getSensorData();
}

export async function getDevices(): Promise<Device[]> {
    return service.getDevices();
}

export async function updateDeviceStatus(
    id: number,
    status: boolean
): Promise<Device> {
    return service.updateDeviceStatus(id, status);
}