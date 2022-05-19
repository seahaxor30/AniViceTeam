import ItemSeparator from "../components/ItemSeperator"

import Searchbar from "../components/SearchBar";
import { Ionicons,MaterialIcons
} from '@expo/vector-icons';
import AnimeList from "../components/flatlist";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { width,height } = Dimensions.get("screen");
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
  ActivityIndicator,
  Icon,
  TouchableOpacity,Dimensions,FlatList,ScrollView,TextInput
} from 'react-native';
import SearchAnime from "../components/SearchBar";
 

const Discover = ({navigation}) => {
  const [value, onChangeText] = React.useState("");

  const [airingNow, SetAiring] = React.useState(null);
  const [topAnime, SetTopAnime] = React.useState(null);
  const [upcoming, SetUpcoming] = React.useState(null);

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
   
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      {/*<StatusBar style="light" />*/}
        <View style={{alignItems:"center",flexDirection:"row",margin:15}}>
        <View style={{flexDirection: 'row',padding: 10,
        backgroundColor:"white",borderRadius:12,width:"75%"

        }}>
        <Ionicons name="search" size={20} color={"grey"} />
        <TextInput 
          style={styles.search}
          placeholder="Search for Anime"
          onChangeText={text => onChangeText(text)}
          value={value}>
        </TextInput>
        
        </View>
        <View>
          <TouchableOpacity style={styles.button}
          onPress={() => {
            if (value != "") {
            navigation.navigate("Search",{title:value})
            onChangeText("") }       
        }}>
              <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>

        </View>
        </View>
        
      {airingNow == null || upcoming == null || topAnime  == null && <View style={{alignItems:"center",marginTop:"60%"}}>
      <ActivityIndicator size="large" color="#057DFE" />
        </View>}
      {airingNow != null && upcoming != null && topAnime != null &&
      <View>
      <View style={[styles.headerContainer,{marginTop:-20}]}>
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
            {item.score > 0 && item.score <= 3 &&

            <View style={{backgroundColor:"#FF0000",
                zIndex:1,
                top:35,
                left:"80%",
                margin:-15,
                width:40,
                height:40,
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
                top:35,
                left:"80%",
                margin:-15,
                width:40,
                height:40,
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
                top:35,
                left:"80%",
                margin:-15,
                width:40,
                height:40,
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
                top:35,
                left:"80%",
                margin:-15,
                width:40,
                height:40,
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
                top:35,
                left:"80%",
                margin:-15,
                width:40,
                height:40,
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
                top:35,
                left:"80%",
                margin:-15,
                width:40,
                height:40,
                justifyContent:"center",
                alignItems:"center",
                borderRadius:5,
              }}>
              <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>NA</Text>


                </View>
            }
            
            <View style={{zIndex:0}}>
            <TouchableOpacity onPress={(item) => {
                navigation.navigate("Anime Detail",{
                itemid: temp[index]["mal_id"],
                itemUrl:temp[index]["images"]["jpg"]["large_image_url"],
                itemTitle:temp[index]["title"],
                itemEnglishTitle:temp[index]["title_english"],
                itemSynopsis: temp[index]["synopsis"],
                itemScore: temp[index]["score"],
                itemGenres:temp[index]["genres"],
                itemStatus:temp[index]["status"],
                itemRating:temp[index]["rating"],
                itemSeason:temp[index]["season"],
                itemYear:temp[index]["year"]

              });

              
              }}>
                
                <Image
                    source={{
                        uri: item.images.jpg.image_url,
                    }}
                    style={styles.itemPhoto}
                    resizeMode="cover"
                />
            </TouchableOpacity>
            </View>
            <View style={{width: setWidth(30)}}>
                
                <Text style = {styles.container3}ellipsizeMode='tail' numberOfLines={1}>
                {item.title_english ? item.title_english : item.title}
                </Text>
                

                </View>
        </View>

          )}
            
        />
        {/*{airingNow.length == 0 &&
          <AnimeList id={0}/>
        }*/}
      </View>
      <View style={[styles.headerContainer,{marginTop:"0%"}]}>
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
            <View style={styles.item} key={index}>
              
            {/*<Text style = {styles.container3}ellipsizeMode='tail' numberOfLines={1}>
                Rating:  {item.score  ? item.score : "0.0"}
                </Text>*/}
            
            <View style={{backgroundColor:"#cccccc",
                zIndex:1,
                top:35,
                left:"80%",
                margin:-15,
                width:40,
                height:40,
                justifyContent:"center",
                alignItems:"center",
                borderRadius:5,
              }}>
                <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>NA</Text>

                </View>
            
            <View style={{zIndex:0}}>
            <TouchableOpacity onPress={(item) => {
                navigation.navigate("Anime Detail",{
                itemid: temp3[index]["mal_id"],
                itemUrl:temp3[index]["images"]["jpg"]["large_image_url"],
                itemsmallUrl:temp3[index]["images"]["jpg"]["small_image_url"],
                itemTitle:temp3[index]["title"],
                itemEnglishTitle:temp3[index]["title_english"],
                itemGenres:temp3[index]["genres"],
                itemStatus:temp3[index]["status"],
                itemRating:temp3[index]["rating"],
                itemSeason:temp3[index]["season"],
                itemYear:temp3[index]["year"],

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
            </View>
            <View style={{width: setWidth(30)}}>
                
                <Text style = {styles.container3}ellipsizeMode='tail' numberOfLines={1}>
                {item.title_english ? item.title_english : item.title }
                </Text>

                </View>
        </View>

          )}
            
        />
        {/*{upcoming.length == 0 &&
          <AnimeList id={1}/>
      }*/}
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
          key={2}
          ItemSeparatorComponent={() =><ItemSeparator width={20}/>}
          ListHeaderComponent={() =><ItemSeparator width={20}/>}
          ListFooterComponent={() =><ItemSeparator width={20}/>}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.mal_id}
          renderItem={({item,index}) => (        
            <View style={[styles.item,{marginBottom:30}]}key={index}>
            <View style={{backgroundColor:"#66CC33",
                zIndex:1,
                top:35,
                left:"80%",
                margin:-15,
                width:40,
                height:40,
                justifyContent:"center",
                alignItems:"center",
                borderRadius:5,
              }}>
                <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>
                {Math.round(item.score * 10) ? Math.round(item.score * 10) : "NR"}
                </Text>

                </View>
            <View style={{zIndex:0}}>
            <TouchableOpacity onPress={(item) => {
                navigation.navigate("Anime Detail",{
                itemid: temp2[index]["mal_id"],
                itemUrl:temp2[index]["images"]["jpg"]["large_image_url"],
                itemTitle:temp2[index]["title"],
                itemGenres:temp2[index]["genres"],
                itemEnglishTitle:temp2[index]["title_english"],
                itemsmallUrl:temp2[index]["images"]["jpg"]["small_image_url"],
                itemSynopsis: temp2[index]["synopsis"],
                itemStatus:temp2[index]["status"],
                itemRating:temp2[index]["rating"],
                itemSeason:temp2[index]["season"],
                itemYear:temp2[index]["year"],

                itemScore: temp2[index]["score"]});

              
              }}>
                <Image
                    source={{
                        uri: item.images.jpg.image_url,
                    }}
                    style={styles.itemPhoto}
                    resizeMode="cover"
                />
            </TouchableOpacity>
            </View>
            <View style={{width: setWidth(30)}}>
                
                <Text style = {styles.container3}ellipsizeMode='tail' numberOfLines={1}>
                {item.title_english ? item.title_english : item.title }
                </Text>
               

                </View>
        </View>

          )}
            
        />
        {/*{topAnime.length == 0 &&
          <AnimeList id={2}/>
        
        }*/}
       </View>
      </View>}
    </KeyboardAwareScrollView>

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
      //height: 50,
      flex: 1,
      //width: windowWidth - 50,
      fontSize:16,
      //backgroundColor:"white",
      //paddingVertical:15,
      paddingHorizontal:10,
      //borderRadius: 10,

 
  },

    headerSubTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#057DFE",
    marginTop: 15,
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
    paddingVertical: 8,
    marginHorizontal:-10,
    marginVertical: 2,
    width:setWidth(35), 
    height:setHeight(25),
    
  },
  itemText: {
    marginTop: 5,
  },
  button: {
    margin: 10,
    backgroundColor: "#057DFE",
    height: 40,
    width: "120%",
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

});

export default Discover;