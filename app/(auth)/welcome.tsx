import React, { ReactElement, useState } from 'react';

import InscriptionTab from '@/app/components/InscriptionTab';
import LoginTab from '@/app/components/LoginTab';
import { useAuth } from '@/app/providers/AuthProvider';

const Welcome = (): ReactElement => {
    const [isInscription, setIsInscription] = useState<boolean>(false);
    const { signIn } = useAuth();
    return isInscription ? (
        <InscriptionTab
            onPress={() => setIsInscription(false)}
            onSubmit={() => setIsInscription(false)}
        />
    ) : (
        <LoginTab 
            onPress={() => setIsInscription(true)}
            onSubmit={() => signIn()}
        />
    );
};

export default Welcome;
