import React from "react";
import { Text,View,Button,Alert,ActivityIndicator,TouchableOpacity,ScrollView,StyleSheet,FlatList,Dimensions,Image} from "react-native";
import FlatListBig from "../components/flatlistBig";
import AnimeCard from "../components/animecard";
import ItemSeparator from "../components/ItemSeperator";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const { width,height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;



const Images = ({ route, navigation }) => {
    //const [ airingNow, SetAiring] = React.useState(null);
    //const [topAnime, SetTopAnime] = React.useState([]);
    //const [ upcoming, SetUpcoming] = React.useState([]);
    //React.useEffect(()=>{
    //    fetch(`https://api.jikan.moe/v4/seasons/now?limit=24`)
    //    .then(re => re.json())
    //    .then((re) => {
    //      SetAiring(re.data);
    
    //  })
    //},[]);
    const {itemid} = route.params;

    const [pic, setPic] = React.useState(null);
    React.useEffect(()=>{
        fetch(`https://api.jikan.moe/v4/anime/${itemid}/pictures`)
        .then(re => re.json())
        .then((re) => {
      
          if (re.data.length != 0) {
          setPic(re.data);
          
          }
          else{
            setPic("https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png");
          }
        })
      
      },[]);
      return(
        
        <View style={styles.container2}>
        {pic == null && <View style={{height:"100%",justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator size="large" color="#057DFE" />
        </View>}
            <FlatList style={styles.flatlist} 
                data={pic}
                ItemSeparatorComponent={() =><ItemSeparator height={10}width={20}/>}
                ListHeaderComponent={() =><ItemSeparator height={20}/>}
                ListFooterComponent={() =><ItemSeparator height={30}/>}
                

                renderItem={({item,index}) => (   
                <View>
                
                    <Image
                    source={{
                        uri: item.jpg.image_url,
                    }}
                    style={styles.container}
                    resizeMode="cover"
                />
        
        </View>)}
                numColumns={2}
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
        //paddingVertical: 8,
        marginHorizontal:4,
        width:setWidth(45), 
        height:setHeight(30)


    },
    container2:{
        margin:10,
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

export default Images;