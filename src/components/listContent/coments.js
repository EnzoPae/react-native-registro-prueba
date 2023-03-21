import React from 'react'
import { View, Text } from 'react-native'

const Coments = ({title, text}) => {
  return (
    <View style={{width: '100%'}}>
        <Text style={{fontWeight:'bold'}}>{title}</Text>
        <Text style={{fontSize: 12}}>{text}</Text>
    </View>
  )
}

export default Coments