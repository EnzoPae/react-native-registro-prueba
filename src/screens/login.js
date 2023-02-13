import React, { useContext, useState } from "react";
import {
  Text,
  SafeAreaView,
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
import MyButton from "../components/MyButton";
import LoginLink from "../components/LoginLink";
import RecoverPassLink from "../components/RecoverPassLink";

//Styles
import { Colors } from "../styles/Colors";
import { login } from "../styles/GlobalStyles";

//Auth
import { AuthContext } from "../contexts/AuthContext";
import * as SecureStore from "expo-secure-store";
import { AxiosContext } from "../contexts/AxiosContext";
import Spinner from "../components/Spinner";
import ModalAlert from "../components/ModalAlert";
//Start
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msj, setMsj] = useState(null);
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const initialValues = {
    email: null,
    password: null,
  };
  const onLogin = async (values) => {
    setLoading(true);
    try {
      const response = await publicAxios.post("/api/user/admin/login", {
        userMail: values.email,
        userPassword: values.password,
      });
      const { accessToken } = response.data;
      authContext.setAuthState({
        accessToken,
        authenticated: true,
      });
      await SecureStore.setItemAsync(
        "token",
        JSON.stringify({
          accessToken,
        })
      );
    } catch (error) {
      setError(true);
      setMsj(error.response.data.msj);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Spinner />;
  return (
    <SafeAreaView style={login.container}>
      <ModalAlert modalVisible={error} setModalVisible={setError} msj={msj} />
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
                  leftIconContainerStyle={login.leftIconContainerStyle}
                  inputStyle={login.inputStyle}
                  errorMessage={
                    errors.password && touched.password && errors.password
                  }
                  errorStyle={login.errorStyle}
                />
                <RecoverPassLink/>
                <View
                  style={{
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <MyButton label={"INGRESAR"} onPress={handleSubmit} />
                </View>
                <LoginLink type={"login"}/>
              </View>
              <Text />
            </ScrollView>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Login;
