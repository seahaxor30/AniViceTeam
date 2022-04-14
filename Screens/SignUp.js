import React, { useRef } from "react";
import { Text,View,Button,Alert,TouchableOpacity,StyleSheet,Dimensions,Animated,Keyboard} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { authenication } from "../firebase";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import Toast from 'react-native-toast-message';
import { getFirestore,collection,getDoc,doc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { Touchable } from "react-native-web";



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const  SignUpScreen = ({navigation}) =>{
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [nameError, setNameError] = React.useState("");
    const [isSignedin, setSignedin] = React.useState(false);
    const [isSecureEntryEnabled, setIsSecureEntryEnabled]=React.useState(true);
    const [eyeButton, setEyeButton]=React.useState("eye-off");
    const SignUpUser = () =>{
      var nameValid = false;
        if (name.length == 0){
          setNameError("Name is required");
        }
        else{
          setNameError("")
          nameValid = true
        }
      var emailValid = false;
        if(email.length == 0){
            setEmailError("Email is required");
        }              
        else if(email.indexOf(' ') >= 0){        
            setEmailError('Email cannot contain spaces');                          
        }
        else if (!email.toLowerCase().match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )){
          setEmailError("Not Valid Email")
        }
        
        else{
            setEmailError("");
            emailValid = true;
        }
    
        var passwordValid = false;
        if(password.length == 0){
            setPasswordError("Password is required");
        }        
        else if(password.length < 6){
            setPasswordError("Password should be minimum 6 characters");
        }      
        else if(password.indexOf(' ') >= 0){        
            setPasswordError('Password cannot contain spaces');                          
        }    
        else{
            setPasswordError("")
            passwordValid = true
        }        
    
        if(emailValid && passwordValid && nameValid){            
            createUserWithEmailAndPassword(authenication,email,password)
            .then((userCredential)=>{
            console.log(userCredential);
            const user = userCredential.user;
            updateProfile(user,{displayName:name, photoURL:"https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"})
            const db = getFirestore();
            setDoc(doc(db,"Users",user.uid), {
              postNum: 0,
              commentNum: 0,
              discussNum: 0
          });
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
            if (errorCode == "auth/email-already-in-use"){
              emailValid = false;
              setEmailError("Email is already in use");


            }
        })     
      }        
    }
  
  const loginNavigate = () => {
    navigation.navigate("Login")
    setIsSecureEntryEnabled(true);
    setEyeButton("eye-off");
    setEmailError("")
    setNameError("")
    setPasswordError("")
    setEmail("")
    setPassword("")
    setName("")
    
  }
  const changeSecureText = () => {
    if (isSecureEntryEnabled) {
      setIsSecureEntryEnabled(false);
      setEyeButton ("eye");
      return;
    }
    else if (isSecureEntryEnabled == false) {
      setIsSecureEntryEnabled(true);
      setEyeButton ("eye-off");
      return;
    }

  }
    
  return( 

    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        
        <SafeAreaView style = {styles.safearea}>
            <View style={{marginBottom:60}}>
            <Text style={{fontSize:30}}>
                Sign Up
            </Text>
            </View>
            <View>
            
            {nameError.length > 0 &&
                  <Text style={{color:"red",marginStart:10}}>{nameError}</Text>

                }
          
            <TextInput
                style={styles.input}
                placeholder="Name"
                value = {name}
                onFocus={ () => setNameError("") }
                onChangeText={text => setName(text)}>
            </TextInput>
            </View>
            <View>
            {emailError.length > 0 &&
                  <Text style={{color:"red",marginStart:10}}>{emailError}</Text>
                }

            
            <TextInput
                style={styles.input}
                placeholder="Email"
                value = {email}
                onFocus={ () => setEmailError("") }
                onChangeText={text => setEmail(text)}>
            </TextInput>
            </View>
            <View>
            {passwordError.length > 0 &&
            
            <Text style={{color:"red",marginStart:10}}>{passwordError}</Text>}
              
            <TextInput
                secureTextEntry={isSecureEntryEnabled}
                style={styles.input}
                placeholder="Password"
                value = {password}
                right={<TextInput.Icon 
                       name={eyeButton} 
                       onPress={ () => changeSecureText()}/>}
                onFocus={ () => setPasswordError("") }
                onChangeText={text => setPassword(text)}>
            </TextInput>
            </View>
            
            <View style={{marginTop: 20,width:"50%"}}>
            <TouchableOpacity style={styles.button}
            onPress={SignUpUser}>
            <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            </View>
            <View style={{marginTop: 20,width:"50%"}}>

            <TouchableOpacity style={styles.button}
            onPress={loginNavigate}
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