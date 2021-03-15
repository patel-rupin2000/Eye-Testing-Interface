import React ,{useState, useEffect}from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {Text,ScrollView,Image,TextInput, View, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator,ImageBackground,Alert} from 'react-native';
import { Content } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthScreen (props){
  //AsyncStorage.clear().then(() => console.log('Cleared'))
	const [isEmailText, setIsEmailText]  = useState('') 
	const [isPassText, setIsPassText]  = useState('') 
	const [isValid, setIsValid] = useState(false)
	const [isLogin,setIsLogin] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
    const x = true
	const signUpHandler =  async(email, password) =>{
        setIsLoading(true)
        const response  =  await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyCa_ZzdIZDqpv6KFb1uVhmCyb3jNS9D04M",{
			method :'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				email,
				password,
				returnSecureToken:true
			})
        })

        const response2  =  await fetch("https://eyeapp-3b15e-default-rtdb.firebaseio.com/users.json",{
			method :'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				email
			})
        })


        
        const resData2 = await response2.json()
        console.log("resData2");
        console.log(resData2);

        setIsLoading(false)


        const resData = await response.json()
        console.log("resData");
        console.log(resData);
        

    }
    
	const loginHandler =   async (email, password) =>{
    
    
        setIsLoading(true)
        const response  =  await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyCa_ZzdIZDqpv6KFb1uVhmCyb3jNS9D04M",{
			method :'POST',
			headers:{
				'Content-Type':'application/json'
      },
      
			body:JSON.stringify({
				email,
				password,
				returnSecureToken:true
			})
        
    })
    const key=await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
    console.log("66666666666666");
    console.log(key);

        setIsLoading(false)
        


        const resData = await response.json()
        if(resData.registered){
          console.log("auth");

          const emailInfo={
            id:email
          }
     
          const saveDataToStorage = (token,userId,expirationDate,email) =>{
            AsyncStorage.setItem(
              'userData',JSON.stringify({
                token:token,
                userId:userId,
                expiryDate: expirationDate.toISOString(),
                emailId:email
              }))
          }
      
    
          
          props.navigation.navigate('Home',{data:email});
        
          
          const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000 )
          saveDataToStorage(resData.idToken,resData.localId, expirationDate,email)
          console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
          console.log(resData.idToken,resData.localId,email);
          console.log(expirationDate);
          console.log(emailInfo.id);
      
        
        
        }
 
        

	}

  
return (
  <ImageBackground source={require("./src/Screens/bg.jpg")} style={styles.image}>
	<KeyboardAvoidingView>
  <Image
                source={require("./assets/logo.png")}
                style={{
                  height: 200,
                  width: 200,
                  justifyContent: "center",
                  alignSelf: "center",
                  
                  marginTop:70,
                }}
              >

              </Image>
    <View>
      <Text style={{fontWeight:"bold",fontSize:40,color:"#27a5ef",justifyContent:"center",alignSelf:"center"}}>XXXXX</Text>
    </View>

	<ScrollView>
	<View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={isEmailText}
            onChangeText={text =>  setIsEmailText(text)}
            keyboardType = 'email-address' 
            
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={isPassText}
            onChangeText={text =>  setIsPassText(text)}
           	secureTextEntry = {x}
            
          />
          <View>
          	{isLoading ? <ActivityIndicator size = 'small' color = "black"/>:<Button title = {isLogin ? "Login" :'Sign Up'} onPress = {() =>{isLogin ? loginHandler(isEmailText,isPassText):signUpHandler(isEmailText,isPassText)}} color = "#27a5ef"/>}

          	<Button  title = {isLogin ? "Switch to SignUp" :"Switch to Login"} onPress = {() =>{setIsLogin(prevState => !prevState)}} color = "black"/>
          </View>
        </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </ImageBackground>
	)
};
const styles = StyleSheet.create({
    form: {
      margin: 50,
      marginTop:0,
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    formControl: {
      width: '100%'
    },
    label: {
      color:"white",
      marginVertical: 10
    },
    input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      color:"white"
    },
    loader:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
 
  }
  );