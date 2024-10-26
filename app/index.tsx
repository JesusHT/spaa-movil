import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLogin } from '@/hooks/useLogin';
import styles from '@/components/styles/LoginStyles';

export default function LoginScreen() {
  const [workerNumber, setWorkerNumber] = useState<number | ''>('');
  const [password, setPassword] = useState<string>('');
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const router = useRouter();

  const { loading, error, login } = useLogin(router);

  const handleLogin = () => {
    if (workerNumber !== '') {
      login(workerNumber, password);
    }
  };

  const parseNumber = (value : string) => {
    if (/^\d+$/.test(value)) {
      setWorkerNumber(Number(value));
    } else {
      setWorkerNumber('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.loginTitle}>Iniciar Sesión</Text>

        {error !== '' && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <TextInput
          id="workerNumber"
          style={styles.input}
          placeholder="No. de Trabajador"
          placeholderTextColor="#fff"
          value={workerNumber.toString()}
          onChangeText={(value) => { parseNumber(value); }}
          keyboardType="numeric"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            id="password"
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
