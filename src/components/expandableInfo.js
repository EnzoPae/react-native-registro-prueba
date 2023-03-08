import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const ExpandableInfo = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandInfo = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <TouchableOpacity onPress={handleExpandInfo} style={styles.btn}>
        <Text style={styles.text}>{expanded ? "Menos Info" : "Mas Info"}</Text>
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
    backgroundColor: "#474747",
    paddingHorizontal: 3,
    borderRadius: 15
  },
  text: {
    color: '#fff',
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold',
  }
});