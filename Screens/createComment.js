import { StyleSheet, Text, View,Image,TextInput,ScrollView } from 'react-native'
import React from 'react'
import { authenication } from "../firebase";
import { FAB } from 'react-native-elements';
import { getFirestore,collection,getDoc,doc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { getDatabase, ref, onValue, child, update, push, get} from "firebase/database";
import { useFocusEffect } from "@react-navigation/native";

const CreateComment = ({route,navigation}) => {
    const currUser = authenication.currentUser;
    var avatar = currUser.photoURL
    var name = currUser.displayName
    var uid = currUser.uid
    const db = getFirestore();
    const database = getDatabase();

    const [discussion, setDiscussion] = React.useState()
    const [discussNum, setDiscussNum] = React.useState(0)
    const {discussId} = route.params;
    const [userCommentNum,setUserCommentNum] = React.useState(0)


    const [num, setNum] =  React.useState(0)


    const writeNewPost = async ()=> {
        if (discussion === undefined){
            Toast.show({
                type: "error",
                text1: 'Comment Unsuccessful',
                text2: 'Message'
                });

        }
        else{

        
        const db = getDatabase();
        const dbRef = ref(getDatabase());
            

        let current = new Date();
        let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
        let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        let dateTime = cDate + ' ' + cTime;
        var disNum = 0;


        const cid = push(child(ref(db), 'discussionData/'+discussId)).key;
        await get(child(dbRef, `discussionData/`+discussId+'/comments')).then((snapshot) => {
            console.log(snapshot.size)
            disNum = snapshot.size;
            }).catch((error) => {
                console.error(error);
            });
        const postData = {
            text:discussion,
            uid:currUser.uid,
            createdAt:dateTime,
            commentId:cid,
            photoURL: currUser.photoURL,
            name:currUser.displayName,

        };
              
        
            // Write the new post's data simultaneously in the posts list and the user's post list.
            const updates = {};
            updates[`discussionData/`+discussId+'/comments/'+disNum] = postData;
     
            //console.log(updates);
            navigation.goBack()
            return update(ref(db), updates);
        }
    }

    useFocusEffect(
        React.useCallback(()=>{
          const fetchData = async () => {
            
          }
    
      fetchData();
    
    },[]));
  /*  
    React.useEffect(() => {
        const fetchData = async () => {
            const snapNum = await getDoc(doc(db, "Discussions",discussId));
            setNum(snapNum.data().commentNum);
            const userNum = await getDoc(doc(db, "Users",currUser.uid));
            setUserCommentNum(userNum.data().commentNum);
 
        }
        fetchData();
    }, []);
    
    const updateUser = async () => {
        const commentUserNum = userCommentNum + 1
        const commentId = discussId + "-" + currUser.uid + "-" + userCommentNum 
        await setDoc(doc(db,`Discussions/${discussId}/Discuss`,commentId),{
            commentText: discussion,
            userCommentId: currUser.uid,
            userName: currUser.displayName,
            userUrl: currUser.photoURL,
            commentId: commentId
        })
            const addPostNum = async () => {
                const commentNum = num + 1
                await updateDoc(doc(db,"Discussions",discussId),{
                    commentNum: commentNum
                });
                await updateDoc(doc(db,"Users",currUser.uid),{
                    commentNum: commentUserNum
                });
            }
            addPostNum();
            navigation.goBack();
          }
        */
        

    return (
        <View style={styles.container}>
        <ScrollView>
            <View style={styles.inputContainer}>
                <Image
                style={styles.tinyLogo}
                source={{
                    uri: avatar
                    }}>
                </Image>
                <View style={{width:"80%"}}>
                <TextInput
                autoFocus={true}
                multiline={true}
                numberOfLines={4}
                value={discussion}
                onChangeText={text => setDiscussion(text)}
                style={{
                backgroundColor:"white",
                padding:20,
                paddingTop:20,
                borderRadius:12,
                height:"85%",
                textAlignVertical:"top"}}                    
                placeholder="Add a comment...">

                </TextInput>
                </View>
            </View>

        </ScrollView>
        <FAB
        title="Comment"
        color="#057DFE" 
        icon={{ name: 'add', color: 'white' }} 
        size = "large"
        style={{marginBottom:"10%"}}
        onPress={() => writeNewPost()}
        //onPress={() => updateUser()}
        //onPress={() =>navigation.navigate("Create Recommendation")}
        />
        </View>
  )
}

export default CreateComment


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    tinyLogo: {
        width: 48,
        height: 48,
        borderRadius:100,
        marginRight:16

      },
    inputContainer:{
        margin: 32,
        flexDirection:"row",

        height:"100%"
        
    }
});

