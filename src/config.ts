// Android emulator uses 10.0.2.2, iOS simulator uses localhost, and a physical phone needs the computer's LAN IP.
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:3000/api';

export const USE_MOCK =
  process.env.EXPO_PUBLIC_USE_MOCK === undefined
    ? true
    : process.env.EXPO_PUBLIC_USE_MOCK === 'true';

export const REQUEST_TIMEOUT_MS = 10000;
