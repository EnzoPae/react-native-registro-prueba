import { useEffect, useState,useContext } from "react";
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    StatusBar
} from "react-native";
import Spinner from "./Spinner";
import { AxiosContext } from "../contexts/AxiosContext";
const TruckDriverItem = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
        <View style={{ flexDirection: 'row'}}>
            <Text>{item.camion}</Text>
            <Text>{` | `}</Text>
            <Text>{item.batea}</Text>
            <Text>{` | `}</Text>
            <Text>{item.apenom}</Text>
            <Text>{` | `}</Text>
            <Text>{item.dni}</Text>
        </View>
    </TouchableOpacity>
);
export default function TrucksDriversTable({handleLinkTruckDriver}) {    
    const [data,setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);
    const {authAxios} = useContext(AxiosContext)

    const fetchTrucksDrivers = async () => {
        try {
            setLoading(true)
            const api_response = await authAxios.get('/api/app/vehicles')
            setData(api_response.data)
        } catch (error) {
            setError('Error al recuperar choferes')
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchTrucksDrivers()
    }, [])

    const handleClik = (item) => {
        handleLinkTruckDriver(item.id)
    }

    const renderItem = ({ item }) => {

        return (
            <TruckDriverItem
                item={item}
                onPress={() => handleClik(item)}
            />
        );
    };
    if (loading) return <Spinner />;
    if(error) return <SafeAreaView><Text>{error}</Text></SafeAreaView>
    return (
        <SafeAreaView>
            <FlatList
                data={data}
                renderItem={renderItem}
                onPress={() => handleClik(data)}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});