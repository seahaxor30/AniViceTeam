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


      } catch (e) {
          console.log(e);
      }
    }
    return(
        <ScrollView>
        <View>
        <Image
            source={{ uri: itemUrl}}
            style={styles.itemPhoto}
            
            resizeMode="stretch">

            
        </Image>
        <View>
        <TouchableOpacity style={styles.close} onLongPress= {() => {
                check = "saved";
                const jsonValue = JSON.stringify({t: itemTitle, d: itemSynopsis, pic: itemUrl,id:itemid});
                saveCard(itemTitle, jsonValue);
                Toast.show({
                type: 'success',
                text1: 'Added Anime to Watchlist',
                text2: itemTitle
                });
             
                  }}
                  >
            

                   
            <Ionicons name="bookmark" size={70} color="#057DFE" />
            </TouchableOpacity>
    </View>
    <View style={{margin:"5%",alignContent:"center",justifyContent:"center"}}> 
        <Text style={{marginTop:"2%",fontSize:20,fontWeight:"bold"}}>
          Synopsis
        </Text>
        <Text style={styles.itemText}>
            {itemSynopsis}

        </Text>
        </View>
        </View>




        </ScrollView>

        
    );
    }

  const styles = StyleSheet.create({

    item: {
        margin: 10,
      },
      itemPhoto: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        //width:setWidth(100), 
        height:setHeight(40),
      },
      itemText: {
        //color: 'b',
        //margin: "5%",
        marginTop:setHeight(1),
        textAlign:"justify",
        lineHeight: 25,
      },

      close: {
        marginTop: setHeight(30),
        marginStart:"80%",
        //position:"absolute",
        //top:setHeight(30),
        right:0,

        //width: 25,
        //height: 25,

      }
     
    
    
    });

    export default AnimeDetailScreen;
