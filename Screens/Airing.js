import React from "react";
import { Text,View,Button,Alert,ActivityIndicator,TouchableOpacity,ScrollView,StyleSheet,FlatList,Dimensions,Image} from "react-native";
import FlatListBig from "../components/flatlistBig";
import AnimeCard from "../components/animecard";
import ItemSeparator from "../components/ItemSeperator";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const { width,height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;


const AiringScreen = ({navigation}) => {
    const [ airingNow, SetAiring] = React.useState(null);
    const [topAnime, SetTopAnime] = React.useState([]);
    const [ upcoming, SetUpcoming] = React.useState([]);
    React.useEffect(()=>{
        fetch(`https://api.jikan.moe/v4/seasons/now?limit=24`)
        .then(re => re.json())
        .then((re) => {
          SetAiring(re.data);
    
      })
    },[]);
    return(
        
        <View style={styles.container2}>
        {airingNow == null && <View style={{height:"100%",justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator size="large" color="#057DFE" />
        </View>}
            <FlatList style={styles.flatlist} 
                data={airingNow}
                ItemSeparatorComponent={() =><ItemSeparator height={10}width={20}/>}
                ListHeaderComponent={() =><ItemSeparator height={20}/>}
                ListFooterComponent={() =><ItemSeparator height={30}/>}
                keyExtractor={(item) => String(item.mal_id)}
                renderItem={({item,index}) => (   
                <View>
                {item.score > 0 && item.score <= 3 &&
                <View style={{backgroundColor:"#FF0000",
                    zIndex:1,
                    top:25,
                    left:"75%",
                    margin:-15,
                    width:35,
                    height:35,
                    justifyContent:"center",
                    alignItems:"center",
                    borderRadius:5,
                }}>
                    <Text>
                    {Math.round(item.score * 10)}
                    </Text>

                    </View>
                }
                {item.score > 3 && item.score <= 5 &&
                <View style={{backgroundColor:"##FF8822",
                    zIndex:1,
                    top:25,
                    left:"75%",
                    margin:-15,
                    width:35,
                    height:35,
                    justifyContent:"center",
                    alignItems:"center",
                    borderRadius:5,
                }}>
                    <Text>
                    {Math.round(item.score * 10)}
                    </Text>

                    </View>
                }
                {item.score > 5 && item.score <= 7 &&
                <View style={{backgroundColor:"#FFCC33",
                    zIndex:1,
                    top:25,
                    left:"75%",
                    margin:-15,
                    width:35,
                    height:35,
                    justifyContent:"center",
                    alignItems:"center",
                    borderRadius:5,
                }}>
                    <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>
                    {Math.round(item.score * 10)}
                    </Text>

                    </View>
                }
                {item.score > 7 && item.score <= 8 &&
                <View style={{backgroundColor:"#B3CC33",
                    zIndex:1,
                    top:25,
                    left:"75%",
                    margin:-15,
                    width:35,
                    height:35,
                    justifyContent:"center",
                    alignItems:"center",
                    borderRadius:5,
                }}>
                    <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>
                    {Math.round(item.score * 10)}
                    </Text>

                    </View>
                }

                {item.score > 8 && item.score <= 10 &&
                <View style={{backgroundColor:"#66CC33",
                    zIndex:1,
                    top:25,
                    left:"75%",
                    margin:-15,
                    width:35,
                    height:35,
                    justifyContent:"center",
                    alignItems:"center",
                    borderRadius:5,
                }}>
                    <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>
                    {Math.round(item.score * 10)}
                    </Text>

                    </View>
                }
            
            
                <TouchableOpacity styles={styles.container} onPress={(item) => {
                navigation.navigate("Anime Detail",{
                itemid: airingNow[index]["mal_id"],
                itemUrl:airingNow[index]["images"]["jpg"]["large_image_url"],
                itemTitle:airingNow[index]["title"],
                itemGenres:airingNow[index]["genres"],
                itemStatus:airingNow[index]["status"],
                itemRating:airingNow[index]["rating"],
                itemSeason:airingNow[index]["season"],
                itemYear:airingNow[index]["year"],

                itemScore: airingNow[index]["score"],
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
                
                <Text style = {styles.container3}ellipsizeMode='tail' numberOfLines={2}>
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
        paddingVertical: 8,
        marginHorizontal:4,
        width:setWidth(30), 
        height:setHeight(20)


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