import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from "@react-navigation/drawer";


import StartScreen from './start';
import React ,{ useState, useEffect, useRef,useCallback, } from "react";
import {Provider} from 'react-redux';
import ApiKeys from './constants';
import smtk from './src/Screens/stack';
import { View, Image, Alert, Button, StyleSheet, Text ,ImageBackground,TouchableHighlight} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MapScreen from './src/Screens/map'
import SearchScreen from './src/Screens/search'
import AsyncStorage from '@react-native-async-storage/async-storage';

var firebase = require("firebase");
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from "react-native-paper";

import { Store } from './redux/app-redux';

import AuthScreen from './auth';
import Search from "./src/Screens/search";
//import User from './navigate';


//const Tabs = AnimatedTabBarNavigator();







function RootNavigator(props,{navigation})

{


  const Drawers = createDrawerNavigator();
  function DrawerContent(props,{ navigation }) {

   const clearAppData = async() =>{
      try {
      await AsyncStorage.getAllKeys()
  .then(keys => AsyncStorage.multiRemove(keys))
  .then(()=>AsyncStorage.clear())
  .then(() => alert('All Keys removed'))
    
          
          
          .then(()=>props.navigation.navigate("Auth"));
      } catch (error) {
          console.error('Error clearing app data.');
      }
  }

  
  
    return (
      <ImageBackground  source={require("./src/Screens/bg.jpg")} style={styles.image}>
      <DrawerContentScrollView {...props}>
        <View>
        <View style={styles.userInfoSection}>
        <Avatar.Image source={require("./avtar.png")} style={{backgroundColor:"transparent"}}
              size={25}
            />
          <Text style={{color:"white",fontSize:16}}>  Hello </Text>
          
    
  
        </View>
  
          <View>
            <Image
              source={require("./assets/logo.png")}
              style={{
                height: 200,
                width: 200,
                justifyContent: "center",
                alignSelf: "center",
                paddingTop: 10,
                marginTop: 15,
              }}
            ></Image>
          </View>
          <Drawer.Section style={{ marginTop: 15,flexDirection:"column",alignContent:"flex-start",marginLeft:"15%"}}>
            <DrawerItem
              label="Dashboard"
              labelStyle={{color:"white",fontWeight:"bold",fontSize:18}}
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
                        <DrawerItem
              label="Map"
              labelStyle={{color:"white",fontWeight:"bold",fontSize:18}}
              onPress={() => {
                props.navigation.navigate("Map");
              }}
            />
        



          </Drawer.Section>
        </View>
        <Button  title = "LOGOUT" onPress = {() =>clearAppData()} color = "black"/>
        <View style={{backgroundColor:"transparent",alignSelf:"center",paddingTop:"60%",flexDirection:"row"}}>
          
        </View>
      </DrawerContentScrollView>
      </ImageBackground>
    );
  }

  

  
  
  
  if (!firebase.apps.length){
    firebase.initializeApp(ApiKeys.FirebaseConfig);
    
  }



  return (
    <Provider store={Store}>
    
    <NavigationContainer>
      <Drawers.Navigator drawerContent={props => <DrawerContent {...props} />} backBehavior={false}   >
        <Drawers.Screen name="Start" component={StartScreen} />
        <Drawers.Screen name="Auth" component={AuthScreen} />
        <Drawers.Screen name="Home" component={smtk} />
        <Drawers.Screen name="Map" component={MapScreen} />
        {/* <Drawers.Screen name="Search" component={SearchScreen} /> */}
        
        
      </Drawers.Navigator>
    </NavigationContainer>
    </Provider>
    
  );
  
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  userInfoSection: {
    alignSelf:"center",
    flexDirection:"row",

  },

});

export default RootNavigator;