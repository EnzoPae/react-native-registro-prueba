import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Spinner from "./Spinner";
import { AxiosContext } from "../contexts/AxiosContext";
import { Colors } from "../styles/Colors";
const TruckDriverItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    <View style={{ flexDirection: "row" }}>
    {
        /*
            <Text style={styles.text}>{String(item.camion).toUpperCase()}</Text>
            <Text>{` | `}</Text>
            <Text style={styles.text}>{String(item.batea).toUpperCase()}</Text>
            <Text>{` | `}</Text>
        */
    }
      <Text style={styles.text}>{String(item.apenom).toUpperCase()}</Text>
      <Text>{` | `}</Text>
      <Text style={styles.text}>{item.dni}</Text>
    </View>
  </TouchableOpacity>
);
export default function TrucksDriversTable({ handleLinkTruckDriver }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { authAxios } = useContext(AxiosContext);

  const fetchTrucksDrivers = async () => {
    try {
      setLoading(true);
      const api_response = await authAxios.get("/api/app/vehicles");
      setData(api_response.data);
    } catch (error) {
      setError("Error al recuperar choferes");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTrucksDrivers();
  }, []);

  const handleClik = (item) => {
    handleLinkTruckDriver(item.id);
  };

  const renderItem = ({ item }) => {
    return <TruckDriverItem item={item} onPress={() => handleClik(item)} />;
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
      <Text style={styles.title}>Asignar Chofer</Text>
      <FlatList
        data={data}
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
    width: '90%'
  },
  item: {
    padding: 5,
    backgroundColor: Colors.white,
    marginVertical: 3,
    borderRadius: 3,
    borderWidth: 0.5,
  },
  text: {
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
