import React from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
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
  }
  const handleEnviar = async(values)=>{
    const response = await createUser(values)
    console.log(response.status)
  }
  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpValidationSchema}
        onSubmit={values=>handleEnviar(values)}
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
            <Text style={styles.titleText}>Registro</Text>
            <Text style={styles.subTitleText}>
              Por favor ingresa los datos para poder resgistrarte
            </Text>
            <Input
              name="name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder="Nombre" style={styles.roboto} />
            {(errors.name && touched.name) &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
            }
            <Input
              name="email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Email" style={styles.roboto} />
            {(errors.email && touched.email) &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
            }
            <Input
              name="password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Contraseña" secureTextEntry={true} style={styles.roboto} />
            {(errors.password && touched.password) &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
            }
            <Input
              name="confirmPassword"
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              placeholder="Confirmar contraseña" secureTextEntry={true} style={styles.roboto} 
              errorMessage={
                (errors.confirmPassword && touched.confirmPassword) && errors.confirmPassword}/>
                {/*EJEMPLO DE COMO PASAR ERRORES */}
            <View style={{ alignItems: 'center', paddingTop: 20, paddingBottom: 20 }}>
              <MyButton
                onPress={handleSubmit}
                disabled={!isValid}
                label={'REGISTRARSE'}
                size={'large'} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <LinkButtom label={"¿Ya tienes una cuenta? "} type={"secondary"} />
              <LinkButtom
                onPress={() => alert("Go to the Login")}
                label={"Ingresa"}
              />
            </View>
          </>)}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: '25%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  titleText: {
    fontSize: 50,
    paddingBottom: 10,
    paddingLeft: 9,
    fontFamily: "roboto",
    color: Colors.primary,
  },
  subTitleText: {
    fontSize: 20,
    paddingBottom: 40,
    paddingLeft: 10,
    fontFamily: "roboto",
    color: Colors.secondary,
  },
  roboto: {
    fontFamily: 'roboto'
  }

});

export default Registro;
