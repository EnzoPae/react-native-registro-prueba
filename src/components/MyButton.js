import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Colors } from "../styles/Colors";

const TYPES = ["normal", "trip-list"];

export default function MyButton({ children, onPress, label, type }) {
  const btnType = TYPES.includes(type) ? type : "normal";

  const btnStyles = {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: btnType === 'trip-list' ? 10 : 30,
    paddingVertical: btnType === 'trip-list' ? 7 : 15,
    borderRadius: btnType === 'trip-list' ? 20 : 5,
    marginVertical: 5,
    marginRight: btnType === 'trip-list' ? 10 : 5,
    backgroundColor: Colors.primary,

  };

  const btnTextStyles = {
    color: "#fff",
    fontSize: btnType === 'trip-list' ? 12 : 14,
    fontWeight: "bold",
  };

  return (
    <TouchableOpacity style={btnStyles} onPress={onPress}>
      <Text style={btnTextStyles}>{label}</Text>
    </TouchableOpacity>
  );
}
