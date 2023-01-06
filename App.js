import React from "react";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import MyNavigation from "./src/navigation/navigation";
import { AuthProvider } from "./src/contexts/AuthContext";
import { AxiosProvider } from "./src/contexts/AxiosConfig";

export default function App() {
  const [fontsLoaded] = useFonts({
    nunito: require("./assets/fonts/Nunito-Regular.ttf"),
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
    <AuthProvider>
      <AxiosProvider>
        <MyNavigation />
      </AxiosProvider>
    </AuthProvider>
  )
}
