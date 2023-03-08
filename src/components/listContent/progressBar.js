import React from "react";
import { View, Text } from "react-native";
import * as Progress from 'react-native-progress';

const ProgresBar = ({total, current}) => {
    const pro = current / total;
  return (
    <View style={{ width: "100%", marginBottom: 10 }}>
      <Text style={{fontWeight:'bold'}}>Camiones: {current}/{total}</Text>
      <Progress.Bar progress={pro} width={null} height={10} />
    </View>
  );
};

export default ProgresBar;