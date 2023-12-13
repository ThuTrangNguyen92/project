import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Booking from './screens/Booking';
import Driver from './screens/Driver';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Driver">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="Driver" component={Driver} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
