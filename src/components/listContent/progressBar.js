import React from "react";
import { View, Text } from "react-native";
import * as Progress from 'react-native-progress';
import { Colors } from "../../styles/Colors";

const ProgresBar = ({total, current}) => {
    const pro = current / total;
  return (
    <View style={{ width: "100%", marginBottom: 10 }}>
      <Text style={{fontWeight:'bold', marginBottom: 5}}>Camiones asignados: {current}/{total}</Text>
      <Progress.Bar progress={pro} width={null} height={10} color={Colors.primary}/>
    </View>
  );
};

export default ProgresBar;