import React from "react";
import { Text,View,Button,Alert,TouchableOpacity,StyleSheet,SafeAreaView,FlatList,Image,Dimensions} from "react-native";
import List from "../components/list"
import SearchBar from "../components/SearchBar";
import ItemSeparator from "../components/ItemSeperator";

const { width,height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;



const  SearchScreen = ({route,navigation}) =>{
    const [ search, setSearch] = React.useState([]);
    const {title} = route.params;

    React.useEffect(()=>{
        fetch(`https://api.jikan.moe/v4/anime?q=${title}`)
        .then(re => re.json())
        .then((re) => {
            setSearch(re.data);
    
      })
    },[]);
    console.log();
    return(
      <SafeAreaView style={styles.root}>
      <FlatList style={styles.flatlist} 
                data={search}
                ItemSeparatorComponent={() =><ItemSeparator height={10}width={20}/>}
                ListHeaderComponent={() =><ItemSeparator height={20}/>}
                ListFooterComponent={() =><ItemSeparator height={30}/>}
                keyExtractor={(item) => String(item.mal_id)}
                renderItem={({item,index}) => (
                <TouchableOpacity onPress={(item) => {
                navigation.navigate("Anime Detail",{
                itemid: search[index]["mal_id"],
                itemUrl:search[index]["images"]["jpg"]["large_image_url"],
                itemTitle:search[index]["title"],
                itemSynopsis: search[index]["synopsis"]});           
              }}>
                <View style={styles.container5}>
                <View style={styles.box}>
                
                <Text style = {styles.container3}>
                    {item.title_english ? item.title_english : item.title }
                </Text>

                </View>
                <View styles={styles.container}>
                    <Image
                    source={{
                        uri: item.images.jpg.image_url,
                    }}
                    style={styles.container}
                    resizeMode="cover"
                />
            </View>
        </View>
        </TouchableOpacity>
        )}
                showsHorizontalScrollIndicator={false}/>

     
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  root: {
    margin:10,
    justifyContent: "center",
    //alignItems: "center",
  },
  container5:{
      backgroundColor: "white",
      borderRadius:12,

    //  width: setWidth(100),
      height:setHeight(18)


  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },

  container: {
    //margin:10,
    justifyContent: "center",
    alignItems:"center",
    borderRadius: 12,
    borderTopEndRadius:0,
    borderBottomEndRadius:0,

    backgroundColor: "#057DFE",
    paddingVertical: 8,
    //marginHorizontal:4,
    bottom:147,
    width:setWidth(30), 
    height:setHeight(18)



},
container2:{
    //margin:8,
},
container3:{
    //width: "100%",
    //marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    flex: 1, 
    //backgroundColor:"blue",
    height:setHeight(10),

    //flexWrap: 'wrap'

    //marginLeft: "10%",

    //marginStart:5,
    //marginTop:10,
    //marginBottom:10


},
box:{
    flexDirection:"row",
    //backgroundColor: "green",

    marginStart:setWidth(35),
    //top:50
    paddingVertical: 30,
    alignItems: "center",
    width:setWidth(55),
    height:setHeight(18),
 


    //left:50
}

});
