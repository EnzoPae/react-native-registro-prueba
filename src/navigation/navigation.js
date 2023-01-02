import React from "react";
import { Colors } from "../styles/Colors";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Registro from "../screens/registro";
import Login from "../screens/login";
import CreateTrip from "../screens/createTrip";
import RecoverPassword from "../screens/recoverPassword";
import TrucksList from "../screens/trucksList";
import TripList from "../screens/tripList";

export default function MyNavigation() {
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();

  const isAuth = true;

  return isAuth ? (
    <>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Principal">
          <Drawer.Screen name="TripList" component={TripList} />
          <Drawer.Screen name="CreateTrip" component={CreateTrip} options={{headerShown: true, title:'Crear nuevo viaje'}}/>
          <Drawer.Screen name="TrucksList" component={TrucksList} />
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

{
  /*<Drawer.Navigator initialRouteName="Login">
          <Drawer.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Drawer.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
          <Drawer.Screen name="RecoverPassword" component={RecoverPassword} options={{ headerShown: false }} />
        </Drawer.Navigator>*/
}
