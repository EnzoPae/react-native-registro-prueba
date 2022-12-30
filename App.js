import React from "react";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

//Screens
import Registro from "./src/screens/registro";
import Login from "./src/screens/login";
import Principal from "./src/screens/principal";
import CreateTrip from "./src/screens/createTrip";

export default function App() {
  const [fontsLoaded] = useFonts({
    'nunito': require("./assets/fonts/Nunito-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <Principal/>
  );
}
