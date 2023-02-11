import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
//Formik & Yup
import { Formik } from "formik";
import { recoverPassValidationSchema } from "../Schemas/recoverPassSchema";
//Styles
import { login } from "../styles/GlobalStyles";
import { Colors } from "../styles/Colors";
//Components
import { Input, Icon } from "@rneui/themed";
import MyButton from "../components/MyButton";

const RecoverPassword = () => {
  const initialValues = {
    email: null,
  };
  return (
    <SafeAreaView style={login.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={recoverPassValidationSchema}
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
              style={{ width: "100%" }}
              contentContainerStyle={{ alignItems: "center" }}
            >
              <View style={login.marginBox}>
                <View style={login.titleBox}>
                  <Text style={login.title}>Recuperar Contraseña</Text>
                  <Text style={login.subTitle}>Ingrese su email</Text>
                </View>
                <Input
                  name="email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  inputContainerStyle={login.inputContainerStyle}
                  placeholder="Email"
                  placeholderTextColor={Colors.grey}
                  leftIcon={<Icon name="email" size={20} />}
                  leftIconContainerStyle={login.leftIconContainerStyle}
                  inputStyle={login.inputStyle}
                  keyboardType="email-address"
                  errorMessage={errors.email && touched.email && errors.email}
                  errorStyle={login.errorStyle}
                />
                <MyButton label={"ENVIAR"} onPress={handleSubmit} />
              </View>
            </ScrollView>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default RecoverPassword;
