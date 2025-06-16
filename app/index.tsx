import * as Font from 'expo-font';
import { Redirect } from 'expo-router';
import { ReactElement, useEffect, useState } from 'react';
import {useColorScheme} from "nativewind";
import {ActivityIndicator, StatusBar} from "react-native";
import 'react-native-reanimated';

import { useAuth } from './providers/AuthProvider';

const Index = (): ReactElement => {
    const { isSignedIn } = useAuth();
    const theme = useColorScheme();
    const [isLog, setIsLog] = useState<boolean>(false);
    const [fontsLoaded] = Font.useFonts({
        'inter': require('../assets/fonts/InterVariable.ttf'),
    });
    useEffect(() => {
        setIsLog(isSignedIn);
    }, [isSignedIn]);

    if (!fontsLoaded) {
        return <ActivityIndicator />;
    }

    return (
        <>
            <StatusBar
                barStyle={theme.colorScheme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={theme.colorScheme === 'dark' ? '#000' : '#fff'} // Pour Android
            />
            <Redirect href={isLog ? '/(root)/(tabs)/home' : '/(auth)/welcome'} />
        </>
        );
};

export default Index;
