import React from "react";
import { Text, TouchableOpacity, View, Modal, StyleSheet, Alert } from "react-native";
import { Icon } from "@rneui/base";
import { Colors } from "../styles/Colors";

const TYPES = ["ok", "error"];

export default function ModalAlert({type, modalVisible, setModalVisible,msj }) {
  const modalType = TYPES.includes(type) ? type : "error";

  //Styles
  const btnStyles = {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    backgroundColor: modalType === 'ok' ? Colors.modalOk : Colors.modalError,
  }
  //const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Se recomienda cerrar la advertencia previo a cambiar de pantalla");
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
            name= {modalType === 'ok' ? 'checkmark-circle-outline' : 'warning'}
            type="ionicon"
            size={60}
            color={modalType === 'ok' ? Colors.modalOk : Colors.modalError}
          />
          <Text style={styles.modalText}>
            {msj ? msj :
            "Algo ha salido mal, intentalo nuevamente."}
          </Text>
          <TouchableOpacity
            style={btnStyles}
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
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: 300,
    height: 200,
    alignItems: "center",
    justifyContent: "flex-end",
    elevation: 8,
    overflow: "hidden",
    alignSelf: 'center',
    marginVertical: '50%'
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

