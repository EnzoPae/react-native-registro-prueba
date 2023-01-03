import React from "react";
import { Colors } from "../styles/Colors";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Registro from "../screens/registro";
import Login from "../screens/login";
import RecoverPassword from "../screens/recoverPassword";
import CrearViajeScreen from "../screens/crearViajeScreen";
import ListaDeCamionesScreen from "../screens/listaDeCamionesScreen";
import ListaDeViajesScreen from "../screens/listaDeViajesScreen";

export default function MyNavigation() {
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();

  const isAuth = true;

  return isAuth ? (
    <>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="ListaDeViajes">
          <Drawer.Screen name="ListaDeViajes" component={ListaDeViajesScreen} />
          <Drawer.Screen name="CrearViaje" component={CrearViajeScreen} options={{headerShown: true, title:'Crear nuevo viaje'}}/>
          <Drawer.Screen name="ListaDeCamiones" component={ListaDeCamionesScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  ) : (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
          <Stack.Screen name='Registro' component={Registro} options={{headerShown: false}}/>
          <Stack.Screen name='RecoverPassword' component={RecoverPassword} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
