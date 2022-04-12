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
import { getDatabase, ref, onValue, child, get, set} from "firebase/database";


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
  const {discussId,discussText,color} = route.params;
  const [visible, setVisible] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);  
  const [data, setData] = React.useState([]);

  //console.log(comments)
   


  useFocusEffect(
    React.useCallback(()=>{
      const fetchData = async () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `discussionData/`+discussId+'/comments')).then((snapshot) => {
        if (snapshot.exists()) {
          let queryArray = [];
          const data = snapshot.val();
          for (var i in data) {
            queryArray.push({
              commentId: data[i]["commentId"],
              commentText: data[i]["text"],
              createdAt: data[i]["createdAt"],
              uid: data[i]["uid"],
              userUrl: data[i]["photoURL"]
            });
          }
      //console.log(queryArray)
      setsnapNum(queryArray.length)
      setSearch(queryArray);
      //console.log(queryArray)
      //console.log("search: "+ search)
        } else {
          console.log("No data available");
          setsnapNum(0);
          //No comments to display
        }
      }).catch((error) => {
          console.error(error);
        });
      }

  fetchData();

},[]));



    
    
   
    
  return (
    <View style={{flex: 1,backgroundColor: color,alignItems: "center"}}>
    <View style={{width:"100%",marginTop:"20%",marginBottom:"20%"}}>
    <Text>
        {discussText} 
    </Text>
    </View>

    <View>
        {search.length == 1 && 
            <Text> {search.length} Comment </Text>
        }
        {search.length != 1 && 
            <Text>{search.length} Comments </Text>
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