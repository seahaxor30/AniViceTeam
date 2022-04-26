import React from "react";
import { Text,View,Button,Alert,TouchableOpacity,ScrollView,StyleSheet,FlatList} from "react-native";
import ItemSeparator from "./ItemSeperator"
import AnimeCard from "./animecard";

    const animelist = [
        {title:"",photoURL:"https://www.burmunk.am/themes/burmunk/assets/no-product-image.png",id:1}, 
        {title:"",photoURL:"https://www.burmunk.am/themes/burmunk/assets/no-product-image.png",id:2}, 
        {title:"",photoURL:"https://www.burmunk.am/themes/burmunk/assets/no-product-image.png",id:3}, 
        {title:"",photoURL:"https://www.burmunk.am/themes/burmunk/assets/no-product-image.png",id:4}, 
        {title:"",photoURL:"https://www.burmunk.am/themes/burmunk/assets/no-product-image.png",id:5},
        {title:"",photoURL:"https://www.burmunk.am/themes/burmunk/assets/no-product-image.png",id:6},
        {title:"",photoURL:"https://www.burmunk.am/themes/burmunk/assets/no-product-image.png",id:7},
    ]



    const AnimeList = (id) => {
        return  (
        
        <FlatList 
        data={animelist}
        horizontal
        key={id}

        keyExtractor={(item)=> item.id}
        ItemSeparatorComponent={() =><ItemSeparator width={20}/>}
        ListHeaderComponent={() =><ItemSeparator width={20}/>}
        ListFooterComponent={() =><ItemSeparator width={20}/>}
        renderItem={({item}) => <AnimeCard item={item}/>}
        showsHorizontalScrollIndicator={false}/>
        )
    }
    export default AnimeList