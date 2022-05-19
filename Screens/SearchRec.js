import React from "react";
import { Text,View,Alert,TouchableOpacity,StyleSheet,SafeAreaView,FlatList,Image,Dimensions,ActivityIndicator} from "react-native";
import List from "../components/list"
import SearchBar from "../components/SearchBar";
import ItemSeparator from "../components/ItemSeperator";
import { Ionicons,MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons';
import { Button, Overlay, Icon } from 'react-native-elements';
import { async } from "@firebase/util";
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { updateDoc,setDoc,doc, getFirestore, setDocs, getDoc } from "firebase/firestore";
import { authenication } from "../firebase";
import Toast from 'react-native-toast-message';
import Divider from "../components/flatlistDivider";





const { width,height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;
const windowWidth = Dimensions.get('window').width;
const windowHieght = Dimensions.get('window').height;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const  SearchRec = ({route,navigation}) =>{
    const currUser = authenication.currentUser;
    const db = getFirestore()
    const [ search, setSearch] = React.useState(null);
    const {title,postId} = route.params;
    const [visible, setVisible] = React.useState(false);
    const isFocused = useIsFocused();
    const [isBusy, setBusy] = React.useState(true)
    const [num,setNum] = React.useState(0)
    const [check,setCheck] = React.useState(false);



    const [anime, setAnime] = React.useState({});
    const [animeUrl, setAnimeUrl] = React.useState('');
    const [post,setPost] = React.useState({})
    const animeDetail = { 
        itemid: "",
        itemUrl:"",
        itemTitle:"",
        itemSynopsis: ""
    }
      
   

    React.useEffect(()=>{
        fetch(`https://api.jikan.moe/v4/anime?q=${title}&sfw`)
        .then(re => re.json())
        .then((re) => {
            setSearch(re.data);
            setBusy(false);
            const data = re.data  
            if (data.length > 0) {
              setCheck(false)
            }
            else{
              setCheck(true)
            }

            
    
      })
    },[isFocused]);

    React.useEffect(() => {
        const fetchData = async () => {
            const snapNum = await getDoc(doc(db, "Posts",postId))
            setNum(snapNum.data().recNum)
        }
        fetchData();

    }, []);



    const toggleOverlay = (details) => {
        //console.log(details)
        setAnime(details);
        setVisible(!visible);
        console.log("Added")
   
    };
    const updateUser = async (map) => {
        const recId = postId + map.itemid + "-" + currUser.uid
        const genreList = map.genres
        let genres = [];
        for (let i = 0; i < genreList.length;i++){
            if (i !== genreList.length - 1){
            genres.push(genreList[i]["name"] + ", ")
            }
            else{
                genres.push(genreList[i]["name"])
            }
        }
        console.log("-----")
        console.log(genres)
        console.log("-----")





        const snap = await getDoc(doc(db,`Posts/${postId}/recs`,recId))
        if (snap.exists()) {
            toggleOverlay({})
            console.log("already there");
            Toast.show({
                type: "error",
                text1: 'Recommendation Unsuccessful',
                text2: 'Pick a NEW anime, NO OLD'
                });
              //console.log(user);
              //setSignedin(true);
  
              
          } else {
            console.log("all good")
            await setDoc(doc(db,`Posts/${postId}/recs`,recId),{
                itemid: map.itemid,
                itemUrl:map.itemUrl,
                itemTitle: map.itemTitle,
                itemEnglishTitle: map.itemEnglishTitle,
                itemSynopsis: map.itemSynopsis,
                userRecId: currUser.uid,
                userName: currUser.displayName,
                userUrl: currUser.photoURL,
                recId: recId,
                genres: genres,
                itemStatus:map.itemStatus,
                itemRating:map.itemRating,
                itemSeason:map.itemSeason,
                itemYear:map.itemYear,
                itemScore:map.itemScore,
                itemGenres:map.itemGenres
                
            })
            const addPostNum = async () => {
                const recNumber = num + 1
                await updateDoc(doc(db,"Posts",postId),{
                    recNum: recNumber
                });
    
            }
            addPostNum();
            Toast.show({
                type: "success",
                text1: 'Recommendation Successful',
                text2: 'Pull to refresh to see new recommendations'
                });
            
            // doc.data() will be undefined in this case
            console.log("No such document!");
            navigation.goBack();

          }
        
        


    }


    //const cancelOverlay = () => {
    //    setAnime({});
    //    setVisible(!visible);
    //    console.log("cleared")
    //    console.log(anime)

    //}
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
                renderItem={({item,index}) => (
                <TouchableOpacity style={styles.container5}onPress={(item) => {

                navigation.navigate("Anime Detail",{
                itemid: search[index]["mal_id"],
                itemUrl:search[index]["images"]["jpg"]["image_url"],
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
              {item.score > 0.0 && item.score <= 3 &&
            <View style={{backgroundColor:"#FF0000",
                zIndex:1,
                bottom:42,
                left:"50%",
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
                bottom:42,
                left:"50%",
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
                bottom:42,
                left:"50%",
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
                bottom:42,
                left:"50%",
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
                bottom:42,
                left:"50%",
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
                bottom:42,
                left:"50%",
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
        <TouchableOpacity 
            style={{position:"absolute",left:"85%",bottom:"5%"}}
            onPress={() => {
                toggleOverlay({
                itemid: search[index]["mal_id"],
                itemGenres: search[index]["genres"],
                itemStatus:search[index]["status"],
                itemRating:search[index]["rating"],
                itemSeason:search[index]["season"],
                itemYear:search[index]["year"],
                itemScore: search[index]["score"],
                genres: search[index]["genres"],
                itemUrl:search[index]["images"]["jpg"]["large_image_url"],
                itemTitle:search[index]["title"],
                itemEnglishTitle:search[index]["title_english"],
                itemSynopsis: search[index]["synopsis"]});
               
            }}>
            <View style={{backgroundColor:"#057DFE",borderRadius:5}}>
              <MaterialCommunityIcons name="playlist-plus" size={40} color="white" />
            </View>
        </TouchableOpacity>
        {isBusy != true && 
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{width:"90%",height:"70%"}}>
                <Text style={styles.title2} numberOfLines={1} ellipsizeMode="tail">{anime.itemTitle}</Text>
        <Image source={{uri: anime.itemUrl}} style={styles.overlayImage} />
        <Button
            style={{margin:15,marginBottom:0}}
            title="Recommend"
            onPress={() => {
                    updateUser(anime);
                    toggleOverlay({});
                    {/*console.log(anime);*/}


                    {/*navigation.navigate("Search Recommendation",{
                        title:title
                    })
                    setTitle("")*/}
                  
        }}
        />
        <Button
            style={{margin:15}}

            title="Cancel"
            onPress= {() => {
               toggleOverlay({})
            }}
        />
      </Overlay>}


        </TouchableOpacity>
        )}
                showsHorizontalScrollIndicator={false}/>
               

      }
      </View>
  );
};

export default SearchRec;

//const styles = StyleSheet.create({
//  root: {
//    margin:10,
//    justifyContent: "center",
//    //alignItems: "center",
//  },
//  container5:{
//      backgroundColor: "white",
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
  //title2: {
  //  //width: "100%",
  //  marginBottom: 10,
  //  margin:10,
  //  marginStart:20,
  //  fontSize: 15,
  //  fontWeight: "bold",
  //  //marginLeft: "10%",
  //},

//  container: {
//    justifyContent: "center",
//    alignItems:"center",
//    borderRadius: 12,
//    borderTopEndRadius:0,
//    borderBottomEndRadius:0,
//    backgroundColor: "#057DFE",
//    paddingVertical: 8,
//    bottom:"100%",
//    width:setWidth(30), 
//    height:setHeight(18)



//},

//container3:{
//    fontSize: 20,
//    fontWeight: "bold",
//    flex: 1, 
//    height:setHeight(10),

//},
//box:{
//    flexDirection:"row",
//    marginStart:setWidth(35),
//    paddingVertical: 30,
//    alignItems: "center",
//    width:setWidth(55),
//    height:setHeight(18),
// },
//overlayImage: {
//    height: "70%",
//    width: windowWidth / 1.3,
//    borderRadius: 10,
//    marginStart:15,
//    margin:5

//  },


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
  title2: {
    //width: "100%",
    marginBottom: 10,
    margin:10,
    marginStart:20,
    fontSize: 15,
    fontWeight: "bold",
    //marginLeft: "10%",
  },


  overlayImage: {
    height: "70%",
    width: windowWidth / 1.3,
    borderRadius: 10,
    marginStart:15,
    margin:5
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
      width:setWidth(50),
      height:setHeight(18),
      //backgroundColor:"green"
   
  
  
      //left:50
  }
  
  });