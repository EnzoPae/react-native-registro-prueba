import React from "react";
import {useFonts} from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

//Screens
import Registro from "./src/screens/registro";
import Login from "./src/screens/login";

export default function App() {
    
  return (
    <Login/>
  );
}