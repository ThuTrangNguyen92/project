import React, { useEffect, useState } from 'react';
import { View, Text, WebView } from 'react-native';

const Driver = () => {
  const [driverId, setDriverId] = useState('');
  const [latitude, setLatitude] = useState('initial_value');
  const [longitude, setLongitude] = useState('initial_value');

  useEffect(() => {
    // Your initialization logic here, if needed

    // Initial update
    updateDriverLocation();

    // Periodically update the driver's location every 10 seconds
    const interval = setInterval(updateDriverLocation, 10000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const updateDriverLocation = async () => {
    try {
      // Simulate fetching driver location from the device
      const { latitude, longitude } = await useCurrentLocation();

      setLatitude(latitude);
      setLongitude(longitude);

      // Log the updated location
      console.log('Location updated successfully:', latitude, longitude);

      // Update the server with the new location
      await sendLocationToServer(latitude, longitude);
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  };

  const sendLocationToServer = async (latitude, longitude) => {
    try {
      // Simulate sending location data to the server
      const formData = new FormData();
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('driverId', driverId);

      const response = await fetch('http://your-server-url/driver/update-location', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        console.log('Location updated successfully on the server!');
      }
    } catch (error) {
      console.error('Error updating location on the server:', error);
    }
  };

  const useCurrentLocation = () => {
    // Implement your logic to get the current location in React Native
    // You can use the Geolocation API or any other suitable library
    // For simplicity, I'll return a mock location here
    return Promise.resolve({ latitude: 0, longitude: 0 });
  };

  return (
    <View>
      <Text>Booking information</Text>
      <WebView
        source={{ html: '<div id="map" style="height: 400px;"></div>' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

export default Driver;
