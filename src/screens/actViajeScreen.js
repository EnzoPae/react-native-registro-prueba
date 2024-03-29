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
import MyButton from "../components/MyButton";
import Spinner from "../components/Spinner";
import ModalAlert from "../components/ModalAlert";
import { SelectList } from "react-native-dropdown-select-list";
//Styles
import { Colors } from "../styles/Colors";
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
    tarifa: null,
  });
  const { authAxios } = useContext(AxiosContext);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [loadingLocalidadesD, setLoadingLocalidadesD] = useState(false);
  const [loadingLocalidadesO, setLoadingLocalidadesO] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [msjModal, setMsjModal] = useState(null);
  const [modalType, setModalType] = useState("error");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(undefined);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(undefined);
  const [provincias, setProvincias] = useState([]);
  const [localidadesD, setLocalidadesD] = useState(undefined);
  const [localidadesO, setLocalidadesO] = useState(undefined);
  const [dateValue, setDateValue] = useState(null);
  const [time, setTime] = useState(null);
  const [origen, setOrigen] = useState({
    id_provincia: null,
    id_localidad: null,
  });
  const [destino, setDestino] = useState({
    id_provincia: null,
    id_localidad: null,
  });

  /*
  Funcion para validar que se haya seleccionado
    -prov y loc de origen
    -pro y loc de destino
    -un cliente
*/
  const validateSelectLists = () => {
    const regExpDate = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{2}$/;
    const regExpTime = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    if (!origen.id_localidad || !origen.id_provincia) {
      setModalType("error");
      setMsjModal("Faltan completar datos del origen.");
      setModalVisible(true);
      return false;
    }
    if (!destino.id_localidad || !destino.id_provincia) {
      setModalType("error");
      setMsjModal("Faltan completar datos del destino.");
      setModalVisible(true);
      return false;
    }
    if (selectedClient === null || selectedClient === undefined) {
      setModalType("error");
      setMsjModal("Debe seleccionar un cliente.");
      setModalVisible(true);
      return false;
    }
    if (selectedProduct === null || selectedProduct === undefined) {
      setModalType("error");
      setMsjModal("Debe seleccionar un producto.");
      setModalVisible(true);
      return false;
    }
    if (!dateValue.match(regExpDate)) {
      setModalType("error");
      setMsjModal("Debe ingresar una fecha valida.");
      setModalVisible(true);
      return false;
    }
    if (!time.match(regExpTime)) {
      setModalType("error");
      setMsjModal("Debe ingresar una hora valida.");
      setModalVisible(true);
      return false;
    }
    return true;
  };
  //Func que se ejecuta cuando se aprieta crear viaje
  const handleUpdateTrip = async (values) => {
    const allSelectAreSelected = validateSelectLists();
    if (!allSelectAreSelected) return;
    const merged = {
      ...values,
      origen,
      destino,
      id: viajeParam.id,
      id_cliente: selectedClient,
      id_producto: selectedProduct,
      date: fechaSQL,
    };
    console.log(merged);
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
  //Pedir provincias y clientes y productos a la API
  const getProvinciasYClientes = async () => {
    setLoading(true);
    const promise_array = [];
    /*
      Siempre se va a intentar resolver la promesa de obtener clientes
      En las provincias solo se agrega la promersa al arreglo, cuando no hay
      provincias en memoria, si ya las pidio y se vuelve a la pantalla, no se 
      vuelven a pedir a la API
    */
    promise_array.push(await authAxios.get("/api/clients"));
    promise_array.push(await authAxios.get("/api/products"));
    if (!provincias.length > 0)
      promise_array.push(await authAxios.get("/api/locations/provincias"));
    try {
      const results = await Promise.all(promise_array);
      const [clients_result, products_result, provincias_result] = results;
      if (provincias_result) setProvincias(provincias_result.data);
      setClients(clients_result.data);
      setProducts(products_result.data);
    } catch (error) {
      console.log(error);
      setModalType("error");
      setMsjModal("Error obteniendo provincias");
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };
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

  //FECHA
  const formatDate = (text, selector) => {
    // Elimina cualquier caracter que no sea un número
    let cleaned = text.replace(/[^0-9]/g, "");
    // Divide el texto en grupos de dos caracteres
    let formatted = cleaned.match(/.{1,2}/g)?.join("/");
    // Actualiza el estado con el texto formateado
    if (selector === "c") {
      setDateValue(formatted || "");
    } else {
      setDateValue(formatted || "");
    }
  };
  //Hora
  const formatTime = (text, selector) => {
    // Elimina cualquier caracter que no sea un número
    let cleaned = text.replace(/[^0-9]/g, "");
    // Divide el texto en grupos de dos caracteres
    let formatted = cleaned.match(/.{1,2}/g)?.join(":");
    // Actualiza el estado con el texto formateado
    if (selector === "c") {
      setTime(formatted || "");
    } else {
      setTime(formatted || "");
    }
  };
  //Fecha_gen Format
  function formatDateGen(fecha_viaje) {
    const fecha = new Date(fecha_viaje);
    const dia = fecha.getUTCDate().toString().padStart(2, "0");
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getUTCFullYear().toString().substr(-2);
    return `${dia}/${mes}/${anio}`;
  }
  function formatInitialTime(date) {
    const fecha = new Date(date);
    // Obtener las horas y minutos de la fecha en formato de texto
    const horas = ('0' + fecha.getHours()).slice(-2); // agregar un cero a la izquierda si la hora es menor a 10
    const minutos = ('0' + fecha.getMinutes()).slice(-2); // agregar un cero a la izquierda si los minutos son menores a 10
    return horas + ":" + minutos
  }
  //Join fecha y hora
  const fechaString = dateValue + " " + time; // fecha en formato DD/MM/YY XX:XX

  const [fecha, hora] = fechaString.split(" ");
  const [dia, mes, anio] = fecha.split("/");
  const [horaSinMinutos, minutos] = hora.split(":");

  const fechaSQL = `20${anio}-${mes}-${dia} ${horaSinMinutos}:${minutos}:00`;

  const handleLoad = async () => {
    setInitialValues({
      ...initialValues,
      distancia: String(viajeParam.kilometros),
      cantidad: String(viajeParam.camiones_cantidad),
      comentarios: viajeParam.obs,
      tarifa: String(viajeParam.tarifa),
    });
    const formatdeDate = formatDateGen(viajeParam.fecha_viaje)
    setDateValue(formatdeDate)
    const formatedTime = formatInitialTime(viajeParam.fecha_viaje)
    setTime(formatedTime)
    setOrigen({
      id_provincia: viajeParam.id_prov_o,
      id_localidad: viajeParam.id_localidad_o,
    });
    setDestino({
      id_provincia: viajeParam.id_localidad_d,
      id_localidad: viajeParam.id_localidad_d,
    });
    setSelectedClient(viajeParam.id_cliente);
    setSelectedProduct(viajeParam.id_producto)
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
  };
  useEffect(() => {
    if (isFocused) {
      handleLoad();
      getProvinciasYClientes();
    } else {
      clearStates;
    }
  }, [isFocused]);

  if (loading) return <Spinner />;
  console.log(fechaSQL)
  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.white, flex: 1, marginTop: -50 }}
    >
      <View style={{ marginTop: 50 }}>
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
                      dropdownTextStyles={createTripStyles.fontSize12}
                      inputStyles={createTripStyles.fontSize12}
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
                          dropdownTextStyles={createTripStyles.fontSize12}
                          inputStyles={createTripStyles.fontSize12}
                        />
                      )
                    ) : (
                      <Text style={createTripStyles.text}>
                        Cargando localidades...
                      </Text>
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
                      dropdownTextStyles={createTripStyles.fontSize12}
                      inputStyles={createTripStyles.fontSize12}
                    />
                  </View>

                  <View
                    style={{
                      marginBottom: 10,
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
                          dropdownTextStyles={createTripStyles.fontSize12}
                          inputStyles={createTripStyles.fontSize12}
                        />
                      )
                    ) : (
                      <Text style={createTripStyles.text}>
                        Cargando localidades...
                      </Text>
                    )}
                  </View>
                  <Text style={createTripStyles.text}>Cliente</Text>
                  <View style={{ marginBottom: 10 }}>
                    <SelectList
                      setSelected={(val) => setSelectedClient(val)}
                      //onSelect={() => handleSelectProvincia('o')}
                      data={clients}
                      //save="value"
                      search={true}
                      notFoundText={"No hay resultados"}
                      searchPlaceholder={"Buscar clientes"}
                      placeholder={"Clientes"}
                      defaultOption={{
                        key: viajeParam.id_cliente,
                        value: viajeParam.razonsocial,
                      }}
                      boxStyles={createTripStyles.boxSelect}
                      dropdownStyles={createTripStyles.dropdownStyles}
                      dropdownTextStyles={createTripStyles.fontSize12}
                      inputStyles={createTripStyles.fontSize12}
                    />
                  </View>
                  <Text style={createTripStyles.text}>Producto</Text>
                  <View style={{ marginBottom: 30 }}>
                    <SelectList
                      setSelected={(val) => setSelectedProduct(val)}
                      data={products}
                      //save="value"
                      search={true}
                      notFoundText={"No hay resultados"}
                      searchPlaceholder={"Buscar Productos"}
                      placeholder={"Productos"}
                      defaultOption={{
                        key: viajeParam.id_producto,
                        value: viajeParam.nombre_producto
                      }}
                      boxStyles={createTripStyles.boxSelect}
                      dropdownStyles={createTripStyles.dropdownStyles}
                      dropdownTextStyles={createTripStyles.fontSize12}
                      inputStyles={createTripStyles.fontSize12}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginBottom: 10,
                    }}
                  >
                    <Input
                      name="cantidad"
                      onChangeText={handleChange("cantidad")}
                      onBlur={handleBlur("cantidad")}
                      value={values.cantidad}
                      containerStyle={[
                        createTripStyles.containerStyle,
                        { width: "25%" },
                      ]}
                      inputContainerStyle={createTripStyles.inputContainerStyle}
                      inputStyle={createTripStyles.inputStyle}
                      label={"Cant."}
                      labelStyle={createTripStyles.labelStyle}
                      keyboardType={"numeric"}
                      errorMessage={
                        errors.cantidad && touched.cantidad && errors.cantidad
                      }
                      errorStyle={createTripStyles.errorStyle}
                    />
                    <Input
                      name="distancia"
                      onChangeText={handleChange("distancia")}
                      onBlur={handleBlur("distancia")}
                      value={values.distancia}
                      containerStyle={[
                        createTripStyles.containerStyle,
                        { width: "37%" },
                      ]}
                      inputContainerStyle={createTripStyles.inputContainerStyle}
                      inputStyle={createTripStyles.inputStyle}
                      label={"Distancia"}
                      labelStyle={createTripStyles.labelStyle}
                      keyboardType={"numeric"}
                      errorMessage={
                        errors.distancia &&
                        touched.distancia &&
                        errors.distancia
                      }
                      errorStyle={createTripStyles.errorStyle}
                    />
                    <Input
                      name="tarifa"
                      onChangeText={handleChange("tarifa")}
                      onBlur={handleBlur("tarifa")}
                      value={values.tarifa}
                      containerStyle={[
                        createTripStyles.containerStyle,
                        { width: "37%" },
                      ]}
                      inputContainerStyle={createTripStyles.inputContainerStyle}
                      inputStyle={createTripStyles.inputStyle}
                      label={"Tarifa"}
                      labelStyle={createTripStyles.labelStyle}
                      keyboardType={"numeric"}
                      errorMessage={
                        errors.tarifa && touched.tarifa && errors.tarifa
                      }
                      errorStyle={createTripStyles.errorStyle}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <Input
                      containerStyle={[
                        createTripStyles.containerStyle,
                        { width: "50%" },
                      ]}
                      inputContainerStyle={createTripStyles.inputContainerStyle}
                      inputStyle={createTripStyles.inputStyle}
                      placeholder={"DD/MM/YY"}
                      label={"Fecha"}
                      labelStyle={createTripStyles.labelStyle}
                      keyboardType={"numeric"}
                      onChangeText={(text) => formatDate(text, "c")}
                      maxLength={8}
                      value={dateValue}
                    />
                    <Input
                      containerStyle={[
                        createTripStyles.containerStyle,
                        { width: "50%" },
                      ]}
                      inputContainerStyle={createTripStyles.inputContainerStyle}
                      inputStyle={createTripStyles.inputStyle}
                      placeholder={"HH:MM"}
                      label={"Hora"}
                      labelStyle={createTripStyles.labelStyle}
                      keyboardType={"numeric"}
                      onChangeText={(text) => formatTime(text, "c")}
                      maxLength={5}
                      value={time}
                    />
                  </View>
                  <Input
                    name={"comentarios"}
                    onChangeText={handleChange("comentarios")}
                    onBlur={handleBlur("comentarios")}
                    value={values.comentarios}
                    style={{ textAlignVertical: "top" }}
                    containerStyle={createTripStyles.containerStyle}
                    inputContainerStyle={createTripStyles.inputContainerStyle}
                    inputStyle={[
                      createTripStyles.inputStyle,
                      { marginTop: 5, marginLeft: 10 },
                    ]}
                    label={"Comentarios"}
                    labelStyle={createTripStyles.labelStyle}
                    multiline={true}
                    numberOfLines={3}
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