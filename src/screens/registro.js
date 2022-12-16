import React from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Input } from "@rneui/themed";
import MyButton from "../components/MyButton";
import LinkButtom from "../components/LinkButtom";
import { Colors } from "../components/Colors";

const Registro = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Registro</Text>
      <Text style={styles.subTitleText}>
        Por favor ingresa los datos para poder resgistrarte
      </Text>
      <Input placeholder="Nombre" style={styles.roboto}/>
      <Input placeholder="Email" style={styles.roboto}/>
      <Input placeholder="Contraseña" secureTextEntry={true} style={styles.roboto}/>
      <Input placeholder="Confirmar contraseña" secureTextEntry={true} style={styles.roboto}/>
      <View style={{alignItems: 'center', paddingTop: 20, paddingBottom: 20}}>
      <MyButton label={'REGISTRARSE'} size={'large'}/>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <LinkButtom label={"¿Ya tienes una cuenta? "} type={"secondary"} />
        <LinkButtom
          onPress={() => alert("Go to the Login")}
          label={"Ingresa"}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: '25%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  titleText: {
    fontSize: 50,
    paddingBottom: 10,
    paddingLeft: 9,
    fontFamily: "roboto",
    color: Colors.primary,
  },
  subTitleText: {
    fontSize: 20,
    paddingBottom: 40,
    paddingLeft: 10,
    fontFamily: "roboto",
    color: Colors.secondary,
  },
  roboto: {
    fontFamily: 'roboto'
  }

});

export default Registro;
