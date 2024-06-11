// mobile/src/screens/ReportIncidentScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import incidentService from '../services/incidentService';

const ReportIncidentScreen = ({ navigation }) => {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const submitIncident = () => {
    incidentService.createIncident({
      type,
      description,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    }).then(response => {
      Alert.alert('Incident Reported', 'Your incident has been reported successfully.');
      navigation.navigate('IncidentFeed');
    }).catch(error => {
      Alert.alert('Error', 'There was an error reporting the incident.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Incident Type</Text>
      <TextInput style={styles.input} value={type} onChangeText={setType} placeholder="Accident, Fighting, etc." />

      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Describe the incident" multiline />

      <Text style={styles.label}>Location</Text>
      <TextInput style={styles.input} value={latitude} onChangeText={setLatitude} placeholder="Latitude" keyboardType="numeric" />
      <TextInput style={styles.input} value={longitude} onChangeText={setLongitude} placeholder="Longitude" keyboardType="numeric" />

      <Button title="Submit Incident" onPress={submitIncident} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  }
});

export default ReportIncidentScreen;
