export type Device = {
    id: number;
    name: string;
    type: string;
    status: boolean;
}

export type SensorData = {
    temperature: number;
    humidity: number;
    lightLevel: number;
}
