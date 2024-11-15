import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Borrow } from '@/models/BorrowModel';
import { API_ROUTES } from '@/config/routes';

export const useBorrow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const createBorrow = async (borrowData: Borrow) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        setError('No se encontró el token de autenticación');
        return { success: false, error: 'No se encontró el token de autenticación' };
      }

      const response = await fetch(API_ROUTES.BORROW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(borrowData),
      });

      if (response.ok) {
        setSuccess(true);
        return { success: true };
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.message || 'Ocurrió un error al crear el préstamo');
        return { success: false, error: errorResponse.message || 'Ocurrió un error al crear el préstamo' };
      }
    } catch (err) {
      setError('Error de red o del servidor');
      return { success: false, error: 'Error de red o del servidor' };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, createBorrow };
};
