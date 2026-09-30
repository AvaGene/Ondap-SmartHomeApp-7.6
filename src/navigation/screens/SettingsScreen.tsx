import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Button,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useIoT } from '../../context/IoTContext';
import { useSettings } from '../../context/SettingsContext';



export default function SettingsScreen() {

  const { 
    isConnected, 
    isLoading, 
    gatewayError,
    connectGateway,
    disconnectGateway,
  } = useIoT();
  const {
    notifications,
    autoConnect,
    darkMode,
    setNotifications,
    setAutoConnect,
    setDarkMode,
    theme,
  } = useSettings();

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >

      {/* Header */}

      <Text style={[styles.title, { color: theme.text }]}>
        Settings
      </Text>

      <Text style={[styles.subtitle, { color: theme.subtext }]}>
        Configure your IoT application
      </Text>


      {/* General Settings */}

      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        General
      </Text>


      {/* Notifications */}

      <View style={[styles.settingCard, { backgroundColor: theme.card, borderColor: theme.border }]}>

        <View style={styles.settingInfo}>

          <Ionicons
            name="notifications-outline"
            size={26}
            color={theme.text}
          />

          <View style={styles.settingText}>

            <Text style={[styles.settingName, { color: theme.text }]}>
              Notifications
            </Text>

            <Text style={[styles.settingDescription, { color: theme.subtext }]}>
              Receive alerts from your IoT devices
            </Text>

          </View>

        </View>

        {/* Push notifications are not implemented yet. */}
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: theme.border, true: theme.primary }}
        />

      </View>


      {/* Auto Connect */}

      <View style={[styles.settingCard, { backgroundColor: theme.card, borderColor: theme.border }]}>

        <View style={styles.settingInfo}>

          <Ionicons
            name="wifi-outline"
            size={26}
            color={theme.text}
          />

          <View style={styles.settingText}>

            <Text style={[styles.settingName, { color: theme.text }]}>
              Auto Connect
            </Text>

            <Text style={[styles.settingDescription, { color: theme.subtext }]}>
              Automatically connect to the IoT gateway
            </Text>

          </View>

        </View>

        <Switch
          value={autoConnect}
          onValueChange={setAutoConnect}
          trackColor={{ false: theme.border, true: theme.primary }}
        />

      </View>


      {/* Dark Mode */}

      <View style={[styles.settingCard, { backgroundColor: theme.card, borderColor: theme.border }]}>

        <View style={styles.settingInfo}>

          <Ionicons
            name="moon-outline"
            size={26}
            color={theme.text}
          />

          <View style={styles.settingText}>

            <Text style={[styles.settingName, { color: theme.text }]}>
              Dark Mode
            </Text>

            <Text style={[styles.settingDescription, { color: theme.subtext }]}>
              Use a darker application appearance
            </Text>

          </View>

        </View>

        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: theme.border, true: theme.primary }}
        />

      </View>


      {/* Connection */}

      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Connection
      </Text>


      <View style={[styles.connectionCard, { backgroundColor: theme.card, borderColor: theme.border }]}>

        <View style={styles.connectionInfo}>

          <Ionicons
            name={isConnected ? 'cloud-done-outline' : 'cloud-offline-outline'}
            size={30}
            color={theme.text}
          />

          <View>
            <Text style={[styles.connectionTitle, { color: theme.text }]}>
              IoT Gateway
            </Text>
            <Text style={[styles.connectionStatus, { color: theme.subtext }]}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </Text>
          </View>
        </View>

        {!isConnected ? (
          <Button
            title={isLoading ? 'Connecting...' : 'Connect Gateway'}
            onPress={connectGateway}
            disabled={isLoading}
          />
        ) : (
          <Button
            title="Disconnect Gateway"
            onPress={disconnectGateway}
          />
        )}

        {gatewayError && (
          <Text style={[styles.connectionStatus, { color: theme.danger }]}>
            {gatewayError}
          </Text>
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 10,
  },

  settingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
  },

  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  settingText: {
    marginLeft: 15,
    flex: 1,
  },

  settingName: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  settingDescription: {
    fontSize: 12,
    marginTop: 4,
  },

  connectionCard: {
    padding: 18,
    borderRadius: 15,
  },

  connectionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  connectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
  },

  connectionStatus: {
    fontSize: 13,
    marginLeft: 15,
    marginTop: 3,
  },

});