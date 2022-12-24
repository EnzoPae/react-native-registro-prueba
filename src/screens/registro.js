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

//Formik & API
import { Formik } from "formik";
import { createUser } from "../api/userAPI";
import { signUpValidationSchema } from "../Schemas/signupFormSchema";

//Components
import MyButton from "../components/MyButton";

//Styles
import { Colors } from "../styles/Colors";
import { globalStyles } from "../styles/GlobalStyles";

//Start
const Registro = () => {
  const initialValues = {
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  };
  const handleEnviar = async (values) => {
    const response = await createUser(values);
    console.log(response.status);
  };
  return (
    <SafeAreaView style={globalStyles.loginScreenContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpValidationSchema}
        onSubmit={(values) => handleEnviar(values)}
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
            <StatusBar />
            <ScrollView
              contentContainerStyle={{ alignItems: "center" }}
              style={styles.scroll}
            >
              <View style={globalStyles.loginScreenBlueContainer}>
                <Text style={globalStyles.loginTitleStyle}>Registro</Text>
                <Text style={globalStyles.loginSubTitleStyle}>
                  Ingrese los datos para poder registrarse
                </Text>
              </View>
              <View style={globalStyles.loginScreenWhiteContainer}>
                <View style={styles.inputBox}>
                  <Input
                    name="name"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                    placeholder="Nombre y apellido"
                    leftIcon={<Icon name="account" size={20} />}
                    leftIconContainerStyle={globalStyles.loginInputIconStyle}
                    inputStyle={globalStyles.loginInputStyle}
                  />
                  {errors.name && touched.name && (
                    <Text style={globalStyles.loginInputTextErrorStyle}>
                      {errors.name}
                    </Text>
                  )}
                  <Input
                    name="email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder="Email"
                    leftIcon={<Icon name="email" size={20} />}
                    leftIconContainerStyle={globalStyles.loginInputIconStyle}
                    inputStyle={globalStyles.loginInputStyle}
                  />
                  {errors.email && touched.email && (
                    <Text style={globalStyles.loginInputTextErrorStyle}>
                      {errors.email}
                    </Text>
                  )}
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
                  />
                  {errors.password && touched.password && (
                    <Text style={globalStyles.loginInputTextErrorStyle}>
                      {errors.password}
                    </Text>
                  )}
                  <Input
                    name="confirmPassword"
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    placeholder="Confirmar contraseña"
                    secureTextEntry={true}
                    leftIcon={<Icon name="lock-check" size={20} />}
                    leftIconContainerStyle={globalStyles.loginInputIconStyle}
                    inputStyle={globalStyles.loginInputStyle}
                    /*errorMessage={
                      errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword
                    }*/
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={globalStyles.loginInputTextErrorStyle}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                  {/*EJEMPLO DE COMO PASAR ERRORES */}
                </View>
                <View
                  style={{
                    alignItems: "center",
                    marginBottom: 20,
                    marginTop: 0,
                  }}
                >
                  <MyButton
                    onPress={handleSubmit}
                    disabled={!isValid}
                    label={"REGISTRARSE"}
                    size={"large"}
                  />
                </View>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      color: Colors.grey,
                    }}
                  >
                    ¿Ya estas registrado?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => alert("Go to the Login")}
                    style={{ flexDirection: "row" }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: Colors.primary,
                      }}
                    >
                      Ingresa
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,
  },
  scroll: {
    width: "100%",
  },
});

export default Registro;
