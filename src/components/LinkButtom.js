import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Colors } from "./Colors";
import MyFonts from "./Fonts";

const TYPES = ["primary", "secondary"];

export default function MyButton({ children, onPress, label, type }) {
  
  MyFonts();

  const btnType = TYPES.includes(type) ? type : "primary";

  const btnStyles = {

  };

  const textStyle = {
    fontSize: 15,
    fontFamily: "roboto",
    color: btnType === "primary"
    ? Colors.primary
    : Colors.black
 
  };

  return (

    <TouchableOpacity style={btnStyles} onPress={onPress}>
        <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>  
  );
}
