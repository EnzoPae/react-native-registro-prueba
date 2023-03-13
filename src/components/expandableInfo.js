import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import MyButton from "./MyButton";
import { Colors } from "../styles/Colors";

const TYPES = ["info", "myBtn"];

const ExpandableInfo = ({ children, type }) => {
  const [expanded, setExpanded] = useState(false);
  const btnType = TYPES.includes(type) ? type : "info";

  const handleExpandInfo = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {btnType === "info" ? (
        <TouchableOpacity onPress={handleExpandInfo} style={styles.btn}>
          <Text style={styles.text}>
            {expanded ? "Menos info..." : "Mas Info..."}
          </Text>
        </TouchableOpacity>
      ) : (
        <MyButton
          onPress={handleExpandInfo}
          type={"trip-list"}
          color={'black'}
          label={expanded ? "Ocultar Camiones" : "Mostrar Camiones"}
        />
      )}
      <View style={{ width: "100%" }}>
        {expanded && <View>{children}</View>}
      </View>
    </>
  );
};

export default ExpandableInfo;

const styles = StyleSheet.create({
  btn: {
    alignSelf: "flex-end",
    backgroundColor: Colors.secondary,
    paddingHorizontal: 3,
    borderRadius: 15,
  },
  text: {
    color: "#fff",
    fontSize: 12,
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
});
