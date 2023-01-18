import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

//Components
import { Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";
import MyButton from "../components/MyButton";
import ModalAlert from "../components/ModalAlert";
import Spinner from "../components/Spinner";
//Formik & API
import { createUser } from "../api/userAPI";
import { Formik } from "formik";
import { signUpValidationSchema } from "../Schemas/signupFormSchema";

//Styles
import { Colors } from "../styles/Colors";
import { globalStyles } from "../styles/GlobalStyles";
import { login } from "../styles/GlobalStyles";

//Navigation
import { useNavigation } from "@react-navigation/native";

//Start
const Registro = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [msj, setMsj] = useState(null)
  const [modalType, setModalType] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const initialValues = {
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  };

  const nav = useNavigation();

  const handleEnviar = async (values) => {
    setLoading(true)
    try {
      const response = await createUser(values);
      if(response.status === 200){
        setModalVisible(true)
        setModalType('ok')
        setMsj("Registro exitoso")
      }
    } catch (error) {
      setModalVisible(true)
      setModalType('error')
      setMsj(error.response.data.msj)
    }finally{
      setLoading(false)
    }
  };
  if(loading) return <Spinner/>
  return (
    <SafeAreaView style={login.container}>
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
            <ScrollView
              contentContainerStyle={{ alignItems: "center" }}
              style={{ width: "100%" }}
            >
              <View style={login.marginBox}>
                <View style={login.titleBox}>
                  <Text style={login.title}>Bienvenido</Text>
                  <Text style={login.subTitle}>
                    Ingresa tus datos para acceder
                  </Text>
                </View>
                <Input
                  name="name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  inputContainerStyle={login.inputContainerStyle}
                  placeholder="Nombre y apellido"
                  placeholderTextColor={Colors.grey}
                  leftIcon={<Icon name="account" size={20} />}
                  containerStyle={login.containerStyle}
                  leftIconContainerStyle={login.leftIconContainerStyle}
                  inputStyle={login.inputStyle}
                  errorMessage={errors.name && touched.name && errors.name}
                  errorStyle={login.errorStyle}
                />
                <Input
                  name="phoneNumber"
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                  inputContainerStyle={login.inputContainerStyle}
                  placeholder="3364######"
                  placeholderTextColor={Colors.grey}
                  leftIcon={<Icon name="phone" size={20} />}
                  containerStyle={login.containerStyle}
                  leftIconContainerStyle={login.leftIconContainerStyle}
                  inputStyle={login.inputStyle}
                  keyboardType="numeric"
                  errorMessage={
                    errors.phoneNumber &&
                    touched.phoneNumber &&
                    errors.phoneNumber
                  }
                  errorStyle={login.errorStyle}
                />
                <Input
                  name="email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  inputContainerStyle={login.inputContainerStyle}
                  placeholder="Ejemplo@gmail.com"
                  placeholderTextColor={Colors.grey}
                  leftIcon={<Icon name="email" size={20} />}
                  containerStyle={login.containerStyle}
                  leftIconContainerStyle={login.leftIconContainerStyle}
                  inputStyle={login.inputStyle}
                  keyboardType="email-address"
                  errorMessage={errors.email && touched.email && errors.email}
                  errorStyle={login.errorStyle}
                />
                <Input
                  name="password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  inputContainerStyle={login.inputContainerStyle}
                  placeholder="Contraseña"
                  placeholderTextColor={Colors.grey}
                  secureTextEntry={true}
                  leftIcon={<Icon name="lock" size={20} />}
                  containerStyle={login.containerStyle}
                  leftIconContainerStyle={login.leftIconContainerStyle}
                  inputStyle={login.inputStyle}
                  errorMessage={
                    errors.password && touched.password && errors.password
                  }
                  errorStyle={login.errorStyle}
                />
                <Input
                  name="confirmPassword"
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  inputContainerStyle={login.inputContainerStyle}
                  placeholder="Confirmar contraseña"
                  placeholderTextColor={Colors.grey}
                  secureTextEntry={true}
                  leftIcon={<Icon name="lock-check" size={20} />}
                  containerStyle={login.containerStyle}
                  leftIconContainerStyle={login.leftIconContainerStyle}
                  inputStyle={login.inputStyle}
                  errorMessage={
                    errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword
                  }
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <MyButton
                  onPress={handleSubmit}
                  disabled={!isValid}
                  label={"REGISTRARSE"}
                />
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 30 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: Colors.grey,
                  }}
                >
                  ¿Ya estas registrado?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => nav.navigate("Login")}
                  style={{ flexDirection: "row" }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: Colors.primary,
                    }}
                  >
                    Ingresa
                  </Text>
                  <Icon
                    name="chevron-right-circle"
                    size={17.5}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </>
        )}
      </Formik>
      <StatusBar style="light" backgroundColor={Colors.primary} />
      <ModalAlert
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        type={modalType}
        msj={msj} />
    </SafeAreaView>
  );
};

export default Registro;