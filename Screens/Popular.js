import React from "react";
import { Text,View,Button,Alert,TouchableOpacity,ScrollView,StyleSheet,FlatList,Dimensions,Image} from "react-native";
import ItemSeparator from "../components/ItemSeperator";



const { width,height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;

const PopularScreen = ({navigation}) => {
    const [topAnime, SetTopAnime] = React.useState([]);
    React.useEffect(()=>{
        fetch(`https://api.jikan.moe/v4/top/anime`)
        .then(re => re.json())
        .then((re) => {
          SetTopAnime(re.data);
    
      })
    },[]);
    return(
        
        <View style={styles.container2}>
            <FlatList style={styles.flatlist} 
                data={topAnime}
                ItemSeparatorComponent={() =><ItemSeparator height={10}width={20}/>}
                ListHeaderComponent={() =><ItemSeparator height={20}/>}
                ListFooterComponent={() =><ItemSeparator height={30}/>}
                keyExtractor={(item) => String(item.mal_id)}
                renderItem={({item,index}) => (   
                <View>
                <TouchableOpacity styles={styles.container} onPress={(item) => {
                navigation.navigate("Anime Detail",{
                itemid: topAnime[index]["mal_id"],
                itemUrl:topAnime[index]["images"]["jpg"]["large_image_url"],
                itemTitle:topAnime[index]["title"],
                itemSynopsis: topAnime[index]["synopsis"]});

              
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
                    {item.title}
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
        elevation: 5,
        marginHorizontal:4,
        width:setWidth(30), 
        height:setHeight(18)


    },
    container2:{
        margin:8,
    },
    container3:{
        margin:10,


    },


    flatlist: {
        flexDirection: 'column',

    },


});

export default PopularScreen;