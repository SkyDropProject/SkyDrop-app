import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {
    createContext,
    ReactElement,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import {router, useNavigation} from "expo-router";

interface AuthContextType {
    isSignedIn: boolean;
    signIn: (token: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }): ReactElement | null => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect((): void => {
        const checkToken = async (): Promise<void> => {
            const token = await AsyncStorage.getItem('token');
            setIsSignedIn(!!token);
            axios.defaults.headers['token'] = token;
            setLoading(false);
        };
        checkToken();
    }, []);

    const signIn = async (token: string): Promise<void> => {
        await AsyncStorage.setItem('token', token);
        axios.defaults.headers['token'] = token;
        setIsSignedIn(true);
        router.replace('/(root)/(tabs)/home');
    };

    const signOut = async (): Promise<void> => {
        await AsyncStorage.removeItem('token');
        axios.defaults.headers['token'] = null;
        setIsSignedIn(false);
        router.replace('/(auth)/welcome');
    };

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
