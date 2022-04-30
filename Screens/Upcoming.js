import React from "react";
import { Text,View,Button,Alert,ActivityIndicator,TouchableOpacity,ScrollView,StyleSheet,FlatList,Dimensions,Image} from "react-native";
import ItemSeparator from "../components/ItemSeperator";



const { width,height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;

const UpcomingScreen = ({navigation}) => {
    const [ airingNow, SetAiring] = React.useState([]);
    const [topAnime, SetTopAnime] = React.useState([]);
    const [ upcoming, SetUpcoming] = React.useState(null);
    React.useEffect(()=>{
        fetch(`https://api.jikan.moe/v4/seasons/upcoming`)
        .then(re => re.json())
        .then((re) => {
          SetUpcoming(re.data);
    
      })
    },[]);
    return(
        
        <View style={styles.container2}>
        {upcoming == null && <View style={{height:"100%",justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator size="large" color="#057DFE" />
        </View>}
            <FlatList style={styles.flatlist} 
                data={upcoming}
                ItemSeparatorComponent={() =><ItemSeparator height={10}width={20}/>}
                ListHeaderComponent={() =><ItemSeparator height={20}/>}
                ListFooterComponent={() =><ItemSeparator height={30}/>}
                keyExtractor={(item) => String(item.mal_id)}
                renderItem={({item,index}) => (   
                <View>
                <TouchableOpacity styles={styles.container} onPress={(item) => {
                navigation.navigate("Anime Detail",{
                itemid: upcoming[index]["mal_id"],
                itemUrl:upcoming[index]["images"]["jpg"]["large_image_url"],
                itemTitle:upcoming[index]["title"],
                itemSynopsis: upcoming[index]["synopsis"]});

              
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

export default UpcomingScreen;