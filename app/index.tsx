import { IntlProvider, useIntl } from 'react-intl';
import {Platform, Text, View, StyleSheet} from "react-native";
import { langs } from "./interfaces/lang.js";
import { en } from "./lang/en";
import { fr } from "./lang/fr";
import ProfileTab from "@/app/components/ProfileTab";
import MenuBar from "@/app/components/MenuBar";
import {useState} from "react";
import CartTab from "@/app/components/CartTab";
import CatalogTab from "@/app/components/CatalogTab";

const Index = () => {
  const messages : langs = {
    en,
    fr,
  };
   
  const language = navigator.language?.split('-')[0];
  const locale = Object.keys(messages).includes(language) ? language : 'fr';
  const [activeTab, setActiveTab] = useState<string>("home");

  const renderContent = () => {
      switch (activeTab) {
          case "home":
              return <Text>Home</Text>;
          case "catalog":
              return <CatalogTab/>;
          case "drone":
              return <Text>Drone</Text>;
          case "cart":
              return <CartTab />;
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
                    backgroundColor: "#F9F9F9",
                }}
            >
                {renderContent()}
                <MenuBar activeTab={activeTab} onTabPress={setActiveTab} ></MenuBar>
            </View>
        </IntlProvider>
);
}

export default Index