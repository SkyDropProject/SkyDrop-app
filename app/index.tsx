import { IntlProvider, useIntl } from 'react-intl';
import { Text, View } from "react-native";
import { langs } from "./interfaces/lang.js";
import { en } from "./lang/en";
import { fr } from "./lang/fr";

const Index = () => {
  const messages : langs = {
    en,
    fr,
  };
   
  const language = navigator.language?.split('-')[0];
  const locale = Object.keys(messages).includes(language) ? language : 'en';
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
        </View>
    </IntlProvider>
);
}

export default Index