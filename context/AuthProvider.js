import React, { useState, createContext } from "react";
import * as SecureStore from 'expo-secure-store'
import axiosConfig from '../helpers/axiosConfig'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        isLoading,
        login: (email, password) => {
          setIsLoading(true)
          // Communicate with the backend and store in Secure Store
          axiosConfig
            .post(`/login`, {email, password, device_name: 'mobile'})
            .then(response => {
              // console.log(response.data.data)
              const userResponse = {
                id: response.data.user.id,
                token: response.data.token,
                name: response.data.user.name,
                username: response.data.user.username,
                email: response.data.user.email,
                avatar: response.data.user.avatar
              }
              setUser(userResponse)
              SecureStore.setItemAsync('user', JSON.stringify(userResponse))
              setError(null)
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error.response)
              const key = Object.keys(error.response.data.errors)[0];
              setError(error.response.data.errors[key][0]); 
              setIsLoading(false);
            });
        },
        logout: () => {
          axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
          axiosConfig
            .post(`/logout`)
            .then(response => {
              // console.log(response.data.data)
              setUser(null)
              SecureStore.deleteItemAsync('user')
              setIsLoading(false);
            })
            .catch((error) => {
              setUser(null)
              SecureStore.deleteItemAsync('user')
              setIsLoading(false);
            });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
