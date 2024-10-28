import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Signature from '@/utils/Signature';
import styles from '@/components/styles/FormStyles';
import useCareer from '@/hooks/useCareer';
import useInventory from '@/hooks/useInventory';
import { useBorrow } from '@/hooks/useBorrow';
import { Borrow, BorrowedItem } from '@/models/BorrowModel';

export default function HomeScreen() {
  const { careerData } = useCareer(); 
  const { inventoryData, id_users } = useInventory(); 
  const { createBorrow, loading, error, success } = useBorrow(); 
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    applicant: '',
    num_account: '',
    id_career: '',
    semester: '',
    teacher: '',
    practice_name: '',
    email: '',
  });
  
  const [id_inventory, setIdInventory] = useState<string>('');
  const [quantity, setQuantity] = useState<string>(''); 
  const [borrowedItems, setBorrowedItems] = useState<BorrowedItem[]>([]);
  const signatureRef = useRef<any>(null);
  const [alertMessage, setAlertMessage] = useState('');

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const resetForm = () => {
    setFormData({
      applicant: '',
      num_account: '',
      id_career: '',
      semester: '',
      teacher: '',
      practice_name: '',
      email: '',
    });
    setBorrowedItems([]);
    setIdInventory('');
    setQuantity('');
    setStep(1);
    setAlertMessage('');
  };

  const handleSubmit = async () => {
    const borrowData: Borrow = {
      applicant: formData.applicant,
      num_account: Number(formData.num_account),
      id_career: Number(formData.id_career),
      semester: formData.semester,
      teacher: formData.teacher,
      practice_name: formData.practice_name,
      email: formData.email,
      borrowedItems,
      id_users,
    };

    const response = await createBorrow(borrowData);

    if (response.success) {
      setAlertMessage('Formulario enviado correctamente.');
      // Reiniciar el formulario después de 5 segundos
      setTimeout(() => {
        resetForm();
      }, 5000);
    } else {
      setAlertMessage(response.error);
    }
  };

  const handleAddItem = () => {
    const selectedItem = inventoryData.find(item => item.id_inventory === Number(id_inventory));
  
    if (selectedItem && id_inventory && quantity) {
      const quantityNumber = Number(quantity);
      
      const totalBorrowedQuantity = borrowedItems.reduce((acc, item) => {
        return item.id_inventory === selectedItem.id_inventory ? acc + item.quantity : acc;
      }, 0);
  
      if (totalBorrowedQuantity + quantityNumber > selectedItem.stock) {
        Alert.alert('Error', 'La cantidad solicitada excede el stock disponible.');
        return;
      }
      
      setBorrowedItems([...borrowedItems, { id_inventory: selectedItem.id_inventory, quantity: quantityNumber }]);
      setIdInventory('');
      setQuantity('');
    } else {
      Alert.alert('Error', 'Por favor selecciona un producto y proporciona una cantidad.');
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = borrowedItems.filter((_, i) => i !== index);
    setBorrowedItems(updatedItems);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Barra de progreso */}
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${(step / 3) * 100}%` }]} />
      </View>

      {alertMessage ? (
        <Text style={{ color: success ? 'green' : 'red' }}>{alertMessage}</Text>
      ) : null}

      {step === 1 && (
        <>
          {/* Datos del alumno */}
          <Text style={styles.sectionTitle}>Datos del Alumno</Text>
          <Text style={styles.label}>Solicitante</Text>
          <TextInput
            id='applicant'
            style={styles.input}
            value={formData.applicant}
            onChangeText={(text) => handleInputChange('applicant', text)}
            placeholder="Nombre del solicitante"
          />

          <Text style={styles.label}>Número de Cuenta</Text>
          <TextInput
            id='num_account'
            style={styles.input}
            value={formData.num_account}
            onChangeText={(text) => handleInputChange('num_account', text)}
            placeholder="Número de cuenta"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Carrera</Text>
          <Picker
            id='id_career'
            selectedValue={formData.id_career}
            style={styles.input}
            onValueChange={(itemValue) => handleInputChange('id_career', itemValue)}
          >
            <Picker.Item label="Selecciona tu carrera" value="" />
            {careerData.map((career) => (
              <Picker.Item key={career.id_career} label={career.name} value={career.id_career.toString()} />
            ))}
          </Picker>

          <Text style={styles.label}>Semestre</Text>
          <TextInput
            id='semester'
            style={styles.input}
            value={formData.semester}
            onChangeText={(text) => handleInputChange('semester', text)}
            placeholder="Semestre"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Profesor</Text>
          <TextInput
            id='teacher'
            style={styles.input}
            value={formData.teacher}
            onChangeText={(text) => handleInputChange('teacher', text)}
            placeholder="Nombre del profesor"
          />

          <Text style={styles.label}>Nombre de la Práctica</Text>
          <TextInput
            id='practice_name'
            style={styles.input}
            value={formData.practice_name}
            onChangeText={(text) => handleInputChange('practice_name', text)}
            placeholder="Nombre de la práctica"
          />

          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            id='email'
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            placeholder="Correo electrónico"
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Avanzar</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 2 && (
        <>
          {/* Artículos prestados */}
          <Text style={styles.sectionTitle}>Artículos Prestados</Text>
          
          <Text style={styles.label}>Selecciona un Producto</Text>
          <Picker
            selectedValue={id_inventory}
            style={styles.input}
            onValueChange={(itemValue) => setIdInventory(itemValue)}
          >
            <Picker.Item label="Selecciona un producto" value="" />
            {inventoryData.map((item) => (
              <Picker.Item key={item.id_inventory} label={`${item.name} - Stock: ${item.stock}`} value={item.id_inventory.toString()} />
            ))}
          </Picker>

          <Text style={styles.label}>Cantidad</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Cantidad"
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleAddItem}>
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>

          {/* Mostrar la lista de artículos prestados */}
          <Text style={styles.sectionTitle}>Artículos Agregados</Text>
          {borrowedItems.map((item, index) => {
            const itemDetail = inventoryData.find(invItem => invItem.id_inventory === item.id_inventory);
            const itemName = itemDetail ? itemDetail.name : 'Artículo Desconocido';
            return (
              <View key={index}>
                <Text>{`${itemName} (ID: ${item.id_inventory}), Cantidad: ${item.quantity}`}</Text>
                <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                  <Text style={styles.removeButton}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            );
          })}

          <View style={styles.navigationButtons}>
            <TouchableOpacity style={styles.button} onPress={handleBack}>
              <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Avanzar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {step === 3 && (
        <>
          {/* Firma */}
          <Text style={styles.sectionTitle}>Firma</Text>
          <Signature ref={signatureRef} />

          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Enviando...' : 'Enviar'}</Text>
          </TouchableOpacity>

          <View style={styles.navigationButtons}>
            <TouchableOpacity style={styles.button} onPress={handleBack}>
              <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}
