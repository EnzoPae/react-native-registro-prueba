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
  const [expanded, setExpanded] = useState(false)
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
                  <ListItem.Title>{v.desc}</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expanded}
            onPress={() => {
              setExpanded(!expanded);
            }}
          >
            {/*CONTENIDO DEL ACORDION*/}
            <ListItem key={`item${i}`} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>*Estado</ListItem.Title>
                <ListItem.Subtitle>{v.data.estado}</ListItem.Subtitle>
                <ListItem.Title>*Fecha</ListItem.Title>
                <ListItem.Subtitle>{v.data.fecha} {v.data.hora}</ListItem.Subtitle>
                <ListItem.Title>*Observaciones</ListItem.Title>
                <ListItem.Subtitle>{v.data.comentario}</ListItem.Subtitle>
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
