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
          drawerIcon: ({ size }) => (
            <Ionicons
              name="grid-outline"
              size={size}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Sensors"
        component={SensorsScreen}
        options={{
          drawerIcon: ({ size }) => (
            <Ionicons
              name="analytics-outline"
              size={size}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Devices"
        component={DevicesScreen}
        options={{
          drawerIcon: ({ size }) => (
            <Ionicons
              name="hardware-chip-outline"
              size={size}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
            />
          ),
        }}
      />

    </Drawer.Navigator>
  );
}