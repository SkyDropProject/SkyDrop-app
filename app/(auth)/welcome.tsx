import React, { ReactElement, useState } from 'react';

import InscriptionTab from '@/app/components/InscriptionTab';
import LoginTab from '@/app/components/LoginTab';

const Welcome = (): ReactElement => {
    const [isInscription, setIsInscription] = useState<boolean>(false);
    return isInscription ? (
        <InscriptionTab onPress={() => setIsInscription(false)} />
    ) : (
        <LoginTab onPress={() => setIsInscription(true)} />
    );
};

export default Welcome;
