// app/_layout.tsx
import { Stack } from "expo-router";
import './globals.css';
import { AppProviders } from "./providers";
import {AlertProvider} from "@/app/components/AlertContext";
import {Alert} from "react-native";

export default function RootLayout() {
    return (
        <AlertProvider>
            <AppProviders>
                <Stack>
                    <Alert/>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(root)" options={{ headerShown: false }} />
                </Stack>
            </AppProviders>
        </AlertProvider>
    );
}
