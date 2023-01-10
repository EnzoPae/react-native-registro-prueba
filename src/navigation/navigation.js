import { useState, useContext, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../styles/Colors";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Registro from "../screens/registro";
import Login from "../screens/login";
import RecoverPassword from "../screens/recoverPassword";
import CrearViajeScreen from "../screens/crearViajeScreen";
import ListaDeCamionesScreen from "../screens/listaDeCamionesScreen";
import ListaDeViajesScreen from "../screens/listaDeViajesScreen";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../contexts/AuthContext";
import DrawerButton from "../components/DrawerButton";
export default function MyNavigation() {
  const authContext = useContext(AuthContext);
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();
  const [status, setStatus] = useState("loading");

  const loadJWT = useCallback(async () => {
    try {
      const value = await SecureStore.getItemAsync("token");
      console.log(value);
      const jwt = JSON.parse(value);
      authContext.setAuthState({
        accessToken: jwt.accessToken || null,
        authenticated: jwt.accessToken !== null,
      });
      setStatus("success");
    } catch (error) {
      setStatus("error");
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
  if (status === "loading") {
    return (
      <>
        <Text>CARGANDO</Text>
      </>
    );
  }
  return authContext?.authState?.authenticated === true ? (
    <>
      <NavigationContainer>
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
      </NavigationContainer>
    </>
  ) : (
    <>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="ListaDeViajes"
          drawerContent={(props) => <MenuDrawer {...props} />}
        >
          <Drawer.Screen name="ListaDeViajes" component={ListaDeViajesScreen} 
          options={{
            headerShown: true,
            title: "Listado de Viajes",
            headerStyle: { backgroundColor: Colors.primary, height: 100 },
            headerTintColor: Colors.white,
            headerTitleStyle: { fontFamily: "nunito" },
          }}/>
          <Drawer.Screen
            name="CrearViaje"
            component={CrearViajeScreen}
            options={{
              headerShown: true,
              title: "Crear nuevo Viaje",
              headerStyle: { backgroundColor: Colors.primary, height: 100 },
              headerTintColor: Colors.white,
              headerTitleStyle: { fontFamily: "nunito" },
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
              headerTitleStyle: { fontFamily: "nunito" },
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}

const MenuDrawer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}
      >
        <Icon name="account-circle" size={80} />
        <View style={{ marginLeft: 5 }}>
          <Text style={styles.nameText}>Lionel Andres Messi</Text>
          <Text style={styles.subText}>Atleta profecional</Text>
          <View style={styles.separator} />
        </View>
      </View>
      <DrawerButton
        text={"Lista de viajes"}
        onPress={() => navigation.navigate("ListaDeViajes")}
        label={'map-marker'}
      />
      <DrawerButton
        text={"Lista de camiones"}
        onPress={() => navigation.navigate("ListaDeCamiones")}
        label={'truck'}
      />
      <DrawerButton
        text={"Crear nuevo viaje"}
        onPress={() => navigation.navigate("CrearViaje")}
        label={'plus-circle'}
      />
      <View style={styles.cerrarSesion}>
        <TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="cog" size={14} />
            <Text style={{ fontFamily: "nunito" }}> Cerrar sesión</Text>
          </View>
          <View style={styles.separator} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 30,
  },
  nameText: {
    fontFamily: "nunito",
  },
  subText: {
    fontFamily: "nunito",
    fontSize: 12,
    color: Colors.pseudoWhite,
  },
  separator: {
    borderBottomColor: Colors.pseudoWhite,
    borderBottomWidth: 1,
    marginTop: 5,
  },
  cerrarSesion: {
    position: "absolute",
    bottom: 15,
    right: 20,
  },
});
