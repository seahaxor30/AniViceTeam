import React from "react";
import { Text,View,Alert,TouchableOpacity,StyleSheet,SafeAreaView,FlatList,Image,Dimensions,ScrollView} from "react-native";
import List from "../components/list"
import SearchBar from "../components/SearchBar";
import ItemSeparator from "../components/ItemSeperator";
import { getFirestore,collection,getDoc,doc, getDocs, setDoc, updateDoc,query } from "firebase/firestore"
import { FAB } from 'react-native-elements';
import { async } from "@firebase/util";
import { useFocusEffect } from "@react-navigation/native";
import { Button, Overlay, Icon } from 'react-native-elements';
import { TextInput } from "react-native-paper";
import { Avatar } from 'react-native-paper';
import { getDatabase } from "firebase/database";


const { width,height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const Discuss = ({route,navigation}) => {
  const database = getDatabase();
  const db = getFirestore();
  const [search, setSearch] = React.useState([]);
  const [temp, setTemp] = React.useState([])
  const [snapNum, setsnapNum] = React.useState(0)
  const [title,setTitle] = React.useState("")
  var num = 0;
  const {discussId,discussText,commentNum,color} = route.params;
  const [visible, setVisible] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);  

    
  useFocusEffect(

    React.useCallback(()=>{
      const fetchData = async () => {
        const db = getDatabase();
        const starCountRef = ref(db, `https://anivice-dea7e-default-rtdb.firebaseio.com/discussionData`);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
      console.log(postElement, data);
});
        /*
        const snap = await getDoc(doc(db,"Discussions",discussId));
        setsnapNum(snap.data().commentNum);
        //console.log(discussId)
        //num = snap.data().recNum
        await getDocs(query(collection(db, `Discussions/${discussId}/Discuss`)))
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
        */
    }

    fetchData();

    },[]));

/*
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => 
          {
            //fetchData();
            const fetchData = async () => {
              const snap = await getDoc(doc(db,"Discussions",discussId));
              setsnapNum(snap.data().commentNum);
              //num = snap.data().recNum
              await getDocs(query(collection(db, `Discussions/${discussId}/Discuss`)))
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
*/


    
    
   
    
  return (
    <View style={{flex: 1,backgroundColor: color,alignItems: "center"}}>
    <View style={{width:"100%",marginTop:"20%",marginBottom:"20%"}}>
    <Text>
        {discussText} 
    </Text>
    </View>
    <View>
        {snapNum == 1 && 
            <Text> {snapNum} Comment </Text>
        }
        {snapNum != 1 && 
            <Text>{snapNum} Comments </Text>
        }   
        

    </View>


    <View style={{backgroundColor:"#efefef",height:"58%",width:"95%",margin:20,borderRadius:10,flex:1}}>
      <FlatList style={{margin:10}}
                data={search}
                ItemSeparatorComponent={() =><ItemSeparator height={10}width={20}/>}
                ListHeaderComponent={() =><ItemSeparator height={20}/>}
                ListFooterComponent={() =><ItemSeparator height={30}/>}
                keyExtractor={(item) => String(item.commentId)}
                //refreshing={refreshing}
                //onRefresh={onRefresh}
                renderItem={({item,index}) => (
               
                <View style={styles.container5}>
                <View style={styles.box}>
                <Text style = {styles.container3}>
                    {item.commentText}
                </Text>
                <Avatar.Image style={{backgroundColor:"black",margin:0}} size={50} source={{uri: item.userUrl}} />
                <Text style={{right:"50%",top:"20%"}}>
                  {item.userName}
                </Text>
              </View>
        </View>

        )}
                showsHorizontalScrollIndicator={false}/>
                </View>
                <FAB 
                color="#057DFE"
                title="Comment"
                icon={{ name: 'add', color: 'white' }} 
                size = "small" 
                placement="right"
                style={{marginEnd:"27%"}}
                onPress={() => {
                  navigation.navigate("Create Comment",{
                      discussId: discussId
  
                    })

                }}
             />
    </View>
  )
}

export default Discuss;

const styles = StyleSheet.create({
  //root: {
  //  flex: 1,
  //  backgroundColor: "rgb(175,238,238)",
  //  alignItems: "center",
  //},

  container5:{
      backgroundColor: "white",
      borderRadius: 12,


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
    bottom:"100%",

    width:setWidth(30), 
    height:setHeight(18)



},

containerUser: {
    //backgroundColor:"yellow",
    //margin:10,
    //justifyContent: "center",
    //alignItems:"center",
    flex: 1, 
    //backgroundColor:"blue",
    height:setHeight(10),
    width:setWidth(10),
    borderRadius: 100,




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
    //backgroundColor: "green",
    

    marginStart:setWidth(35),
    //top:50
    paddingVertical: 30,
    alignItems: "center",
    width:setWidth(55),
    height:setHeight(18),
 


    //left:50
}

});