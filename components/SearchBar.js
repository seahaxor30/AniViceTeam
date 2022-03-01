//import React, { useState, useEffect } from 'react';
//import {
//    SafeAreaView,
//    StyleSheet,
//    ScrollView,
//    View,
//    Text,
//    StatusBar,
//    FlatList,
//    TouchableOpacity,
//    TextInput, Image
//} from 'react-native';

//import { SearchBar } from 'react-native-elements';

////type SearchBarComponentProps = {};

//const SearchAnime = () => {
//  const [search, setSearch] = useState("");

//  const updateSearch = (search) => {
//    setSearch(search);
//  };

//  return (
//    <View style={styles.view}>
//      <SearchBar
//        placeholder="Type Here..."
//        onChangeText={updateSearch}
//        value={search}
//      />
//    </View>
//  );
//};

//const styles = StyleSheet.create({
//  view: {
//    margin: 10,
//  },
//});

//export default SearchAnime;



import { StyleSheet, TextInput, View, Keyboard, Button,Dimensions,FlatList } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import ItemSeparator from "../components/ItemSeperator";

const { width,height } = Dimensions.get("screen");


const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;

const SearchBar = (props) => {
    console.log(props.animeList);
    return (
        <View style={styles.container2}>   
            <FlatList style={styles.flatlist} 
                data={props.animeList}
                ItemSeparatorComponent={() =><ItemSeparator height={10}width={20}/>}
                ListHeaderComponent={() =><ItemSeparator height={20}/>}
                ListFooterComponent={() =><ItemSeparator height={30}/>}
                keyExtractor={(item) => String(item.mal_id)}
                renderItem={({item,index}) => (   
                <View>
                <TouchableOpacity styles={styles.container} onPress={(item) => {
                navigation.navigate("Anime Detail",{
                itemid: airingNow[index]["mal_id"],
                itemUrl:airingNow[index]["images"]["jpg"]["large_image_url"],
                itemTitle:airingNow[index]["title"],
                itemSynopsis: airingNow[index]["synopsis"]});

              
              }}>
                    <Image
                    source={{
                        uri: item.images.jpg.image_url,
                    }}
                    style={styles.container}
                    resizeMode="cover"
                />
            </TouchableOpacity>
                <View style={{width: setWidth(30)}}>
                
                <Text style = {styles.container3}ellipsizeMode='tail' numberOfLines={1}>
                    {item.title_english ? item.title_english : item.title }
                </Text>

                </View>
        
        </View>)}
                numColumns={3}
                showsHorizontalScrollIndicator={false}/>

        </View>

 
    );
}
export default SearchBar;

const styles = StyleSheet.create({

    search:{
        //position:"absolute",
        //backgroundColor: "blue",
        //position: "absolute",
        //left:setWidth(30),
        margin:10,
        backgroundColor: "white",
        borderRadius: 20,
        borderWidth:1,
        borderColor: "black",

        width: setWidth(80),
        height:setHeight(5),
        //alignItems:"center",
        padding: 10
        
        //z:10,
        //zIndex:10,

      },
      container: {
        //margin:10,
        justifyContent: "center",
        alignItems:"center",
        borderRadius: 12,
        backgroundColor: "#057DFE",
        paddingVertical: 8,
        marginHorizontal:4,
        width:setWidth(30), 
        height:setHeight(18)


    },
    container2:{
        margin:8,
    },
    container3:{
        marginStart:5,
        marginTop:10,
        marginBottom:10


    },


    flatlist: {
        flexDirection: 'column',

    },




})




