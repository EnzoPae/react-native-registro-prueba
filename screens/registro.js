import React from "react";
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Input, Button } from "@rneui/themed";
import {getUsers} from '../api/userAPI';
const Registro = ({ navigation }) => {
  const handlePress = async() =>{
    try {
      const response = await getUsers()
      console.log(response.data)
      if(response.status === 200){
        console.log('Salio todo bien')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{justifyContent: 'center',
        alignItems: 'center'}}
        onPress={handlePress}
      >
        <Text>Press Here</Text>
      </TouchableOpacity>
      <Input placeholder="User" />
      <Input placeholder="Password" secureTextEntry={true} />
      <Input placeholder="Confirm Password" secureTextEntry={true} />
      <Button
        title="Registrarse"
        buttonStyle={{
          backgroundColor: "rgba(78, 116, 289, 1)",
          borderRadius: 7,
        }}
        containerStyle={{
          width: 350,
        }}
      />
      <Button
        onPress={() => navigation.navigate("Recuperar Password")}
        containerStyle={{
          width: 250,
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
        title="Olvidaste tu Contraseña"
        type="clear"
        titleStyle={{
          color: "rgba(78, 116, 289, 1)"
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
  },
});

export default Registro;
