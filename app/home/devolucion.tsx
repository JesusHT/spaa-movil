import React from 'react';
import { View, Text } from 'react-native';
import styles from '@/components/styles/GlobalStyles';

export default function DevolucionScreen() {
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}>Pantalla de Devolución</Text>
      <Text style={styles.paragraph}>
        Aquí puedes gestionar las devoluciones.
      </Text>
    </View>
  );
}