import React from "react";
import { TouchableOpacity, Text } from "react-native";
//Navigation
import { useNavigation } from "@react-navigation/native";

const RecoverPassLink = () => {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => nav.navigate("RecoverPassword")}
      style={{
        width: "90%",
        alignItems: "flex-end",
        marginRight: 10,
        marginBottom: 30,
        marginTop: -5,
      }}
    >
      <Text style={{ fontSize: 12, fontWeight: "bold" }}>
        ¿Olvidaste tu contraseña?
      </Text>
    </TouchableOpacity>
  );
};

export default RecoverPassLink;
