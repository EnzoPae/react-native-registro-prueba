import { useState, useContext, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../styles/Colors";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import MenuDrawer from "../components/MenuDrawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Registro from "../screens/registro";
import Login from "../screens/login";
import RecoverPassword from "../screens/recoverPassword";
import CrearViajeScreen from "../screens/crearViajeScreen";
import ListaDeCamionesScreen from "../screens/listaDeCamionesScreen";
import ListadoCamionerosViaje from "../screens/ListadoCamionerosViaje";
import ListaViajesFede from "../screens/ListaViajesFede";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../contexts/AuthContext";
import Logout from "../services/logout";
import Spinner from "../components/Spinner";
import jwt from 'jwt-decode'
import actViajeScreen from "../screens/actViajeScreen";
export default function MyNavigation() {
  const authContext = useContext(AuthContext);
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();
  const [status, setStatus] = useState("loading");
  const [userData, setUserData] = useState({})
  const loadJWT = useCallback(async () => {
    try {
      const token_str = await SecureStore.getItemAsync('token')
      if (token_str) {
        const token = (token_str.slice(16)).slice(0, -2)
        const { userName, userMail } = jwt(token)
        setUserData({
          ...userData, userName, userMail
        })
        authContext.setAuthState({
          accessToken: token,
          authenticated: true,
          userName: userData.userName,
        });
        setStatus("success");
      } else {
        authContext.setAuthState({
          accessToken: null,
          authenticated: false,
        });
        setStatus("success");
      }
    } catch (error) {
      setStatus("error");
      console.log(`SecureStore navigation Error: ${error.message}`);
      authContext.setAuthState({
        accessToken: null,
        authenticated: false,
      });
    }
  }, []);

  const handleLogout = async () => {
    try {
      await authContext.logout()
    } catch (error) {
      console.log(`Error en logoout: ${error}`)
    }
  }

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);
  if (status === "loading") {
    return (
      <>
        <Spinner />
      </>
    );
  }
  return authContext?.authState?.authenticated === false ? (
    <>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registro"
          component={Registro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecoverPassword"
          component={RecoverPassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  ) : (
    <>
      <Drawer.Navigator
        initialRouteName="ListaDeViajes"
        drawerContent={(props) => <MenuDrawer {...props} handleLogout={handleLogout} userData={userData} />}
      >
        <Drawer.Screen name="ListaDeViajes" component={ListaViajesFede}
          options={{
            headerShown: true,
            title: "Listado de Viajes",
            headerStyle: { backgroundColor: Colors.primary, height: 100 },
            headerTintColor: Colors.white,
          }} />
        <Drawer.Screen name="Logout" component={Logout} />
        <Drawer.Screen
          name="CrearViaje"
          component={CrearViajeScreen}
          options={{
            headerShown: true,
            title: "Crear nuevo Viaje",
            headerStyle: { backgroundColor: Colors.primary, height: 100 },
            headerTintColor: Colors.white,
          }}
        />
        <Drawer.Screen
          name="ListaDeCamiones"
          component={ListaDeCamionesScreen}
          options={{
            headerShown: true,
            title: "Listado de Camiones",
            headerStyle: { backgroundColor: Colors.primary, height: 100 },
            headerTintColor: Colors.white,
          }}
        />
        <Drawer.Screen
          name="ActViaje"
          component={actViajeScreen}
          options={{
            headerShown: true,
            title: "Actualizar viaje",
            headerStyle: { backgroundColor: Colors.primary, height: 100 },
            headerTintColor: Colors.white,
          }}
        />
        <Drawer.Screen
          name="DriversTrip"
          component={ListadoCamionerosViaje}
          options={{
            headerShown: true,
            title: "Choferes por viaje",
            headerStyle: { backgroundColor: Colors.primary, height: 100 },
            headerTintColor: Colors.white,
          }}
        />
      </Drawer.Navigator>
    </>
  );
}