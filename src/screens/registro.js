import React from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
} from "react-native";
import { Input } from "@rneui/themed";
import { Formik } from "formik";
import { signUpValidationSchema } from "../Schemas/signupFormSchema";
import MyButton from "../components/MyButton";
import LinkButtom from "../components/LinkButtom";
import { Colors } from "../components/Colors";
import { createUser } from "../api/userAPI";
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
    <SafeAreaView style={styles.container}>
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
            <StatusBar/>
            <ScrollView
              contentContainerStyle={{ alignItems: "center" }}
              style={styles.scroll}
            >
            <View style={styles.blue}>
              <Text style={styles.titleText}>Registro</Text>
            </View>

              <View style={styles.box}>
                <View style={styles.inputBox}>
                  <Input
                    name="name"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                    placeholder="Nombre"
                    style={styles.roboto}
                  />
                  {errors.name && touched.name && (
                    <Text style={styles.textError}>{errors.name}</Text>
                  )}
                  <Input
                    name="email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder="Email"
                    style={styles.roboto}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.textError}>{errors.email}</Text>
                  )}
                  <Input
                    name="password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    style={styles.roboto}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.textError}>{errors.password}</Text>
                  )}
                  <Input
                    name="confirmPassword"
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    placeholder="Confirmar contraseña"
                    secureTextEntry={true}
                    style={styles.roboto}
                    /*errorMessage={
                      errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword
                    }*/
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={styles.textError}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                  {/*EJEMPLO DE COMO PASAR ERRORES */}
                </View>
                <View
                  style={{
                    alignItems: "center",
                    marginBottom: "10%",
                    marginTop: "3%",
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
                  <LinkButtom
                    label={"¿Ya estas registrado? "}
                    type={"secondary"}
                  />
                  <LinkButtom
                    onPress={() => alert("Go to the Login")}
                    label={"Ingresa"}
                  />
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
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#cccfd6",
    alignItems: "center",
  },
  blue: {
    backgroundColor: "#0353A4",
    height: 130,
    width: "100%",
    borderBottomRightRadius: 100,
    justifyContent: "flex-end",
  },
  box: {
    backgroundColor: "#fff",
    width: "80%",
    height: 480,
    marginTop: 25,
    borderRadius: 60,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    elevation: 8,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 50,
    paddingBottom: 10,
    paddingLeft: 9,
    fontFamily: "roboto",
    color: "#fff",
  },
  roboto: {
    marginBottom: -5,
    fontSize: 16,
  },
  inputBox: {
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 25,
    marginTop: 25,
  },
  scroll: {
    width: "100%",
  },
  textError: {
    fontSize: 10,
    color: "red",
    marginTop: -20,
    marginBottom: 6,
    marginLeft: 12,
  },
});

export default Registro;
