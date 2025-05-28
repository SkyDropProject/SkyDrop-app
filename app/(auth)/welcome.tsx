import React, {Component, useState} from 'react';
import {Text, View} from 'react-native';
import LoginTab from "@/app/components/LoginTab";
import InscriptionTab from "@/app/components/InscriptionTab";

const Welcome = () => {
    const [isInscription, setIsInscription] = useState<boolean>(false);
    return (
        isInscription ? (
            <InscriptionTab onPress={() => setIsInscription(false)} />
            ) : (<LoginTab onPress={() => setIsInscription(true)} />)

    )
}

export default Welcome;
