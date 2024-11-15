import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Profile } from '@/models/ProfileModel';
import { API_ROUTES } from '@/config/routes';

const useMenu = () => {
  const [userData, setUserData] = useState<Profile | null>(null);
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

        const authResponse = await fetch(API_ROUTES.AUTH, {
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

        const userResponse = await fetch(`${API_ROUTES.DATA}${id_auth}`, {
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
      } catch (error: any) {
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
