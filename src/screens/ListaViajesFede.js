import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
//Axios
import { AxiosContext } from "../contexts/AxiosContext";
//Components
import { ListItem, Input, Icon } from "@rneui/themed";
import ModalAlert from "../components/ModalAlert";
import Spinner from "../components/Spinner";
import FloatButton from "../components/floatButton";
import ExpandableInfo from "../components/expandableInfo";
//Info list components
import Coments from "../components/listContent/coments";
import InfoLocalidad from "../components/listContent/infoLocalidad";
import InfoTable from "../components/listContent/infoTable";
import ProgresBar from "../components/listContent/progressBar";
//Styles
import { Colors } from "../styles/Colors";
import MyButton from "../components/MyButton";
//Navigation
import { useNavigation } from "@react-navigation/native";
import PlainModal from "../components/PlainModal";
import TrucksDriversTable from "../components/TrucksDriversTable";
export default function ListaViajesFede() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { authAxios } = useContext(AxiosContext);
  //Filtro de busqueda
  const [search, setSearch] = useState("");
  //Estado para saber que url se esta mostrando
  const [currentUrl, setCurrentUrl] = useState("api/trips/1");
  //Estado para saber que item tendria que estar expandido
  const [expandedItems, setExpanded] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  //ModalAlert
  const [modalVisible, setModalVisible] = useState(false);
  const [msj, setMsj] = useState(null);
  const [modalType, setModalType] = useState("error");
  //Plain modal
  const [showModal, setShowModal] = useState(false);
  //
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [reloadTrips, setReloadTrips] = useState(false);
  //Recargar
  const [refreshing, setRefreshing] = useState(false);
  /*
    Primero hay que ver si se esa viendo la pantalla
    ya que el useEffect se ejecuta cuando salis de la misma tamb
  */
  const getTrips = async (url) => {
    try {
      const response = await authAxios.get("api/trips/" + url);
      setTrips(response.data);
      setCurrentUrl(url);
    } catch (error) {
      console.log(error);
      setModalType("error");
      setModalVisible(true);
      setMsj(error.response.data.msj);
    } finally {
      setLoading(false);
    }
  };
  //REFRESH
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getTrips(1).then(() => setRefreshing(false));
  }, []);

  //SEARCH
  const filteredTrips = trips.filter((t) =>
      t.desc_localidad_o.toLowerCase().includes(search.toLowerCase()) ||
      t.desc_localidad_d.toLowerCase().includes(search.toLowerCase())
      //t.razonsocial.toString().toLowerCase().includes(search.toLowerCase()) ||
      //t.nombre_producto.toString().toLowerCase().includes(search.toLowerCase())
  );

  //CamelCase
  const textCamelCase = (text) => {
    //separo las palabras
    const wordsSplit = text.split(" ");
    //primera letra en mayuscula, demas en minuscula
    const camelCase = wordsSplit.map((t) => {
      return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
    });
    //unir las palabras
    const joinWordsCamelCase = camelCase.join(" ");
    return joinWordsCamelCase;
  };

  //Fecha_gen Format
  function formatDateGen(fecha_viaje) {
    const fecha = new Date(fecha_viaje);
    const dia = fecha.getUTCDate().toString().padStart(2, "0");
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getUTCFullYear().toString().substr(-2);
    return `${dia}/${mes}/${anio}`;
  }
  //Fecha y hora
  const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1; // Los meses comienzan desde 0, por lo que hay que sumar 1
    const year = dateObj.getUTCFullYear();
    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
  }

  useEffect(() => {
    if (isFocused) {
      getTrips(1);
      setLoading(true);
    } else {
      /*
        En este caso se pierde el foco de la pantalla
        aprovecho para limpiar los estados y dejarlos 
        con sus valores iniciales
      */
      setModalVisible(false);
      setShowModal(false);
      setModalType("error");
      setLoading(false);
      setTrips([]);
      setExpanded([]);
    }
  }, [isFocused]);
  useEffect(() => {
    getTrips(1);
    setLoading(true);
    setExpanded([]);
  }, [reloadTrips]);

  if (loading) return <Spinner />;
  const handleLinkTruckDriver = async (id_equipo) => {
    try {
      const api_response = await authAxios.post("/api/app/link-truck-drivers", {
        id_equipo,
        id_viaje: selectedTrip,
      });
      if (api_response.status === 200) {
        setReloadTrips(!reloadTrips);
        setShowModal(false);
        setModalVisible(true);
        setMsj(api_response.data.msj);
        setModalType("ok");
      }
    } catch (error) {
      setModalVisible(true);
      setMsj(error.response.data.msj);
      setModalType("error");
    }
  };
  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: "#fff", flex: 1, marginTop: -50 }}
      >
        <View style={{ marginTop: 50 }}>
          <ScrollView
            style={{ width: "100%" }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {/*SEARCH y FILTROS*/}
            <View
              style={{
                flexDirection: "row",
                marginVertical: 10,
              }}
            >
              <Input
                placeholder="Buscar"
                leftIcon={<Icon name="search" size={20} />}
                leftIconContainerStyle={{ height: 20, marginHorizontal: 5 }}
                onChangeText={(text) => setSearch(text)}
                value={search}
                containerStyle={{ width: 130, height: 41 }}
                inputContainerStyle={s.inputContainerStyle}
                inputStyle={{ fontSize: 12, marginRight: 5 }}
              />
              <View style={s.buttonsContainer}>
                <TouchableOpacity
                  style={[
                    currentUrl === 1 ? s.activeButton : s.inactiveButton,
                    s.btn,
                  ]}
                  onPress={() => getTrips(1)}
                >
                  <Text style={s.btnText}>Operando</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    currentUrl === 2 ? s.activeButton : s.inactiveButton,
                    s.btn,
                  ]}
                  onPress={() => getTrips(2)}
                >
                  <Text style={s.btnText}>Cerrado</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    currentUrl === 0 ? s.activeButton : s.inactiveButton,
                    s.btn,
                  ]}
                  onPress={() => getTrips(0)}
                >
                  <Text style={s.btnText}>Todo</Text>
                </TouchableOpacity>
              </View>
            </View>
            {!loading
              ? filteredTrips.map((v, i) => {
                  return (
                    <ListItem.Accordion
                      containerStyle={{
                        borderLeftWidth: 0.5,
                        borderTopWidth: 0.5,
                        borderTopStartRadius: 20,
                        borderTopEndRadius: 20,
                      }}
                      topDivider
                      key={`accordion${i}`}
                      content={
                        <>
                          <ListItem.Content>
                            <ListItem.Content
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                              }}
                            >
                              <ListItem.Title style={s.title}>
                                {textCamelCase(v.desc_localidad_o)}
                              </ListItem.Title>
                              <ListItem.Title
                                style={{
                                  fontSize: 12,
                                  borderBottomWidth: 1.5,
                                  borderBottomColor:
                                    v.estado === 1
                                      ? Colors.greenState
                                      : Colors.modalError,
                                }}
                              >
                                {formatDateGen(v.fecha_viaje)}
                              </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={s.title}>
                              {textCamelCase(v.desc_localidad_d)}
                            </ListItem.Title>
                          </ListItem.Content>
                        </>
                      }
                      isExpanded={expandedItems.includes(i)}
                      onPress={() => {
                        if (expandedItems.includes(i)) {
                          setExpanded(expandedItems.filter((id) => id !== i));
                        } else {
                          setExpanded([...expandedItems, i]);
                        }
                      }}
                    >
                      {/*CONTENIDO DEL ACORDION*/}
                      <ListItem
                        key={`item${i}`}
                        containerStyle={{
                          borderLeftWidth: 0.5,
                        }}
                      >
                        <ListItem.Content style={{ marginTop: -40 }}>
                          <ExpandableInfo>
                            <View style={{ width: "100%" }}>
                              <InfoLocalidad
                                l1={textCamelCase(v.desc_localidad_o)}
                                p1={v.desc_prov_o}
                                l2={textCamelCase(v.desc_localidad_d)}
                                p2={v.desc_prov_d}
                              />
                              <InfoTable
                                header1={"Cliente"}
                                header2={"Producto"}
                                text1={v.razonsocial}
                                text2={
                                  v.nombre_producto === null
                                    ? "No definido"
                                    : v.nombre_producto
                                }
                              />
                              <InfoTable
                                header1={"Km"}
                                header2={"Tarifa"}
                                text1={
                                  v.kilometros === null
                                    ? "No definido"
                                    : v.kilometros
                                }
                                text2={
                                  v.tarifa === null ? "No definido" : v.tarifa
                                }
                              />
                              {v.fecha_viaje === null ? null : (
                                <Coments title={'Fecha de viaje:'} text={formatDate(v.fecha_viaje)}/>
                              )} 
                              {v.obs === null ? null : (
                                <Coments title={'Comentarios:'} text={v.obs} />
                              )}
                              {v.camiones_asigandos > 0 ? null : (
                                <MyButton
                                  type={"trip-list"}
                                  label={"Modificar viaje"}
                                  onPress={() =>
                                    navigation.navigate("ActViaje", v)
                                  }
                                />
                              )}
                            </View>
                          </ExpandableInfo>
                          {/*BOTONES*/}
                          <View
                            style={{
                              width: "100%",
                              marginBottom: 10,
                            }}
                          />
                          <ProgresBar
                            total={v.camiones_cantidad}
                            current={v.camiones_asigandos}
                          />
                          {v.camiones_asigandos != v.camiones_cantidad ? (
                            <MyButton
                              type={"trip-list"}
                              label={"Asignar camión"}
                              color={"black"}
                              onPress={() => {
                                setSelectedTrip(v.id);
                                setShowModal(!showModal);
                              }}
                            />
                          ) : null}
                          {v.camiones_asigandos > 0 ? (
                            <MyButton
                              type={"trip-list"}
                              label={"Ver camiones asignados"}
                              color={"black"}
                              onPress={() =>
                                navigation.navigate("DriversTrip", v)
                              }
                            />
                          ) : null}
                          {v.camiones_asigandos > 0 ? (
                            <ExpandableInfo type={"myBtn"}>
                              {v.drivers.map((d, i) => (
                                <View key={d.id_equipo} style={[s.a, {borderTopWidth: i === 0 ? null : 0.5}]}>
                                  <View style={s.b}>
                                  <Text style={s.t3}>{d.apenom}</Text>
                                    <Text
                                      style={[
                                        s.t2,
                                        {
                                          backgroundColor:
                                            d.id_estado === 1
                                              ? Colors.lightBlue
                                              : d.id_estado === 2
                                              ? Colors.greenState
                                              : d.id_estado === 3
                                              ? Colors.yellowState
                                              : d.id_estado === 4
                                              ? Colors.primary
                                              : Colors.modalError,
                                          color:
                                            d.id_estado === 4
                                              ? Colors.white
                                              : null,
                                        },
                                      ]}
                                    >
                                      {textCamelCase(d.estado)}
                                    </Text>
                                  </View>
                                  <Text style={s.t3}>{d.camion.toUpperCase()}</Text>
                                  <Text style={s.t3}>{d.cuit}</Text>                                  
                                </View>
                              ))}
                            </ExpandableInfo>
                          ) : null}
                        </ListItem.Content>
                      </ListItem>
                    </ListItem.Accordion>
                  );
                })
              : null}
            <ModalAlert
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              msj={msj}
              type={modalType}
            />
          </ScrollView>
        </View>
        <PlainModal showModal={showModal} setShowModal={setShowModal}>
          <TrucksDriversTable handleLinkTruckDriver={handleLinkTruckDriver} />
        </PlainModal>
      </SafeAreaView>
      <FloatButton />
    </>
  );
}

const s = StyleSheet.create({
  title: {
    fontSize: 14,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    height: 40,
    marginRight: 10,
  },
  activeButton: {
    backgroundColor: Colors.primary,
  },
  inactiveButton: {
    backgroundColor: Colors.secondary,
  },
  inputContainerStyle: {
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "#000",
    borderRadius: 20,
  },
  btn: {
    paddingHorizontal: 5,
    marginHorizontal: 0.5,
    borderRadius: 3,
    justifyContent: "center",
  },
  btnText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 12,
  },
  //ACTIVIDAD CAMIONES
  a: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderColor: "#aeaeae",
  },
  b: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  t2: {
    paddingHorizontal: 5,
    borderRadius: 20,
    fontSize: 12,
  },
  t3: {
    fontSize: 12,
    color: "#aeaeae",
  },
});
