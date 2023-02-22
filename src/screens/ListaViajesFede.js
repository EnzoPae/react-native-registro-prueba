import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
  View,
  Text,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
//Axios
import { AxiosContext } from "../contexts/AxiosContext";
//Components
import { ListItem, Icon } from "@rneui/themed";
import ModalAlert from "../components/ModalAlert";
import Spinner from "../components/Spinner";
import FloatButton from "../components/floatButton";
//Styles
import { Colors } from "../styles/Colors";
import { tripListStyles } from "../styles/GlobalStyles";
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
      const response = await authAxios.get("/api/trips");
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
      <SafeAreaView>
        <ScrollView
          style={{ width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {!loading
            ? trips.map((v, i) => {
                return (
                  <ListItem.Accordion
                    topDivider
                    key={`accordion${i}`}
                    content={
                      <>
                        <Icon name="place" size={25} />
                        <ListItem.Content>
                          <ListItem.Title style={tripListStyles.itemStyle}>
                            {v.desc_localidad_o} - {v.desc_localidad_d}
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
                    <ListItem key={`item${i}`} bottomDivider>
                      <ListItem.Content>
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ width: "45%" }}>
                            <Text>Origen:</Text>
                            <Text>Destino:</Text>
                            <Text>Cliente:</Text>
                            <Text>Fecha:</Text>
                            <Text>Cant. camiones:</Text>
                            <Text>Camiones asignados:</Text>
                            <Text>Detalles:</Text>
                          </View>
                          <View style={{width:'55%'}}>
                            <ListItem.Subtitle>
                              {v.desc_localidad_o[0].toUpperCase()}
                              {v.desc_localidad_o.slice(1).toLowerCase()}
                            </ListItem.Subtitle>
                            <ListItem.Subtitle>
                              {v.desc_localidad_d[0].toUpperCase()}
                              {v.desc_localidad_d.slice(1).toLowerCase()}
                            </ListItem.Subtitle>
                            <ListItem.Subtitle>
                              {v.razonsocial}
                            </ListItem.Subtitle>
                            <ListItem.Subtitle>
                              {String(v.fecha_viaje).split("T")[0]} -{" "}
                              {String(v.fecha_viaje).split("T")[1].slice(0, 8)}
                            </ListItem.Subtitle>
                            <ListItem.Subtitle>
                              {v.camiones_cantidad}
                            </ListItem.Subtitle>
                            <ListItem.Subtitle>
                              {v.camiones_asigandos}/{v.camiones_cantidad}
                            </ListItem.Subtitle>
                            <ListItem.Subtitle style={{textAlign: 'justify'}}>
                              {v.obs}
                            </ListItem.Subtitle>
                          </View>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#dedede",
                            width: "100%",
                            marginTop: 5,
                            marginBottom: 10,
                          }}
                        />
                        <MyButton
                          type={"trip-list"}
                          label={"Modificar"}
                          onPress={() => navigation.navigate("ActViaje", v)}
                        />
                        <View style={{ flexDirection: "row" }}>
                          {v.camiones_asigandos != v.camiones_cantidad ? (
                            <MyButton
                              type={"trip-list"}
                              label={"Asignar chofer"}
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
        <PlainModal showModal={showModal} setShowModal={setShowModal}>
          <TrucksDriversTable handleLinkTruckDriver={handleLinkTruckDriver} />
        </PlainModal>
      </SafeAreaView>
      <FloatButton />
    </>
  );
}
