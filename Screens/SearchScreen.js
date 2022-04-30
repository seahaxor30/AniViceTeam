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
                itemSynopsis: search[index]["synopsis"]});           
              }}>
                <View style={styles.box}>
                <View style={{ shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,  
                  elevation: 5}}>
                    <Image
                    source={{
                        uri: item.images.jpg.image_url,
                    }}
                    style={styles.container}
                    resizeMode="cover"
                />
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

//const styles = StyleSheet.create({
//  root: {
//    margin:10,
//    justifyContent: "center",
//    //alignItems: "center",
//    //backgroundColor:"white"
//  },
//  container5:{
//      //backgroundColor: "white",
//      borderRadius:12,

//    //  width: setWidth(100),
//      height:setHeight(18)


//  },
//  title: {
//    width: "100%",
//    marginTop: 20,
//    fontSize: 25,
//    fontWeight: "bold",
//    marginLeft: "10%",
//  },

//  container: {
//    //margin:10,
//    justifyContent: "center",
//    alignItems:"center",
//    borderRadius: 12,
//    borderTopEndRadius:0,
//    borderBottomEndRadius:0,

//    backgroundColor: "#057DFE",
//    paddingVertical: 8,
//    //marginHorizontal:4,
//    bottom:147,
//    width:setWidth(30), 
//    height:setHeight(18)



//},
//container2:{
//    //margin:8,
//},
//container3:{
//    //width: "100%",
//    //marginTop: 20,
//    fontSize: 20,
//    fontWeight: "bold",
//    flex: 1, 
//    //backgroundColor:"blue",
//    height:setHeight(10),

//    //flexWrap: 'wrap'

//    //marginLeft: "10%",

//    //marginStart:5,
//    //marginTop:10,
//    //marginBottom:10


//},
//box:{
//    flexDirection:"row",
//    //backgroundColor: "green",

//    marginStart:setWidth(35),
//    //top:50
//    paddingVertical: 30,
//    alignItems: "center",
//    width:setWidth(55),
//    height:setHeight(18),
 


//    //left:50
//}

//});
const styles = StyleSheet.create({
  root: {
 
    backgroundColor: "white",
    
  },

  container5:{
      //backgroundColor: "white",
      //borderRadius: 12,
      //marginStart:20,
      //justifyContent:"center",


    //  width: setWidth(100),
      //height:setHeight(22)


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
    width:setWidth(25), 
    height:setHeight(16),



},

containerUser: {
    //backgroundColor:"yellow",
    //margin:10,
    //justifyContent: "center",
    //alignItems:"center",
    //flex: 1, 
    //backgroundColor:"blue",
    height:setHeight(10),
    width:setWidth(10),
    borderRadius: 100,




},

container3:{
    fontSize: 16,
    fontWeight: "bold",
    marginStart:"10%",
    marginBottom:"10%",
    //backgroundColor:"yellow",
    //height:"100%",
    width:"100%",
    //justifyContent: "center",
    //height:setHeight(10),





},
box:{
    flexDirection:"row",
    //flex:1,
    marginStart:setWidth(20),
    //paddingVertical: 30,
    marginTop:15,
    alignItems: "center",
    justifyContent:"center",
    width:setWidth(55),
    height:setHeight(18),
    //backgroundColor:"green"
 


    //left:50
}

});