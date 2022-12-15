import React from "react";
import { View, Text, TextInput, SafeAreaView, StyleSheet } from "react-native";
import { Input, Button } from "@rneui/themed";

const Registro = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Input placeholder="User" />
      <Input placeholder="Password" secureTextEntry={true} />
      <Input placeholder="Confirm Password" secureTextEntry={true} />
      <Button
        title="Registrarse"
        buttonStyle={{
          backgroundColor: "rgba(78, 116, 289, 1)",
          borderRadius: 7,
        }}
        containerStyle={{
          width: 250,
        }}
      />
      <Button
        onPress={() => navigation.navigate("Recuperar Password")}
        containerStyle={{
          width: 250,
        }}
        title="Olvidaste tu Contraseña"
        type="clear"
        titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
  },
});

export default Registro;
