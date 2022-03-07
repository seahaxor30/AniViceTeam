import React from "react";
import { Text,View,Button,Alert,TouchableOpacity,StyleSheet,Dimensions} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { authenication } from "../firebase";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import Toast from 'react-native-toast-message';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const  SignUpScreen = ({navigation}) =>{
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const[name, setName] = React.useState('');
    const [isSignedin, setSignedin] = React.useState(false);

    const SignUpUser = () =>{
        createUserWithEmailAndPassword(authenication,email,password)
        .then((userCredential)=>{
            console.log(userCredential);
            const user = userCredential.user;
            updateProfile(user,{displayName:name})
            console.log(user.displayName);
            Toast.show({
              type: 'success',
              text1: 'Account Created :)',
              text2: 'Press "Have an account?" to login'
              });
            

            //console.log(user);
            //setSignedin(true);


            
        })
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode);
            console.error(errorMessage);

        })



    }


    
  return( 

    <KeyboardAwareScrollView>
        
        <SafeAreaView style = {styles.safearea}>
            <View style={{marginBottom:60}}>
            <Text style={{fontSize:30}}>
                Sign Up
            </Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value = {name}
                onChangeText={text => setName(text)}>
            </TextInput>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value = {email}
                onChangeText={text => setEmail(text)}>
            </TextInput>

            <TextInput
                style={styles.input}
                placeholder="Password"
                value = {password}
                onChangeText={text => setPassword(text)}>
            </TextInput>
            <View style={{marginTop: 20,width:"50%"}}>

            <TouchableOpacity style={styles.button}
            onPress={SignUpUser}>
            <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            </View>
            <View style={{marginTop: 20,width:"50%"}}>

            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate("Login")}
            >
            <Text style={styles.buttonText}>Have an account ?</Text>
            </TouchableOpacity>
            </View>          
        </SafeAreaView>
    </KeyboardAwareScrollView>

  
  );
  }
  export default SignUpScreen;

  const styles = StyleSheet.create({

    safearea: {
      flex: 1,
      alignItems: 'center',
      marginTop:120
    },
  
    input: {
      height: 50,
      width: windowWidth - 50,
      margin: 10,
    },
    
    button: {
      margin: 0,

      backgroundColor: "#057DFE",
      height: 40,
      width: "100%",
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: "auto",
    },
  
    buttonText: {
      color: "#FFFFFF",
      fontWeight: "bold",
    },
  
    imageStyle: {
      display: "flex",
      alignItems: "center",
  
      width: "100%",
      resizeMode: "contain", 
      justifyContent: "center",
      marginBottom: "auto",
      margin: 40,
    },
  
    inputView: {
      marginBottom: 150,
    }
  });