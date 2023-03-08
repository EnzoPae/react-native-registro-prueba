import React from 'react'
import { View, Text } from 'react-native'

const Coments = ({coments}) => {
  return (
    <View style={{width: '100%'}}>
        <Text style={{fontWeight:'bold'}}>Comentarios:</Text>
        <Text style={{fontSize: 12}}>{coments}</Text>
    </View>
  )
}

export default Coments