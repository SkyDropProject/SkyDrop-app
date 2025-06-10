import { Redirect } from 'expo-router';
import { ReactElement } from 'react';

import { useAuth } from './providers/AuthProvider';

const Index = (): ReactElement => {
    const { isSignedIn } = useAuth()

    return <Redirect href={isSignedIn ? '/(root)/(tabs)/home' : '/(auth)/welcome'} />;
};

export default Index;
