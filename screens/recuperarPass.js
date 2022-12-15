import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { Button2 } from "../components/button2";

function RecuperarPass() {
  return (
    <SafeAreaView
      style={styles.container}
    >
      <Button2 />
    </SafeAreaView>
  );
}

export default RecuperarPass;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dcd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
