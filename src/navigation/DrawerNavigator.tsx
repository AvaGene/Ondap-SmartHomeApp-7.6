import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from './screens/DashboardScreen';
import SensorsScreen from './screens/SensorsScreen';
import DevicesScreen from './screens/DevicesScreen';
import SettingsScreen from './screens/SettingsScreen';
import CustomDrawerContent from './CustomDrawerContent';
import { useSettings } from '../context/SettingsContext';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { theme } = useSettings();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        drawerStyle: { backgroundColor: theme.background },
        drawerActiveTintColor: theme.primary,
        drawerInactiveTintColor: theme.subtext,
      }}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} />
      )}>

      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'IoT Dashboard',
          drawerIcon: ({ size }) => (
            <Ionicons
              name="grid-outline"
              size={size}
              accessibilityLabel="Dashboard"
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Sensors"
        component={SensorsScreen}
        options={{
          title: 'Sensors',
          drawerIcon: ({ size }) => (
            <Ionicons
              name="analytics-outline"
              size={size}
              accessibilityLabel="Sensors"
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Devices"
        component={DevicesScreen}
        options={{
          title: 'Devices',
          drawerIcon: ({ size }) => (
            <Ionicons
              name="hardware-chip-outline"
              size={size}
              accessibilityLabel="Devices"
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          drawerIcon: ({ size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              accessibilityLabel="Settings"
            />
          ),
        }}
      />

    </Drawer.Navigator>
  );
}