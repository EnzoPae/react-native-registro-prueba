import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
//Axios
import { AxiosContext } from "../contexts/AxiosContext";
//Components
import { ListItem, Input, Icon } from "@rneui/themed";
import Spinner from "../components/Spinner";
import ModalAlert from "../components/ModalAlert";
import { Colors } from "../styles/Colors";

const ListaDeCamionesScreen = () => {
  const isFocused = useIsFocused();
  const { authAxios } = useContext(AxiosContext);
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedItems, setExpanded] = useState([]);
  const [error, setError] = useState(false);
  const [msj, setMsj] = useState(null);
  //Filtro de busqueda
  const [search, setSearch] = useState("");
  /*
    Verificar si se esta viendo la pantalla mediante isFocused
  */
  //SEARCH
  const filteredTrucks = trucks.filter((t) =>
      t.camion.toLowerCase().includes(search.toLowerCase()) ||
      t.batea.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isFocused) {
      //Con el focus ya en la pantalla
      const getTrucks = async () => {
        try {
          setLoading(true);
          const response = await authAxios.get("/api/app/vehicles");
          setTrucks(response.data);
        } catch (error) {
          setError(true);
          setMsj(error.response.data.msj);
        } finally {
          setLoading(false);
        }
      };
      getTrucks();
    } else {
      /*
      Si se pierde el foco de la pantalla los
      estados vuelven a sus valores iniciales
    */
      setError(false);
      setLoading(false);
      setTrucks([]);
    }
  }, [isFocused]);
  if (loading) return <Spinner />;
  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.white, flex: 1, marginTop: -50 }}
    >
      <View style={{ marginTop: 50 }}>
        <ScrollView style={{ width: "100%" }}>
          <Input
            placeholder="Buscar"
            leftIcon={<Icon name="search" size={20} />}
            leftIconContainerStyle={{ height: 20, marginHorizontal: 5 }}
            onChangeText={(text) => setSearch(text)}
            value={search}
            containerStyle={{ width: 140, height: 41, marginVertical: 10 }}
            inputContainerStyle={s.inputContainerStyle}
            inputStyle={{ fontSize: 12, marginRight: 5 }}
          />
          {!loading
            ? filteredTrucks.map((v, i) => {
                return (
                  <ListItem.Accordion
                    key={`accordion${i}`}
                    containerStyle={{
                      borderLeftWidth: 0.5,
                      borderTopWidth: 0.5,
                      borderTopStartRadius: 20,
                      borderTopEndRadius: 20,
                    }}
                    content={
                      <>
                        <ListItem.Content>
                          <ListItem.Title>{v.camion.toUpperCase()} - {v.batea.toUpperCase()}</ListItem.Title>
                          <ListItem.Subtitle>{v.apenom}</ListItem.Subtitle>
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
                      <ListItem.Content style={{marginTop: -20}}>
                        <ListItem.Subtitle>Cuit chofer: {v.cuit}</ListItem.Subtitle>
                      </ListItem.Content>
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
      </View>
    </SafeAreaView>
  );
};

export default ListaDeCamionesScreen;

const s = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "#000",
    borderRadius: 20,
  },
});
