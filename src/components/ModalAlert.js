import React, { useState } from "react";
import { Text, TouchableOpacity, View, Modal, StyleSheet } from "react-native";
import { Icon } from "@rneui/base";
import { Colors } from "../styles/Colors";

const TYPES = ["ok", "error"];

export default function ModalAlert({ children, onPress, type, modalVisible, setModalVisible }) {
  console.log(modalVisible)
  const modalType = TYPES.includes(type) ? type : "error";

  //const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Icon
            name="close"
            onPress={() => setModalVisible(!modalVisible)}
            containerStyle={{ position: "absolute", top: 5, right: 5 }}
          />
          <Icon
            containerStyle={{ position: "absolute", top: 15 }}
            name= {modalType === 'ok' ? 'plus' : 'warning'}
            type="ionicon"
            size={60}
            color={"#ec4b4b"}
          />
          <Text style={styles.modalText}>
            Algo ha salido mal, intentalo nuevamente.
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    marginTop: 10,
    textAlign: "center",
    width: "80%",
    fontFamily: "nunito",
    fontSize: 14,
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: 300,
    height: 200,
    alignItems: "center",
    justifyContent: "flex-end",
    elevation: 8,
    overflow: "hidden",
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  buttonClose: {
    backgroundColor: "#ec4b4b",
  },
})

