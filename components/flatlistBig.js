import React from 'react';
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,FlatList,ScrollView} from "react-native";
const { width,height } = Dimensions.get("screen");
import AnimeCard from './animecard';
import ItemSeparator from './ItemSeperator';


const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;
const data = [1,2,3,4,6,7,8,9,0,12,13,31,32,33,41,42,43,45,46,47,44,48,49,50]


const AiringScreen = () => {
    return(
        
        <View style={styles.container2}>
            <FlatList style={styles.flatlist} 
                data={data}
                keyExtractor={(item)=> item}
                ItemSeparatorComponent={() =><ItemSeparator height={10}width={20}/>}
                ListHeaderComponent={() =><ItemSeparator height={20}/>}
                ListFooterComponent={() =><ItemSeparator height={30}/>}
                renderItem={({item}) => 
                <View>
                    <TouchableOpacity style = {styles.container}>
                        <Text style={styles.textStyle}>Anime </Text>
                    </TouchableOpacity>
                <View style={{width: setWidth(30)}}>
                
                <Text style = {styles.container3}ellipsizeMode='tail' numberOfLines={1}>
                    dl;;dmplasmdpsmadma;slmdma;smd;m;dsa
                </Text>

                </View>
        
        </View>}
                numColumns={3}
                showsHorizontalScrollIndicator={false}/>

        </View>
 
    );
}

    
        


const styles = StyleSheet.create({
    container: {
        //margin:10,
        justifyContent: "center",
        alignItems:"center",
        borderRadius: 12,
        backgroundColor: "#057DFE",
        paddingVertical: 8,
        elevation: 5,
        marginHorizontal:4,
        width:setWidth(30), 
        height:setHeight(18)


    },
    container2:{
        //alignContent: "flex-end",
        margin:8,
    },
    container3:{
        margin:10,
        //marginStart: 10,
        //marginBottom: 10,

    },


    flatlist: {
        flexDirection: 'column',
        





    },


});

export default AiringScreen;