import { Ionicons } from '@expo/vector-icons';

export function getDeviceIcon(
  type: string
): keyof typeof Ionicons.glyphMap {
  switch (type) {
    case 'Smart Light':
      return 'bulb-outline';
    case 'Smart Fan':
      return 'sync-outline';
    case 'Smart Lock':
      return 'lock-closed-outline';
    default:
      return 'hardware-chip-outline';
  }
}
