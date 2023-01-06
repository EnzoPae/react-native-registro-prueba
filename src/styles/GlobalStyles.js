import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const globalStyles = StyleSheet.create({
  //Basics
  scroll: {
    width: "100%",
  },
  //Login-Register screens styles
  loginScreenContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.lightBlue,
  },
  loginScreenBlueContainer: {
    position: "absolute",
    alignItems: "center", 
    height: "50%",
    width: "100%",
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    elevation: 8,
    backgroundColor: Colors.primary,
  },
  loginScreenWhiteContainer: {
    justifyContent: "center",
    width: "80%",
    height: 490,
    marginTop: 130,
    borderRadius: 60,
    borderTopLeftRadius: 0,
    elevation: 8,
    backgroundColor: Colors.white,
  },
  loginScreenWhiteContainerShort: {
    justifyContent: "center",
    width: "80%",
    height: 400,
    marginTop: 170,
    borderRadius: 60,
    borderTopLeftRadius: 0,
    elevation: 8,
    backgroundColor: Colors.white,
  },
  loginTitleStyle: {
    fontSize: 40,
    width: '80%',
    marginTop: 40,
    color: Colors.white,
    fontFamily: 'nunito',
  },
  loginSubTitleStyle: {
    fontSize: 14,
    marginLeft: 2,
    width: '80%',
    color: Colors.pseudoWhite,
    fontFamily: 'nunito'
  },
  loginInputContainerStyle: {
    height: 60
  },
  loginInputStyle: {
    fontSize: 14,
    marginBottom: -7,
    fontFamily: 'nunito'
  },
  loginInputErrorStyle: {
    fontSize: 10,
    fontFamily: 'nunito'
  },
  loginInputIconStyle: {
    marginBottom: -3,
    marginRight: 5,
  },
})