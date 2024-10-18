// components/UserMenu.js
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useMenu from '../hooks/useMenu';
import styles from '../components/styles/MenuStyles'; 


export default function UserMenu() {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const { userData, error } = useMenu();

  const openUserMenu = () => {
    setModalVisible(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setModalVisible(false);
    router.replace('/');
  };

return (
    <View>
      <TouchableOpacity onPress={openUserMenu} style={{ marginRight: 15 }}>
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>

      {modalVisible && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          {/* Fondo que cierra el modal al ser tocado */}
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>

          {/* Contenido del modal que no es interactivo */}
          <View style={styles.modalContent}>
            {userData && (
              <Text style={styles.modalText}>{userData.user.name}</Text>
            )}
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.modalTextLogout }>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
}