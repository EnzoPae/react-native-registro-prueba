import React from "react";
import { useEffect } from "react";
import MyNavigation from "./src/navigation/navigation";
import { AuthProvider } from "./src/contexts/AuthContext";
import { AxiosProvider } from "./src/contexts/AxiosContext";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <AxiosProvider>
          <MyNavigation />
        </AxiosProvider>
      </NavigationContainer>
    </AuthProvider>
  )
}