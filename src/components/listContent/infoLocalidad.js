import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "@rneui/base";

const InfoLocalidad = ({ l1, l2, p1, p2 }) => {
  return (
    <>
    <View style={{flexDirection: 'row'}}>
      <View style={styles.container}>
        <Text style={styles.text1}>{l1}</Text>
        <Text style={styles.text2}>{p1}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="chevrons-right" size={20} type={'feather'}/>
      </View>
      <View style={styles.container}>
        <Text style={styles.text1}>{l2}</Text>
        <Text style={styles.text2}>{p2}</Text>
      </View>
      </View>
    </>
  );
};

export default InfoLocalidad;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ededed",
    borderRadius: 5,
    paddingVertical: 0,
    width: "50%",
    marginBottom: 10,
    marginTop: -20,
    flex: 1,
    alignItems: "flex-start",
  },
  text1: {
    marginLeft: 5,
    fontSize: 14,
  },
  text2: {
    marginLeft: 5,
    fontSize: 12,
  },
  iconContainer: {
    justifyContent: 'center',
    marginVertical: 20,
    marginTop: -8
  }
});