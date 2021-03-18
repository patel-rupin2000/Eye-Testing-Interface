import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Modal1 from '../Dashboard/initial';
import Check from '../Dashboard/checks';
import Mcq from '../Dashboard/mcq';
import ShowNumber from '../Dashboard/eye';
import SearchScreen from './search'
const Stack = createStackNavigator();

function MyStack() {
  
  return (
    <Stack.Navigator initialRouteName="Home1">
      <Stack.Screen name="Home1" component={Modal1} options={{headerShown: false}} />
      <Stack.Screen name="check" component={Check} options={{headerShown: false}} />
      <Stack.Screen name="Mcq" component={Mcq} options={{headerShown: false}} />
      <Stack.Screen name="Show Number" component={ShowNumber} options={{headerShown: false}} />
      <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: false}} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default MyStack;

