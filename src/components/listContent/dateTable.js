import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../styles/Colors";

const DateTable = ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.header}></Text>
        <Text style={{borderBottomWidth: 0.5,}}>Carga</Text>
        <Text>Descarga</Text>
      </View>
      <View style={styles.column2}>
        <Text style={styles.header}>Fecha</Text>
        <Text style={{borderBottomWidth: 0.5,}}></Text>
        <Text style={styles.text}></Text>
      </View>
      <View style={styles.column2}>
        <Text style={styles.header}>Hora</Text>
        <Text style={{borderBottomWidth: 0.5,}}></Text>
        <Text style={styles.text}></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    //justifyContent: "space-between",
    marginVertical: 10
  },
  column: {
    flex: 1,
    width: 10,
  },
  column2: {
    flex: 1,
    borderStartWidth: 0.5,
  },
  header: {
    borderBottomWidth: 0.5,
    textAlign: "center",
    backgroundColor: "#474747",
    borderRadius: 3,
    color: '#fff'
  },
});

export default DateTable;