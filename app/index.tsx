import { IntlProvider, useIntl } from 'react-intl';
import { Text, View } from "react-native";
import { langs } from "./interfaces/lang.js";
import { en } from "./lang/en";
import { fr } from "./lang/fr";
import InputField from "@/app/components/InputField";
import SubmitButton from "@/app/components/SubmitButton";
import {useEffect, useState} from "react";
import * as Font from "expo-font";

const Index = () => {
  const messages : langs = {
    en,
    fr,
  };
   
  const language = navigator.language?.split('-')[0];
  const locale = Object.keys(messages).includes(language) ? language : 'en';

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
return (

    <IntlProvider locale={locale} messages={messages[locale]}>
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
            }}
        >

            <InputField placeholder={"Adresse mail"} value={mail} onChangeText={setMail}
                        error="Adresse mail invalide"/>
            <InputField placeholder={"Mot de passe"} value={password} onChangeText={setPassword} disabled/>
            <SubmitButton text={"Se connecter"} onPress={() => {
            }}/>

        </View>
    </IntlProvider>
);
}

export default Index