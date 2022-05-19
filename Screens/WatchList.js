import React from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity,ScrollView,Dimensions,Image} from 'react-native';
//import { GiftedChat } from 'react-native-gifted-chat';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Divider from "../components/flatlistDivider";


import Toast from 'react-native-toast-message';
import { Avatar, Title, Caption, TouchableRipple, Card, Paragraph } from "react-native-paper";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const { width,height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;




const Watchlist = ({ navigation }) => {

  const isFocused = useIsFocused();
  const [localStorage, SetLocalStorage] = React.useState([]);

  const [username, setUsername] = React.useState("");
  const [icon, setIcon] = React.useState("https://www.plattsburgh.edu/files/307/images/new-burghy-p-logo.png")



  const refresh = () => {
    fetchFromLocalStorage().then((val) => {
      SetLocalStorage(val);
    });
  }

  const removeSavedDigest = async (digest) => {
    try {
      await AsyncStorage.removeItem(digest)
    } catch(e) {
      // remove error
    }
  
    console.log(digest, "has been removed");
  }

  const getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
      // read key error
    }
    return keys;
  }

  const getAllValues = async (keys) => {
    let values
    try {
      values = await AsyncStorage.multiGet(keys)
    } catch(e) {
      // read error
    }
    return values;
  }

  const fetchFromLocalStorage = async () => {
    const keys = await getAllKeys();
    const values = await getAllValues(keys);
    return values;
  }

  const makeCards = () => {
    //console.log(localStorage.length)
    //console.log(localStorage)
    if(localStorage.length == 1){
      return (
        <View style={styles.emptyDigestView}>
          <Text style={styles.emptyDigest}>Looks like you haven't saved anything.</Text>
          <Text style={styles.emptyDigest}>Long press on the bookmark on an anime info screen to save it!</Text>
        </View>
      )
    }
    return localStorage.map((digest, i) => {
      const parsed = JSON.parse(digest[1]);
      //console.log(digest[1])
      //console.log("------------------")
      //console.log(parsed)

      //console.log(digest[1])
      if(parsed["t"] == null  || parsed["pic"] == null || parsed["id"] == null){
        return(<Text key={i}></Text>)
      }

      return(
        <TouchableOpacity onPress={(item) => {

                navigation.navigate("Anime Detail",{
                itemid: parsed["id"],
                itemUrl:parsed["pic"],
                itemTitle:parsed["t"],
                itemGenres:parsed["genre"],
                itemStatus:parsed["status"],
                itemRating:parsed["rating"],
                itemSeason:parsed["season"],
                itemYear:parsed["year"],
                itemScore: parsed["score"],
                itemSynopsis: parsed["d"]});          
              }}
              
              
              key = {i} 
          onLongPress = {() => {
            removeSavedDigest(parsed["t"]);
            refresh();
            Toast.show({
              type: 'success',
              text1: 'Removed Anime from Watchlist',
              text2: parsed["t"]
            });
          }}
        >
              <View style={styles.box}>
              {parsed["score"] > 0.0 && parsed["score"] <= 3 &&
            <View style={{backgroundColor:"#FF0000",
                zIndex:1,
                bottom:50,
                left:"58%",
                margin:-15,
                width:35,
                height:35,
                justifyContent:"center",
                alignItems:"center",
                borderRadius:5,
              }}>
              <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>
                {Math.round(parsed["score"] * 10)}
                </Text>

                </View>
            }
            {parsed["score"] > 3 && parsed["score"] <= 5 &&
            <View style={{backgroundColor:"#FF8822",
                zIndex:1,
                bottom:50,
                left:"58%",
                margin:-15,
                width:35,
                height:35,
                justifyContent:"center",
                alignItems:"center",
                borderRadius:5,
              }}>
              <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>
                {Math.round(parsed["score"] * 10)}
                </Text>

                </View>
            }
            {parsed["score"] > 5 && parsed["score"] <= 7 &&
            <View style={{backgroundColor:"#FFCC33",
                zIndex:1,
                bottom:50,
                left:"58%",
                margin:-15,
                width:35,
                height:35,
                justifyContent:"center",
                alignItems:"center",
                borderRadius:5,
              }}>
              <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>
                {Math.round(parsed["score"] * 10)}
                </Text>

                </View>
            }
            {parsed["score"] > 7 && parsed["score"] <= 8 &&
            <View style={{backgroundColor:"#B3CC33",
                zIndex:1,
                bottom:50,
                left:"58%",
                margin:-15,
                width:35,
                height:35,
                justifyContent:"center",
                alignItems:"center",
                borderRadius:5,
              }}>
                <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>
                {Math.round(parsed["score"] * 10)}
                </Text>

                </View>
            }

            {parsed["score"] > 8 && parsed["score"] <= 10 &&
            <View style={{backgroundColor:"#66CC33",
                zIndex:1,
                bottom:50,
                left:"58%",
                margin:-15,
                width:35,
                height:35,
                justifyContent:"center",
                alignItems:"center",
                borderRadius:5,
              }}>
                <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>
                {Math.round(parsed["score"] * 10)}
                </Text>

                </View>
            }
            {parsed["score"] == null &&
            <View style={{backgroundColor:"#cccccc",
                zIndex:1,
                bottom:50,
                left:"58%",
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
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.4,
                  shadowRadius: 2,

                 }}>
                    <Image
                    source={{
                        uri: parsed["pic"],
                    }}
                    style={styles.container}
                    resizeMode="cover"
                />
            </View>
                <View style = {styles.container3}>
                <Text style={{fontSize: 20,fontWeight: "bold"}}
                ellipsizeMode='tail' numberOfLines={3}>
                  {/*{item.title_english ? item.title_english : item.title }*/}
                  {parsed["t"]}
                </Text>
                <View style={{flexDirection:"row",flexWrap:"wrap"}}>
                  {parsed["genre"].map((genre,index)=> {
                    if (index != parsed["genre"].length - 1) {
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
                {i != localStorage.length - 1 &&
                  <Divider/>
                }
                {i == localStorage.length - 1 &&
                  <View style={{height:20}}></View>
                }

            </TouchableOpacity>
        


      );
    });
  }



  React.useEffect(() => {
    fetchFromLocalStorage().then((val) => {
      SetLocalStorage(val);
    });
    //setUserCred();
    //console.log(username, "<------");
    //console.log(icon, "<------");
    return () => {};
  }, [isFocused]);


  let imageUrl = "";
  return (
    <ScrollView style={styles.container1}>
     
        {makeCards()}
    </ScrollView>
  );
};
export default Watchlist;


const styles = StyleSheet.create({
  container1: {
    //flex: 1,
    backgroundColor:"white",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
  },
  button: {
    alignItems: "flex-end",
  },
  profileCircle: {
    //marginLeft: windowWidth / 15,
  },
  Settingview: {
    display: "flex",
    flexDirection: "row-reverse",
    width: "100%",
  },
  cardStyle: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    width: 300,
    margin: 10,
    marginStart:windowWidth/10,
    height: windowHeight / 3.8,
},
  test: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: windowHeight / 6,
  },
  scrollViewStyle: {
    //marginTop: 10,
    //backgroundColor: "white",
    width: "100%",
    elevation: 5,
    //borderTopLeftRadius: 30,
    //borderTopRightRadius: 30,
  },
  ctcs: {
    justifyContent: "center",
    alignItems: "flex-start"
  },
  viewtester: {
    marginTop: 10,
    backgroundColor: "white",
    width: "100%",
    elevation: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  emptyDigest:{
    color: "grey",
  },
  emptyDigestView: {
    margin: windowWidth / 4
  },
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
    width:setWidth(28), 
    height:setHeight(18),



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
