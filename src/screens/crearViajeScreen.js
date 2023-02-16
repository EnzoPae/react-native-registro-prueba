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
import { createTripStyles, login, tripListStyles } from "../styles/GlobalStyles";
//Formik & Yup
import { crearViajeValidationSchema } from "../Schemas/crearViajeValidationSchema";
import { Formik } from "formik";
//API
import { AxiosContext } from "../contexts/AxiosContext";
const CrearViajeScreen = () => {
  const { authAxios } = useContext(AxiosContext);
  const isFocused = useIsFocused()
  const [reload,setReload]= useState(false)
  const [date, setDate] = useState(new Date(1598051730000));
  const [loading, setLoading] = useState(false)
  const [loadingLocalidadesD, setLoadingLocalidadesD] = useState(false)
  const [loadingLocalidadesO, setLoadingLocalidadesO] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [msjModal, setMsjModal] = useState(null)
  const [modalType, setModalType] = useState('error')
  const [clients, setClients] = useState([])
  const [selectedClient, setSelectedClient] = useState(undefined)
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

  /*
    Funcion para validar que se haya seleccionado
      -prov y loc de origen
      -pro y loc de destino
      -un cliente
  */
  const validateSelectLists = () => {
    if (!origen.id_localidad || !origen.id_provincia) {
      setModalType('error')
      setMsjModal('Faltan completar datos del origen.')
      setModalVisible(true)
      return false
    }
    if(!destino.id_localidad || !destino.id_provincia){
      setModalType('error')
      setMsjModal('Faltan completar datos del destino.')
      setModalVisible(true)
      return false
    }
    console.log(selectedClient)
    if(!selectedClient){
      setModalType('error')
      setMsjModal('Debe seleccionar un cliente.')
      setModalVisible(true)
      return false
    }
    return true
  }
  //Func que se ejecuta cuando se aprieta crear viaje
  const handleCreateTrip = async (values,actions) => {
    const allSelectAreSelected = validateSelectLists()
    if(!allSelectAreSelected) return
    const merged = { ...values, date, origen, destino, id_cliente:selectedClient };
    try {
      const api_response = await authAxios.post("/api/trips", merged);
      if (api_response.status) {
        actions.resetForm(values={initialValues})
        clearStates()
        setReload(!reload)
        setModalType('ok')
        setMsjModal('Viaje creado con exito.')
        setModalVisible(true)
      }
    } catch (error) {
      console.log(`Error creando viaje: ${error}`);
      setMsjModal('Algo salió mal.')
      setModalType('error')
      setModalVisible(true)
    }
  };
  //Pedir provincias y clientes a la API
  const getProvinciasYClientes = async () => {
    setLoading(true)
    const promise_array = []
    /*
      Siempre se va a intentar resolver la promesa de obtener clientes
      En las provincias solo se agrega la promersa al arreglo, cuando no hay
      provincias en memoria, si ya las pidio y se vuelve a la pantalla, no se 
      vuelven a pedir a la API
    */
    promise_array.push(await authAxios.get("/api/clients"))
    if (!provincias.length > 0) promise_array.push(await authAxios.get("/api/locations/provincias"))
    try {
      const results = await Promise.all(promise_array)
      const [clients_result, provincias_result] = results
      if (provincias_result) setProvincias(provincias_result.data)
      setClients(clients_result.data)
    } catch (error) {
      console.log(error)
      setModalType('error')
      setMsjModal('Error obteniendo provincias')
      setModalVisible(true)
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
      if (selector === 'd') {
        setLoadingLocalidadesD(true)
        const response = await authAxios.get(`/api/locations/localidades?id=${destino.id_provincia}`)
        setLocalidadesD(response.data)
      } else {
        setLoadingLocalidadesO(true)
        const response = await authAxios.get(`/api/locations/localidades?id=${origen.id_provincia}`)
        setLocalidadesO(response.data)
      }
    } catch (error) {
      setModalType('error')
      setMsjError('Error obteniendo provincias')
      setModalVisible(true)
    } finally {
      setLoadingLocalidadesO(false)
      setLoadingLocalidadesD(false)
    }
  }
  const clearStates = ()=>{
    setLoading(false)
    setModalVisible(false)
    setMsjModal(null)
    setClients([])
    setSelectedClient(undefined)
    setOrigen({
      id_provincia: null,
      id_localidad: null,
    })
    setDestino({
      id_provincia: null,
      id_localidad: null,
    })
  }
  useEffect(() => {
    if (isFocused) {
      getProvinciasYClientes()
    } else {clearStates()}
  }, [isFocused,reload])
  console.log(selectedClient)
  if (loading) return <Spinner />
  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={crearViajeValidationSchema}
        onSubmit={(values,actions) => handleCreateTrip(values,actions)}
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
                <Text style={createTripStyles.text}>Origen</Text>
                <View style={{ marginBottom: 10 }}>
                  <SelectList
                    setSelected={(val) => setOrigen({
                      ...origen,
                      id_provincia: val
                    })}
                    onSelect={() => handleSelectProvincia('o')}
                    data={provincias}
                    //save="value"
                    search={true}
                    notFoundText={'No hay resultados'}
                    searchPlaceholder={'Buscar provincia'}
                    placeholder={'Provincia'}
                    boxStyles={createTripStyles.boxSelect}
                    dropdownStyles={createTripStyles.dropdownStyles}
                  />
                </View>
                <View style={{ marginBottom: 10 }}>
                  {!loadingLocalidadesO ? !origen.id_provincia ? <View /> :
                    <SelectList
                      setSelected={(val) => setOrigen({
                        ...origen,
                        id_localidad: val
                      })}
                      //onSelect={handleSelectProvincia}
                      data={localidadesO}
                      //save="value"
                      search={true}
                      notFoundText={'No hay resultados'}
                      searchPlaceholder={'Buscar localidad'}
                      placeholder={'Localidad'}
                      boxStyles={createTripStyles.boxSelect}
                      dropdownStyles={createTripStyles.dropdownStyles}
                    />
                    : <Text style={createTripStyles.text}>Cargando localidades...</Text>}
                </View>
                <Text style={createTripStyles.text}>Destino</Text>
                <View style={{ marginBottom: 10 }}>
                  <SelectList
                    setSelected={(val) => setDestino({
                      ...destino,
                      id_provincia: val
                    })}
                    onSelect={() => handleSelectProvincia('d')}
                    data={provincias}
                    //save="value"
                    search={true}
                    notFoundText={'No hay resultados'}
                    searchPlaceholder={'Buscar provincia'}
                    placeholder={'Provincia'}
                    boxStyles={createTripStyles.boxSelect}
                    dropdownStyles={createTripStyles.dropdownStyles}
                  />
                </View>

                <View style={{ marginBottom: 10 }}>
                  {!loadingLocalidadesD ? !destino.id_provincia ? <View /> :
                    <SelectList
                      setSelected={(val) => setDestino({
                        ...destino,
                        id_localidad: val
                      })}
                      //onSelect={handleSelectProvincia}
                      data={localidadesD}
                      //save="value"
                      search={true}
                      notFoundText={'No hay resultados'}
                      searchPlaceholder={'Buscar localidad'}
                      placeholder={'Localidad'}
                      boxStyles={createTripStyles.boxSelect}
                      dropdownStyles={createTripStyles.dropdownStyles}
                    />
                    : <Text style={createTripStyles.text}>Cargando localidades...</Text>}
                </View>
                <Text style={createTripStyles.text}>Cliente</Text>
                <View style={{ marginBottom: 30 }}>
                  <SelectList
                    setSelected={(val) => setSelectedClient(val)}
                    //onSelect={() => handleSelectProvincia('o')}
                    data={clients}
                    //save="value"
                    search={true}
                    notFoundText={'No hay resultados'}
                    searchPlaceholder={'Buscar clientes'}
                    placeholder={'Clientes'}
                    boxStyles={createTripStyles.boxSelect}
                    dropdownStyles={createTripStyles.dropdownStyles}
                  />
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
                  <Text>
                    {String(date.toISOString()).split("T")[0]} -{" "}
                    {String(date.toISOString()).split("T")[1].slice(0, 8)}
                  </Text>
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
        type={modalType}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        msj={msjModal} />

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