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
import { Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MyButton from "../components/MyButton";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Spinner from "../components/Spinner";
import ModalAlert from "../components/ModalAlert";
import { SelectList } from "react-native-dropdown-select-list";
//Styles
import { Colors } from "../styles/Colors";
import { login } from "../styles/GlobalStyles";
import { createTripStyles } from "../styles/GlobalStyles";
//Formik & Yup
import { crearViajeValidationSchema } from "../Schemas/crearViajeValidationSchema";
import { Formik } from "formik";
//API
import { AxiosContext } from "../contexts/AxiosContext";
const ActViajeScreen = ({ route }) => {
  const viajeParam = route.params;
  const [initialValues, setInitialValues] = useState({
    distancia: null,
    cantidad: null,
    comentarios: null,
  });
  const { authAxios } = useContext(AxiosContext);
  const isFocused = useIsFocused();
  const [date, setDate] = useState(new Date(1598051730000));
  const [loading, setLoading] = useState(false);
  const [loadingLocalidadesD, setLoadingLocalidadesD] = useState(false);
  const [loadingLocalidadesO, setLoadingLocalidadesO] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [msjModal, setMsjModal] = useState(null);
  const [modalType, setModalType] = useState("error");
  const [provincias, setProvincias] = useState([]);
  const [localidadesD, setLocalidadesD] = useState(undefined);
  const [localidadesO, setLocalidadesO] = useState(undefined);
  const [clients, setClients] = useState([])
  const [selectedClient, setSelectedClient] = useState(undefined)
  const [origen, setOrigen] = useState({
    id_provincia: null,
    id_localidad: null,
  });
  const [destino, setDestino] = useState({
    id_provincia: null,
    id_localidad: null,
  });
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
    if (!destino.id_localidad || !destino.id_provincia) {
      setModalType('error')
      setMsjModal('Faltan completar datos del destino.')
      setModalVisible(true)
      return false
    }
    console.log(selectedClient)
    if (!selectedClient) {
      setModalType('error')
      setMsjModal('Debe seleccionar un cliente.')
      setModalVisible(true)
      return false
    }
    return true
  }
  //Func que se ejecuta cuando se aprieta crear viaje
  const handleUpdateTrip = async (values) => {
    const allSelectAreSelected = validateSelectLists()
    if (!allSelectAreSelected) return
    const merged = { ...values, date, origen, destino, id: viajeParam.id,id_cliente:selectedClient };
    try {
      const api_response = await authAxios.patch("/api/trips", merged);
      if (api_response.status) {
        setModalType("ok");
        setMsjModal("Viaje actualizado con exito.");
        setModalVisible(true);
      }
    } catch (error) {
      console.log(`Error creando viaje: ${error}`);
      setModalType("error");
      setMsjModal("Error interno del servidor.");
      setModalVisible(true);
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
      if (selector === "d") {
        setLoadingLocalidadesD(true);
        const response = await authAxios.get(
          `/api/locations/localidades?id=${destino.id_provincia}`
        );
        setLocalidadesD(response.data);
      } else {
        setLoadingLocalidadesO(true);
        const response = await authAxios.get(
          `/api/locations/localidades?id=${origen.id_provincia}`
        );
        setLocalidadesO(response.data);
      }
    } catch (error) {
      setModalType("error");
      setMsjError("Error obteniendo provincias");
      setModalVisible(true);
    } finally {
      setLoadingLocalidadesO(false);
      setLoadingLocalidadesD(false);
    }
  };
  const handleLoad = async () => {
    setInitialValues({
      ...initialValues,
      distancia: String(viajeParam.kilometros),
      cantidad: String(viajeParam.camiones_cantidad),
      comentarios: viajeParam.obs,
    });
    setDate(new Date(viajeParam.fecha_viaje));
    setOrigen({
      id_provincia: viajeParam.id_prov_o,
      id_localidad: viajeParam.id_localidad_o,
    });
    setDestino({
      id_provincia: viajeParam.id_localidad_d,
      id_localidad: viajeParam.id_localidad_d,
    });
    setSelectedClient(viajeParam.id_cliente)
  };
  const clearStates = () => {
    setInitialValues({
      distancia: null,
      cantidad: null,
      comentarios: null,
    });
    setOrigen({
      id_provincia: null,
      id_localidad: null,
    });
    setDestino({
      id_provincia: null,
      id_localidad: null,
    });
    setLoading(false);
    setModalVisible(false);
    setMsjModal(null);
  }
  useEffect(() => {
    if (isFocused) {
      handleLoad();
      getProvinciasYClientes();
    } else { clearStates }
  }, [isFocused]);

  if (loading) return <Spinner />;

  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1, marginTop: -50 }}>
      <View style={{marginTop: 50}}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={crearViajeValidationSchema}
        onSubmit={(values) => handleUpdateTrip(values)}
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
                    setSelected={(val) =>
                      setOrigen({
                        ...origen,
                        id_provincia: val,
                      })
                    }
                    onSelect={() => handleSelectProvincia("o")}
                    data={provincias}
                    search={true}
                    notFoundText={"No hay resultados"}
                    searchPlaceholder={"Buscar provincia"}
                    placeholder={"Provincia"}
                    defaultOption={{
                      key: viajeParam.id_prov_o,
                      value: viajeParam.desc_prov_o,
                    }}
                    boxStyles={createTripStyles.boxSelect}
                    dropdownStyles={createTripStyles.dropdownStyles}
                  />
                </View>
                <View
                  style={{
                    marginBottom: 10,
                  }}
                >
                  {!loadingLocalidadesO ? (
                    !origen.id_provincia ? (
                      <View />
                    ) : (
                      <SelectList
                        setSelected={(val) =>
                          setOrigen({
                            ...origen,
                            id_localidad: val,
                          })
                        }
                        data={localidadesO}
                        search={true}
                        notFoundText={"No hay resultados"}
                        searchPlaceholder={"Buscar localidad"}
                        placeholder={"Localidad"}
                        defaultOption={{
                          key: viajeParam.id_localidad_o,
                          value: viajeParam.desc_localidad_o,
                        }}
                        boxStyles={createTripStyles.boxSelect}
                        dropdownStyles={createTripStyles.dropdownStyles}
                      />
                    )
                  ) : (
                    <Text style={createTripStyles.text}>Cargando localidades...</Text>
                  )}
                </View>
                <Text style={createTripStyles.text}>Destino</Text>
                <View
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <SelectList
                    setSelected={(val) =>
                      setDestino({
                        ...destino,
                        id_provincia: val,
                      })
                    }
                    onSelect={() => handleSelectProvincia("d")}
                    data={provincias}
                    search={true}
                    notFoundText={"No hay resultados"}
                    searchPlaceholder={"Buscar provincia"}
                    placeholder={"Provincia"}
                    defaultOption={{
                      key: viajeParam.id_prov_d,
                      value: viajeParam.desc_prov_d,
                    }}
                    boxStyles={createTripStyles.boxSelect}
                    dropdownStyles={createTripStyles.dropdownStyles}
                  />
                </View>

                <View
                  style={{
                    marginBottom: 30,
                  }}
                >
                  {!loadingLocalidadesD ? (
                    !destino.id_provincia ? (
                      <View />
                    ) : (
                      <SelectList
                        setSelected={(val) =>
                          setDestino({
                            ...destino,
                            id_localidad: val,
                          })
                        }
                        //onSelect={handleSelectProvincia}
                        data={localidadesD}
                        //save="value"
                        search={true}
                        notFoundText={"No hay resultados"}
                        searchPlaceholder={"Buscar localidad"}
                        placeholder={"Localidad"}
                        defaultOption={{
                          key: viajeParam.id_localidad_d,
                          value: viajeParam.desc_localidad_d,
                        }}
                        boxStyles={createTripStyles.boxSelect}
                        dropdownStyles={createTripStyles.dropdownStyles}
                      />
                    )
                  ) : (
                    <Text style={createTripStyles.text}>Cargando localidades...</Text>
                  )}
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
                    defaultOption={{
                      key: viajeParam.id_cliente,
                      value: viajeParam.razonsocial,
                    }}
                    boxStyles={createTripStyles.boxSelect}
                    dropdownStyles={createTripStyles.dropdownStyles}
                  />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                  <Input
                    name="distancia"
                    onChangeText={handleChange("distancia")}
                    onBlur={handleBlur("distancia")}
                    value={values.distancia}
                    containerStyle={[login.containerStyle, { width: "50%" }]}
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
                    containerStyle={[login.containerStyle, { width: "50%" }]}
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
                    alignItems: "baseline",
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
                  name={"comentarios"}
                  onChangeText={handleChange("comentarios")}
                  onBlur={handleBlur("comentarios")}
                  value={values.comentarios}
                  style={{ textAlignVertical: "top" }}
                  containerStyle={login.containerStyle}
                  inputContainerStyle={login.inputContainerStyle}
                  inputStyle={[
                    login.inputStyle,
                    { marginTop: 5, marginLeft: 10 },
                  ]}
                  label={"Comentarios"}
                  labelStyle={login.labelStyle}
                  multiline={true}
                  numberOfLines={5}
                  textAlignVertical={"top"}
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <MyButton label={"ACTUALIZAR VIAJE"} onPress={handleSubmit} />
              </View>
            </ScrollView>
          </>
        )}
      </Formik>
      <ModalAlert
        type={modalType}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        msj={msjModal}
      />
      </View>
    </SafeAreaView>
  );
};

export default ActViajeScreen;

const styles = StyleSheet.create({
  dateButtom: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    elevation: 3,
  },
});
