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
import { authenication } from "../firebase";


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
  const {discussId,discussText,color,name,photoURL} = route.params;
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
              userUrl: data[i]["photoURL"],
              name: data[i]["name"]
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
const navigater = () => {
  navigation.goBack();

}


const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  wait(2000).then(() => 
    {
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
      setRefreshing(false);
    });
}, []);


    
    
   
    
  return (
    <View style={{backgroundColor:color,height:"100%"}}>
    
    
    <View>
    <View style={{width:setWidth(20),height:setHeight(4),marginTop:35,marginLeft:"77%",backgroundColor:"#057DFE",borderRadius:10,justifyContent:"center"}}>
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
        {discussText} 
      </Text>
    </View>
    
    </View>
    <View style={{width:"100%",height:"60%",alignContent:"center", shadowColor: 'black',
                  shadowOffset: {width: 1, height: 2},
                  shadowOpacity: 0.3,
                  elevation: 5}}>
    <View style={{borderTopLeftRadius:30,borderTopEndRadius:30,width:"100%",backgroundColor:"white",alignItems:"center",padding:5,}}>
    {search.length == 1 && 
            <Text style={{fontSize:20,fontWeight:"bold"}}> {search.length} Comment </Text>
        }
        {search.length != 1 && 
            <Text style={{fontSize:20,fontWeight:"bold"}}>{search.length} Comments </Text>
        }
    <View>


    </View>  
    </View>
    <View style={{width:"100%",height:"100%",backgroundColor:"white"}}>
      <FlatList style={{marginTop:5}}
                data={search}
                ItemSeparatorComponent={() =><ItemSeparator height={10}width={20}/>}
                ListHeaderComponent={() =><ItemSeparator height={5}/>}
                ListFooterComponent={() =><ItemSeparator height={130}/>}
                keyExtractor={(item) => String(item.commentId)}
                refreshing={refreshing}
                onRefresh={onRefresh}
                renderItem={({item,index}) => (
                  <View style={styles.box}>
                  <View style={{width:"100%",flexDirection:"row"}}>
    <View style={{width:setWidth(20),alignItems:"center",height:setHeight(7),marginTop:10,marginStart:10}}>
      <View style={{shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,  
                  elevation: 5}}>
      <Image
        source={{uri: item.userUrl}}
        style={{width:setWidth(15),height:setHeight(7),borderRadius:100,}}
        resizeMode="cover"/>
      </View>
      <View style={{marginTop:5}}>
        <Text numberOfLines={1} style={{fontSize:15,fontWeight:"bold"}}>
            {item.name} 
        </Text>
    </View>
    </View>
    <View style={{margin:10,backgroundColor:"#efefef",shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,  
                  elevation: 5,borderRadius:15,padding:10,justifyContent:"center"}}>
      <Text style={{fontSize:15,fontWeight:"500"}}>
        {item.commentText} 
      </Text>
    </View>
    
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
                style={{marginEnd:"27%",marginBottom:"10%"}}
                onPress={() => {
                  navigation.navigate("Create Comment",{
                      discussId: discussId
                    })

                }}
             />
    </View>
    </View>
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
    //marginStart:setWidth(20),
    //paddingVertical: 30,
    marginTop:15,
    //alignItems: "center",
    justifyContent:"center",
    width:setWidth(55),
    //height:setHeight(10),
    //backgroundColor:"green"
 


    //left:50
}

});