import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Avatar } from "@rneui/themed";
import { Colors } from "../styles/Colors";

const Principal = () => {
  return (
    <View style={styles.container}>
      <Text>Principal</Text>
      <View style={styles.addBtn}>
        <TouchableOpacity >
          <Avatar
            size={"large"}
            rounded={true}
            icon={{ name: "plus", type: "font-awesome" }}
            containerStyle={{ backgroundColor: Colors.primary, elevation: 10 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Principal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grey,
  },
  addBtn: {
    position: "absolute",
    bottom: 30,
    right: 30,
    zIndex: 999
  },
});
