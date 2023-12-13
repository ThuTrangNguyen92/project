import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Booking = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [seats, setSeats] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  // Declare the latitude and longitude states for pickup and dropoff locations
  const [pickupLatitude, setPickupLatitude] = useState(null);
  const [pickupLongitude, setPickupLongitude] = useState(null);
  const [dropoffLatitude, setDropoffLatitude] = useState(null);
  const [dropoffLongitude, setDropoffLongitude] = useState(null);
  
  const getPickupGPS = async () => {
    if (pickupLocation.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:5005/mobile/passenger/gps', {
        address: pickupLocation,
      });

      const { latitude, longitude } = response.data;
      setPickupLatitude(latitude);
      setPickupLongitude(longitude);
    } catch (error) {
      console.error('Error getting pickup GPS:', error.message);
    }
  };

  
  const handleBookNow = async () => {
    try {
      // Prepare the booking data
      const bookingData = {
        name,
        phone,
        seats,
        pickupLocation,
        dropoffLocation,
        pickupLatitude,
        pickupLongitude,
        dropoffLatitude,
        dropoffLongitude,
      };

      // Make a POST request to the mobile dispatcher endpoint
      const response = await axios.post('http://localhost:5005/mobile/dispatcher/booking', bookingData);

      const { success, message } = response.data;

      if (success) {
        // Handle successful booking, navigate to a success screen or show a success message
        console.log('Booking successful!');
      } else {
        // Handle failed booking, show an error message, etc.
        console.error('Booking failed:', message);
      }
    } catch (error) {
      // Handle network error, server unreachable, etc.
      console.error('Error booking:', error.message);
    }
  };

  const handlePickupLocationChange = (text) => {
    // Implement your logic to handle changes in pickup location
    setPickupLocation(text);
    // You can add geocoding logic here to get coordinates for the pickup location
    // and update the map accordingly
  };

  const handleDropoffLocationChange = (text) => {
    // Implement your logic to handle changes in dropoff location
    setDropoffLocation(text);
    // You can add geocoding logic here to get coordinates for the dropoff location
    // and update the map accordingly
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please enter the information below for booking</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Seats of car"
        value={seats}
        onChangeText={(text) => setSeats(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Pickup Location"
        value={pickupLocation}
        onChangeText={handlePickupLocationChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Dropoff Location (optional)"
        value={dropoffLocation}
        onChangeText={handleDropoffLocationChange}
      />
      {/* MapView component */}
      <MapView style={styles.map} initialRegion={{ latitude: 10.776889, longitude: 106.700897, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
        {/* Marker for pickup location */}
        {pickupLocation && <Marker coordinate={{ latitude: pickupLatitude, longitude: pickupLongitude }} />}
        {/* Marker for dropoff location */}
        {dropoffLocation && <Marker coordinate={{ latitude: dropoffLatitude, longitude: dropoffLongitude }} pinColor="red" />}
      </MapView>
      <TouchableOpacity style={styles.button} onPress={handleBookNow}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
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
  },
  map: {
    height: 200,
    marginBottom: 12,
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
});

export default Booking;
