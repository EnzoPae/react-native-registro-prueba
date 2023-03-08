import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "@rneui/base";

const InfoLocalidad = ({ l1, l2, p1, p2 }) => {
  return (
    <View style={styles.megaContainer}>
      <View style={styles.container}>
        <Text style={styles.text1}>{l1}</Text>
        <Text style={styles.text2}>{p1}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="chevrons-down" size={20} type={'feather'}/>
      </View>
      <View style={styles.container}>
        <Text style={styles.text1}>{l2}</Text>
        <Text style={styles.text2}>{p2}</Text>
      </View>
    </View>
  );
};

export default InfoLocalidad;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingVertical: 0,
    width: "100%",
    marginBottom: 0,
    marginTop: 0,
    flex: 1,
    alignItems: "flex-start",
    overflow: 'hidden',
    borderWidth: 0.5,
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
    width: '100%',
    justifyContent: 'center',
  },
  megaContainer: {
    marginVertical: 10
  }
});