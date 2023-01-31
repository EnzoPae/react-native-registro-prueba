import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const login = StyleSheet.create({
  containerStyle: {
    marginBottom: 5,
  },
  inputContainerStyle: {
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#000',
    borderRadius: 3,
  },
  inputStyle: {
    fontSize: 14,
  },
  labelStyle: {
    color: Colors.subBlack ,
    fontSize: 14,
    fontWeight: "normal",
    marginTop: -15,
  },
  errorStyle: {
    marginLeft: 15,
    fontSize: 10,
    marginTop: 0,
  },
  leftIconContainerStyle: {
    marginLeft: 15,
    marginRight: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.white,
  },
  marginBox: {
    width: "95%",
    alignItems: "center",
    marginTop: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.black,
  },
  subTitle: {
    fontSize: 15,
    color: Colors.subBlack,
  },
  titleBox: {
    width: "93%",
    alignItems: "flex-start",
    marginBottom: 25,
  },
});

export const tripListStyles = StyleSheet.create({
  itemStyle: {
    fontSize: 12,
    marginLeft: 5
  }
}) 