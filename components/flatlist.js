import React from "react";
import { Text,View,Button,Alert,TouchableOpacity,ScrollView,StyleSheet,FlatList} from "react-native";
import ItemSeparator from "./ItemSeperator"

    <FlatList 
    data={genres}
    horizontal
    keyExtractor={(item)=> item}
    ItemSeparatorComponent={() =><ItemSeparator width={20}/>}
    ListHeaderComponent={() =><ItemSeparator width={20}/>}
    ListFooterComponent={() =><ItemSeparator width={20}/>}

    renderItem={({item}) => <AnimeCard/>}
    showsHorizontalScrollIndicator={false}/>