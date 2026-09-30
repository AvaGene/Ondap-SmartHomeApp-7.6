import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { darkTheme, lightTheme, Theme } from '../theme/theme';

type SettingsContextType = {
  notifications: boolean;
  autoConnect: boolean;
  darkMode: boolean;
  setNotifications: (value: boolean) => void;
  setAutoConnect: (value: boolean) => void;
  setDarkMode: (value: boolean) => void;
  theme: Theme;
  settingsLoaded: boolean;
};

type StoredSettings = {
  notifications?: boolean;
  autoConnect?: boolean;
  darkMode?: boolean;
};

const SETTINGS_STORAGE_KEY = '@ondap-smart-home/settings';

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState(true);
  const [autoConnect, setAutoConnect] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
        if (storedSettings) {
          const parsedSettings = JSON.parse(storedSettings) as StoredSettings;
          if (typeof parsedSettings.notifications === 'boolean') {
            setNotifications(parsedSettings.notifications);
          }
          if (typeof parsedSettings.autoConnect === 'boolean') {
            setAutoConnect(parsedSettings.autoConnect);
          }
          if (typeof parsedSettings.darkMode === 'boolean') {
            setDarkMode(parsedSettings.darkMode);
          }
        }
      } catch {
        // Keep defaults when persisted settings cannot be read.
      } finally {
        setSettingsLoaded(true);
      }
    };

    void loadSettings();
  }, []);

  useEffect(() => {
    if (!settingsLoaded) {
      return;
    }

    const persistSettings = async () => {
      try {
        await AsyncStorage.setItem(
          SETTINGS_STORAGE_KEY,
          JSON.stringify({ notifications, autoConnect, darkMode })
        );
      } catch {
        // Settings remain available for the current session if persistence fails.
      }
    };

    void persistSettings();
  }, [notifications, autoConnect, darkMode, settingsLoaded]);

  return (
    <SettingsContext.Provider
      value={{
        notifications,
        autoConnect,
        darkMode,
        setNotifications,
        setAutoConnect,
        setDarkMode,
        theme: darkMode ? darkTheme : lightTheme,
        settingsLoaded,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used inside SettingsProvider');
  }

  return context;
}
