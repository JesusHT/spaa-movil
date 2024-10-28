import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Career } from '@/models/CareerModel';

const useCareer = () => {
  const [careerData, setCareerData] = useState<Career[]>([]);
  const [error, setError] = useState<string | null>(null);
  const URL_API_CAREER_DATA = 'http://localhost:4000/api/carreras/';

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        const response = await fetch(URL_API_CAREER_DATA, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('No se pudo obtener los datos de autenticación');
        }

        const CareerData = await response.json();

        if (Array.isArray(CareerData.body)) {
          setCareerData(CareerData.body);
        } else {
          throw new Error('La estructura de los datos de carrera es incorrecta');
        }
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchCareerData();
  }, []);

  return {
    careerData,
    error,
  };
};

export default useCareer;
