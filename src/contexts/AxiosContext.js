import React, {createContext, useContext} from 'react';
import axios from 'axios';
import config from '../constants';
import {AuthContext} from './AuthContext';
import { useNavigation } from '@react-navigation/native';
const AxiosContext = createContext();
const {Provider} = AxiosContext;

const AxiosProvider = ({children}) => {
  const navigation = useNavigation()
  const authContext = useContext(AuthContext);
  const authAxios = axios.create({
    baseURL: config.BASE_URL,
  });
  const publicAxios = axios.create({
    baseURL: config.BASE_URL,
  });
  authAxios.defaults.withCredentials = true;
  authAxios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if(error.response.status === 401){
        /*Se deslogea al usuario*/
        navigation.navigate("Logout")
    }
      return Promise.reject(error);
    });
  authAxios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );
  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
    </Provider>
  );
};

export {AxiosContext, AxiosProvider};