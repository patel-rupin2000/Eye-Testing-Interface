

import * as WebBrowser from 'expo-web-browser';
import MapView from 'react-native-maps'
import React, { useState, useEffect } from 'react';
import { Platform,Button, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';


export default function SearchScreen(props) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location.coords.latitude)
      })();
    }, []);
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
      

    }
    
      
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(`https://www.google.co.in/maps/search/eye+hospital/@${location.coords.latitude},${location.coords.longitude},13z/data=!3m1!4b1?hl=en&authuser=0`);
    setResult(result);
  };
  return (
    <View style={{paddingTop:20}} >
      <Button title="Open WebBrowser"  onPress={_handlePressButtonAsync} />
      
      <Text>{result && JSON.stringify(result)}</Text>
      
    </View>
  );
}