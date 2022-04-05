import React from "react";
import { Text,View,Button,Alert,TouchableOpacity,StyleSheet,SafeAreaView,FlatList,Image,Dimensions,ScrollView} from "react-native";
import ItemSeparator from "../components/ItemSeperator";
import { getFirestore,collection,getDoc,doc, getDocs, setDoc, updateDoc,query } from "firebase/firestore"
import { FAB } from 'react-native-elements';
import { useFocusEffect } from "@react-navigation/native";
import { authenication } from "../firebase";

const { width,height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const RecommendationsTab = ({navigation}) => {
  const db = getFirestore();
  const [search, setSearch] = React.useState([]);
  const [temp, setTemp] = React.useState([])
  const [snapNum, setsnapNum] = React.useState(0)
  const [refreshing, setRefreshing] = React.useState(false);  
  var num = 0;
  const currUser = authenication.currentUser;
  
    
  useFocusEffect(

    React.useCallback(()=>{
      const fetchData = async () => {
        const snap = await getDoc(doc(db, 'PostNum','PostNum'));
        num = snap.data().postNum
        await getDocs(query(collection(db, 'Posts')))
        .then(querySnapshot => {
          const objectsArray = [];
          querySnapshot.forEach(doc => {
              objectsArray.push(doc.data());
          });
          console.log("yo"+ num);
          console.log("hi" + search.length)
          if (search.length != num && search.length != 0 ){
            setSearch([...search, ...objectsArray])
          }
          else if (search.length == 0) {
            setSearch([...search, ...objectsArray])
          }
          else{
            return;
          }
        });
    }

    //const checkData = async () => {
    //  const snap = await getDoc(doc(db, 'PostNum','PostNum'));
    //  num = snap.data().postNum
    //  console.log("yo"+ num);
    //  if (search.length != snapNum){
    //    fetchData()
    //  }
    //  if (search.length == 0) {
    //    fetchData()
    //  }
    //  else{
    //    return;
    //  }
    //}
    //checkData();
    fetchData();

    },[])

    
    
    
    );

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => 
        {
          //fetchData();
          const fetchData = async () => {
            const snap = await getDoc(doc(db, 'PostNum','PostNum'));
            num = snap.data().postNum
            await getDocs(query(collection(db, 'Posts')))
            .then(querySnapshot => {
              const objectsArray = [];
              querySnapshot.forEach(doc => {
                  objectsArray.push(doc.data());
              });
              console.log("yo"+ num);
              console.log("hi" + search.length)
              if (search.length != num && search.length != 0 ){
                setSearch([...search, ...objectsArray])
              }
              else if (search.length == 0) {
                setSearch([...search, ...objectsArray])
              }
              else{
                return;
              }
            });
        };
          fetchData();
          setRefreshing(false);
        });
    }, []);


  const navigater = () => {
    navigation.navigate("Create Recommendation");

  }
  return (
    <View style={styles.root}> 
      <FlatList style={{height:"100%"}} 
                data={search}
                ItemSeparatorComponent={() =><ItemSeparator height={20}width={20}/>}
                ListHeaderComponent={() =><ItemSeparator height={5}/>}
                ListFooterComponent={() =><ItemSeparator height={30}/>}
                keyExtractor={(item) => String(item.postId)}
                refreshing={refreshing}
                onRefresh={onRefresh}
                //onEndReachedThreshold={0.5}
                //onMomentumScrollBegin={()=>{onEndReachedCalledDuringMomentum = false}}
                //refreshing={loading}
                //onEndReached={()=>{
                  //if (!onEndReachedCalledDuringMomentum){
                    //getMore();
                    //onEndReachedCalledDuringMomentum = true
                  //}}}
                renderItem={({item,index}) => (
                <TouchableOpacity onPress={(item) => {
                  if (search[index]["uid"] === currUser.uid) {
                    navigation.navigate("User Recommend",
                    {
                      postText: search[index]["postText"],
                      postId: search[index]["postId"],
                      recNum: search[index]["recNum"],
                      color: search[index]["color"]
                    });
                  }
                  else{
                    navigation.navigate("Recommend",
                    {
                      postText: search[index]["postText"],
                      postId: search[index]["postId"],
                      recNum: search[index]["recNum"],
                      color: search[index]["color"]

                    });
                }
              }}>
                <View style={{backgroundColor:item.color,borderRadius:12,height:setHeight(22),alignItems:"center",shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,  
                  elevation: 5}}>
                <View style={{margin:"10%",height:"40%"}}>
                  <Text numberofLines={1} ellipsizeMode="tail" style={{fontSize: 20,fontWeight: "bold"}}>
                    {item.postText}
                  </Text>
                </View>
                  <View style={{backgroundColor:"white",borderBottomEndRadius:12,borderBottomStartRadius:12,height:setHeight(5),width:"100%",top:"80%",alignItems:"center",position:"absolute",justifyContent:"center"}}>
                  {item.recNum == 1 && 
                    <Text style={{fontSize: 20,fontWeight: "bold",padding:10}}>
                      {item.recNum} Recommendation
                    </Text>
                  }
                  {item.recNum != 1 && 
                    <Text style={{fontSize: 20,fontWeight: "bold",padding:10}}>
                      {item.recNum} Recommendations
                    </Text>
                  } 
                  </View>

               
        </View>
        </TouchableOpacity>
        )}
                showsHorizontalScrollIndicator={false}/>

      <FAB 
        color="#057DFE" 
        icon={{ name: 'add', color: 'white' }} 
        size = "large" 
        onPress={navigater}
        placement="right"/>

    </View>
  )
}

export default RecommendationsTab
//import React from "react";
//import { Text,View,Button,Alert,TouchableOpacity,StyleSheet,SafeAreaView,FlatList,Image,Dimensions} from "react-native";
//import List from "../components/list"
//import SearchBar from "../components/SearchBar";
//import ItemSeparator from "../components/ItemSeperator";
//import { getFirestore,collection,getDoc,doc, getDocs, setDoc, updateDoc,query } from "firebase/firestore"

//const { width,height } = Dimensions.get("screen");

//const setWidth = (w) => (width / 100) * w;
//const setHeight = (h) => (height / 100) * h;



//const  RecommendationsTab = ({route,navigation}) =>{
//    const [ search, setSearch] = React.useState([]);
//    const db = getFirestore();

    

//    React.useEffect(()=>{
//      const fetchData = async () => {
//        const querySnapshot = await getDocs(query(collection(db, 'Posts')))
//        //if (snap.exists()) {
//        //    console.log(snap.data());
//        //}
//        //else{
//        //    console.log("none")
//        //}
//        querySnapshot.forEach((doc) => {
//          // doc.data() is never undefined for query doc snapshots
//          console.log(doc.id, " => ", doc.data());
//        });
//    }
//    fetchData();
//    },[]);
//    console.log();
//    return(
//      <SafeAreaView style={styles.root}>
//      <FlatList style={styles.flatlist} 
//                data={search}
//                ItemSeparatorComponent={() =><ItemSeparator height={10}width={20}/>}
//                ListHeaderComponent={() =><ItemSeparator height={20}/>}
//                ListFooterComponent={() =><ItemSeparator height={30}/>}
//                keyExtractor={(item) => String(item.mal_id)}
//                renderItem={({item,index}) => (
//                <TouchableOpacity onPress={(item) => {
//                navigation.navigate("Anime Detail",{
//                itemid: search[index]["mal_id"],
//                itemUrl:search[index]["images"]["jpg"]["large_image_url"],
//                itemTitle:search[index]["title"],
//                itemSynopsis: search[index]["synopsis"]});           
//              }}>
//                <View style={styles.container5}>
//                <View style={styles.box}>
                
//                <Text style = {styles.container3}>
//                    {item.title_english ? item.title_english : item.title }
//                </Text>

//                </View>
//                <View styles={styles.container}>
//                    <Image
//                    source={{
//                        uri: item.images.jpg.image_url,
//                    }}
//                    style={styles.container}
//                    resizeMode="cover"
//                />
//            </View>
//        </View>
//        </TouchableOpacity>
//        )}
//                showsHorizontalScrollIndicator={false}/>

     
//    </SafeAreaView>
//  );
//};

//export default RecommendationsTab;

const styles = StyleSheet.create({
  root: {
    margin:10,
    justifyContent: "center",
    //alignItems: "center",
  },
  //container5:{
  //    backgroundColor: "white",
  //    borderRadius:12,
  //    height:setHeight(18)


  //},
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
    backgroundColor: "green",

    marginStart:setWidth(35),
    //top:50
    paddingVertical: 30,
    alignItems: "center",
    width:setWidth(55),
    height:setHeight(18),
 


    //left:50
}

});