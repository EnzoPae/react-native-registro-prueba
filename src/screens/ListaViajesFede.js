import React, { useState, useEffect, useContext, useMemo } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { ListItem, Icon } from '@rneui/themed';
import { AxiosContext } from '../contexts/AxiosContext'
import ModalAlert from '../components/ModalAlert';
import Spinner from '../components/Spinner';
import { SafeAreaView } from 'react-native';
export default function ListaViajesFede() {
  const isFocused = useIsFocused()
  const { authAxios } = useContext(AxiosContext)
  const [expandedItems, setExpanded] = useState([])
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [msj, setMsj] = useState(null)
  useEffect(() => {
    if (isFocused) {
      const getTrips = async () => {
        try {
          setLoading(true)
          const response = await authAxios.get('/api/trips')
          setTrips(response.data)
        } catch (error) {
          setError(true)
          setMsj(error.response.data.msj)
        } finally {
          setLoading(false)
        }
      }
      getTrips()
    } else {
      setError(false)
      setLoading(false)
      setTrips([])
    }
  }, [isFocused])
  if(loading) return <Spinner/>
  return (
    <SafeAreaView>
      {!loading ? trips.map((v, i) => {
        return (
          <ListItem.Accordion
            key={`accordion${i}`}
            content={
              <>
                <Icon name="place" size={30} />
                <ListItem.Content>
                  <ListItem.Title>{v.desc_localidad_o} - {v.desc_localidad_d}</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expandedItems.includes(i)}
            onPress={() => {
              if (expandedItems.includes(i)) {
                setExpanded(expandedItems.filter(id => id !== i));
              } else {
                setExpanded([...expandedItems, i]);
              }
            }}
          >
            {/*CONTENIDO DEL ACORDION*/}
            <ListItem key={`item${i}`} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>*Origen</ListItem.Title>
                <ListItem.Subtitle>{v.desc_localidad_o}</ListItem.Subtitle>
                <ListItem.Title>*Destino</ListItem.Title>
                <ListItem.Subtitle>{v.desc_localidad_d}</ListItem.Subtitle>
                <ListItem.Title>*Fecha</ListItem.Title>
                <ListItem.Subtitle>{String(v.fecha_viaje).split('T')[0]} - {String(v.fecha_viaje).split('T')[1].slice(0,8)}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </ListItem.Accordion>
        )
      }) : null}
      <ModalAlert
        modalVisible={error}
        setModalVisible={setError}
        msj={msj} />
    </SafeAreaView>
  )
}
