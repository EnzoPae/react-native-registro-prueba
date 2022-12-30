import React from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";

//External libraries
import { Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//Components
import MyButton from "../components/MyButton";

//Styles
import { Colors } from "../styles/Colors";
import { globalStyles } from "../styles/GlobalStyles";

//Start

const Login = () => {
  return (
    <SafeAreaView style={globalStyles.loginScreenContainer}>
      <StatusBar />
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={globalStyles.scroll}
      >
        <View style={globalStyles.loginScreenBlueContainer}>
          <Text style={globalStyles.loginTitleStyle}>Bienvenido</Text>
          <Text style={globalStyles.loginSubTitleStyle}>
            Ingrese los datos de su cuenta para acceder
          </Text>
        </View>
        <View style={globalStyles.loginScreenWhiteContainerShort}>
          <View style={styles.inputBox}>
            <Input
              placeholder="Email"
              leftIcon={<Icon name="email" size={20} />}
              leftIconContainerStyle={globalStyles.loginInputIconStyle}
              inputStyle={globalStyles.loginInputStyle}
            />
            <Input
              placeholder="Contraseña"
              secureTextEntry={true}
              leftIcon={<Icon name="lock" size={20} />}
              leftIconContainerStyle={globalStyles.loginInputIconStyle}
              inputStyle={globalStyles.loginInputStyle}
            />
            <TouchableOpacity
              onPress={() => alert("Go to recover password")}
              style={{
                alignItems: "flex-end",
                marginRight: 10,
                marginBottom: 20,
              }}
            >
              <Text style={{fontFamily: 'nunito'}}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "center",
              marginBottom: 20,
              marginTop: 0,
            }}
          >
            <MyButton label={"INGRESAR"} size={"medium"} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'nunito',
                color: Colors.grey,
              }}
            >
              ¿Aun no tienes una cuenta?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => alert("Go to Register")}
              style={{ flexDirection: "row" }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'nunito',
                  color: Colors.primary,
                }}
              >
                Regístrate
              </Text>
              <Icon
                name="chevron-right-circle"
                size={18}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,
  },
});

export default Login;
