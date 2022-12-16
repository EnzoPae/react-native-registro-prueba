import React from "react";
import {useFonts} from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

//Screens
import Registro from "./src/screens/registro";

export default function App() {
  
  const [fontsLoaded] = useFonts({
    roboto: require('./assets/fonts/RobotoSlab-VariableFont_wght.ttf'),
  }) 
  
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
    <Registro/>
  );
}