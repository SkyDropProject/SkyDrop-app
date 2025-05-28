import { Redirect } from 'expo-router';

const Index = () => {
    const isSignedIn = true;
    return <Redirect href={isSignedIn ? "/(root)/(tabs)/home" : "/(auth)/welcome"} />;
};

export default Index;