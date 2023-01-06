import React,{useContext} from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

//Formik
import { Formik } from "formik";
import { signInValidationSchema } from "../Schemas/signInFormSchema";

//Components
import { Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";
import MyButton from "../components/MyButton";

//Styles
import { Colors } from "../styles/Colors";
import { globalStyles } from "../styles/GlobalStyles";

//Navigation
import { useNavigation } from "@react-navigation/native";
//Auth
import { AuthContext } from "../contexts/AuthContext";
import * as Keychain from 'react-native-keychain';
import { AxiosContext } from "../contexts/AxiosConfig";
//Start
const Login = () => {
  const authContext = useContext(AuthContext);
  const {publicAxios} = useContext(AxiosContext);
  const nav = useNavigation();
  const initialValues = {
    email: null,
    password: null,
  };
  const onLogin = async (values) => {
    try {
      const response = await publicAxios.post('/api/user/login', {
        userMail:values.email,
        userPassword:values.password,
      });

      const {accessToken} = response.data;
      authContext.setAuthState({
        accessToken,
        authenticated: true,
      });

      await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          accessToken,
        }),
      );
    } catch (error) {
      console.log(error.message)
      Alert.alert('Login Failed', error.response.data.msj);
    }
  };
  return (
    <SafeAreaView style={globalStyles.loginScreenContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={signInValidationSchema}
        onSubmit={(values) => onLogin(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
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
                    name="email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder="Email"
                    leftIcon={<Icon name="email" size={20} />}
                    leftIconContainerStyle={globalStyles.loginInputIconStyle}
                    inputStyle={globalStyles.loginInputStyle}
                    keyboardType="email-address"
                    errorMessage={errors.email && touched.email && errors.email}
                    errorStyle={globalStyles.loginInputErrorStyle}
                  />
                  <Input
                    name="password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    leftIcon={<Icon name="lock" size={20} />}
                    leftIconContainerStyle={globalStyles.loginInputIconStyle}
                    inputStyle={globalStyles.loginInputStyle}
                    errorMessage={
                      errors.password && touched.password && errors.password
                    }
                    errorStyle={globalStyles.loginInputErrorStyle}
                  />
                  <TouchableOpacity
                    onPress={() => nav.navigate("RecoverPassword")}
                    style={{
                      alignItems: "flex-end",
                      marginRight: 10,
                      marginBottom: 8,
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ fontFamily: "nunito" }}>
                      ¿Olvidaste tu contraseña?
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    marginBottom: 20,
                    marginTop: 0,
                  }}
                >
                  <MyButton
                    label={"INGRESAR"}
                    size={"medium"}
                    onPress={handleSubmit}
                    
                  />
                </View>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "nunito",
                      color: Colors.grey,
                    }}
                  >
                    ¿Aun no tienes una cuenta?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => nav.navigate("Registro")}
                    style={{ flexDirection: "row" }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "nunito",
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
          </>
        )}
      </Formik>
      <StatusBar style="light" />
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
