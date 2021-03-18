import React,{ useState, useEffect } from 'react';
import {Text, View, StyleSheet, TouchableOpacity,Button} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import * as Location from 'expo-location';
import * as WebBrowser from 'expo-web-browser';
import { useFocusEffect } from '@react-navigation/native';
function ShowNumber({navigation}){
 

useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault(); // Prevent default action
      unsubscribe() // Unsubscribe the event on first call to prevent infinite loop
      navigation.navigate('Home1') // Navigate to your desired screen
    });
 }, [])





    
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
        <View>
            <Text>Your eye no is 6/6. </Text>
            <TouchableOpacity onPress={_handlePressButtonAsync}
       
            >
                    <View style={{paddingTop:20}} >
        
      
         {/* <Text>{result && JSON.stringify(result)}</Text> */}
      
    </View>
            <Text style={styles.textStyle}>Start Testing</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 20,
      elevation: 2,
      width: 155,
      alignSelf: 'center',
      marginTop: 25
      // paddingBottom: 20
    },
    // logo: {
    //     width: '75%',
    //     height: '50%',
    //     borderRadius: 20,
    //     alignContent: 'center',
    //     alignSelf: 'center',
    //     marginTop: 80
    //   }

});

export default ShowNumber;