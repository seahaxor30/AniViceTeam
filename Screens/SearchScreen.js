import React from "react";
import { Text,View,Button,Alert,ActivityIndicator,TouchableOpacity,StyleSheet,SafeAreaView,FlatList,Image,Dimensions} from "react-native";
import List from "../components/list"
import SearchBar from "../components/SearchBar";
import ItemSeparator from "../components/ItemSeperator";
import Divider from "../components/flatlistDivider";

const { width,height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;



const  SearchScreen = ({route,navigation}) =>{
    const [ search, setSearch] = React.useState(null);
    const {title} = route.params;
    const [listGenres,setlistGenres] = React.useState([]);
    const list = []
    const [check,setCheck] = React.useState(false);


    React.useEffect(()=>{
        fetch(`https://api.jikan.moe/v4/anime?q=${title}&sfw`)
        .then(re => re.json())
        .then((re) => {
            setSearch(re.data);
            const data = re.data  
            if (data.length > 0) {
              setCheck(false)
            }
            else{
              setCheck(true)
            }
    
      })


    },[]);
    if (check == true) {
      return (
        <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
          <Text>
            Couldn't Find "{title}"
          </Text>
        </View>
        

      );
    }

    return(
      <View style={{margin:0, backgroundColor:""}}>
      {search == null && <View style={{height:"100%",justifyContent:"center",alignItems:"center"}}>
      <ActivityIndicator size="large" color="#057DFE" />
        </View>}
      {search != null &&
      
      <FlatList style={{backgroundColor:"white",height:"100%"}}
                data={search}
                ItemSeparatorComponent={() =><Divider/>}
                ListHeaderComponent={() =><ItemSeparator height={0}/>}
                ListFooterComponent={() =><ItemSeparator height={20}/>}
                keyExtractor={(item) => item.mal_id}
                showsVerticalScrollIndicator={false}
                renderItem={({item,index}) => (
                  <TouchableOpacity onPress={(item) => {
                navigation.navigate("Anime Detail",{
                itemid: search[index]["mal_id"],
                itemUrl:search[index]["images"]["jpg"]["large_image_url"],
                itemTitle:search[index]["title"],
                itemGenres:search[index]["genres"],
                itemStatus:search[index]["status"],
                itemRating:search[index]["rating"],
                itemSeason:search[index]["season"],
                itemYear:search[index]["year"],

                itemScore: search[index]["score"],
                itemSynopsis: search[index]["synopsis"]});           
              }}>
                <View style={styles.box}>
                <View style={{ shadowColor: '#000', zIndex:0,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.4,
                  shadowRadius: 2,  
                  elevation: 5}}>
                    <Image
                    source={{
                        uri: item.images.jpg.image_url,
                    }}
                    style={styles.container}
                    resizeMode="cover"
                />
           
                {item.score > 0.0 && item.score <= 3 &&
            <View style={{backgroundColor:"#FF0000",
                zIndex:1,
                bottom:124,
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
            {item.score > 3 && item.score <= 5 &&
            <View style={{backgroundColor:"#FF8822",
                zIndex:1,
                bottom:124,
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
            {item.score > 5 && item.score <= 7 &&
            <View style={{backgroundColor:"#FFCC33",
                zIndex:1,
                bottom:124,
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
                bottom:124,
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
                bottom:124,
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
            {item.score == null &&
            <View style={{backgroundColor:"#cccccc",
                zIndex:1,
                bottom:124,
                left:"75%",
                margin:-15,
                width:35,
                height:35,
                justifyContent:"center",
                alignItems:"center",
                borderRadius:5,
              }}>
                <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>NA</Text>

                </View>
            }
            </View>
                <View style = {styles.container3}>
                <Text style={{fontSize: 20,fontWeight: "bold"}}
                ellipsizeMode='tail' numberOfLines={3}>
                  {item.title_english ? item.title_english : item.title }
                </Text>
                <View style={{flexDirection:"row",flexWrap:"wrap"}}>
                  {item.genres.map((genre,index)=> {
                    if (index != item.genres.length - 1) {
                    return (
                     <Text style={{color:"#6D7275"}}>{genre.name + ", "}</Text>

                    )}else{
                      return (
                     <Text style={{color:"#6D7275"}}>{genre.name}</Text>)
                    }}
                  
                  )}

                </View>
                </View>
               

                
                
                
                </View>

            </TouchableOpacity>

        )}
                showsHorizontalScrollIndicator={false}/>
      }
                </View>     
  );
};
export default SearchScreen;


const styles = StyleSheet.create({
  root: {
 
    backgroundColor: "white",
    
  },

  container5:{

  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },

  container: {
    borderRadius: 12,
    width:setWidth(28), 
    height:setHeight(18),



},

containerUser: {
    height:setHeight(10),
    width:setWidth(10),
    borderRadius: 100,
},

container3:{
    fontSize: 16,
    fontWeight: "bold",
    marginStart:"10%",
    marginBottom:"10%",
    width:"100%",
},
box:{
    flexDirection:"row",
    marginStart:setWidth(20),
    marginTop:15,
    alignItems: "center",
    justifyContent:"center",
    width:setWidth(55),
    height:setHeight(18),
}

});
