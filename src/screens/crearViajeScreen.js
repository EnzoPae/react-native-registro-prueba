import React, { useState, useContext } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

//Components
import { StatusBar } from "expo-status-bar";
import { Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MyButton from "../components/MyButton";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
//Styles
import { Colors } from "../styles/Colors";
import { login } from "../styles/GlobalStyles";
//Formik & Yup
import { crearViajeValidationSchema } from "../Schemas/crearViajeValidationSchema";
import { Formik } from "formik";
//API
import { AxiosContext } from "../contexts/AxiosContext";
const CrearViajeScreen = () => {
  const { authAxios } = useContext(AxiosContext);
  const initialValues = {
    origen: null,
    destino: null,
    distancia: null,
    cantidad: null,
  };

  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const handleCreateTrip = async (values) => {
    const merged = { ...values, date };
    try {
      const api_response = await authAxios.post("/api/trips", merged);
      //TODO ver el codigo de respuesta
    } catch (error) {
      console.log(`Error creando viaje: ${error}`);
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <Formik
        initialValues={initialValues}
        validationSchema={crearViajeValidationSchema}
        onSubmit={(values) => handleCreateTrip(values)}
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
            <ScrollView style={{ width: "100%" }}>
              <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                <Input
                  name="origen"
                  onChangeText={handleChange("origen")}
                  onBlur={handleBlur("origen")}
                  value={values.origen}
                  containerStyle={[login.containerStyle, {marginBottom: 10}]}
                  inputContainerStyle={login.inputContainerStyle}
                  inputStyle={login.inputStyle}
                  label={"Origen"}
                  labelStyle={login.labelStyle}
                  placeholder={"Ingrese ubicacion de origen"}
                  placeholderTextColor={Colors.grey}
                  leftIcon={<Icon name="chevron-double-right" size={25} />}
                  leftIconContainerStyle={login.leftIconContainerStyle}
                  errorMessage={
                    errors.origen && touched.origen && errors.origen
                  }
                  errorStyle={login.errorStyle}
                />
                <Input
                  name="destino"
                  onChangeText={handleChange("destino")}
                  onBlur={handleBlur("destino")}
                  value={values.destino}
                  containerStyle={[login.containerStyle, {marginBottom: 10}]}
                  inputContainerStyle={login.inputContainerStyle}
                  inputStyle={login.inputStyle}
                  label={"Destino"}
                  labelStyle={login.labelStyle}
                  placeholder={"Ingrese ubicacion de destino"}
                  placeholderTextColor={Colors.grey}
                  leftIcon={<Icon name="chevron-triple-right" size={25} />}
                  leftIconContainerStyle={login.leftIconContainerStyle}
                  errorMessage={
                    errors.destino && touched.destino && errors.destino
                  }
                  errorStyle={login.errorStyle}
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Input
                  name="distancia"
                  onChangeText={handleChange("distancia")}
                  onBlur={handleBlur("distancia")}
                  value={values.distancia}
                  containerStyle={[login.containerStyle, {width:'50%'}]}
                  inputContainerStyle={login.inputContainerStyle}
                  inputStyle={login.inputStyle}
                  label={"Distancia"}
                  labelStyle={login.labelStyle}
                  leftIcon={<Icon name="map-marker-right" size={25} />}
                  leftIconContainerStyle={login.leftIconContainerStyle}
                  errorMessage={
                    errors.distancia && touched.distancia && errors.distancia
                  }
                  errorStyle={login.errorStyle}
                />
                <Input
                  name="cantidad"
                  onChangeText={handleChange("cantidad")}
                  onBlur={handleBlur("cantidad")}
                  value={values.cantidad}
                  containerStyle={[login.containerStyle, {width:'50%'}]}
                  inputContainerStyle={login.inputContainerStyle}
                  inputStyle={login.inputStyle}
                  label={"Cantidad de camiones"}
                  labelStyle={login.labelStyle}
                  keyboardType={"numeric"}
                  leftIcon={<Icon name="truck-check" size={25} />}
                  leftIconContainerStyle={login.leftIconContainerStyle}
                  errorMessage={
                    errors.cantidad && touched.cantidad && errors.cantidad
                  }
                  errorStyle={login.errorStyle}
                />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: 'baseline',
                    marginBottom: 30,
                  }}
                >
                  <TouchableOpacity
                    style={styles.dateButtom}
                    onPress={showDatepicker}
                    title="Show date picker!"
                  >
                    <Text>Fecha</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dateButtom}
                    onPress={showTimepicker}
                    title="Show time picker!"
                  >
                    <Text>Hora</Text>
                  </TouchableOpacity>
                  <Text>{date.toLocaleString()}</Text>
                </View>
                <Input
                  style={{ textAlignVertical: "top" }}
                  containerStyle={login.containerStyle}
                  inputContainerStyle={login.inputContainerStyle}
                  inputStyle={[login.inputStyle, {marginTop: 5, marginLeft: 10}]}
                  label={"Comentarios"}
                  labelStyle={login.labelStyle}
                  multiline={true}
                  numberOfLines={5}
                  textAlignVertical={"top"}
                />
              </View>
                <View style={{alignItems: 'center'}}>
                  <MyButton
                    label={"CREAR VIAJE"}
                    onPress={handleSubmit}
                  />
                </View>
            </ScrollView>
          </>
        )}
      </Formik>
      <StatusBar style="light" backgroundColor={Colors.primary} />
    </SafeAreaView>
  );
};

export default CrearViajeScreen;

const styles = StyleSheet.create({
  dateButtom: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    elevation: 3,
  },
});
