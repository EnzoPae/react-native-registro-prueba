import React, { useState } from 'react'
import { ListItem, Icon } from '@rneui/themed';
export default function ListaViajesFede() {
  const [expanded, setExpanded] = useState(false)
  const viajes = [
    {
      id: 0,
      desc: "San Nicolas - Rosario",
      data: {
        estado: "Descargando",
        fecha: "03/07/2023",
        hora: "10:30",
        comentario: "esto es un comentario",
      }
    },
    {
      id: 1,
      desc: "San Pedro - Mendoza",
      data: {
        estado: "En viaje",
        fecha: "07/03/2023",
        hora: "17:40",
        comentario: "Viaje Urea Granulada",
      }
    },
    {
      id: 2,
      desc: "Chacra la k-g-ta - Rosario",
      data: {
        estado: "Finalizado",
        fecha: "03/07/2023",
        hora: "10:30",
        comentario: "esto es un comentario",
      }
    },
  ]
  return (
    <>
      {viajes.map((v, i) => {
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
