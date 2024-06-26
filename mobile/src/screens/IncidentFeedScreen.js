// mobile/src/screens/IncidentFeedScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Picker  } from 'react-native';
import incidentService from '../services/incidentService';

const IncidentFeedScreen = ({ navigation }) => {
  const [incidents, setIncidents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchIncidents();
  }, [incidents, selectedCategory]);

  const fetchIncidents = () => {
    incidentService.getIncidents(selectedCategory)
      .then(response => {
        setIncidents(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.incidentCard}>
      <Text style={styles.incidentType}>{item.type}</Text>
      <Text style={styles.incidentDescription}>{item.description}</Text>
      <Text style={styles.incidentLocation}>{`Location: (${item.location.latitude}, ${item.location.longitude})`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Report Incident" onPress={() => navigation.navigate('ReportIncident')} />
      <Picker
        selectedValue={selectedCategory}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
      >
        <Picker.Item label="All" value="" />
        <Picker.Item label="Accident" value="Accident" />
        <Picker.Item label="Fighting" value="Fighting" />
        <Picker.Item label="Rioting" value="Rioting" />
      </Picker>
      <FlatList
        data={incidents}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  incidentCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  incidentType: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  incidentDescription: {
    fontSize: 16,
    marginVertical: 8,
  },
  incidentLocation: {
    fontSize: 14,
    color: '#555',
  },
});

export default IncidentFeedScreen;
