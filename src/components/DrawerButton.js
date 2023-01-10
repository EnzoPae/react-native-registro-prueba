import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../styles/Colors";
import { Icon } from "@rneui/themed";

const DrawerButton = ({ text, onPress, label }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Icon name={label} type="material-community" />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightBlue,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontFamily: "nunito",
    marginLeft: 8
  },

});

export default DrawerButton;
