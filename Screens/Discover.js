import ItemSeparator from "../components/ItemSeperator"

const { width,height } = Dimensions.get("screen");
import Searchbar from "../components/SearchBar";
import { Ionicons} from '@expo/vector-icons';


const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;
const windowWidth = Dimensions.get('window').width;

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  TouchableOpacity,Dimensions,FlatList,ScrollView,TextInput
} from 'react-native';
import SearchAnime from "../components/SearchBar";
 

const Discover = ({navigation}) => {
  const [value, onChangeText] = React.useState("");

  const [ airingNow, SetAiring] = React.useState([]);
  const [topAnime, SetTopAnime] = React.useState([]);
  const [ upcoming, SetUpcoming] = React.useState([]);


  //function updateSearch(value) {
  //    //do your search logic or anything
  //    console.log(value)
  //}
//  const getMovieList  = async () => {
//    const response = await fetch(`https://api.jikan.moe/v4/seasons/now?limit=7`);
//            try {
//                const responseJson = await response.json();
//                SetAiring(responseJson.data);
//            } catch (err) {
//                console.error(err);
//            }

//};

//React.useEffect (()=> {
   
// getMovieList();
//}, []);
//React.useEffect(()=>{
//  fetch(`https://api.jikan.moe/v4/seasons/now?limit=7`)
//  .then(re => re.json())
//  .then((re) => {
//    SetAiring(re.data);

//})
//},[]);
  
  
  
  React.useEffect(()=>{
    fetch(`https://api.jikan.moe/v4/seasons/now?limit=7`)
    .then(re => re.json())
    .then((re) => {
      SetAiring(re.data);

  })
  },[]);
React.useEffect(()=>{
  fetch(`https://api.jikan.moe/v4/top/anime?limit=7`)
  .then(re => re.json())
  .then((re) => {
    SetTopAnime(re.data);

})
},[]);
React.useEffect(()=>{
  fetch(`https://api.jikan.moe/v4/seasons/upcoming?limit=7`)
  .then(re => re.json())
  .then((re) => {
    SetUpcoming(re.data);

})
},[]);

  let temp = airingNow;
  let temp2 = topAnime;
  let temp3 = upcoming;

  return (
    <View style={styles.see2}>
      
    <View style={styles.see}>
      
    <ScrollView style={styles.container}>
      <StatusBar style="light" />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={{alignItems:"center"}}>
        <View style={{width:"80%",margin:15,marginBottom:0}}>
        <TextInput 
          style={styles.search}
          placeholder="🔎 Search for Anime"
          onChangeText={text => onChangeText(text)}
          value={value}
          onSubmitEditing={() => navigation.navigate("Search",{title:value})}>
        </TextInput>
        </View>
        </View>
        {/*<View style={styles.container4}>
        <View style={styles.searchContainer}>
                <TextInput
                    value=""
                    placeholder="Search"
                    style={styles.textInput}
                    onChangeText={(text) => {
                        var letters = /^$|^[a-zA-Z._\b ]+$/;
                        if (text.length > 12)
                            setError("Query too long.")
                        else if (text.match(letters)) {
                            setQuery(text)
                            updateSearch(text)
                            if (error)
                                setError(false)
                        }
                        else setError("Please only enter alphabets")
                    }}
                />

        </View>
        </View>*/}


      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Airing Now</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Airing Now")}>
          <Text style={styles.headerSubTitle}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList 
          data={airingNow}
          horizontal
          ItemSeparatorComponent={() =><ItemSeparator width={20}/>}
          ListHeaderComponent={() =><ItemSeparator width={20}/>}
          ListFooterComponent={() =><ItemSeparator width={20}/>}
          showsHorizontalScrollIndicator={false}
          key={0}
  
          keyExtractor={(item) => item.mal_id}
          renderItem={({item,index}) => (        
            <View style={styles.item} key={index}>
            <TouchableOpacity onPress={(item) => {
                navigation.navigate("Anime Detail",{
                itemid: temp[index]["mal_id"],
                itemUrl:temp[index]["images"]["jpg"]["large_image_url"],
                itemTitle:temp[index]["title"],
                itemsmallUrl:temp[index]["images"]["jpg"]["small_image_url"],
                itemSynopsis: temp[index]["synopsis"]});

              
              }}>
                <Image
                    source={{
                        uri: item.images.jpg.image_url,
                    }}
                    style={styles.itemPhoto}
                    resizeMode="cover"
                />
            </TouchableOpacity>
            <View style={{width: setWidth(30)}}>
                
                <Text style = {styles.container3}ellipsizeMode='tail' numberOfLines={1}>
                {item.title_english ? item.title_english : item.title }

                </Text>

                </View>
        </View>

          )}
            
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Upcoming Anime</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Upcoming Anime")}>
          <Text style={styles.headerSubTitle}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList 
          data={upcoming}
          horizontal
          ItemSeparatorComponent={() =><ItemSeparator width={20}/>}
          ListHeaderComponent={() =><ItemSeparator width={20}/>}
          ListFooterComponent={() =><ItemSeparator width={20}/>}
          showsHorizontalScrollIndicator={false}
          key={1}
          keyExtractor={(item) => item.mal_id}
          renderItem={({item,index}) => (        
            <View style={styles.item}key={index}>
            <TouchableOpacity onPress={(item) => {
                navigation.navigate("Anime Detail",{
                itemid: temp3[index]["mal_id"],
                itemUrl:temp3[index]["images"]["jpg"]["large_image_url"],
                itemsmallUrl:temp3[index]["images"]["jpg"]["small_image_url"],
                itemTitle:temp3[index]["title"],
                itemSynopsis: temp3[index]["synopsis"]});

              
              }}>
                <Image
                    source={{
                        uri: item.images.jpg.image_url,
                    }}
                    style={styles.itemPhoto}
                    resizeMode="cover"
                />
            </TouchableOpacity>
            <View style={{width: setWidth(30)}}>
                
                <Text style = {styles.container3}ellipsizeMode='tail' numberOfLines={1}>
                {item.title_english ? item.title_english : item.title }

                </Text>

                </View>
        </View>

          )}
            
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Top Ranked Anime </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Top Ranked Anime")}>
          <Text style={styles.headerSubTitle}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList 
          data={topAnime}
          horizontal
          key={3}
          ItemSeparatorComponent={() =><ItemSeparator width={20}/>}
          ListHeaderComponent={() =><ItemSeparator width={20}/>}
          ListFooterComponent={() =><ItemSeparator width={20}/>}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.mal_id}
          renderItem={({item,index}) => (        
            <View style={styles.item}key={index}>
            <TouchableOpacity onPress={(item) => {
                navigation.navigate("Anime Detail",{
                itemid: temp2[index]["mal_id"],
                itemUrl:temp2[index]["images"]["jpg"]["large_image_url"],
                itemTitle:temp2[index]["title"],
                itemsmallUrl:temp3[index]["images"]["jpg"]["small_image_url"],
                itemSynopsis: temp2[index]["synopsis"]});

              
              }}>
                <Image
                    source={{
                        uri: item.images.jpg.image_url,
                    }}
                    style={styles.itemPhoto}
                    resizeMode="cover"
                />
            </TouchableOpacity>
            <View style={{width: setWidth(30)}}>
                
                <Text style = {styles.container3}ellipsizeMode='tail' numberOfLines={1}>
                {item.title_english ? item.title_english : item.title }

                </Text>

                </View>
        </View>

          )}
            
        />
      </View>
      </SafeAreaView>
      {/*<TouchableOpacity style={{zIndex: 100}}>
    <Ionicons name="bookmark" size={70} color="black" />
    </TouchableOpacity>*/}
    </ScrollView>
    {/*<TouchableOpacity style={{zIndex: 5}}>
    <Ionicons name="bookmark" size={70} color="black" />
    </TouchableOpacity>*/}
    </View>
    {/*<TouchableOpacity style={{zIndex: 100, width:10}}>
    <Ionicons name="bookmark" size={70} color="black" />
    </TouchableOpacity>*/}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  see:{
    //backgroundColor:"green",
    //margin:20,
    flex: 1,
    
  },
  see2:{
    flex: 1,
    //margin:100,


  },
  see3:{
    marginLeft: 100,
    opacity:0,

    width:50,
    backgroundColor:"green",





    //margin:50,
  },


  search:{
      height: 50,
      //width: windowWidth - 50,
      backgroundColor:"white",
      paddingVertical:15,
      paddingHorizontal:10,
      borderRadius: 10,

 
  },

    headerSubTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#057DFE",
    marginTop: 20,
    marginEnd: 20

  },
  container3:{
    marginStart:-8,
    marginTop:10,

    


},
container4: {
  marginTop:10,
  height: 80,
  alignItems: 'center',
  // height: '100%', width: '100%' 
},
searchContainer:
{
    backgroundColor: 'white',
    width: '90%',
    height: 40,
    flexDirection: 'row'

},

  headerTitle: {
    fontWeight: '800',
    fontSize: 20,
    marginTop:  20,
    marginBottom: 5,
    marginStart: 20

  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  item: {
    margin: 10,
  },
  itemPhoto: {
    justifyContent: "center",
    alignItems:"center",
    borderRadius: 12,
    backgroundColor: "#057DFE",
    paddingVertical: 8,
    marginHorizontal:-10,
    marginVertical: 2,
    width:setWidth(35), 
    height:setHeight(25)
  },
  itemText: {
    marginTop: 5,
  },

});

export default Discover;
