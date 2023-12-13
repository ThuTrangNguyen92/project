import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from'./Signup';
require('dotenv').config();//cac bien moi truong truyen vao trong process.env
const SERVER_URL = process.env.SERVER_URL;

const Stack = createStackNavigator();

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSignIn = async () => {
    // Implement your sign-in logic here
    console.log('Signing in with:', username, password);
    // You can add your authentication logic here
    try {
      const response = await axios.post('${SERVER_URL} users/login', {
        email,
        password,
      });
      const { success, message } = response.data;
      if (success){
        navigation.navigate('Booking');
      } else {
        // Handle failed sign-in, show error message, etc.
        Alert.alert('Sign In Failed', message);
      }
    } catch (error) {
      console.error('Error signing in:', error.message);
      // Handle network error, server unreachable, etc.
      Alert.alert('Error', 'Unable to connect to the server.');
    }
  };

  const handleSignUp = () => {
    // Navigate to the Signup screen
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Passenger Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 10,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  signupButton: {
    marginTop: 16,
    backgroundColor: 'green', // Customize the color as needed
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;


{/* <View style={styles.container}>
      <Text style={styles.title}>Passenger Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View> */}