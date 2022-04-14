import React from "react";
import { Text,View,Button,Alert,TouchableOpacity,StyleSheet,Dimensions} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { authenication } from "../firebase";
import {signInWithEmailAndPassword } from "firebase/auth";



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const  LoginScreen = ({navigation}) =>{
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [isSecureEntryEnabled, setIsSecureEntryEnabled]=React.useState(true);
    const [eyeButton, setEyeButton]=React.useState("eye-off");
    //const [isSignedin, setSignedin] = React.useState(false);

    const LoginUser = () =>{     
    var emailValid = false;
      if(email.length == 0){
          setEmailError("Email is required");
      }              
      else if (!email.toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )){
        setEmailError("Invalid Email")
      }
      
      else{
          setEmailError("");
          emailValid = true;
      }
  
      var passwordValid = false;
      if(password.length == 0){
          setPasswordError("Password is required");
      }         
      else{
          setPasswordError("")
          passwordValid = true
      }        
  
      if(emailValid && passwordValid){
        signInWithEmailAndPassword(authenication,email,password)
        .then((userCredential)=>{
            console.log(userCredential);
            const user = userCredential.user;
            //console.log(user);
            //setSignedin(true);
            
        })
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            //console.error(errorCode);
            //console.error(errorMessage);
            if (errorCode == "auth/wrong-password"){
              passwordValid = false;
              setPasswordError("Wrong Password");
            }
            if (errorCode == "auth/user-not-found"){
              emailValid = false;
              setEmailError("Account not found");

            }

        })

    }
  }
  const backToSignUp = () => {
    navigation.navigate("Sign Up")
    setIsSecureEntryEnabled(true);
    setEyeButton("eye-off");
    setEmailError("")
    setPasswordError("")
    setEmail("")
    setPassword("")
    
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

    React.useEffect(()=>{
        const unsubscribe = authenication.onAuthStateChanged(user=>{
            if (user) {
                navigation.replace("TABS")

            }

        })
         

        return unsubscribe;
    },[]);
    const eyeChecker = () => {
      if (check) {
        setCheck(false);
        setEyeCheck("eye")
        return
      }
      else{   
        setCheck(true);     
        setEyeCheck("eye-off");
        return
      }
      
    }
    

    
    return(

        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
            
            
            <SafeAreaView style = {styles.safearea}>
                <View style={{marginBottom:60}}>
                <Text style={{fontSize:30}}>
                    Login
                </Text>
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
            
            <Text style={{color:"red",marginStart:10}}>{passwordError}</Text>
          }
              
            <TextInput
                secureTextEntry={isSecureEntryEnabled}
                style={styles.input}
                placeholder="Password"
                value = {password}
                right={<TextInput.Icon name={eyeButton}
                  onPress={() => changeSecureText()}
               />}
                onFocus={ () => setPasswordError("") }
                onChangeText={text => setPassword(text)}>
            </TextInput>
            </View>
            <View style={{marginTop: 20,width:"50%"}}>

            <TouchableOpacity style={styles.button}
            onPress={LoginUser}>
            <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            </View>
            <View style={{marginTop: 20,width:"50%"}}>

            <TouchableOpacity style={styles.button}
            onPress={backToSignUp}
            >
            <Text style={styles.buttonText}>Don't have an account ?</Text>
            </TouchableOpacity>
            </View>          
            </SafeAreaView>
            



        </KeyboardAwareScrollView>

  
    );
  }
  export default LoginScreen;

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
  
    eye:{
      
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
