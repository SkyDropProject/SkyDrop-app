import { Stack } from 'expo-router';
import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Alert from '@/app/components/Alert';
import './globals.css';
import { AlertProvider } from '@/app/components/AlertContext';
import { AppProviders } from './providers';

export default function RootLayout(): ReactElement {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AlertProvider>
                <Alert />
                <AppProviders>
                    <View style={styles.container}>
                        <Alert />
                        <Stack>
                            <Stack.Screen name="index" options={{ headerShown: false }} />
                            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                            <Stack.Screen name="(root)" options={{ headerShown: false }} />
                        </Stack>
                    </View>
                </AppProviders>
            </AlertProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        fontFamily: 'inter',
    },
});
