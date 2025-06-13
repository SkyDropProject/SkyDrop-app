import {router, Stack} from 'expo-router';
import {ReactElement, useEffect} from 'react';
import {useAuth} from "@/app/providers/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Layout = (): ReactElement => {
    const { isSignedIn } = useAuth();

    useEffect(() => {
        if(!isSignedIn) {
            router.push('/(auth)/welcome');
        }
    }, []);


    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
};

export default Layout;
