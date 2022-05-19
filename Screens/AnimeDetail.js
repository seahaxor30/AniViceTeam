import React from "react";
import {View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  FlatList} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Ionicons} from '@expo/vector-icons';
import ItemSeparator from "../components/ItemSeperator"

import Position from "react-native/Libraries/Components/Touchable/Position";
//import { ImageBackground } from "react-native-web";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { async } from "@firebase/util";
import Player from "../components/youtubePlayer";


const { width,height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;

const  AnimeDetailScreen = ({ route, navigation }) =>{
const {
  itemid,
  itemUrl,
  itemTitle,
  itemSynopsis,
  itemScore,
  itemGenres,
  itemStatus,
  itemRating,
  itemSeason,
  itemYear
} = route.params;
const [communityScore, setCommunityScore] = React.useState([]);
const [pic, setPic] = React.useState(null);
const [random,setRandom] = React.useState(0);
const [season, setSeason] = React.useState("");
const [videos, setVideos] = React.useState(null);

//if (itemSeason != null) {
//  setSeason(itemSeason[0].toUpperCase() + itemSeason.slice(1))
//}

React.useEffect(()=>{
  fetch(`https://api.jikan.moe/v4/anime/${itemid}/videos`)
  .then(re => re.json())
  .then((re) => {

    if (re.data.promo.length != 0) {
    setVideos(re.data.promo);
    console.log(videos)
    
    //console.log(re.data.length);
    //setRandom(Math.floor(Math.random() * re.data.length))
  }
    else{
      setVideos("No Videos");
    }
  })

},[]);

//console.log(itemid,itemUrl,itemTitle,itemSynopsis)
React.useEffect(()=>{
  fetch(`https://api.jikan.moe/v4/anime/${itemid}/pictures`)
  .then(re => re.json())
  .then((re) => {

    if (re.data.length != 0) {
    setPic(re.data);
    
    console.log(re.data.length);
    setRandom(Math.floor(Math.random() * re.data.length))}
    else{
      setPic("https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png");
    }
  })

},[]);




React.useEffect(() => {
	setCommunityScore("Loading");
    getData();
  }, []);

const getData =  async() => {
	const response = await fetch(`https://api.jikan.moe/v4/anime/`+(itemid)+`/statistics`);
	const data = await response.json();
  if (data.data.scores.length == 0) {
    console.log("WOW")
    setCommunityScore("NA")
    return;
  }
	//console.log(data);
	//console.log(data.data.scores)
	var communityScore = 0;
	var votes = [];
	var top3 = [];

	//console.log(stats)
	//load the number of votes for each score into the array
	for(var i = 0; i < data.data.scores.length; i++){
		votes.push(data.data.scores[i].votes);
	}

	//sort votes in descending order
	votes.sort((a, b) => a < b ? 1 : a > b ? -1 : 0);
	//console.log(votes)

	//find index of top votes to find score value
	for(var i = 0; i < 3; i++){
		let obj = data.data.scores.find(o => o.votes === votes[i]);
		top3.push(obj);
	}

	//get the average score of the top 3 scores
	for(var i = 0; i < 3; i++){
		communityScore += top3[i].score;
	}

	communityScore = (communityScore/3).toFixed(1);
	
	setCommunityScore(communityScore);

	console.log(`Community score: ` + communityScore)
}
const [textShown, setTextShown] = React.useState(false); //To show ur remaining Text
const [lengthMore,setLengthMore] = React.useState(false); //to show the "Read more & Less Line"
const toggleNumberOfLines = () => { //To toggle the show text or hide it
    setTextShown(!textShown);
}

const onTextLayout = React.useCallback(e =>{
  setLengthMore(e.nativeEvent.lines.length >=4); //to check the text is more than 4 lines or not
  // console.log(e.nativeEvent);
},[]);

let check = "";
let color;
navigation.setOptions({title: itemTitle});
const saveCard = async (key,value) => {
    try {
        await AsyncStorage.setItem(key, value)
        console.log("yo");


      } catch (e) {
          console.log(e);
      }
    }
    return(
        <ScrollView>
          {pic == null && videos == null && <View style={{height:"100%",justifyContent:"center",alignItems:"center",marginTop:"55%"}}>
                       <ActivityIndicator size="large" color="#057DFE" />
       </View>}
       {pic != null && videos != null &&
        <View>
        {pic !== "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png" &&
        <ImageBackground
        
        source={{ uri: pic[random].jpg.large_image_url}}
        style={{
          height: 250, // <-- you can adjust visible area
          width: "100%",  // <-- same here
          overflow: 'hidden'
        
        }}
        imageStyle={{
          resizeMode: "cover",
          height:330, // <-- you can adjust this height to play with zoom
        }}>
        {itemScore > 0 && itemScore <= 3 &&
          <View style={[styles.score,{backgroundColor:"#FF0000"}]}>
            <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>
              {Math.round(itemScore * 10)}
            </Text>
          </View>
          }
          {itemScore > 3 && itemScore <= 5 &&
            <View style={[styles.score,{backgroundColor:"#FF8822"}]}>
            <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>
              {Math.round(itemScore * 10)}
              </Text>

              </View>
          }
          {itemScore > 5 && itemScore <= 7 &&
            <View style={[styles.score,{backgroundColor:"#FFCC33"}]}>
            <Text style={{color:"white", fontWeight:"bold", fontSize:22}}>
              {Math.round(itemScore * 10)}
              </Text>

              </View>
          }
          {itemScore > 7 && itemScore <= 8 &&
            <View style={[styles.score,{backgroundColor:"#B3CC33"}]}>
              <Text style={{color:"white", fontWeight:"bold", fontSize:22}}>
              {Math.round(itemScore * 10)}
              </Text>

              </View>
          }

        {itemScore > 8 && itemScore <= 10 &&
          <View style={[styles.score,{backgroundColor:"#66CC33"}]}>
              <Text style={{color:"white", fontWeight:"bold", fontSize:22}}>
                {Math.round(itemScore * 10)}
              </Text>
          </View>
        }
        {itemScore == null &&
          <View style={[styles.score,{backgroundColor:"#cccccc"}]}>
          <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>NA</Text>
            </View>
        }
        <TouchableOpacity style={styles.close} onLongPress= {() => {
                check = "saved";
                const jsonValue = JSON.stringify(
                  {
                    t: itemTitle, 
                    d: itemSynopsis, 
                    pic: itemUrl, 
                    id: itemid,
                    score: itemScore,
                    genre: itemGenres,
                    status:itemStatus,
                    rating:itemRating,
                    season: itemSeason,
                    year: itemYear
                  }
                );
                saveCard(itemTitle, jsonValue);
                Toast.show({
                type: 'success',
                text1: 'Added Anime to Watchlist',
                text2: itemTitle
                });
                  }
              }>
                   
            <Ionicons name="bookmark" size={70} color="#057DFE" />
            </TouchableOpacity>
    
    </ImageBackground>
        
        }
        {pic === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png" &&
        <ImageBackground
        
            source={{ uri: pic}}
            style={{
              height: 250, // <-- you can adjust visible area
              width: "100%",  // <-- same here
              overflow: 'hidden'
            
            }}
            imageStyle={{
              resizeMode: "cover",
              height:330, // <-- you can adjust this height to play with zoom
            }}>
            {itemScore > 0 && itemScore <= 3 &&
              <View style={[styles.score,{backgroundColor:"#FF0000"}]}>
                <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>
                  {Math.round(itemScore * 10)}
                </Text>
              </View>
              }
              {itemScore > 3 && itemScore <= 5 &&
                <View style={[styles.score,{backgroundColor:"#FF8822"}]}>
                <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>
                  {Math.round(itemScore * 10)}
                  </Text>

                  </View>
              }
              {itemScore > 5 && itemScore <= 7 &&
                <View style={[styles.score,{backgroundColor:"#FFCC33"}]}>
                <Text style={{color:"white", fontWeight:"bold", fontSize:22}}>
                  {Math.round(itemScore * 10)}
                  </Text>

                  </View>
              }
              {itemScore > 7 && itemScore <= 8 &&
                <View style={[styles.score,{backgroundColor:"#B3CC33"}]}>
                  <Text style={{color:"white", fontWeight:"bold", fontSize:22}}>
                  {Math.round(itemScore * 10)}
                  </Text>

                  </View>
              }

            {itemScore > 8 && itemScore <= 10 &&
              <View style={[styles.score,{backgroundColor:"#66CC33"}]}>
                  <Text style={{color:"white", fontWeight:"bold", fontSize:22}}>
                    {Math.round(itemScore * 10)}
                  </Text>
              </View>
            }
            {itemScore == null &&
              <View style={[styles.score,{backgroundColor:"#cccccc"}]}>
              <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>NA</Text>
                </View>
            }
            <TouchableOpacity style={styles.close} onLongPress= {() => {
                check = "saved";
                const jsonValue = JSON.stringify(
                  {
                    t: itemTitle, 
                    d: itemSynopsis, 
                    pic: itemUrl, 
                    id: itemid,
                    score: itemScore,
                    genre: itemGenres,
                    status:itemStatus,
                    rating:itemRating,
                    season: itemSeason,
                    year: itemYear
                  }
                );
                saveCard(itemTitle, jsonValue);
                Toast.show({
                type: 'success',
                text1: 'Added Anime to Watchlist',
                text2: itemTitle
                });
                  }
              }>
                   
            <Ionicons name="bookmark" size={70} color="#057DFE" />
            </TouchableOpacity>
        
        </ImageBackground>
        }
        
       
        <View style={[styles.itemPhoto,{alignItems:"center"}]}>
          <Image
            source={{ uri: itemUrl}}
            style={styles.itemPhoto}
            resizeMode="cover">

        
        </Image>
        </View>
       
        


    <View style={{margin:"5%",marginTop:"-15%"}}> 
        <Text style={{marginTop:"2%",fontSize:20,fontWeight:"bold"}}>
			Community Score: {communityScore}
			
        </Text>
		<Text style={{marginTop:"2%",fontSize:25,fontWeight:"bold"}}>
			Synopsis
		</Text>
    <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 4}
              style={styles.itemText}>{itemSynopsis}</Text>

              {
                  lengthMore ? <Text
                  onPress={toggleNumberOfLines}
                  style={{ lineHeight: 21, marginTop: 5,color:"#057DFE", fontWeight:"bold" }}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                  :null
              }
        <View style={{marginTop:20}}>
        <View style={{flexDirection:"row"}}>
        <Text>Genres</Text>

        {itemGenres != 0 && 
        <View style={{flexDirection:"row",flexWrap:"wrap",marginStart:20.5,width:"75%"}}>
                  {itemGenres.map((genre,index)=> {
                    if (index != itemGenres.length - 1) {
                    return (
                     <Text style={{color:"#6D7275"}}>{genre.name + ", "}</Text>

                    )}else{
                      return (
                     <Text style={{color:"#6D7275"}}>{genre.name}</Text>)
                    }}
                  
                  )}

                </View>
       }
       {itemGenres == 0 && 

       <View style={{flexDirection:"row",flexWrap:"wrap",marginStart:20.5,width:"80%"}}>
        <Text style={{color:"#6D7275"}}>NA</Text>

        </View>
       }
         </View>
         <View style={{flexDirection:"row"}}>
          <Text>Status</Text>
          <View style={{flexDirection:"row",flexWrap:"wrap",marginStart:18,width:"80%"}}>
            <Text style={{color:"#6D7275"}}>  {itemStatus}</Text>
          </View>
         </View>
         <View style={{flexDirection:"row"}}>
          <Text>Rating</Text>
          <View style={{flexDirection:"row",flexWrap:"wrap",marginStart:18,width:"80%"}}>
            <Text style={{color:"#6D7275"}}>  {itemRating}</Text>
          </View>
         </View>
         <View style={{flexDirection:"row"}}>
          
          <Text>Season</Text>
          <View style={{flexDirection:"row",flexWrap:"wrap",marginStart:19,width:"80%"}}>
            {itemSeason == null &&
              <Text style={{color:"#6D7275"}}>NA</Text>}
            {itemSeason != null && <Text style={{color:"#6D7275"}}>{itemSeason[0].toUpperCase() + itemSeason.slice(1)} {itemYear} </Text>}
          </View>
         </View>
         {pic !== "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png" &&
         <View style={{marginTop:"5%"}}>
         <View style={[styles.headerContainer,{marginTop:"0%"}]}>
        <Text style={styles.headerTitle}>Images</Text>
        <TouchableOpacity onPress={(item) => 
          {navigation.navigate("Images",{itemid: itemid});
          }}>
          <Text style={styles.headerSubTitle}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>
         <FlatList 
          //style={{backgroundColor:"yellow"}}
          data={pic}
          horizontal
          ItemSeparatorComponent={() =><ItemSeparator width={10}/>}
          ListHeaderComponent={() =><ItemSeparator width={0}/>}
          ListFooterComponent={() =><ItemSeparator width={20}/>}
          showsHorizontalScrollIndicator={false}
          key={1}
          keyExtractor={(item) => item.mal_id}
          renderItem={({item,index}) => (        
            <View style={styles.item} key={index}>
            
            <View style={{zIndex:0}}>
            
                <Image
                    source={{
                        uri: item.jpg.large_image_url,
                    }}
                    style={styles.picture}
                    resizeMode="cover"
                />
          
            </View>
        </View>

          )}
            
        />
        
        




         </View>
         }
         {videos !== "No Videos" &&
         <View style={{marginTop:"5%"}}>
         <View style={[styles.headerContainer,{marginTop:"0%"}]}>
        <Text style={styles.headerTitle}>Videos</Text>
        {/*<TouchableOpacity onPress={(item) => 
          {navigation.navigate("Images",{itemid: itemid});
          }}>
          <Text style={styles.headerSubTitle}>VIEW ALL</Text>
        </TouchableOpacity>*/}
      </View>
         <FlatList 
          //style={{backgroundColor:"yellow"}}
          data={videos}
          horizontal
          ItemSeparatorComponent={() =><ItemSeparator width={10}/>}
          ListHeaderComponent={() =><ItemSeparator width={0}/>}
          ListFooterComponent={() =><ItemSeparator width={20}/>}
          showsHorizontalScrollIndicator={false}
          key={1}
          keyExtractor={(item) => item.mal_id}
          renderItem={({item,index}) => (        
            <View key={index}>
            
            <View style={{marginTop:10}}>
              <Player width1={80} height1={30} vidID={item.trailer.youtube_id}/>

            
          
            </View>
        </View>

          )}
            
        />
        
        




         </View>
         }


         
         </View>
         
         


        </View>

        </View>
       }



        </ScrollView>

        
    );
    }

  const styles = StyleSheet.create({

    item: {
        margin: 10,
        //height:setHeight(15),
        //backgroundColor:"green"

      },
      itemPhoto: {
        zIndex:1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,  
        borderRadius: 10,
        bottom:setHeight(4.5),
        marginStart:"32%",
        width:setWidth(25), 
        height:setHeight(16),
      },
      itemText: {
        color:"#6D7275",
        //fontWeight:"bold",
        marginTop:setHeight(1),
        lineHeight: 21,
      },

      close: {
        marginStart:"80%",
        top:setHeight(14),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,  
      },
      score: {
        marginStart:"82%",
        top:setHeight(2),
        width:50,
        height:50,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2
    },
    //item: {
    //  margin: 10,
    //},
    picture: {
      justifyContent: "center",
      alignItems:"center",
      //paddingVertical: 8,
      borderRadius:8,
      marginHorizontal:-10,
      marginVertical: 2,
      width:setWidth(50), 
      height:setHeight(15),
      
    },
    headerTitle: {
      //fontWeight: '800',
      //fontSize: 20,
      //marginTop:  20,
      marginBottom: 5,
      //marginStart: 20
  
    },
  
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerSubTitle: {
      lineHeight: 21,
      color:"#057DFE", 
      fontWeight:"bold",
      marginEnd: 15,
      fontSize:14  
    },

     
    
    
    });

    export default AnimeDetailScreen;