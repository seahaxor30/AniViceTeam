import { signOut } from "firebase/auth";
import React from "react";
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { updateProfile } from "firebase/auth";
import { Text,View,Button,Alert,TouchableOpacity,StyleSheet,Image,Dimensions,ScrollView,FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authenication } from "../firebase";
import { Avatar } from 'react-native-paper';
import { Ionicons} from '@expo/vector-icons';
import { getFirestore,collection,getDoc,doc, getDocs, setDoc, updateDoc,query,where,collectionGroup } from "firebase/firestore"
import { useFocusEffect } from "@react-navigation/native";
import ItemSeparator from "../components/ItemSeperator";

const { width,height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const  ProfileScreen = ({navigation}) =>{

  const isFocused = useIsFocused();
  const currUser1 = authenication.currentUser;



  const [avatar, setAvatar] = React.useState("https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg")
  

  //const checkPhoto = () => {
  //  const currUser = authenication.currentUser;
  //  if(currUser !== null){
  //    if (currUser.photoURL === null || currUser.photoURL === ""){
  //      updateProfile(currUser,{photoURL:"https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"});
  //    }
  //  }
  //}

  const removePhoto = () => {
    const currUser = authenication.currentUser;
    if(currUser !== null){
      updateProfile(currUser,{photoURL:"https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"});
      setAvatar("https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg");
    }

  }

  const setCredentials = () => {
    const currUser = authenication.currentUser;
    if(currUser !== null){
      const uri = currUser.photoURL;
      setAvatar(uri);

    }
  } 
    
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      setCredentials();
      //checkPhoto();
    });

    setCredentials();
    //checkPhoto();
    return () => {};
  }, [isFocused,navigation]);

  const handleSignOut =() =>{
    authenication.signOut() 
    .then(()=>{
      navigation.replace("Login")



    })
    .catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode);
      console.error(errorMessage);

  })
    
  }
  const db = getFirestore();
  const [posts, setPosts] = React.useState([]);
  const [search, setSearch] = React.useState([]);
  const [temp, setTemp] = React.useState([])
  const [snapNum, setsnapNum] = React.useState(0)
  const [refreshing, setRefreshing] = React.useState(false);  
  var num = 0;
  
    
  //useFocusEffect(

  //  React.useCallback(()=>{
  //    const fetchData = async () => {
  //      const currUser = authenication.currentUser;
  //      const snap = await getDoc(doc(db, 'PostNum','PostNum'));
  //      num = snap.data().postNum
  //      const q = query(collection(db, "Posts"), where("uid", "==", currUser.uid));
        //await getDocs(query(collection(db, "Posts"), where("uid", "==", currUser.uid)))
  //      .then(querySnapshot => {
  //        const objectsArray = [];
  //        querySnapshot.forEach(doc => {
  //            objectsArray.push(doc.data());
  //        });
  //        console.log("yo"+ num);
  //        console.log("hi" + posts.length)
  //        if (posts.length != num && posts.length != 0 ){
  //          setPosts([...posts, ...objectsArray])
  //        }
  //        else if (posts.length == 0) {
  //          setPosts([...posts, ...objectsArray])
  //        }
  //        else{
  //          return;
  //        }
  //      });
  //  }

  //  //const checkData = async () => {
  //  //  const snap = await getDoc(doc(db, 'PostNum','PostNum'));
  //  //  num = snap.data().postNum
  //  //  console.log("yo"+ num);
  //  //  if (search.length != snapNum){
  //  //    fetchData()
  //  //  }
  //  //  if (search.length == 0) {
  //  //    fetchData()
  //  //  }
  //  //  else{
  //  //    return;
  //  //  }
  //  //}
  //  //checkData();
  //  fetchData();

  //  },[])

    
    
    
  //  );

  //  const onRefresh = React.useCallback(() => {
  //    setRefreshing(true);
  //    wait(2000).then(() => 
  //      {
  //        //fetchData();
  //        const fetchData = async () => {
  //          const currUser = authenication.currentUser;

  //          const snap = await getDoc(doc(db, 'PostNum','PostNum'));
  //          num = snap.data().postNum
            //const q = query(collection(db, "Posts"), where("uid", "==", currUser.uid));
            //await getDocs(q)
  //          .then(querySnapshot => {
  //            const objectsArray = [];
  //            querySnapshot.forEach(doc => {
  //                objectsArray.push(doc.data());
  //            });
  //            console.log("yo"+ num);
  //            console.log("hi" + posts.length)
  //            if (posts.length != num && posts.length != 0 ){
  //              setPosts([...posts, ...objectsArray])
  //            }
  //            else if (posts.length == 0) {
  //              setPosts([...posts, ...objectsArray])
  //            }
  //            else{
  //              return;
  //            }
  //          });
  //      };
  //        fetchData();
  //        setRefreshing(false);
  //      });
  //  }, []);
  useFocusEffect(

    React.useCallback(()=>{
      const fetchData = async () => {
        const snap = await getDoc(doc(db, 'Users',currUser1.uid));
        num = snap.data().postNum
        const ref = collection(db, "Posts");
        const q = query(ref, where("uid", "==", currUser1.uid));
        await getDocs(q)
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

    fetchData();
    

    },[])

    
    
    
    );

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => 
        {
          //fetchData();
          const fetchData = async () => {
            const snap = await getDoc(doc(db, 'Users',currUser1.uid));            
            num = snap.data().postNum
            const ref = collection(db, "Posts");
            const q = query(ref, where("uid", "==", currUser1.uid));
            await getDocs(q)
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





  return(
    <SafeAreaView style={styles.safearea}>
    <View style={{alignItems: 'center',justifyContent:"center",marginTop:"7%"}}>
    <TouchableOpacity onPress={() => navigation.navigate("Change Profile Picture")} onLongPress={()=>removePhoto()}>
    <Avatar.Image style={{backgroundColor:"white"}} size={200} source={{uri: avatar}} />
    </TouchableOpacity>
    <View style={{margin:10}}>
    <Text>{authenication.currentUser.displayName}</Text>
    </View>
    </View>
    <View style = {styles.view}>
      <View style={{backgroundColor:"yellow",width:"100%"}}>
        <TouchableOpacity style={{position:"absolute",bottom:setHeight(25),left:setWidth(30)}}
          onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={50} color="black" />
        </TouchableOpacity>
      </View>
     
    </View>
    <View style={{width:"100%",height:"60%",marginTop:"5%",alignContent:"center", shadowColor: 'black',
                  shadowOffset: {width: 1, height: 2},
                  shadowOpacity: 0.3,
                  elevation: 5}}>
    <View style={{borderTopLeftRadius:30,borderTopEndRadius:30,width:"100%",backgroundColor:"white",alignItems:"center",padding:5,}}>
    <Text style={{fontSize:25,fontWeight:"bold"}}>My Posts</Text>
    <View></View>
    </View>
    <View style={{width:"100%",height:"100%",backgroundColor:"white",alignItems:"center"}}>

    <FlatList style={{marginStart:20,marginEnd:20,marginTop:10,width:"90%"}}
                data={search}
                ItemSeparatorComponent={() =><ItemSeparator height={10}width={20}/>}
                ListHeaderComponent={() =><ItemSeparator height={0}/>}
                ListFooterComponent={() =><ItemSeparator height={20}/>}
                keyExtractor={(item) => String(item.postId)}
                //refreshing={refreshing}
                //onRefresh={onRefresh}
                renderItem={({item,index}) => (
                <TouchableOpacity onPress={(item) => {
                navigation.navigate("User Recommend",{
                  postText: search[index]["postText"],
                  postId: search[index]["postId"],
                  recNum: search[index]["recNum"],
                  color: search[index]["color"]


                });           
              }}>
            <View style={{backgroundColor:item.color,borderRadius:12,height:setHeight(20),width:"100%",
                  shadowColor: 'black',
                  shadowOffset: {width: 1, height: 2},
                  shadowOpacity: 0.3,
                  elevation: 5}}>
                <View style={{margin:"10%",height:"40%"}}>
                  <Text numberofLines={1} ellipsizeMode="tail" style={{fontSize: 20,fontWeight: "bold"}}>
                    {item.postText}
                  </Text>
                </View>
                  <View style={{backgroundColor:"white",borderBottomEndRadius:12,borderBottomStartRadius:12,height:setHeight(5),width:"100%",top:"75%",alignItems:"center",position:"absolute",justifyContent:"center"}}>
                  {item.recNum == 1 && 
                    <Text style={{fontSize: 20,fontWeight: "bold",padding:20}}>
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
    
    </View>
    </View>    
    </SafeAreaView>
  );
  }
  const styles = StyleSheet.create({

    button: {
      backgroundColor: "#057DFE",
      height: 40,
      width: "100%",
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      //marginTop: "auto",
    },

    buttonText: {
      color: "#FFFFFF",
      fontWeight: "bold",
    },
    //view: {
    //  flex: 1,
    //  alignItems: 'center',
    //  justifyContent:"center",
    //},
    safearea: {
      flex: 1,
      alignItems: 'center',
      justifyContent:"center",
      backgroundColor:"#F2F2F2"

    },
  //  container5:{
  //    backgroundColor: "white",
  //    borderRadius:12,
  //    //margin:10,

  //  //  width: setWidth(100),
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
    //backgroundColor: "green",

    marginStart:setWidth(35),
    //top:50
    paddingVertical: 30,
    alignItems: "center",
    width:setWidth(55),
    height:setHeight(18),
 


    //left:50
}

  })
export default ProfileScreen;