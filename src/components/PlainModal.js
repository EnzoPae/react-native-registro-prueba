import React from "react";
import { View, Modal, StyleSheet, Alert } from "react-native";
import { Icon } from "@rneui/base";
import { Colors } from "../styles/Colors";

export default function PlainModal({showModal, setShowModal,children }) {
  return (
    <View style={{width:100}}>
      <Modal
        animationType="fade"
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          Alert.alert("Se recomienda cerrar la advertencia previo a cambiar de pantalla");
          setShowModal(!showModal);
        }}
      >
        <View style={styles.modalView}>
          <Icon
            name="close"
            onPress={() => setShowModal(!showModal)}
            containerStyle={{ position: "absolute", top: 5, right: 5 }}
          />
            {children}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: '85%',
    height: '70%',
    alignItems: "center",
    justifyContent: "flex-end",
    elevation: 8,
    overflow: "hidden",
    alignSelf: 'center',
    marginVertical: '20%'
  },
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
    fontSize: 14,
  },
})

