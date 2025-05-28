// app/_layout.tsx
import { Stack } from "expo-router";
import './globals.css';
import { AppProviders } from "./providers";

export default function RootLayout() {
    return (
        <AppProviders>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(root)" options={{ headerShown: false }} />
            </Stack>
        </AppProviders>
    );
}
