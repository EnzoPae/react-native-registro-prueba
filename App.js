import React from "react";
import { SafeAreaView } from "react-native";
import MyNavigation from "./src/navigation/navigation";
import { AuthProvider } from "./src/contexts/AuthContext";
import { AxiosProvider } from "./src/contexts/AxiosContext";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "./src/styles/Colors";
export default function App() {
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <AxiosProvider>
          <>
          <StatusBar style="light" backgroundColor={Colors.secondary}/>
          <MyNavigation />
          </>
        </AxiosProvider>
      </NavigationContainer>
    </AuthProvider>
  )
}