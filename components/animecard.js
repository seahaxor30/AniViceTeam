import React from 'react';
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,Image, ViewBase} from "react-native";
const { width,height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;


const AnimeCard = ({item}) => {
    return(
        <View style={styles.item}>
            <View>
                <Image
                    source={{
                        uri: item.photoURL,
                    }}
                    style={styles.itemPhoto}
                    resizeMode="cover"
                />
            </View>
            <View style={{width: setWidth(30)}}>
                
                <Text style = {styles.container3}ellipsizeMode='tail' numberOfLines={1}>
                {item.title}

                </Text>

                </View>
        </View>

    
    )
}

const styles = StyleSheet.create({

    item: {
        margin: 10,
      },
    itemPhoto: {
        justifyContent: "center",
        alignItems:"center",
        borderRadius: 12,
        paddingVertical: 8,
        marginHorizontal:-10,
        marginVertical: 2,
        width:setWidth(35), 
        height:setHeight(25)
      },
      photo:{
        justifyContent: "center",
        alignItems:"center",
        //backgroundColor: "white",
        paddingVertical: 8,
        marginVertical: 2,
        width:setWidth(35), 
        height:setHeight(25)

      },
      itemText: {
        //color: 'b',
        marginTop: 5,
      },
      item:{
          margin:10
      }
     
    
    
    });
 export default AnimeCard;

        {/*<View style={styles.item}>
            <TouchableOpacity >
                <Image
                    source={{
                        uri: item.uri,
                    }}
                    style={styles.itemPhoto}
                    resizeMode="cover"
                />
            </TouchableOpacity>
            <Text ellipsizeMode='tail' numberOfLines={1}style={styles.itemText}>{item.text}</Text>
        </View>*/}

  