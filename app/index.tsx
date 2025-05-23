import { IntlProvider, useIntl } from 'react-intl';
import { Text, View } from "react-native";
import { langs } from "./interfaces/lang.js";
import { en } from "./lang/en";
import { fr } from "./lang/fr";
import ProfileTab from "@/app/components/ProfileTab";
import MenuBar from "@/app/components/MenuBar";
import {useState} from "react";

const Index = () => {
  const messages : langs = {
    en,
    fr,
  };
   
  const language = navigator.language?.split('-')[0];
  const locale = Object.keys(messages).includes(language) ? language : 'en';
  const [activeTab, setActiveTab] = useState<string>("home");

  const renderContent = () => {
      switch (activeTab) {
          case "home":
              return <Text>Home</Text>;
          case "catalog":
              return <Text>Catalog</Text>;
          case "drone":
              return <Text>Drone</Text>;
          case "cart":
              return <Text>Cart</Text>;
          case "profile":
              return <ProfileTab />;
      }
  }
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
            {renderContent()}
            <MenuBar activeTab={activeTab} onTabPress={setActiveTab} ></MenuBar>
        </View>
    </IntlProvider>
);
}

export default Index