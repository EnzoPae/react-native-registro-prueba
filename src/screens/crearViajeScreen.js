import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
//Components
import { StatusBar } from "expo-status-bar";
import { Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MyButton from "../components/MyButton";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Spinner from "../components/Spinner";
import ModalAlert from "../components/ModalAlert";
import { SelectList } from 'react-native-dropdown-select-list'
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
  const isFocused = useIsFocused()
  const [date, setDate] = useState(new Date(1598051730000));
  const [loading, setLoading] = useState(false)
  const [loadingLocalidadesD, setLoadingLocalidadesD] = useState(false)
  const [loadingLocalidadesO, setLoadingLocalidadesO] = useState(false)
  const [error, setError] = useState(false)
  const [msjError, setMsjError] = useState(null)
  const [provincias, setProvincias] = useState([])
  const [localidadesD, setLocalidadesD] = useState(undefined)
  const [localidadesO, setLocalidadesO] = useState(undefined)
  const [origen, setOrigen] = useState({
    id_provincia: null,
    id_localidad: null,
  })
  const [destino, setDestino] = useState({
    id_provincia: null,
    id_localidad: null,
  })
  const initialValues = {
    distancia: null,
    cantidad: null,
    comentarios: null,
  };

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

  //Func que se ejecuta cuando se aprieta crear viaje
  const handleCreateTrip = async (values) => {
    if(!origen.id_localidad || !origen.id_provincia || !destino.id_localidad || !destino.id_provincia){
      setError(true)
      setMsjError('Faltan completar datos del origen o destino.')
      return
    }
    const merged = { ...values, date, origen,destino };
    try {
      const api_response = await authAxios.post("/api/trips", merged);
      //TODO ver el codigo de respuesta
    } catch (error) {
      console.log(`Error creando viaje: ${error}`);
    }
  };
  //Pedir provincias a la API
  const getProvincias = async () => {
    setLoading(true)
    try {
      const response = await authAxios.get("/api/locations/provincias")
      setProvincias(response.data)
    } catch (error) {
      console.log(error)
      setError(true)
      setMsjError('Error obteniendo provincias')
    } finally {
      setLoading(false)
    }
  }
  /*
  Cuando se selecciona una provincia
  se filtran las localidades por id de provincia
  */
  const handleSelectProvincia = async (selector) => {
    try {
      if(selector === 'd'){
        setLoadingLocalidadesD(true)
        const response = await authAxios.get(`/api/locations/localidades?id=${destino.id_provincia}`)
        setLocalidadesD(response.data)
      }else{
        setLoadingLocalidadesO(true)
        const response = await authAxios.get(`/api/locations/localidades?id=${origen.id_provincia}`)
        setLocalidadesO(response.data)        
      }
    } catch (error) {
      setError(true)
      setMsjError('Error obteniendo provincias')
    } finally {
      setLoadingLocalidadesO(false)
      setLoadingLocalidadesD(false)
    }
  }

  useEffect(() => {
    if (isFocused) {
      getProvincias()
    } else {
      setOrigen({
        id_provincia: null,
        id_localidad: null,
      })
      setDestino({
        id_provincia: null,
        id_localidad: null,
      })
      setLoading(false)
      setError(false)
      setMsjError(null)
    }
  }, [isFocused])

  if (loading) return <Spinner />

  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
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
        }) => (
          <>
            <ScrollView style={{ width: "100%" }}>
              <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                  <SelectList
                    setSelected={(val) => setOrigen({
                      ...origen,
                      id_provincia: val
                    })}
                    onSelect={()=>handleSelectProvincia('o')}
                    data={provincias}
                    //save="value"
                    search={true}
                    notFoundText={'No hay resultados'}
                    searchPlaceholder={'Buscar provincia'}
                    placeholder={'Provincia'}
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                  {!loadingLocalidadesO ? !origen.id_provincia ? <Text>Seleccione una provincia...</Text>:
                    <SelectList
                      setSelected={(val) => setOrigen({
                        ...origen,
                        id_localidad:val
                      })}
                      //onSelect={handleSelectProvincia}
                      data={localidadesO}
                      //save="value"
                      search={true}
                      notFoundText={'No hay resultados'}
                      searchPlaceholder={'Buscar localidad'}
                      placeholder={'Localidad'}
                    />
                    : <Text>Cargando localidades...</Text>}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                  <SelectList
                    setSelected={(val) => setDestino({
                      ...destino,
                      id_provincia: val
                    })}
                    onSelect={()=>handleSelectProvincia('d')}
                    data={provincias}
                    //save="value"
                    search={true}
                    notFoundText={'No hay resultados'}
                    searchPlaceholder={'Buscar provincia'}
                    placeholder={'Provincia'}
                  />
                </View>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                  {!loadingLocalidadesD ? !destino.id_provincia ? <Text>Seleccione una provincia...</Text>:
                    <SelectList
                      setSelected={(val) => setDestino({
                        ...destino,
                        id_localidad:val
                      })}
                      //onSelect={handleSelectProvincia}
                      data={localidadesD}
                      //save="value"
                      search={true}
                      notFoundText={'No hay resultados'}
                      searchPlaceholder={'Buscar localidad'}
                      placeholder={'Localidad'}
                    />
                    : <Text>Cargando localidades...</Text>}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Input
                    name="distancia"
                    onChangeText={handleChange("distancia")}
                    onBlur={handleBlur("distancia")}
                    value={values.distancia}
                    containerStyle={[login.containerStyle, { width: '50%' }]}
                    inputContainerStyle={login.inputContainerStyle}
                    inputStyle={login.inputStyle}
                    label={"Distancia"}
                    labelStyle={login.labelStyle}
                    keyboardType={"numeric"}
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
                    containerStyle={[login.containerStyle, { width: '50%' }]}
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
                  name={'comentarios'}
                  onChangeText={handleChange("comentarios")}
                  onBlur={handleBlur("comentarios")}
                  value={values.comentarios}
                  style={{ textAlignVertical: "top" }}
                  containerStyle={login.containerStyle}
                  inputContainerStyle={login.inputContainerStyle}
                  inputStyle={[login.inputStyle, { marginTop: 5, marginLeft: 10 }]}
                  label={"Comentarios"}
                  labelStyle={login.labelStyle}
                  multiline={true}
                  numberOfLines={5}
                  textAlignVertical={"top"}
                />
              </View>
              <View style={{ alignItems: 'center' }}>
                <MyButton
                  label={"CREAR VIAJE"}
                  onPress={handleSubmit}
                />
              </View>
            </ScrollView>
          </>
        )}
      </Formik>
      <ModalAlert
        modalVisible={error}
        setModalVisible={setError}
        msj={msjError} />
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
/*
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
*/