import React, { useState, useContext, useEffect } from "react";
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
//Components
import { StatusBar } from "expo-status-bar";
import { Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MyButton from "../components/MyButton";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Spinner from "../components/Spinner";
import ModalAlert from "../components/ModalAlert";
import { SelectList } from 'react-native-dropdown-select-list'
//Styles
import { Colors } from "../styles/Colors";
import { login } from "../styles/GlobalStyles";
//Formik & Yup
import { crearViajeValidationSchema } from "../Schemas/crearViajeValidationSchema";
import { Formik } from "formik";
//API
import { AxiosContext } from "../contexts/AxiosContext";
const ActViajeScreen = ({ route }) => {
    const viajeParam = route.params
    const [initialValues,setInitialValues] = useState({
        distancia: null,
        cantidad: null,
        comentarios: null,
    })
    const { authAxios } = useContext(AxiosContext);
    const isFocused = useIsFocused()
    const [date, setDate] = useState(new Date(1598051730000));
    const [loading, setLoading] = useState(false)
    const [loadingLocalidadesD, setLoadingLocalidadesD] = useState(false)
    const [loadingLocalidadesO, setLoadingLocalidadesO] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [msjModal, setMsjModal] = useState(null)
    const [modalType, setModalType] = useState('error')
    const [provincias, setProvincias] = useState([])
    const [localidadesD, setLocalidadesD] = useState(undefined)
    const [localidadesO, setLocalidadesO] = useState(undefined)
    const [origen, setOrigen] = useState({
        id_provincia: null,
        id_localidad: null,
    })
    const [destino, setDestino] = useState({
        id_provincia: null,
        id_localidad: null,
    })
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode("date");
    };

    const showTimepicker = () => {
        showMode("time");
    };

    //Func que se ejecuta cuando se aprieta crear viaje
    const handleUpdateTrip = async (values) => {
        if (!origen.id_localidad || !origen.id_provincia || !destino.id_localidad || !destino.id_provincia) {
            setModalType('error')
            setMsjModal('Faltan completar datos del origen o destino.')
            setModalVisible(true)
            return
        }
        const merged = { ...values, date, origen, destino,id:viajeParam.id };
        try {
            console.log('first')
            const api_response = await authAxios.patch("/api/trips", merged);
            if (api_response.status) {
                setModalType('ok')
                setMsjModal('Viaje actualizado con exito.')
                setModalVisible(true)
            }
        } catch (error) {
            console.log(`Error creando viaje: ${error}`);
            setModalType('error')
            setMsjModal('Error interno del servidor.')
            setModalVisible(true)
        }
    };
    //Pedir provincias a la API
    const getProvincias = async () => {
        setLoading(true)
        try {
            const response = await authAxios.get("/api/locations/provincias")
            setProvincias(response.data)
        } catch (error) {
            console.log(error)
            setModalType('error')
            setMsjModal('Error obteniendo provincias')
            setModalVisible(true)
        } finally {
            setLoading(false)
        }
    }
    /*
    Cuando se selecciona una provincia
    se filtran las localidades por id de provincia
    */
    const handleSelectProvincia = async (selector) => {
        try {
            if (selector === 'd') {
                setLoadingLocalidadesD(true)
                const response = await authAxios.get(`/api/locations/localidades?id=${destino.id_provincia}`)
                setLocalidadesD(response.data)
            } else {
                setLoadingLocalidadesO(true)
                const response = await authAxios.get(`/api/locations/localidades?id=${origen.id_provincia}`)
                setLocalidadesO(response.data)
            }
        } catch (error) {
            setModalType('error')
            setMsjError('Error obteniendo provincias')
            setModalVisible(true)
        } finally {
            setLoadingLocalidadesO(false)
            setLoadingLocalidadesD(false)
        }
    }
    const handleLoad = async()=>{
        setInitialValues({
            ...initialValues,
            distancia: String(viajeParam.kilometros),
            cantidad: String(viajeParam.camiones_cantidad),
            comentarios: viajeParam.obs
        })
        setDate(new Date(viajeParam.fecha_viaje))
        setOrigen({
            id_provincia: viajeParam.id_prov_o,
            id_localidad: viajeParam.id_localidad_o
        })
        setDestino({
            id_provincia: viajeParam.id_localidad_d,
            id_localidad: viajeParam.id_localidad_d
        })
    }
    useEffect(() => {
        if (isFocused) {
            console.log(viajeParam)
            handleLoad()
            getProvincias()
        } else {
            setInitialValues({
                distancia: null,
                cantidad: null,
                comentarios: null,
            })
            setOrigen({
                id_provincia: null,
                id_localidad: null,
            })
            setDestino({
                id_provincia: null,
                id_localidad: null,
            })
            setLoading(false)
            setModalVisible(false)
            setMsjModal(null)
        }
    }, [isFocused])

    if (loading) return <Spinner />

    return (
        <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={crearViajeValidationSchema}
                onSubmit={(values) => handleUpdateTrip(values)}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                }) => (
                    <>
                        <ScrollView style={{ width: "100%" }}>
                            <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                                    <SelectList
                                        setSelected={(val) => setOrigen({
                                            ...origen,
                                            id_provincia: val
                                        })}
                                        onSelect={() => handleSelectProvincia('o')}
                                        data={provincias}
                                        search={true}
                                        notFoundText={'No hay resultados'}
                                        searchPlaceholder={'Buscar provincia'}
                                        placeholder={'Provincia'}
                                        defaultOption={{
                                            key: viajeParam.id_prov_o,
                                            value: viajeParam.desc_prov_o
                                        }}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                                    {!loadingLocalidadesO ? !origen.id_provincia ? <Text>Seleccione una provincia...</Text> :
                                        <SelectList
                                            setSelected={(val) => setOrigen({
                                                ...origen,
                                                id_localidad: val
                                            })}
                                            data={localidadesO}
                                            search={true}
                                            notFoundText={'No hay resultados'}
                                            searchPlaceholder={'Buscar localidad'}
                                            placeholder={'Localidad'}
                                            defaultOption={{
                                                key: viajeParam.id_localidad_o,
                                                value: viajeParam.desc_localidad_o
                                            }}
                                        />
                                        : <Text>Cargando localidades...</Text>}
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                                    <SelectList
                                        setSelected={(val) => setDestino({
                                            ...destino,
                                            id_provincia: val
                                        })}
                                        onSelect={() => handleSelectProvincia('d')}
                                        data={provincias}
                                        search={true}
                                        notFoundText={'No hay resultados'}
                                        searchPlaceholder={'Buscar provincia'}
                                        placeholder={'Provincia'}
                                        defaultOption={{
                                            key: viajeParam.id_prov_d,
                                            value: viajeParam.desc_prov_d
                                        }}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                                    {!loadingLocalidadesD ? !destino.id_provincia ? <Text>Seleccione una provincia...</Text> :
                                        <SelectList
                                            setSelected={(val) => setDestino({
                                                ...destino,
                                                id_localidad: val
                                            })}
                                            //onSelect={handleSelectProvincia}
                                            data={localidadesD}
                                            //save="value"
                                            search={true}
                                            notFoundText={'No hay resultados'}
                                            searchPlaceholder={'Buscar localidad'}
                                            placeholder={'Localidad'}
                                            defaultOption={{
                                                key: viajeParam.id_localidad_d,
                                                value: viajeParam.desc_localidad_d
                                            }}
                                        />
                                        : <Text>Cargando localidades...</Text>}
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Input
                                        name="distancia"
                                        onChangeText={handleChange("distancia")}
                                        onBlur={handleBlur("distancia")}
                                        value={values.distancia}
                                        containerStyle={[login.containerStyle, { width: '50%' }]}
                                        inputContainerStyle={login.inputContainerStyle}
                                        inputStyle={login.inputStyle}
                                        label={"Distancia"}
                                        labelStyle={login.labelStyle}
                                        keyboardType={"numeric"}
                                        leftIcon={<Icon name="map-marker-right" size={25} />}
                                        leftIconContainerStyle={login.leftIconContainerStyle}
                                        errorMessage={
                                            errors.distancia && touched.distancia && errors.distancia
                                        }
                                        errorStyle={login.errorStyle}
                                    />
                                    <Input
                                        name="cantidad"
                                        onChangeText={handleChange("cantidad")}
                                        onBlur={handleBlur("cantidad")}
                                        value={values.cantidad}
                                        containerStyle={[login.containerStyle, { width: '50%' }]}
                                        inputContainerStyle={login.inputContainerStyle}
                                        inputStyle={login.inputStyle}
                                        label={"Cantidad de camiones"}
                                        labelStyle={login.labelStyle}
                                        keyboardType={"numeric"}
                                        leftIcon={<Icon name="truck-check" size={25} />}
                                        leftIconContainerStyle={login.leftIconContainerStyle}
                                        errorMessage={
                                            errors.cantidad && touched.cantidad && errors.cantidad
                                        }
                                        errorStyle={login.errorStyle}
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                        alignItems: 'baseline',
                                        marginBottom: 30,
                                    }}
                                >
                                    <TouchableOpacity
                                        style={styles.dateButtom}
                                        onPress={showDatepicker}
                                        title="Show date picker!"
                                    >
                                        <Text>Fecha</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.dateButtom}
                                        onPress={showTimepicker}
                                        title="Show time picker!"
                                    >
                                        <Text>Hora</Text>
                                    </TouchableOpacity>
                                    <Text>{String(date.toISOString()).split("T")[0]} -{" "}
                          {String(date.toISOString()).split("T")[1].slice(0, 8)}</Text>
                                </View>
                                <Input
                                    name={'comentarios'}
                                    onChangeText={handleChange("comentarios")}
                                    onBlur={handleBlur("comentarios")}
                                    value={values.comentarios}
                                    style={{ textAlignVertical: "top" }}
                                    containerStyle={login.containerStyle}
                                    inputContainerStyle={login.inputContainerStyle}
                                    inputStyle={[login.inputStyle, { marginTop: 5, marginLeft: 10 }]}
                                    label={"Comentarios"}
                                    labelStyle={login.labelStyle}
                                    multiline={true}
                                    numberOfLines={5}
                                    textAlignVertical={"top"}
                                />
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <MyButton
                                    label={"ACTUALIZAR VIAJE"}
                                    onPress={handleSubmit}
                                />
                            </View>
                        </ScrollView>
                    </>
                )}
            </Formik>
            <ModalAlert
                type={modalType}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                msj={msjModal} />
            <StatusBar style="light" backgroundColor={Colors.primary} />
        </SafeAreaView>
    );
};

export default ActViajeScreen;

const styles = StyleSheet.create({
    dateButtom: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.white,
        borderRadius: 5,
        elevation: 3,
    },
});