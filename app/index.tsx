import { Redirect } from 'expo-router';
import { ReactElement, useEffect, useState } from 'react';

import { useAuth } from './providers/AuthProvider';

const Index = (): ReactElement => {
    const { isSignedIn } = useAuth();

    const [isLog, setIsLog] = useState<boolean>(false);

    useEffect(() => {
        setIsLog(isSignedIn);
    }, [isSignedIn]);

    return <Redirect href={isLog ? '/(root)/(tabs)/home' : '/(auth)/welcome'} />;
};

export default Index;
