import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Signature from '@/utils/Signature';
import styles from '@/components/styles/FormStyles';
import useCareer from '@/hooks/useCareer';
import useInventory from '@/hooks/useInventory';
import { useBorrow } from '@/hooks/useBorrow';
import { Borrow, BorrowedItem } from '@/models/BorrowModel';
import { Ionicons } from '@expo/vector-icons';

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
  const [errors, setErrors] = useState({
    applicant: false,
    num_account: false,
    id_career: false,
    semester: false,
    teacher: false,
    practice_name: false,
    email: false,
    items: false,
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    // Paso 1: Validar campos
    if (step === 1) {
      const newErrors = {
        applicant: !formData.applicant,
        num_account: !formData.num_account,
        id_career: !formData.id_career,
        semester: !formData.semester,
        teacher: !formData.teacher,
        practice_name: !formData.practice_name,
        email: !formData.email,
        items: false,
      };

      setErrors(newErrors);

      // Verifica si hay errores
      if (Object.values(newErrors).includes(true)) {
        return;
      }      

      // Avanzar al siguiente paso
      setStep(step + 1);
    }

    // Paso 2: Validar si se ha agregado al menos un artículo
    if (step === 2) {
      if (borrowedItems.length === 0) {
        setErrors((prevErrors) => ({ ...prevErrors, items: true }));
        console.log("Error en paso 2: No hay artículos");
        return;
      }

      setStep(step + 1);
    }
  };

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
    setErrors({
      applicant: false,
      num_account: false,
      id_career: false,
      semester: false,
      teacher: false,
      practice_name: false,
      email: false,
      items: false,
    });
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
      setTimeout(() => {
        resetForm();
      }, 5000);
    } else {
      setAlertMessage(response.error);
    }
  };

  const [quantityError, setQuantityError] = useState(false); // Para controlar el error de cantidad
  const [availableStock, setAvailableStock] = useState<number | null>(null); // Para almacenar el stock disponible

  const handleAddItem = () => {
    const selectedItem = inventoryData.find(item => item.id_inventory === Number(id_inventory));

    if (selectedItem && id_inventory && quantity) {
      const quantityNumber = Number(quantity);

      // Validar si la cantidad excede el stock disponible
      if (quantityNumber > selectedItem.stock) {
        setQuantityError(true);
        setAvailableStock(selectedItem.stock); // Establecer el stock disponible
        Alert.alert('Error', 'La cantidad solicitada excede el stock disponible.');
        return;
      } else {
        setQuantityError(false);
        setAvailableStock(null); // Limpiar el mensaje de stock disponible
      }

      // Si la cantidad solicitada es 1, ajustarla automáticamente
      if (selectedItem.stock === 1) {
        setQuantity('1'); // Establecer la cantidad a 1 automáticamente
      }

      // Verificar si la cantidad solicitada supera el stock disponible en los artículos prestados
      const totalBorrowedQuantity = borrowedItems.reduce((acc, item) => {
        return item.id_inventory === selectedItem.id_inventory ? acc + item.quantity : acc;
      }, 0);

      if (totalBorrowedQuantity + quantityNumber > selectedItem.stock) {
        Alert.alert('Error', 'La cantidad solicitada excede el stock disponible.');
        return;
      }

      // Si todo está bien, agregar el artículo a la lista
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

      {/* Mensajes de error global */}
      {(Object.values(errors).includes(true) && step === 1) && (
        <Text style={styles.errorText}>Por favor, llena todos los campos requeridos.</Text>
      )}
      {(errors.items && step === 2) && (
        <Text style={styles.errorText}>Por favor, agrega al menos un artículo.</Text>
      )}

      {step === 1 && (
        <>
          {/* Datos del alumno */}
          <Text style={styles.sectionTitle}>Datos del Alumno</Text>
          <Text style={styles.label}>Solicitante</Text>
          <TextInput
            id='applicant'
            style={[styles.input, errors.applicant && styles.errorInput]}
            value={formData.applicant}
            onChangeText={(text) => handleInputChange('applicant', text)}
            placeholder="Nombre del solicitante"
          />

          <Text style={styles.label}>Número de Cuenta</Text>
          <TextInput
            id='num_account'
            style={[styles.input, errors.num_account && styles.errorInput]}
            value={formData.num_account}
            onChangeText={(text) => handleInputChange('num_account', text)}
            placeholder="Número de cuenta"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Carrera</Text>
          <Picker
            id='id_career'
            selectedValue={formData.id_career}
            style={[styles.input, errors.id_career && styles.errorInput]}
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
            style={[styles.input, errors.semester && styles.errorInput]}
            value={formData.semester}
            onChangeText={(text) => handleInputChange('semester', text)}
            placeholder="Semestre"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Profesor</Text>
          <TextInput
            id='teacher'
            style={[styles.input, errors.teacher && styles.errorInput]}
            value={formData.teacher}
            onChangeText={(text) => handleInputChange('teacher', text)}
            placeholder="Nombre del profesor"
          />

          <Text style={styles.label}>Nombre de la Práctica</Text>
          <TextInput
            id='practice_name'
            style={[styles.input, errors.practice_name && styles.errorInput]}
            value={formData.practice_name}
            onChangeText={(text) => handleInputChange('practice_name', text)}
            placeholder="Nombre de la práctica"
          />

          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            id='email'
            style={[styles.input, errors.email && styles.errorInput]}
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
            style={[styles.input, quantityError && styles.errorInput]}  
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Cantidad"
            keyboardType="numeric"
          />
          {quantityError && availableStock !== null && (
            <Text style={styles.errorText}>Cantidad disponible: {availableStock}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleAddItem}>
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Artículos Agregados</Text>
          {borrowedItems.map((item, index) => {
            const itemDetail = inventoryData.find(invItem => invItem.id_inventory === item.id_inventory);
            const itemName = itemDetail ? itemDetail.name : 'Artículo Desconocido';
            return (
              <View key={index} style={styles.itemContainer}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemText}>{`${itemName} (ID: ${item.id_inventory})`}</Text>
                  <Text style={styles.itemText}>{`Cantidad: ${item.quantity}`}</Text>
                </View>
        
                <View style={styles.deleteColumn}>
                  <TouchableOpacity onPress={() => handleRemoveItem(index)} style={styles.deleteButton}>
                    <Ionicons name="trash" size={24} color="red" />
                  </TouchableOpacity>
                </View>
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
