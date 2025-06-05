import { Redirect } from 'expo-router';
import { ReactElement } from 'react';

const Index = (): ReactElement => {
    const isSignedIn = true;
    return <Redirect href={isSignedIn ? '/(root)/(tabs)/home' : '/(auth)/welcome'} />;
};

export default Index;
