import { signOut } from "firebase/auth";
import React from "react";
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { updateProfile } from "firebase/auth";
import { Text,View,Button,Alert,TouchableOpacity,StyleSheet,Image,Dimensions,ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authenication } from "../firebase";
import { Avatar } from 'react-native-paper';
import { Ionicons} from '@expo/vector-icons';

const { width,height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;


const  ProfileScreen = ({navigation}) =>{

  const isFocused = useIsFocused();


  const [avatar, setAvatar] = React.useState("https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg")
  

  const checkPhoto = () => {
    const currUser = authenication.currentUser;
    if(currUser !== null){
      if (currUser.photoURL === null || currUser.photoURL === ""){
        updateProfile(currUser,{photoURL:"https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"});
      }
    }
  }

  const removePhoto = () => {
    const currUser = authenication.currentUser;
    if(currUser !== null){
      updateProfile(currUser,{photoURL:"https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"});
      setAvatar("https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg");
    }

  }

  const setCredentials = () => {
    const currUser = authenication.currentUser;
    if(currUser !== null){
      const uri = currUser.photoURL;
      setAvatar(uri);

    }
  } 
    
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      setCredentials();
      checkPhoto();
    });

    setCredentials();
    checkPhoto();
    return () => {};
  }, [isFocused,navigation]);

  const handleSignOut =() =>{
    authenication.signOut() 
    .then(()=>{
      navigation.replace("Login")



    })
    .catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode);
      console.error(errorMessage);

  })
    
  }


  return(
    <SafeAreaView style={styles.safearea}>
    <View style={{alignItems: 'center',justifyContent:"center",marginTop:"7%"}}>
    <TouchableOpacity onPress={() => navigation.navigate("Change Profile Picture")} onLongPress={()=>removePhoto()}>
    <Avatar.Image style={{backgroundColor:"white"}} size={200} source={{uri: avatar}} />
    </TouchableOpacity>
    <View style={{margin:10}}>
    <Text>{authenication.currentUser.displayName}</Text>
    </View>
    </View>
    <View style = {styles.view}>
      <View style={{backgroundColor:"yellow",width:"100%"}}>
        <TouchableOpacity style={{position:"absolute",bottom:setHeight(25),left:setWidth(30)}}
          onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={50} color="black" />
        </TouchableOpacity>
      </View>
     
    </View>
    <View style={{alignItems:"center",width:"98%",height:"60%",borderWidth:0,marginTop:"5%"}}>
    <View style={{alignItems:"center",backgroundColor:"white",borderTopLeftRadius:30,borderTopEndRadius:30,width:"100%"}}>
    <Text style={{fontSize:25,fontWeight:"bold"}}>My Posts</Text>
    </View>
    <View style={{backgroundColor:"white",width:"100%",height:"91%"}}>

      <ScrollView>
        <Text>//POSTS HERE</Text>

      </ScrollView>
    
    </View>
    </View>    
    </SafeAreaView>
  );
  }
  const styles = StyleSheet.create({

    button: {
      backgroundColor: "#057DFE",
      height: 40,
      width: "100%",
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      //marginTop: "auto",
    },

    buttonText: {
      color: "#FFFFFF",
      fontWeight: "bold",
    },
    view: {
      flex: 1,
      alignItems: 'center',
      justifyContent:"center",
    },
    safearea: {
      flex: 1,
      alignItems: 'center',
      justifyContent:"center",

    },

  })
export default ProfileScreen;
