import { useState } from 'react';
import { Router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const URL_API_LOGIN = "http://192.168.1.70:4000/api/auth/login";

export const useLogin = (router: Router) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (workerNumber : number, password : string) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(URL_API_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          worker_number: workerNumber,
          password: password,
        }),
        credentials: 'include',
      });

      const res = await response.json();
      const data = res.body;

      if (response.ok) {
        const token = data.token;

        if (data.id_role === 3) {
          setError("Pidele al encargado que te de los privilegios necesarios para creear prestamos.");
          return;
        }

        await AsyncStorage.setItem('token', token);
        router.push('/home/');
      } else {
        setError(data || 'Ocurrió un error al iniciar sesión');
      }
    } catch (err : any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login };
};
