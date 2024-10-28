import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import UserMenu from '@/components/UserMenu';

import HomeScreen from '@/app/home/index';
import InventoryScreen from '@/app/home/inventory';
import DevolucionScreen from '@/app/home/devolucion';

const Tab = createBottomTabNavigator();

export default function HomeLayout() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName : any;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Inventario') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Devolucion') {
            iconName = focused ? 'return-down-back' : 'return-down-back-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#017C50',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#fff' }
        ,

        headerLeft: () => (
          <Image
            source={require('@/assets/images/logo.png')}
            style={{ width: 40, height: 40, marginLeft: 10 }}
          />
        ),

        headerRight: () => {
          return <UserMenu />;
        },
        
        headerStyle: { backgroundColor: '#EEF0EE' },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Préstamos' }}
      />
      <Tab.Screen
        name="Devolucion"
        component={DevolucionScreen}
        options={{ title: 'Devolución' }}
      />
      <Tab.Screen
        name="Inventario"
        component={InventoryScreen}
        options={{ title: 'Inventario' }}
      />
    </Tab.Navigator>
  );
}