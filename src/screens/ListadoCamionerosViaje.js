import React, { useState, useContext, useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
//Components
import { ListItem, Icon } from "@rneui/themed";
import Spinner from "../components/Spinner";
import MyButton from "../components/MyButton";
import ModalAlert from "../components/ModalAlert";
//API
import { AxiosContext } from "../contexts/AxiosContext";
//Styles
import { tripListStyles } from "../styles/GlobalStyles";

export default function ListadoCamionerosViaje({ route }) {
    const trip = route.params
    const isFocused = useIsFocused()
    const { authAxios } = useContext(AxiosContext)
    const [drivers,setDrivers] = useState([])
    const [expandedItems, setExpanded] = useState([]);
    const [loading, setLoading] = useState(false)
    //ModalAlert
    const [modalVisible, setModalVisible] = useState(false);
    const [msj, setMsj] = useState(null);
    const [modalType, setModalType] = useState('error')

    useEffect(()=>{
        if(!isFocused){
            setExpanded([])
            setModalVisible(false)
            setMsj(null)
            setDrivers([])
        }else{
            setDrivers(trip.drivers)
        }
    },[isFocused])

    const handleDesVinc = async (id_equipo) => {
        try {
            setLoading(true)
            const api_response = await authAxios.post('/api/app/trips/remove-driver', {
                id_equipo,
                id_viaje: trip.id
            })
            if (api_response.status === 200) {
                //Quito el elemento eliminado del arreglo
                let filteredArr = drivers.filter(function(driver) {
                    return driver.id_equipo  !== id_equipo;
                  });
                console.log(filteredArr)
                setDrivers(filteredArr)
                setModalVisible(true);
                setMsj(api_response.data.msj);
                setModalType('ok')
            }
        } catch (error) {
            console.log(`Error en handleDesVinc: ${error}`)
            setModalVisible(true);
            setMsj(error.response.data?.msj ?
                error.response.data.msj : 'Algo salió mal');
            setModalType('error')
        } finally {
            setLoading(false)
        }
    }
    if (loading) return <Spinner />;
    //console.log(drivers)
    return (
        <SafeAreaView>
            <ScrollView style={{ width: "100%" }}>
                {drivers.map((d, i) => {
                    return (
                        <ListItem.Accordion
                            topDivider
                            key={`accordion${i}`}
                            content={
                                <>
                                    <Icon name="chevron-right" size={25} />
                                    <ListItem.Content>
                                        <ListItem.Title style={tripListStyles.itemStyle}>
                                            {d.apenom}
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
                            <ListItem key={`item${i}`} bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Subtitle>
                                        Camion: {d.camion}{"\n"}
                                        Batea: {d.batea}{"\n"}
                                        Dni: {d.dni}{"\n"}
                                    </ListItem.Subtitle>
                                    <MyButton
                                        label={'Desasignar'}
                                        onPress={() => {
                                            handleDesVinc(d.id_equipo)
                                        }}
                                    />
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
        </SafeAreaView>
    );
};
