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
import DateTable from "../components/listContent/dateTable";
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
  const getTrips = async () => {
    try {
      const response = await authAxios.get("/api/trips/0");
      setTrips(response.data);
    } catch (error) {
      console.log(error);
      setModalType("error");
      setModalVisible(true);
      setMsj(error.response.data.msj);
    } finally {
      setLoading(false);
    }
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getTrips().then(() => setRefreshing(false));
  }, []);

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
  function formatDateGen(fecha_gen) {
    const fecha = new Date(fecha_gen);
    const dia = fecha.getUTCDate().toString().padStart(2, "0");
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getUTCFullYear().toString().substr(-2);
    return `${dia}/${mes}/${anio}`;
  }

  useEffect(() => {
    if (isFocused) {
      getTrips();
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
    getTrips();
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
      <SafeAreaView style={{ backgroundColor: "#fff", marginTop: -50 }}>
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
                //onChangeText={handleSearchFilter}
                //value={search}
                containerStyle={{ width: 130, height: 41 }}
                inputContainerStyle={s.inputContainerStyle}
                inputStyle={{ fontSize: 12 }}
              />
              <View style={s.buttonsContainer}>
                <TouchableOpacity
                  style={[
                    //state === "All" ? s.activeButton : s.inactiveButton,
                    s.btn,
                    s.activeButton,
                  ]}
                  //onPress={() => handleStateFilter("All")}
                >
                  <Text style={s.btnText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    //state === "p" ? s.activeButton : s.inactiveButton,
                    s.btn,
                    s.inactiveButton,
                  ]}
                  //onPress={() => handleStateFilter("p")}
                >
                  <Text style={s.btnText}>Pendiente</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    //state === "c" ? s.activeButton : s.inactiveButton,
                    s.btn,
                    s.inactiveButton,
                  ]}
                  //onPress={() => handleStateFilter("c")}
                >
                  <Text style={s.btnText}>Curso</Text>
                </TouchableOpacity>
              </View>
            </View>
            {!loading
              ? trips.map((v, i) => {
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
                              <ListItem.Title style={{ fontSize: 12 }}>
                                {formatDateGen(v.fecha_gen)}
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
                                    ? null
                                    : v.nombre_producto
                                }
                              />
                              <InfoTable
                                header1={"Km"}
                                header2={"Tarifa"}
                                text1={v.kilometros}
                                text2={v.tarifa}
                              />
                              <DateTable />
                              {v.obs === null ? null : (
                                <Coments coments={v.obs} />
                              )}
                              <View style={{}}>
                                <MyButton
                                  type={"trip-list"}
                                  label={"Modificar viaje"}
                                  onPress={() =>
                                    navigation.navigate("ActViaje", v)
                                  }
                                />
                              </View>
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
                          <View style={{ flexDirection: "row" }}>
                            {v.camiones_asigandos != v.camiones_cantidad ? (
                              <MyButton
                                type={"trip-list"}
                                label={"Asignar chofer"}
                                color={'black'}
                                onPress={() => {
                                  setSelectedTrip(v.id);
                                  setShowModal(!showModal);
                                }}
                              />
                            ) : null}
                            {v.camiones_asigandos > 0 ? (
                              <MyButton
                                type={"trip-list"}
                                label={"Ver choferes asignados"}
                                color={'black'}
                                onPress={() =>
                                  navigation.navigate("DriversTrip", v)
                                }
                              />
                            ) : null}
                          </View>
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
    paddingHorizontal: 10,
    marginHorizontal: 0.5,
    borderRadius: 3,
    justifyContent: "center",
  },
  btnText: {
    fontWeight: "bold",
    color: "#fff",
  },
});
