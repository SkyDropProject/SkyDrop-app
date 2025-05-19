import {Text, View} from "react-native";
import * as Font from 'expo-font';
import {useEffect, useState} from "react";

export default function Index() {
    useEffect(() => {
        Font.loadAsync({
            'Inter': require('../assets/fonts/InterVariable.ttf'),
        });
    }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-5xl text-blue-600">Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
