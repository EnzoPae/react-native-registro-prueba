import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Colors } from "../styles/Colors";


export default function MyButton({
  children,
  onPress,
  label,
}) {

  const btnStyles = {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: Colors.primary,
  };

  return (
    <TouchableOpacity 
    style={btnStyles}
    onPress={onPress}
    >
      <Text style={{ color: "#fff", fontSize: 14, fontWeight: 'bold'}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
