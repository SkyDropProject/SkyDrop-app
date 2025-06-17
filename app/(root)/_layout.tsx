import { router, Stack } from 'expo-router';
import { ReactElement, useEffect } from 'react';

import { useAuth } from '@/app/providers/AuthProvider';

import { ProductModalProvider } from '../providers/ProductModalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

const Layout = (): ReactElement => {
    const { isSignedIn } = useAuth();

    const checkTokenExpiration = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp < now) {
            await AsyncStorage.removeItem('token');
            router.push('/(auth)/welcome')
        }
    };

    useEffect(() => {
        if (!isSignedIn) {
            router.push('/(auth)/welcome');
        }else{
            checkTokenExpiration();
        }
    }, [isSignedIn]);

    return (
        <ProductModalProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </ProductModalProvider>
    );
};

export default Layout;
