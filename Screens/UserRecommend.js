import React from "react";
import { Text,View,Alert,TouchableOpacity,StyleSheet,SafeAreaView,FlatList,Image,Dimensions,ScrollView} from "react-native";
import List from "../components/list"
import SearchBar from "../components/SearchBar";
import ItemSeparator from "../components/ItemSeperator";
import Divider from "../components/flatlistDivider";
import { getFirestore,collection,getDoc,doc, getDocs, setDoc, updateDoc,query } from "firebase/firestore"
import { FAB } from 'react-native-elements';
import { async } from "@firebase/util";
import { useFocusEffect } from "@react-navigation/native";
import { Button, Overlay, Icon } from 'react-native-elements';
import { TextInput } from "react-native-paper";
import { Avatar } from 'react-native-paper';


const { width,height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const UserRecommend = ({route,navigation}) => {
  const db = getFirestore();
  const [search, setSearch] = React.useState([]);
  const [temp, setTemp] = React.useState([])
  const [snapNum, setsnapNum] = React.useState(0)
  const [title,setTitle] = React.useState("")
  var num = 0;
  const {postId,postText,recNum,color,photoURL,name} = route.params;
  const [visible, setVisible] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);  

      
  const toggleOverlay = (link) => {
      setVisible(!visible);
  };
  

    
  useFocusEffect(

    React.useCallback(()=>{
      const fetchData = async () => {
        const snap = await getDoc(doc(db,"Posts",postId));
        setsnapNum(snap.data().recNum);
        //num = snap.data().recNum
        await getDocs(query(collection(db, `Posts/${postId}/recs`)))
        .then(querySnapshot => {
          const objectsArray = [];
          querySnapshot.forEach(doc => {
              objectsArray.push(doc.data());
          });
          console.log("yo"+ snapNum);
          console.log("hi" + search.length)
          if (search.length != snapNum && search.length != 0 ){
            setSearch([...search, ...objectsArray])
          }
          else if (search.length == 0) {
            setSearch([...search, ...objectsArray])
            console.log(search)
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

    },[]));


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => 
          {
            //fetchData();
            const fetchData = async () => {
                const snap = await getDoc(doc(db,"Posts",postId));
                setsnapNum(snap.data().recNum);
                //num = snap.data().recNum
                await getDocs(query(collection(db, `Posts/${postId}/recs`)))
              .then(querySnapshot => {
                const objectsArray = [];
                querySnapshot.forEach(doc => {
                    objectsArray.push(doc.data());
                });
                console.log("yo"+ snapNum);
                console.log("hi" + search.length)
                if (search.length != snapNum && search.length != 0 ){
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



    
    
   
    //React.useEffect(()=>{
    //  const unsubscribe = navigation.addListener("focus",()=>{
    //    setSearch([])

    //  });
    //  return unsubscribe


    //},[navigation])

  const navigater = () => {
    navigation.goBack();

  }
  return (
    <View style={{backgroundColor:color,height:"100%"}}>
    <View>
    <View style={{width:setWidth(20),height:setHeight(3),marginTop:50,marginLeft:"73%",backgroundColor:"#057DFE",borderRadius:10,justifyContent:"center"}}>
    <TouchableOpacity onPress={navigater}>
      <Text style={{alignSelf:"center",color:"white",fontSize:18}}>Back</Text>
    </TouchableOpacity>
    </View>
    <View style={{width:"100%",flexDirection:"row"}}>
    <View style={{width:setWidth(20),height:setHeight(7),alignItems:"center",marginTop:10,marginStart:10}}>
      <Image
        source={{uri: photoURL}}
        style={{width:setWidth(15),height:setHeight(7),borderRadius:100}}
        resizeMode="cover"/>
      <View style={{marginTop:5}}>
        <Text numberOfLines={1} style={{fontSize:15,fontWeight:"bold"}}>
            {name} 
        </Text>
    </View>
    </View>
    <View style={{margin:0,width:setWidth(70),height:setHeight(30),margin:10}}>
      <Text style={{fontSize:30,fontWeight:"500"}}>
        {postText} 
      </Text>
    </View>
    
    </View>
    <View style={{width:"100%",height:"60%",alignContent:"center", shadowColor: 'black',
                  shadowOffset: {width: 1, height: 2},
                  shadowOpacity: 0.3,
                  elevation: 5}}>
    <View style={{borderTopLeftRadius:30,borderTopEndRadius:30,width:"100%",backgroundColor:"white",alignItems:"center",padding:5,}}>
    {search.length == 1 && 
            <Text style={{fontSize:20,fontWeight:"bold"}}> {search.length} Recommendation </Text>
        }
        {search.length != 1 && 
            <Text style={{fontSize:20,fontWeight:"bold"}}>{search.length} Recommendations </Text>
        }
    <View>


    </View>  
    </View>
    <View style={{width:"100%",height:"100%",backgroundColor:"white"}}>
      <FlatList
                data={search}
                ItemSeparatorComponent={() =><Divider/>}
                ListHeaderComponent={() =><ItemSeparator height={0}/>}
                ListFooterComponent={() =><ItemSeparator height={100}/>}
                keyExtractor={(item) => String(item.recId)}
                refreshing={refreshing}
                onRefresh={onRefresh}
                renderItem={({item,index}) => (
                <TouchableOpacity style={{height:setHeight(20)}}
                onPress={(item) => {
                {/*setSearch([]),*/}
                console.log("hi")
                navigation.navigate("Anime Detail",{
                  itemSynopsis: search[index]["itemSynopsis"],
                  itemTitle: search[index]["itemTitle"],
                  itemUrl: search[index]["itemUrl"],
                  itemid: search[index]["itemid"],

                });          
              }}>
                <View style={styles.box}>
                <View style={{ shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,  
                  elevation: 5}}>
                    <Image
                    source={{
                        uri: item.itemUrl,
                    }}
                    style={styles.container}
                    resizeMode="cover"
                />
            </View>
                <View style = {styles.container3}>
                <Text style={{fontSize: 16,fontWeight: "bold"}}
                ellipsizeMode='tail' numberOfLines={3}>
                  {item.itemEnglishTitle ? item.itemEnglishTitle : item.itemTitle}
                </Text>
                <View style={{marginTop:5}}>
                  <Text style={{color:"#6D7275"}}>{item.genres}</Text>
                </View>
                <View style={{flexDirection:"row",marginTop:10,marginStart:10,}}>
                {/*<Text style={{bottom:"13%",marginStart:5}}>{"Action, Romance, Comedy"}</Text>*/}
                <View style={{shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,  
                  elevation: 5}}>
                <Avatar.Image style={{bacakgroundColor:"black",right:10}} size={50} source={{uri: item.userUrl}} />
                </View>
                <Text style={{marginTop:"10%"}} ellipsizeMode='tail' numberOfLines={1}>{item.userName}</Text>
                </View>


                </View>
               

                
                
                
                </View>

            </TouchableOpacity>

        )}
                showsHorizontalScrollIndicator={false}/>
                </View>
                </View>

    </View>
    </View>
  )
}

export default UserRecommend;

const styles = StyleSheet.create({
  //root: {
  //  flex: 1,
  //  backgroundColor: "rgb(175,238,238)",
  //  alignItems: "center",
  //},

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
    //backgroundColor:"green",
    //height:"25%",
    width:"100%",
    justifyContent: "center",
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