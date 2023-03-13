import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Colors } from "../styles/Colors";

const TYPES = ["normal", "trip-list"];
const COLOR = ["blue", "black", "red"];

export default function MyButton({ onPress, label, type, color }) {
  const btnType = TYPES.includes(type) ? type : "normal";
  const btnColor = COLOR.includes(color) ? color : "blue";

  const btnStyles = {
    width: btnType === 'trip-list' ? '100%' : null,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: btnType === "trip-list" ? 10 : 30,
    paddingVertical: btnType === "trip-list" ? 7 : 15,
    borderRadius: 3,
    marginVertical: 5,
    marginRight: btnType === "trip-list" ? 0 : 5,
    backgroundColor:
      btnColor === "black"
        ? Colors.secondary
        : btnColor === "red"
        ? Colors.redState
        : Colors.primary,
  };

  const btnTextStyles = {
    color: "#fff",
    fontSize: btnType === "trip-list" ? 12 : 14,
    fontWeight: "bold",
  };

  return (
    <TouchableOpacity style={btnStyles} onPress={onPress}>
      <Text style={btnTextStyles}>{label}</Text>
    </TouchableOpacity>
  );
}
