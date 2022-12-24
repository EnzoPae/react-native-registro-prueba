import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const globalStyles = StyleSheet.create({
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
    height: 480,
    marginTop: 150,
    borderRadius: 60,
    borderTopLeftRadius: 0,
    elevation: 8,
    backgroundColor: Colors.white,
  },
  loginScreenWhiteContainerShort: {
    justifyContent: "center",
    width: "80%",
    height: 400,
    marginTop: 150,
    borderRadius: 60,
    borderTopLeftRadius: 0,
    elevation: 8,
    backgroundColor: Colors.white,
  },
  loginTitleStyle: {
    fontSize: 40,
    fontWeight: 'bold',
    width: '80%',
    marginTop: 40,
    color: Colors.white,
  },
  loginSubTitleStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    width: '80%',
    marginBottom: 5,
    color: Colors.pseudoWhite
  },
  loginInputStyle: {
    fontSize: 16,
    marginBottom: -7,
  },
  loginInputTextErrorStyle: {
    fontSize: 8,
    marginTop: -22,
    marginBottom: 11,
    marginLeft: 12,
    color: "red",
  },
  loginInputIconStyle: {
    marginBottom: -3,
    marginRight: 5,
  }
})