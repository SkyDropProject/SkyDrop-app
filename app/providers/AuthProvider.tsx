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
            setLoading(false);
        };
        checkToken();
    }, []);

    const signIn = async (token: string): Promise<void> => {
        await AsyncStorage.setItem('token', token);
        axios.defaults.headers['token'] = token;
        setIsSignedIn(true);
        window.location.href = '/(root)/(tabs)/home';
    };

    const signOut = async (): Promise<void> => {
        await AsyncStorage.removeItem('token');
        axios.defaults.headers['token'] = null;
        setIsSignedIn(false);
        window.location.href = '/(auth)/welcome';
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
