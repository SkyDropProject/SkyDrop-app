import { IntlProvider, useIntl } from 'react-intl';
import { Text, View } from "react-native";
import { langs } from "./interfaces/lang.js";
import { en } from "./lang/en";
import { fr } from "./lang/fr";

const Test = () => {
  const intl = useIntl()

  return (
    <View>
      <Text>{intl.formatMessage({id:"test"})}</Text>
    </View>
  )
}

const Index = () => {
  const messages : langs = {
    en,
    fr,
  };
   
  const language = navigator.language.split('-')[0];
  const locale = Object.keys(messages).includes(language) ? language : 'en';

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text className="text-5xl text-blue-600">{<Test/>}</Text>
      </View>
    </IntlProvider>
  );
}

export default Index