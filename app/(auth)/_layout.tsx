import { Stack } from 'expo-router';
import { ReactElement } from 'react';

const Layout = (): ReactElement => {
    return (
        <Stack>
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
        </Stack>
    );
};

export default Layout;
