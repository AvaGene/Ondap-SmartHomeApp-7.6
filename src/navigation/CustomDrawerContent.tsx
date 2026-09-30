import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerContentComponentProps,
} from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';
import { useSettings } from '../context/SettingsContext';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { theme } = useSettings();

    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}
        >

            {/* Header */}
            <View style={styles.header}>

                <View style={styles.logoContainer}>
                    <Ionicons
                        name="hardware-chip-outline"
                        size={40}
                        color={theme.primary}
                    />
                </View>

                <Text style={[styles.title, { color: theme.text }]}>
                    IoT Home
                </Text>

                <Text style={[styles.subtitle, { color: theme.subtext }]}>
                    Smart Environment
                </Text>

            </View>

            {/* Navigation Items */}
            <View style={styles.menu}>
                <DrawerItemList {...props} />
            </View>

        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    header: {
        padding: 20,
        alignItems: 'center',
    },

    logoContainer: {
        marginBottom: 10,
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },

    subtitle: {
        fontSize: 13,
        marginTop: 4,
    },

    menu: {
        marginTop: 10,
    },

});