import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Inventory } from '@/models/InventoryModel';
import useMenu from '@/hooks/useMenu';
import { API_ROUTES } from '@/config/routes';

const useInventory = () => {
  const [inventoryData, setInventoryData] = useState<Inventory[]>([]);
  const [id_users, setIdUser] = useState(Number);
  const [error, setError] = useState<string | null>(null);
  const { userData } = useMenu();

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        const response = await fetch(API_ROUTES.INVENTORY, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('No se pudo obtener los datos de autenticación');
        }

        const InventoryData = await response.json();

        if (Array.isArray(InventoryData.body)) {
          const filteredInventory = Array.isArray(InventoryData.body) 
            ? InventoryData.body.filter((item: Inventory) => {
                return item.id_module === userData?.user.id_modules && item.stock !== 0;
              }) 
            : [];
          setIdUser(Number(userData?.user.id_users));
          setInventoryData(filteredInventory);
        } else {
          throw new Error('La estructura de los datos de carrera es incorrecta');
        }
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchInventoryData();
  }, [userData]);

  return {
    inventoryData,
    id_users,
    error
  };
};

export default useInventory;
