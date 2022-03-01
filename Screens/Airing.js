import React from "react";
import { Text,View,Button,Alert,TouchableOpacity,ScrollView,StyleSheet,FlatList,Dimensions,Image} from "react-native";
import FlatListBig from "../components/flatlistBig";
import AnimeCard from "../components/animecard";
import ItemSeparator from "../components/ItemSeperator";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const { width,height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;


const AiringScreen = ({navigation}) => {
    const [ airingNow, SetAiring] = React.useState([]);
    const [topAnime, SetTopAnime] = React.useState([]);
    const [ upcoming, SetUpcoming] = React.useState([]);
    React.useEffect(()=>{
        fetch(`https://api.jikan.moe/v4/seasons/now`)
        .then(re => re.json())
        .then((re) => {
          SetAiring(re.data);
    
      })
    },[]);
    return(
        
        <View style={styles.container2}>
            <FlatList style={styles.flatlist} 
                data={airingNow}
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

    
        


const styles = StyleSheet.create({
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


});

export default AiringScreen;