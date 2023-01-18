import React, { useState, useEffect, useContext, useMemo } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { ListItem, Icon } from '@rneui/themed';
import { AxiosContext } from '../contexts/AxiosContext'
import { Text } from 'react-native';
export default function ListaViajesFede() {
  const isFocused = useIsFocused()
  const { authAxios } = useContext(AxiosContext)
  const [expanded, setExpanded] = useState(false)
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    if (isFocused) {
      console.log('first')
      const getTrips = async () => {
        try {
          setLoading(true)
          const response = await authAxios.get('/api/trips')
          setTrips(response.data)
        } catch (error) {
          //TODO mostrar ERROR
          setError(true)
          console.log(error.response.data.msj)
        } finally {
          setLoading(false)
        }
      }
      getTrips()
    }
  }, [isFocused])

  return (
    //TODO mostrar cargando
    <>
      {trips.map((v, i) => {
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
      })}
    </>
  )
}
