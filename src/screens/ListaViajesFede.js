import React, { useState, useEffect, useContext, useMemo } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
//Axios
import { AxiosContext } from "../contexts/AxiosContext";
//Components
import { ListItem, Icon } from "@rneui/themed";
import ModalAlert from "../components/ModalAlert";
import Spinner from "../components/Spinner";
import { StatusBar } from "expo-status-bar";
import FloatButton from "../components/floatButton";
//Styles
import { Colors } from "../styles/Colors";
import { tripListStyles } from "../styles/GlobalStyles";
import MyButton from "../components/MyButton";
//Navigation
import { useNavigation } from "@react-navigation/native";
export default function ListaViajesFede() {
  const navigation = useNavigation()
  const isFocused = useIsFocused();
  const { authAxios } = useContext(AxiosContext);
  const [expandedItems, setExpanded] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msj, setMsj] = useState(null);
  /*
    Primero hay que ver si se esa viendo la pantalla
    ya que el useEffect se ejecuta cuando salis de la misma tamb
  */
  useEffect(() => {
    if (isFocused) {
      /*
        En este caso declaro la func dentro del hook
        y suponiendo que ya se focuseo la pantalla
      */
      const getTrips = async () => {
        try {
          setLoading(true);
          const response = await authAxios.get("/api/trips");
          setTrips(response.data);
        } catch (error) {
          setError(true);
          setMsj(error.response.data.msj);
        } finally {
          setLoading(false);
        }
      };
      getTrips();
    } else {
      /*
        En este caso se pierde el foco de la pantalla
        aprovecho para limpiar los estados y dejarlos 
        con sus valores iniciales
      */
      setError(false);
      setLoading(false);
      setTrips([]);
    }
  }, [isFocused]);
  if (loading) return <Spinner />;
  return (
    <>
      <SafeAreaView>
        <ScrollView style={{ width: "100%" }}>
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
                        <ListItem.Title>*Origen</ListItem.Title>
                        <ListItem.Subtitle>
                          {v.desc_localidad_o}
                        </ListItem.Subtitle>
                        <ListItem.Title>*Destino</ListItem.Title>
                        <ListItem.Subtitle>
                          {v.desc_localidad_d}
                        </ListItem.Subtitle>
                        <ListItem.Title>*Fecha</ListItem.Title>
                        <ListItem.Subtitle>
                          {String(v.fecha_viaje).split("T")[0]} -{" "}
                          {String(v.fecha_viaje).split("T")[1].slice(0, 8)}
                        </ListItem.Subtitle>
                        <MyButton 
                          label={'Modificar'}
                          onPress={()=>navigation.navigate('ActViaje',v)}
                        />
                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem>
                  </ListItem.Accordion>
                );
              })
            : null}
          <ModalAlert
            modalVisible={error}
            setModalVisible={setError}
            msj={msj}
          />
        </ScrollView>
        <StatusBar style="light" backgroundColor={Colors.primary} />
      </SafeAreaView>
      <FloatButton />
    </>
  );
}
