import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Registro from "./screens/registro";
import RecuperarPass from "./screens/recuperarPass";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Registro"
          component={Registro}
          options={{ title: "Registro??" }}
        />
        <Stack.Screen name="Recuperar Password" component={RecuperarPass} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack