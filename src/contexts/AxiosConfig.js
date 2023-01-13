import React, {createContext, useContext} from 'react';
import axios from 'axios';
import config from '../constants';
import {AuthContext} from './AuthContext';

const AxiosContext = createContext();
const {Provider} = AxiosContext;

const AxiosProvider = ({children}) => {
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
        /*Aca se deberia mandar para otra pantalla
        o hacer alguna accion que lo mande para otro lado*/
        console.log('Intercepo 401')
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