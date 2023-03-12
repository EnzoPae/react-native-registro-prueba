import React,{useState} from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
//Formik & Yup
import { Formik } from "formik";
import { recoverPassValidationSchema } from "../Schemas/recoverPassSchema";
//Styles
import { login } from "../styles/GlobalStyles";
import { Colors } from "../styles/Colors";
//Components
import { Input, Icon } from "@rneui/themed";
import MyButton from "../components/MyButton";
import Spinner from "../components/Spinner";
import ModalAlert from "../components/ModalAlert";
//Hooks
import { useModal } from "../hooks/useModal";
//API
import { sendUserMail } from "../api/userAPI";
const RecoverPassword = () => {
  const[loading,setLoading] = useState(false)
  const {
    setShowModal,
    showModal,
    modalType,
    msjModal,
    handleError,
    handleSucces } = useModal()
  const initialValues = {
    email: null,
  };
  const handleSendUserMail = async (values) => {
    setLoading(true);
    try {
      const api_response = await sendUserMail(values.email)
      console.log(api_response.status)
      console.log(api_response.data)
      if (api_response.status === 201) {
        const msj = api_response.data.msj
        handleSucces(msj)
      }else{
        handleError('Algo salio mal')
      }
    } catch (error) {
      console.log(`Error enviando mail: ${error}`)
      const msj = error.response.data.msj ? error.response.data.msj : 'Algo salió mal.'
      handleError(msj)
    } finally {
      setLoading(false);
    }
  }
  if (loading) return <Spinner />;
  return (
    <SafeAreaView style={login.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={recoverPassValidationSchema}
        onSubmit={handleSendUserMail}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <ScrollView
              style={{ width: "100%" }}
              contentContainerStyle={{ alignItems: "center" }}
            >
              <View style={login.marginBox}>
                <View style={login.titleBox}>
                  <Text style={login.title}>Recuperar Contraseña</Text>
                  <Text style={login.subTitle}>Ingrese su email</Text>
                </View>
                <Input
                  name="email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  inputContainerStyle={login.inputContainerStyle}
                  placeholder="Email"
                  placeholderTextColor={Colors.grey}
                  leftIcon={<Icon name="email" size={20} />}
                  leftIconContainerStyle={login.leftIconContainerStyle}
                  inputStyle={login.inputStyle}
                  keyboardType="email-address"
                  errorMessage={errors.email && touched.email && errors.email}
                  errorStyle={login.errorStyle}
                />
                <MyButton label={"ENVIAR"} onPress={handleSubmit} />
              </View>
            </ScrollView>
          </>
        )}
      </Formik>
      <ModalAlert
        type={modalType}
        modalVisible={showModal}
        setModalVisible={setShowModal}
        msj={msjModal}
      />
    </SafeAreaView>
  );
};

export default RecoverPassword;
