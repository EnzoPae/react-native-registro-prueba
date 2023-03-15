import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
//Components
import { ListItem } from "@rneui/themed";
import Spinner from "../components/Spinner";
import MyButton from "../components/MyButton";
import ModalAlert from "../components/ModalAlert";
import { Colors } from "../styles/Colors";
//API
import { AxiosContext } from "../contexts/AxiosContext";

export default function ListadoCamionerosViaje({ route }) {
  const trip = route.params;
  const isFocused = useIsFocused();
  const { authAxios } = useContext(AxiosContext);
  const [drivers, setDrivers] = useState([]);
  const [expandedItems, setExpanded] = useState([]);
  const [loading, setLoading] = useState(false);
  //ModalAlert
  const [modalVisible, setModalVisible] = useState(false);
  const [msj, setMsj] = useState(null);
  const [modalType, setModalType] = useState("error");

  useEffect(() => {
    if (!isFocused) {
      setExpanded([]);
      setModalVisible(false);
      setMsj(null);
      setDrivers([]);
    } else {
      setDrivers(trip.drivers);
    }
  }, [isFocused]);

  const handleDesVinc = async (id_equipo) => {
    try {
      setLoading(true);
      const api_response = await authAxios.post(
        "/api/app/trips/remove-driver",
        {
          id_equipo,
          id_viaje: trip.id,
        }
      );
      if (api_response.status === 200) {
        //Quito el elemento eliminado del arreglo
        let filteredArr = drivers.filter(function (driver) {
          return driver.id_equipo !== id_equipo;
        });
        console.log(filteredArr);
        setDrivers(filteredArr);
        setModalVisible(true);
        setMsj(api_response.data.msj);
        setModalType("ok");
      }
    } catch (error) {
      console.log(`Error en handleDesVinc: ${error}`);
      setModalVisible(true);
      setMsj(
        error.response.data?.msj ? error.response.data.msj : "Algo salió mal"
      );
      setModalType("error");
    } finally {
      setLoading(false);
    }
  };

  //CONFIRMAR LOG OUT
  const confirmClick = (item) => {
    Alert.alert(
      "Confirmar designación",
      '',
      [
        {
          text: "Cancel",
        },
        {
          text: "Confirm",
          onPress: () => handleDesVinc(item),
        },
      ],
      { cancelable: false }
    );
  };

  if (loading) return <Spinner />;
  //console.log(drivers)
  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.white, flex: 1, marginTop: -50 }}
    >
      <View style={{ marginTop: 50 }}>
        <ScrollView style={{ width: "100%" }}>
          {drivers.map((d, i) => {
            return (
              <ListItem.Accordion
                key={`accordion${i}`}
                containerStyle={{
                  borderTopWidth: 0.5,
                  borderTopStartRadius: 20,
                  borderTopEndRadius: 20,
                }}
                content={
                  <>
                    <ListItem.Content>
                      <ListItem.Title>
                        {d.camion.toUpperCase()} - {d.acoplado.toUpperCase()}
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
                {/*Contenido acordion*/}
                <ListItem key={`item${i}`}>
                  <ListItem.Content style={{ marginTop: -20 }}>
                    <ListItem.Subtitle>
                      {d.apenom === null ? "No defenido" : d.apenom}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle>{d.dni}</ListItem.Subtitle>
                    <View style={{}}>
                      <MyButton
                        type={"trip-list"}
                        label={"Desasignar"}
                        color={"red"}
                        onPress={() => {
                          confirmClick(d.id_equipo);
                        }}
                      />
                    </View>
                  </ListItem.Content>
                </ListItem>
              </ListItem.Accordion>
            );
          })}
          <ModalAlert
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            msj={msj}
            type={modalType}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
