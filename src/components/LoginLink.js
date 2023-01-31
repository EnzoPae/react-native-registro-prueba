import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
//Navigation
import { useNavigation } from "@react-navigation/native";
//Styles
import { Colors } from "../styles/Colors";

const TYPES = ["login", "register"];

const LoginLink = ({ type }) => {
  const nav = useNavigation();

  const linkType = TYPES.includes(type) ? type : "login";

  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Text
        style={{
          fontSize: 12,
          color: Colors.grey,
        }}
      >
        {linkType === "login" ? "¿Aún no tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
      </Text>
      <TouchableOpacity
        onPress={() => nav.navigate(linkType === "login" ? "Registro" : "Login")}
        style={{ flexDirection: "row" }}
      >
        <Text
          style={{
            fontSize: 12,
            color: Colors.primary,
          }}
        >
          {linkType === "login" ? "Registrate" : "Ingresa"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginLink;
