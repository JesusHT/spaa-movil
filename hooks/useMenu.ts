// hooks/useMenu.js
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


const useMenu = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          router.replace('/');
          throw new Error('Token no encontrado');
        }

        const URL_API_USER_AUTH = 'http://localhost:4000/protected-route';
        const URL_API_USER_DATA = 'http://localhost:4000/api/usuarios/';

        const authResponse = await fetch(URL_API_USER_AUTH, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!authResponse.ok) {
          throw new Error('No se pudo obtener los datos de autenticación');
        }

        const authData = await authResponse.json();
        const id_auth = authData.message.id_auth;

        const userResponse = await fetch(`${URL_API_USER_DATA}${id_auth}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error('No se pudo obtener los datos del usuario');
        }

        const userData = await userResponse.json();

        setUserData({
          auth: authData.message,
          user: userData.body[0],
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  return {
    userData,
    error,
  };
};

export default useMenu;
