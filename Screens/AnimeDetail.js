import React from "react";
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,Image,ScrollView,ImageBackground} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Ionicons} from '@expo/vector-icons';
import Position from "react-native/Libraries/Components/Touchable/Position";
//import { ImageBackground } from "react-native-web";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 


const { width,height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;

const  AnimeDetailScreen = ({ route, navigation }) =>{
const {itemid,itemUrl,itemTitle,itemSynopsis,itemsmallUrl } = route.params;

//console.log(itemid,itemUrl,itemTitle,itemSynopsis)
let check = "";
let color;
navigation.setOptions({title: itemTitle});
const saveCard = async (key,value) => {
    try {
        await AsyncStorage.setItem(key, value)
        console.log("yo");
        
        <Ionicons style={styles.close} name="bookmark" size={70} color="white" />


      } catch (e) {
          console.log(e);
      }
    }
    return(
        <ScrollView>
        <View>
        <ImageBackground
            source={{ uri: itemUrl}}
            style={styles.itemPhoto}
            
            resizeMode="stretch">
            <TouchableOpacity onLongPress= {() => {
                check = "saved";
                const jsonValue = JSON.stringify({t: itemTitle, d: itemSynopsis, pic: itemUrl});
                saveCard(itemTitle, jsonValue);
                Toast.show({
                type: 'success',
                text1: 'Added Anime to Watchlist',
                text2: itemTitle
                });
             
                  }}>
            

                   
            <Ionicons style={styles.close} name="bookmark" size={70} color="#057DFE" />
            </TouchableOpacity>
    

            
        </ImageBackground>
            
        <Text>
            {itemSynopsis}

        </Text>
        </View>




        </ScrollView>

        
    );
    }

  const styles = StyleSheet.create({

    item: {
        margin: 10,
      },
      itemPhoto: {
        width:setWidth(100), 
        height:setHeight(40)
      },
      itemText: {
        //color: 'b',
        marginTop: 5,
      },

      close: {
        //margin: setWidth(40),

        position: "absolute",
        top:setHeight(30),
        right:0

        //width: 25,
        //height: 25,

      }
     
    
    
    });

    export default AnimeDetailScreen;
