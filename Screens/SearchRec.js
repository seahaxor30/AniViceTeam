import React from "react";
import { Text,View,Alert,TouchableOpacity,StyleSheet,SafeAreaView,FlatList,Image,Dimensions} from "react-native";
import List from "../components/list"
import SearchBar from "../components/SearchBar";
import ItemSeparator from "../components/ItemSeperator";
import { Ionicons} from '@expo/vector-icons';
import { Button, Overlay, Icon } from 'react-native-elements';
import { async } from "@firebase/util";
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { updateDoc,setDoc,doc, getFirestore, setDocs, getDoc } from "firebase/firestore";
import { authenication } from "../firebase";
import Toast from 'react-native-toast-message';




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
    const [ search, setSearch] = React.useState([]);
    const {title,postId} = route.params;
    const [visible, setVisible] = React.useState(false);
    const isFocused = useIsFocused();
    const [isBusy, setBusy] = React.useState(true)
    const [num,setNum] = React.useState(0)

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
        fetch(`https://api.jikan.moe/v4/anime?q=${title}`)
        .then(re => re.json())
        .then((re) => {
            setSearch(re.data);
            setBusy(false);

            
    
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
                genres: genres
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
    return(
      <SafeAreaView style={styles.root}>
          {/*<TouchableOpacity onPress={()=>{console.log(anime)}}>
              <Text>TEST</Text>
          </TouchableOpacity>*/}
      <FlatList style={styles.flatlist} 
                data={search}
                ItemSeparatorComponent={() =><ItemSeparator height={10}width={20}/>}
                ListHeaderComponent={() =><ItemSeparator height={20}/>}
                ListFooterComponent={() =><ItemSeparator height={30}/>}
                keyExtractor={(item) => String(item.mal_id)}
                renderItem={({item,index}) => (
                <TouchableOpacity style={styles.container5}onPress={(item) => {

                navigation.navigate("Anime Detail",{
                itemid: search[index]["mal_id"],
                itemUrl:search[index]["images"]["jpg"]["image_url"],
                itemTitle:search[index]["title"],
                itemSynopsis: search[index]["synopsis"]});           
              }}>
                <View>
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
        <TouchableOpacity 
            style={{position:"absolute",left:"80%",bottom:"5%"}}
            onPress={() => {
                toggleOverlay({
                itemid: search[index]["mal_id"],
                genres: search[index]["genres"],
                itemUrl:search[index]["images"]["jpg"]["large_image_url"],
                itemTitle:search[index]["title"],
                itemEnglishTitle:search[index]["title_english"],
                itemSynopsis: search[index]["synopsis"]});
               
            }}>

            <Ionicons name="bookmark" size={70} color="#057DFE" />
        </TouchableOpacity>
        {isBusy != true && 
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{width:"90%",height:"70%"}}>
                <Text style={styles.title2}>{anime.itemTitle}</Text>
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
               

     
    </SafeAreaView>
  );
};

export default SearchRec;

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
  title2: {
    //width: "100%",
    marginBottom: 10,
    margin:10,
    marginStart:20,
    fontSize: 15,
    fontWeight: "bold",
    //marginLeft: "10%",
  },

  container: {
    justifyContent: "center",
    alignItems:"center",
    borderRadius: 12,
    borderTopEndRadius:0,
    borderBottomEndRadius:0,
    backgroundColor: "#057DFE",
    paddingVertical: 8,
    bottom:"100%",
    width:setWidth(30), 
    height:setHeight(18)



},

container3:{
    fontSize: 20,
    fontWeight: "bold",
    flex: 1, 
    height:setHeight(10),

},
box:{
    flexDirection:"row",
    marginStart:setWidth(35),
    paddingVertical: 30,
    alignItems: "center",
    width:setWidth(55),
    height:setHeight(18),
 },
overlayImage: {
    height: "70%",
    width: windowWidth / 1.3,
    borderRadius: 10,
    marginStart:15,
    margin:5

  },


});

