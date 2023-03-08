import React from "react";
import { View, Text, StyleSheet } from "react-native";

const InfoTable = ({header1, header2, text1, text2}) => {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.header}>{header1}</Text>
        <Text style={styles.text}>{text1}</Text>
      </View>
      <View style={styles.column2}>
        <Text style={styles.header}>{header2}</Text>
        <Text style={styles.text}>{text2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10
  },
  column: {
    flex: 1,
  },
  column2: {
    flex: 1,
    borderStartWidth: 0.5,
  },
  header: {
    borderBottomWidth: 0.5,
    textAlign: "center",
    backgroundColor: '#474747',
    borderRadius: 3,
    color: '#fff'
  },
  text: {
    textAlign: "center",
  },
});

export default InfoTable;