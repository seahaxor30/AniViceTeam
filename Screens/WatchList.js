import React from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity,ScrollView,Dimensions} from 'react-native';
//import { GiftedChat } from 'react-native-gifted-chat';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Toast from 'react-native-toast-message';
import { Avatar, Title, Caption, TouchableRipple, Card, Paragraph } from "react-native-paper";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;




const Settingscreen = ({ navigation }) => {

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
    if(localStorage.length < 1){
      return (
        <View style={styles.emptyDigestView}>
          <Text style={styles.emptyDigest}>Looks like you haven't saved anything.</Text>
          <Text style={styles.emptyDigest}>Long press on a digest to save it!</Text>
        </View>
      )
    }
    return localStorage.map((digest, i) => {
      const parsed = JSON.parse(digest[1]);
      if(parsed["t"] == null || parsed["d"] == null || parsed["pic"] == null){
        return(<Text key={i}></Text>)
      }
      return(
        <Card style = {styles.cardStyle} elevation = {2} onPress = {() => {
          navigation.navigate("Anime Detail", {itemTitle: parsed["t"], itemSynopsis: parsed["d"], itemUrl: parsed["pic"]});
          }} key = {i} 
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
          <Card.Cover source={{ uri: parsed["pic"] }} style={styles.test}
          
          />
          <Card.Content>
              <Title>{parsed["t"].slice(0,50)}</Title>
          </Card.Content>
      </Card>
      );
    });
  }

  //const setUserCred = () => {
  //  const auth = getAuth();
  //  const user = auth.currentUser;
  //  if(user !== null){
  //    const displayName = user.displayName;
  //    const photoURL = user.photoURL;
  //    setUsername(displayName);
  //    setIcon(photoURL);
  //    console.log(user.uid, "<------");
  //    console.log(user.displayName, "<------");
  //  }
  //}


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
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal = {false} style = {styles.scrollViewStyle} contentContainerStyle={styles.ctcs}>
        {makeCards()}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Settingscreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: "center",
    paddingTop: - (windowHeight/3),
    //paddingBottom: - (windowHeight/30),
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
    height: windowHeight / 7.4,
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
  }
});

