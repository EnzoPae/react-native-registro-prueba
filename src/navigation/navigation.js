import { useState, useContext, useCallback, useEffect } from "react";
import { Colors } from "../styles/Colors";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import Registro from "../screens/registro";
import Login from "../screens/login";
import RecoverPassword from "../screens/recoverPassword";
import CrearViajeScreen from "../screens/crearViajeScreen";
import ListaDeCamionesScreen from "../screens/listaDeCamionesScreen";
import ListaDeViajesScreen from "../screens/listaDeViajesScreen";
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from "../contexts/AuthContext";
export default function MyNavigation() {
  const authContext = useContext(AuthContext);
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();
  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await SecureStore.getItemAsync('token');
      console.log(value)
      const jwt = JSON.parse(value);
      authContext.setAuthState({
        accessToken: jwt.accessToken || null,
        authenticated: jwt.accessToken !== null,
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      console.log(`SecureStore navigation Error: ${error.message}`);
      authContext.setAuthState({
        accessToken: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);
  if (status === 'loading') {
    return(
      <>
        <Text>CARGANDO</Text>
      </>
    );
  }
  return (authContext?.authState?.authenticated === false) ? (
    <>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='Registro' component={Registro} options={{ headerShown: false }} />
          <Stack.Screen name='RecoverPassword' component={RecoverPassword} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  ) : (
    <>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="ListaDeViajes">
          <Drawer.Screen name="ListaDeViajes" component={ListaDeViajesScreen} />
          <Drawer.Screen
            name="CrearViaje"
            component={CrearViajeScreen}
            options={
              {
                headerShown: true,
                title: 'Crear nuevo viaje',
                headerStyle: { backgroundColor: Colors.primary, height: 100 },
                headerTintColor: Colors.white,
                headerTitleStyle: { fontFamily: 'nunito' }
              }} />
          <Drawer.Screen name="ListaDeCamiones" component={ListaDeCamionesScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}
