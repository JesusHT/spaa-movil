import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import styles from '../../components/styles/HomeStyles'; // Importa los estilos desde el archivo externo

export default function HomeScreen() {
  // Variables de estado para manejar los datos del formulario
  const [nombreSolicitante, setNombreSolicitante] = useState('');
  const [noCuenta, setNoCuenta] = useState('');
  const [semestre, setSemestre] = useState('');
  const [areaCarrera, setAreaCarrera] = useState('');
  const [fechaRecibe, setFechaRecibe] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [nombreEquipo, setNombreEquipo] = useState('');
  const [marcaMedidas, setMarcaMedidas] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [nombrePractica, setNombrePractica] = useState('');
  const [nombreProfesor, setNombreProfesor] = useState('');

  // Función para manejar la entrada en el campo No. de Cuenta
  const handleNoCuentaChange = (text: string) => {
    // Remueve cualquier carácter no numérico
    const numericText = text.replace(/[^0-8]/g, '');

    // Limita la longitud máxima a 9 caracteres
    if (numericText.length <= 8) {
      setNoCuenta(numericText);
    }

    // Verificar si se alcanza el límite de caracteres
    if (numericText.length > 8) {
      Alert.alert('Límite', 'El número de cuenta no puede exceder los 8 caracteres.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario de Solicitud</Text>

      {/* Datos del Solicitante */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre del Solicitante:</Text>
        <TextInput
          style={styles.input}
          value={nombreSolicitante}
          onChangeText={setNombreSolicitante}
          placeholder="Ingresa el nombre del solicitante"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>No. de Cuenta:</Text>
        <TextInput
          style={styles.input}
          value={noCuenta}
          onChangeText={handleNoCuentaChange}
          placeholder="Ingresa el número de cuenta"
          keyboardType="numeric" // Muestra un teclado numérico
          maxLength={8} // Establece el límite de 9 caracteres
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Semestre:</Text>
        <TextInput
          style={styles.input}
          value={semestre}
          onChangeText={setSemestre}
          placeholder="Ingresa el semestre"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Área o Carrera:</Text>
        <TextInput
          style={styles.input}
          value={areaCarrera}
          onChangeText={setAreaCarrera}
          placeholder="Ingresa el área o carrera"
        />
      </View>

      {/* Fechas */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha que recibe:</Text>
        <TextInput
          style={styles.input}
          value={fechaRecibe}
          onChangeText={setFechaRecibe}
          placeholder="Ingresa la fecha de recepción"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha que entrega:</Text>
        <TextInput
          style={styles.input}
          value={fechaEntrega}
          onChangeText={setFechaEntrega}
          placeholder="Ingresa la fecha de entrega"
        />
      </View>

      {/* Equipos */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Cant.</Text>
        <TextInput
          style={styles.input}
          value={cantidad}
          onChangeText={setCantidad}
          placeholder="Cantidad"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre del equipo, Maquina, Herramientas:</Text>
        <TextInput
          style={styles.input}
          value={nombreEquipo}
          onChangeText={setNombreEquipo}
          placeholder="Ingresa el nombre del equipo"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Marca y/o Medidas:</Text>
        <TextInput
          style={styles.input}
          value={marcaMedidas}
          onChangeText={setMarcaMedidas}
          placeholder="Marca y/o Medidas"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Observaciones:</Text>
        <TextInput
          style={styles.input}
          value={observaciones}
          onChangeText={setObservaciones}
          placeholder="Observaciones"
        />
      </View>

      {/* Información adicional */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>
          Nombre de la Practica, Trabajo o Servicio en que se ocupa:
        </Text>
        <TextInput
          style={styles.input}
          value={nombrePractica}
          onChangeText={setNombrePractica}
          placeholder="Nombre de la práctica"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>
          Nombre del Profesor responsable de la Practica, Trabajo o Servicio:
        </Text>
        <TextInput
          style={styles.input}
          value={nombreProfesor}
          onChangeText={setNombreProfesor}
          placeholder="Nombre del profesor"
        />
      </View>
    </ScrollView>
  );
}