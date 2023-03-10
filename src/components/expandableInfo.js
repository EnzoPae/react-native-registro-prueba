import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../styles/Colors";

const ExpandableInfo = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandInfo = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <TouchableOpacity onPress={handleExpandInfo} style={styles.btn}>
        <Text style={styles.text}>{expanded ? "Cerrar..." : "Mas Info..."}</Text>
      </TouchableOpacity>
      <View style={{ width: "100%" }}>
        {expanded && <View>{children}</View>}
      </View>
    </>
  );
};

export default ExpandableInfo;

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.secondary,
    borderRadius: 3
  },
  text: {
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 3,
    paddingVertical: 2
  }
});