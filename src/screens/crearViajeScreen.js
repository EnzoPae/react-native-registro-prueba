import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

//Components
import { StatusBar } from "expo-status-bar";
import { Input } from "@rneui/themed";
import MyButton from "../components/MyButton";
//Styles
import { globalStyles } from "../styles/GlobalStyles";
import { Colors } from "../styles/Colors";

const CrearViajeScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={globalStyles.scroll}>
        <Input
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          label={"Origen"}
          labelStyle={styles.label}
          placeholder={"Ingrese lugar de origen"}
        />
        <Input
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          label={"Destino"}
          labelStyle={styles.label}
          placeholder={"Ingrese lugar de destino"}
        />
        <Input
          style={{ textAlignVertical: "top" }}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyleComents}
          label={"Comentarios"}
          labelStyle={styles.label}
          multiline={true}
          numberOfLines={7}
        />
        <Input
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputContainerStyle2}
          inputStyle={styles.inputStyleCantidad}
          label={"Cantidad de camiones"}
          labelStyle={styles.label}
          keyboardType={"numeric"}
        />
        <View style={styles.viewCenter}>
          <MyButton label={"CREAR VIAJE"} size={"medium"} />
        </View>
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  );
};

export default CrearViajeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  inputContainer: {
    width: "95%",
    alignSelf: "center",
    marginBottom: -10,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    borderRadius: 7,
    backgroundColor: Colors.white,
  },
  inputContainerStyle2: {
    borderBottomWidth: 0,
    borderRadius: 7,
    backgroundColor: Colors.white,
    width: 80,
  },
  label: {
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: "nunito",
  },
  viewCenter: {
    alignItems: "center",
  },
  inputStyle: {
    fontFamily: "nunito",
    fontSize: 12,
    marginLeft: 10,
  },
  inputStyleComents: {
    fontFamily: "nunito",
    fontSize: 12,
    marginLeft: 10,
    marginTop: 10,
  },
  inputStyleCantidad: {
    fontFamily: "nunito",
    fontSize: 16,
    marginLeft: 32,
  },
});
