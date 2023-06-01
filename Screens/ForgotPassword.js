import React, {useState} from "react";
import { View,TouchableOpacity,Text,StyleSheet,Alert,Button,TextInput} from "react-native";
import { SafeArea } from "../components/SafeArea";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { useState,useEffect,useCallback } from "react";
import { TextInput,Button } from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../settings/firebase.setting";
import { Formik } from "formik";
import * as yup from 'yup'; 


const validationRules = yup.object({
  email:yup.string().required('you must fill this field').min(5).max(36),
 
  
});
// // testing to see
//  const [email, setEmail] = useState('')
//  const [password, setPassword] = useState('')

//  const signIn = () => {
//   signInWithEmailAndPassword(auth, email, password);
//  }

export function ForgotPassword ({navigation}) {
    const [appIsReady, setAppIsReady] = useState(false);
    const [text, setText] = useState("");
    const [number, setNumber] = useState("");

    useEffect(() => {

        async function prepare() {
          try {
            await Font.loadAsync({Pacifico_400Regular});
            await new Promise(resolve => setTimeout(resolve, 2000));
          } catch (e) {
            console.warn(e);
          } finally {
            setAppIsReady(true);
          }
        }
    
        prepare();
      }, []);
    
      const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
          await SplashScreen.hideAsync();
        }
      }, [appIsReady]);
    
      if (!appIsReady) {
        return null;
      };

      // const LoginScreen = () => {
      //   const[email, setEmail] = useState('')
      //   const [password, setPassword] = useState('')
      // }

      // const handleLogin = () => {
      //   auth.signInWithEmailAndPassword(email, password)
      //   .then(userCredentials => {
      //   const user = userCredentials.user;
      //   console.log(user.email);
      //   });  
      // }
      
    
    return(
        <SafeArea>
            <View style={style.heding}>
                <Text style={style.title}>Charity App</Text>
                <Text style={style.title2}>Reset password</Text>

                  <TextInput
                      style={style.input}
                      label="Email"
                      mode="outlined"
                      value={text}
                      onChangeText={text => setText(text)}
                     />

                    <View style={style.button}>
                      <Button 
                      mode="contained" 
                      onPress={handleSubmit}>
                      Login
                      </Button>
                    </View>
                  
                  <View style={style.account}>
                    <Text >Remember your password? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                      <Text style={style.sign}>Sign up</Text>
                    </TouchableOpacity>
                  </View>
              </View>
          </SafeArea>
    )
}

const style = StyleSheet.create({
    heding:{ 
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:280
        },
    title:{
        fontSize:35,
        fontFamily:'Pacifico_400Regular'
         },
    title2:{
        marginTop:15
    },
    input:{
        marginTop:15,
        width:300
    },
    button:{
      marginTop:20,
      width:300,
      height:70
    },
    account:{
      flexDirection:'row'
    },
    sign:{
      
      color:'blue'
    },
});