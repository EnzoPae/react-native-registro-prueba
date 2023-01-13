import React, { useState,useContext } from "react";
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
import MyButton from "../components/MyButton";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
//Styles
import { globalStyles } from "../styles/GlobalStyles";
import { Colors } from "../styles/Colors";
//Formik & Yup
import { crearViajeValidationSchema } from "../Schemas/crearViajeValidationSchema";
import { Formik } from "formik";
//API
import { AxiosContext } from "../contexts/AxiosConfig";
const CrearViajeScreen = () => {
  const {authAxios} = useContext(AxiosContext)
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

  const handleCreateTrip = async()=>{
    try {
      const api_response = await authAxios.get('/api/trips')
      //console.log(api_response)
    } catch (error) {
      console.log(`Error creando viaje: ${error}`)
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={crearViajeValidationSchema}
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
            <ScrollView style={globalStyles.scroll}>
              <View style={{ marginTop: 25 }}>
                <Input
                  name="origen"
                  onChangeText={handleChange("origen")}
                  onBlur={handleBlur("origen")}
                  value={values.origen}
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={styles.inputContainerStyle}
                  inputStyle={styles.inputStyle}
                  label={"Origen"}
                  labelStyle={styles.label}
                  placeholder={"Ingrese ubicacion de origen"}
                  errorMessage={
                    errors.origen && touched.origen && errors.origen
                  }
                  errorStyle={globalStyles.formInputErrorStyle}
                />
                <Input
                  name="destino"
                  onChangeText={handleChange("destino")}
                  onBlur={handleBlur("destino")}
                  value={values.destino}
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={styles.inputContainerStyle}
                  inputStyle={styles.inputStyle}
                  label={"Destino"}
                  labelStyle={styles.label}
                  placeholder={"Ingrese ubicacion de destino"}
                  errorMessage={
                    errors.destino && touched.destino && errors.destino
                  }
                  errorStyle={globalStyles.formInputErrorStyle}
                />
                <Input
                  name="distancia"
                  onChangeText={handleChange("distancia")}
                  onBlur={handleBlur("distancia")}
                  value={values.distancia}
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={styles.inputContainerStyle}
                  inputStyle={styles.inputStyle}
                  label={"Distancia"}
                  labelStyle={styles.label}
                  placeholder={"Ingrese la distancia de viaje"}
                  errorMessage={
                    errors.distancia && touched.distancia && errors.distancia
                  }
                  errorStyle={globalStyles.formInputErrorStyle}
                />
                <Input
                  style={{ textAlignVertical: "top" }}
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={styles.inputComentsContainerStyle}
                  inputStyle={styles.inputStyleComents}
                  label={"Comentarios"}
                  labelStyle={styles.label}
                  multiline={true}
                  numberOfLines={10}
                  textAlignVertical={"top"}
                />
                <Input
                  name="cantidad"
                  onChangeText={handleChange("cantidad")}
                  onBlur={handleBlur("cantidad")}
                  value={values.cantidad}
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={styles.inputContainerStyle2}
                  inputStyle={styles.inputStyleCantidad}
                  label={"Cantidad de camiones"}
                  labelStyle={styles.label}
                  keyboardType={"numeric"}
                  errorMessage={
                    errors.cantidad && touched.cantidad && errors.cantidad
                  }
                  errorStyle={globalStyles.formInputErrorStyle}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
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
                </View>
                <Text style={styles.dateText}>{date.toLocaleString()}</Text>
                <View style={styles.viewCenter}>
                  <MyButton label={"CREAR VIAJE"} size={"medium"} onPress={handleSubmit}/>
                </View>
              </View>
            </ScrollView>
          </>
        )}
      </Formik>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default CrearViajeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  inputContainer: {
    width: "95%",
    alignSelf: "center",
    marginBottom: -10,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: Colors.white,
    height: 45,
  },
  inputComentsContainerStyle: {
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: Colors.white,
    height: 100,
    textAlignVertical: "top",
  },
  inputContainerStyle2: {
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: Colors.white,
    width: 70,
    height: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: "nunito",
    color: Colors.blackLabel,
  },
  viewCenter: {
    alignItems: "center",
  },
  inputStyle: {
    fontFamily: "nunito",
    fontSize: 14,
    marginLeft: 10,
  },
  inputStyleComents: {
    fontFamily: "nunito",
    fontSize: 14,
    marginLeft: 10,
    marginTop: 10,
  },
  inputStyleCantidad: {
    fontFamily: "nunito",
    fontSize: 14,
    textAlign: "center",
  },
  dateButtom: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: Colors.white,
    marginBottom: 20,
    marginTop: 15,
    borderRadius: 10,
    elevation: 3,
  },
  dateText: {
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "nunito",
    fontSize: 16,
  },
});
