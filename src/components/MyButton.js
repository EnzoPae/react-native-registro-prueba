import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Colors } from "../styles/Colors";

const SIZES = ["small", "medium", "large"];
const TYPES = ["primary", "secondary"];
const ROUNDED = ["small", "medium", "large"];

export default function MyButton({
  children,
  onPress,
  type,
  size,
  label,
  rounded,
}) {

  
  const btnSize = SIZES.includes(size) ? size : "small";
  const btnType = TYPES.includes(type) ? type : "primary";
  const btnRound = ROUNDED.includes(rounded) ? rounded : "small";

  const btnStyles = {
    height: 60,
    width: btnSize === "large" ? "70%" : btnSize === "medium" ? 210 : "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: btnRound === "small" ? 5 : btnRound === "medium" ? 10 : 20,
    marginVertical: 5,
    backgroundColor:
      btnType === "primary"
        ? Colors.primary
        : btnType === "secondary"
        ? Colors.secondary
        : btnType === "",
  };

  return (
    <TouchableOpacity 
    style={btnStyles}
    onPress={onPress}
    >
      <Text style={{ color: "#fff", fontSize: 17, fontWeight: 'bold'}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}


{/* Ejemplo de como usar componente

export default function App() {
  return (
    <View style={styles.container}>
      <MyButton label={'Messi'} onPress={() => alert('Messi')}/>
      <MyButton label={'Messi Messi'} size={'medium'} rounded={'medium'}/>
      <MyButton label={'Fultbol Futbol Futbol'} size={'large'} rounded={'large'} type={'secondary'}/>
      <StatusBar style="auto" />
    </View>
  );
}

*/}