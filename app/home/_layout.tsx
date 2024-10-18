import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './home';
import PrestamosScreen from './prestamos';
import DevolucionScreen from './devolucion';
import UserMenu from '../../components/UserMenu'; // Importa el componente del menú de usuario

const Tab = createBottomTabNavigator();

export default function HomeLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Prestamos') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Devolucion') {
            iconName = focused ? 'return-down-back' : 'return-down-back-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#017C50',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#fff' },
        headerLeft: () => (
          <Image
            source={require('../../assets/images/logo.png')}
            style={{ width: 40, height: 40, marginLeft: 10 }}
          />
        ),
        // Solución: headerRight necesita retornar una función que devuelva JSX
        headerRight: () => {
          return <UserMenu />;
        },
        headerTitle: '',
        headerStyle: { backgroundColor: '#EEF0EE' },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen
        name="Prestamos"
        component={PrestamosScreen}
        options={{ title: 'Préstamos' }}
      />
      <Tab.Screen
        name="Devolucion"
        component={DevolucionScreen}
        options={{ title: 'Devolución' }}
      />
    </Tab.Navigator>
  );
}