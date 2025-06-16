import {router, Stack} from 'expo-router';
import {ReactElement, useEffect} from 'react';

import {useAuth} from "@/app/providers/AuthProvider";

import { ProductModalProvider } from '../providers/ProductModalProvider';

const Layout = (): ReactElement => {
    const { isSignedIn } = useAuth();

    useEffect(() => {
        if(!isSignedIn) {
            router.push('/(auth)/welcome');
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
