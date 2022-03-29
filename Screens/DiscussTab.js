import React from "react";
import { Text,View,Button,Alert,TouchableOpacity,StyleSheet,SafeAreaView,FlatList,Image,Dimensions,ScrollView} from "react-native";
import ItemSeparator from "../components/ItemSeperator";
import { getFirestore,collection,getDoc,doc, getDocs, setDoc, updateDoc,query } from "firebase/firestore"
import { FAB } from 'react-native-elements';
import { useFocusEffect } from "@react-navigation/native";
import { authenication } from "../firebase";
import { getDatabase, ref, onValue, child, get} from "firebase/database";

const { width,height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const DiscussionsTab = ({navigation}) => {
  const db = getFirestore();
  const [search, setSearch] = React.useState([]);
  const [temp, setTemp] = React.useState([])
  const [snapNum, setsnapNum] = React.useState(0)
  const [refreshing, setRefreshing] = React.useState(false);  
  var num = 0;
  const currUser = authenication.currentUser;
  const [data, setData] = React.useState([]);

  
  useFocusEffect(
    React.useCallback(()=>{
      const fetchData = async () => {
        //const objectsArray = [];
        const dbRef = ref(getDatabase());
        get(child(dbRef, `discussionData`)).then((snapshot) => {
        if (snapshot.exists()) {
          let queryArray = [];
          const data = snapshot.val();
          for (var i in data) {
            queryArray.push({
              did: data[i]["did"],
              color: data[i]["color"],
              comments: data[i]["comments"],
              discussText: data[i]["text"],
              createdAt: data[i]["createdAt"],
              uid: data[i]["uid"]
            });
          }
      setData(queryArray);
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
          console.error(error);
        });
      }

  fetchData();

},[]));

  
  /*
  useFocusEffect(
    React.useCallback(()=>{
      const fetchData = async () => {
        const snap = await getDoc(doc(db, 'DiscussNum','DiscussNum'));
        num = snap.data().discussNum
        await getDocs(query(collection(db, 'Discussions')))
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
    */
    /*
    React.useCallback(()=>{
      const fetchData = async () => {
        //const snap = await getDoc(doc(db, 'DiscussNum','DiscussNum'));
        //num = snap.data().discussNum
        const dbRef = ref(getDatabase());    
        await get(child(dbRef, `discussionData`))
        .then(querySnapshot => {
          const objectsArray = [];
          objectsArray.push(querySnapshot);
          console.log("yo"+ num);
          console.log("hi" + search.length)
          setSearch(objectsArray);
          console.log(objectsArray)
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

    fetchData();

    },[]));
    */


    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => 
        {
          const fetchData = async () => {
            const snap = await getDoc(doc(db, 'DiscussNum','DiscussNum'));
            num = snap.data().discussNum
            await getDocs(query(collection(db, 'Discussions')))
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
          console.log(search);
          setRefreshing(false);
        });
    }, []);



  const navigater = () => {
    navigation.navigate("Create Discussion");

  }
  return (
    <View style={styles.root}> 
      <FlatList style={{height:"100%"}} 
                data={data}
                ItemSeparatorComponent={() =><ItemSeparator height={20}width={20}/>}
                ListHeaderComponent={() =><ItemSeparator height={5}/>}
                ListFooterComponent={() =><ItemSeparator height={30}/>}
                keyExtractor={(item) => String(item.did)}
                refreshing={refreshing}
                onRefresh={onRefresh}
                renderItem={({item,index}) => (
                <TouchableOpacity onPress={(item) => {
                    navigation.navigate("Discuss",
                    {
                      discussText: data[index]["text"],
                      //discussId: data[index]["discussId"],
                      //commentNum: data[index]["commentNum"],
                      color: data[index]["color"]
                    });
                }
              }>
                <View style={{backgroundColor:item.color,borderRadius:12,height:setHeight(22),alignItems:"center",shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,  
                  elevation: 5}}>
                <View style={{margin:"10%",height:"40%"}}>
                  <Text numberofLines={1} ellipsizeMode="tail" style={{fontSize: 20,fontWeight: "bold"}}>
                    {item.discussText}
                  </Text>
                </View>
                  <View style={{backgroundColor:"white",borderBottomEndRadius:12,borderBottomStartRadius:12,height:setHeight(5),width:"100%",top:"80%",alignItems:"center",position:"absolute",justifyContent:"center"}}>
                  {item.recNum == 1 && 
                    <Text style={{fontSize: 20,fontWeight: "bold",padding:20}}>
                      {item.commentNum} Comment
                    </Text>
                  }
                  {item.recNum != 1 && 
                    <Text style={{fontSize: 20,fontWeight: "bold",padding:10}}>
                      {item.commentNum} Comments
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

export default DiscussionsTab;

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