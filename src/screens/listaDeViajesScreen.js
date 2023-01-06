import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  Alert,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager
} from "react-native";
import { Colors } from "../styles/Colors";
import { Avatar } from "@rneui/themed";

//Navigation
import { useNavigation } from "@react-navigation/native";


const ExpandableComponent = ({item, onClickFunction}) => {
  const [layoutHeight, setlayoutHeight] = useState(0)

  useEffect(() => {
    if(item.isExpanded) {
      setlayoutHeight(null);
    } else {
      setlayoutHeight(0);
    }
  }, [item.isExpanded])
  

  return(
    <View>
      <TouchableOpacity 
        style={styles.item}
        onPress={onClickFunction}
        >
        <Text style={styles.itemText}>
          {item.category_name}
        </Text>

      </TouchableOpacity>
      <View style={{height: layoutHeight, overflow: 'hidden'}}>
      {
        item.subCategory.map((item, key) => (
          <View 
          key={key}
          style={styles.content}
          >
            <Text style={styles.text}>
              Id: {key} {"\n"} 
              Estado: {item.estado} {"\n"}
              Fecha: {item.fecha} {"\n"}
              Hora: {item.hora}hs {"\n"}
              Comentarios: {item.comentario} 
            </Text>
          </View>
        ))
      }
      </View>
    </View>
  ) 
}


const CONTENT = [
    {
      isExpanded: false,
      category_name: 'Viaje 1',
      subCategory: [
        {
          id: 0, 
          estado: 'Descargando',
          fecha: '03/07/2023',
          hora: '10:30',
          comentario: 'esto es un comentario',
        },
      ]
    },
    {
      isExpanded: false,
      category_name: 'Viaje 2',
      subCategory: [
        {
          id: 1, 
          estado: 'Cargando',
          fecha: '15/07/2023',
          hora: '18:00',
          comentario: 'esto es un comentario mejor que el anterior',
        },
      ]
    },
    {
      isExpanded: false,
      category_name: 'Viaje 3',
      subCategory: [
        {
          id: 2, 
          estado: 'Finalizado',
          fecha: '25/07/2023',
          hora: '10:30',
          comentario: 'esto es un comentario, que buen comentario',
        },
      ]
    },
    {
      isExpanded: false,
      category_name: 'Viaje 4',
      subCategory: [
        {
          id: 3, 
          estado: 'Descargando',
          fecha: '03/07/2023',
          hora: '10:30',
          comentario: 'esto es un comentario',
        },
      ]
    },
    {
      isExpanded: false,
      category_name: 'Viaje 5',
      subCategory: [
        {
          id: 4, 
          estado: 'Cargando',
          fecha: '15/07/2023',
          hora: '18:00',
          comentario: 'esto es un comentario mejor que el anterior',
        },
      ]
    },
    {
      isExpanded: false,
      category_name: 'Viaje 6',
      subCategory: [
        {
          id: 5, 
          estado: 'Finalizado',
          fecha: '25/07/2023',
          hora: '10:30',
          comentario: 'esto es un comentario, que buen comentario',
        },
      ]
    },
  ]




const ListaDeViajesScreen = () => {
  const nav = useNavigation();
 
  const [multiSelect, setmultiSelect] = useState(false)

  const [listDataSource, setlistDataSource] = useState(CONTENT)

  if(Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if(multiSelect) {
      //multiple select is enable
      array[index]['isExpanded'] = !array[index]['isExpanded']
    }else {
      //simple select is enable
      array.map((value, placeindex) =>
      placeindex === index
      ? (array[placeindex]['isExpanded']) = !array[placeindex]['isExpanded']
      : (array[placeindex]['isExpanded']) = false
      );
    }
    setlistDataSource(array)
  }



  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setmultiSelect(!multiSelect)}>
        <Text style={{textAlign: 'center', justifyContent:'center'}}>
          {
            multiSelect
            ? 'Multiple'
            : 'Individual'
          }
        </Text>
      </TouchableOpacity>
      <ScrollView style={{width: '100%'}}>
          {
            listDataSource.map((item, key) => (
              <ExpandableComponent
                key={item.category_name}
                item={item}
                onClickFunction={() => {
                  updateLayout(key)
                }}
              />
            ))
          }
      </ScrollView>
      





      <View style={styles.addBtn}>
        <TouchableOpacity onPress={() => nav.navigate("CrearViaje")}>
          <Avatar
            size={"large"}
            rounded={true}
            icon={{ name: "plus", type: "font-awesome" }}
            containerStyle={{ backgroundColor: Colors.primary, elevation: 10 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListaDeViajesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.grey,
  },
  addBtn: {
    position: "absolute",
    bottom: 30,
    right: 30,
    zIndex: 999,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  //listado
  item: {
    backgroundColor: Colors.white,
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#c8c8c8',
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'nunito'
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.lightBlue,
  },
  text: {
    fontSize: 14,
    padding: 10,
  },
});

{//MODAL
  /*
  const [modalVisible, setModalVisible] = useState(false);
    
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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Icon
                name="close"
                onPress={() => setModalVisible(!modalVisible)}
                containerStyle={{ position: "absolute", top: 5, right: 5 }}
              />
              <Icon
                containerStyle={{ position: "absolute", top: 15 }}
                name="warning"
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
          </View>
        </Modal>

        <MyButton label={"OpenModal"} onPress={() => setModalVisible(true)} />
      </View>*/
}

//List React-native Elements
