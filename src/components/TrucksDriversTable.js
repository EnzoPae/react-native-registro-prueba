import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Navigation,
} from "react-native";
import { ListItem } from "@rneui/base";
import Spinner from "./Spinner";
import { AxiosContext } from "../contexts/AxiosContext";
const TruckDriverItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>
          {String(item.camion).toUpperCase()} -{" "}
          {String(item.batea).toUpperCase()}
        </ListItem.Title>
        <ListItem.Subtitle>{item.apenom}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  </TouchableOpacity>
);
export default function TrucksDriversTable({ handleLinkTruckDriver }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { authAxios } = useContext(AxiosContext);

  const fetchTrucksDrivers = async () => {
    try {
      setLoading(true);
      const api_response = await authAxios.get("/api/app/vehicles");
      setData(api_response.data);
    } catch (error) {
      setError("Error al recuperar camiones");
    } finally {
      setLoading(false);
    }
  };
  const filteredData = data.filter((item) =>
    item.apenom.toLowerCase().includes(search.toLowerCase())||
    item.camion.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchTrucksDrivers();
  }, []);

  const handleClik = (item) => {
    handleLinkTruckDriver(item.id);
  };

  const confirmClick = (item) => {
    Alert.alert(
      "Confirmación",
      `${item.camion.toUpperCase()} - ${item.batea.toUpperCase()} ${"\n"}${
        item.apenom
      }`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Asignacion de camión cancelada"),
        },
        {
          text: "Confirm",
          onPress: () => handleClik(item),
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => {
    return <TruckDriverItem item={item} onPress={() => confirmClick(item)} />;
  };
  if (loading) return <Spinner />;
  if (error)
    return (
      <SafeAreaView>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Asignar Camión</Text>
      <TextInput
        style={{}}
        placeholder="Buscar..."
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        onPress={() => handleClik(data)}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    width: "90%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
