import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import DrawerButton from "./DrawerButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../styles/Colors";

const MenuDrawer = ({ navigation, handleLogout, userData }) => {

  //CONFIRMAR LOG OUT
  const confirmClick = () => {
    Alert.alert(
      "¿Seguro quiere cerrar sesión?",
      "",
      [
        {
          text: "Cancel",
        },
        {
          text: "Confirm",
          onPress: () => handleLogout(),
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 15,
          overflow: "hidden",
        }}
      >
        <Icon name="account-circle" size={80} />
        <View style={{ marginLeft: 5 }}>
          <Text style={styles.nameText}>{userData.userName}</Text>
          <View style={styles.separator} />
          <Text style={styles.subText}>Administrador</Text>
        </View>
      </View>
      <DrawerButton
        text={"Lista de viajes"}
        onPress={() => navigation.navigate("ListaDeViajes")}
        label={"map-marker"}
      />
      <DrawerButton
        text={"Lista de camiones"}
        onPress={() => navigation.navigate("ListaDeCamiones")}
        label={"truck"}
      />
      <DrawerButton
        text={"Crear nuevo viaje"}
        onPress={() => navigation.navigate("CrearViaje")}
        label={"plus-circle"}
      />
      <View style={styles.cerrarSesion}>
        <TouchableOpacity onPress={confirmClick}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text><Icon name="cog" size={14} /> Cerrar sesión</Text>
          </View>
          <View style={styles.separator} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuDrawer;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      marginTop: 30,
      overflow: 'hidden'
    },
    subText: {
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