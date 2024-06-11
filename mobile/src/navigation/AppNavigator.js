// mobile/src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ReportIncidentScreen from '../screens/ReportIncidentScreen';
import IncidentFeedScreen from '../screens/IncidentFeedScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IncidentFeed">
        <Stack.Screen name="IncidentFeed" component={IncidentFeedScreen} options={{ title: 'Incident Feed' }} />
        <Stack.Screen name="ReportIncident" component={ReportIncidentScreen} options={{ title: 'Report Incident' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
