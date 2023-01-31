//AuthContext.js
import React, {createContext, useState,useEffect} from 'react';
import * as SecureStore from 'expo-secure-store';
import jwt from 'jwt-decode'
const AuthContext = createContext(null);
const {Provider} = AuthContext;

const AuthProvider = ({children}) => {
  useEffect(()=>{
    const loadToken = async ()=>{
      const token_str = await SecureStore.getItemAsync('token')
      if(token_str){
        const token = (token_str.slice(15)).slice(0,-1)
        const User = jwt(token)
        setAuthState({
          accessToken:token,
          authenticated: true,
          userName: User.userName,
        });
      }else{
        setAuthState({
          accessToken:null,
          authenticated: false,
          userName: null
        });        
      }
    }
    loadToken()
  },[])
  const [authState, setAuthState] = useState({
    accessToken: null,
    authenticated: null,
    userName: null,
  });

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');
    setAuthState({
      accessToken: null,
      authenticated: false,
      userName:null,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export {AuthContext, AuthProvider};