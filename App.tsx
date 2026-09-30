import React from 'react';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { IoTProvider } from './src/context/IoTContext';
import { SettingsProvider, useSettings } from './src/context/SettingsContext';

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}

function AppContent() {
  const { darkMode } = useSettings();

  return (
    <IoTProvider>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <NavigationContainer
        theme={darkMode ? NavigationDarkTheme : NavigationDefaultTheme}
      >
        <DrawerNavigator />
      </NavigationContainer>
    </IoTProvider>
  );
}