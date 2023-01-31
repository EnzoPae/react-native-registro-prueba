import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Avatar } from "@rneui/themed";
import { Colors } from "../styles/Colors";
import { useNavigation } from "@react-navigation/native";

const FloatButton = () => {
  const nav = useNavigation();
  return (
    <View style={{position:'absolute', bottom: 20, right: 20}}>
      <TouchableOpacity onPress={() => nav.navigate("CrearViaje")}>
        <Avatar
          size={"large"}
          rounded={true}
          icon={{ name: "plus", type: "font-awesome" }}
          containerStyle={{ backgroundColor: Colors.primary, elevation: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FloatButton;
