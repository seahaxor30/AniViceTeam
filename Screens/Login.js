import React from "react";
import { Text,View,Button,Alert,TouchableOpacity,StyleSheet,Dimensions} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { authenication } from "../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {signInWithEmailAndPassword } from "firebase/auth";



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const  LoginScreen = ({navigation}) =>{
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    //const [isSignedin, setSignedin] = React.useState(false);

    const LoginUser = () =>{
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
            console.error(errorCode);
            console.error(errorMessage);

        })

    }

    React.useEffect(()=>{
        const unsubscribe = authenication.onAuthStateChanged(user=>{
            if (user) {
                navigation.replace("TABS")

            }

        })
         

        return unsubscribe;
    },[])

    
    return(

        <KeyboardAwareScrollView>
            
            
            <SafeAreaView style = {styles.safearea}>
                <View style={{marginBottom:60}}>
                <Text style={{fontSize:30}}>
                    Login
                </Text>
                </View>
                {/*<TextInput
                style={styles.input}
                placeholder="Username"
                >
                    



                </TextInput>*/}


                <TextInput
                style={styles.input}
                placeholder="Email"
                value = {email}
                onChangeText={text => setEmail(text)}




                
                >



                </TextInput>

                <TextInput
                style={styles.input}
                placeholder="Password"
                value = {password}
                onChangeText={text => setPassword(text)}


                
                >



                </TextInput>
                <View style={{marginTop: 20,width:"50%"}}>  
                <TouchableOpacity style={styles.button}
                onPress={LoginUser}

                
                
                
                
                >
                <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                </View>
                <View style={{marginTop: 20,width:"50%"}}>

                <TouchableOpacity style={styles.button}
                onPress={() => navigation.navigate("Sign Up")}
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
