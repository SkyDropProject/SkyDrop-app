
import { Stack } from 'expo-router';
import { ReactElement } from 'react';
import Alert from '@/app/components/Alert';
import './globals.css';

import { AlertProvider } from '@/app/components/AlertContext';

import { AppProviders } from './providers';

export default function RootLayout(): ReactElement {
    return (
        <AlertProvider>
            <AppProviders>
                <Stack>
                    <Alert />
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(root)" options={{ headerShown: false }} />
                </Stack>
            </AppProviders>
        </AlertProvider>
    );
}
