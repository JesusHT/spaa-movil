import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../components/styles/LoginStyles'; 

export default function LoginScreen() {
  const [workerNumber, setWorkerNumber] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const URL_API_LOGIN = "http://localhost:4000/api/auth/login";

  const handleLogin = async () => {
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
          Alert.alert('Error', 'Pidele al encargado que te de los privilegios necesarios para creear prestamos.');
          return 0;
        }

        // Guarda el token en AsyncStorage
        await AsyncStorage.setItem('token', token);


        router.push('/home/home');
      } else {
        // Maneja errores
        setError(data || 'Ocurrió un error al iniciar sesión');
        Alert.alert('Error', data || 'Ocurrió un error al iniciar sesión');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
      Alert.alert('Error', 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.loginTitle}>Iniciar Sesión</Text>

        {error !== '' && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="No. de Trabajador"
          placeholderTextColor="#fff"
          value={workerNumber}
          onChangeText={setWorkerNumber}
          keyboardType="numeric"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Contraseña"
            placeholderTextColor="#fff"
            secureTextEntry={hidePassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setHidePassword(!hidePassword)}
          >
            <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}