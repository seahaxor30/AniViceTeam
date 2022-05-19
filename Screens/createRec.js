import { StyleSheet, Text, View,Image,TextInput,ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { authenication } from "../firebase";
import { Keyboard } from 'react-native'
import { FAB } from 'react-native-elements';
import { getFirestore,collection,getDoc,doc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { async } from '@firebase/util';

const CreateRec = ({navigation}) => {
    const currUser = authenication.currentUser;
    var avatar = currUser.photoURL
    const db = getFirestore();

    const [post, setPost] = React.useState()
    const [postNum, setPostNum] = React.useState(0)
    const [num, setNum] =  React.useState(0)
    const [color, setColor] = React.useState("");

    
    React.useEffect(() => {
        const fetchData = async () => {
            const snapNum = await getDoc(doc(db, 'PostNum','PostNum'))
            setNum(snapNum.data().postNum)
            const snap = await getDoc(doc(db, 'Users', currUser.uid))
            if (snap.exists()) {
                console.log(snap.data());
                setPostNum(snap.data().postNum)
                console.log(postNum);
            }
            else{
                console.log("none")
            }
        }
        fetchData();

    }, []);
    

    const CreatePost = async (post) => {
        var newPostNum = postNum + 1
        var postNumber = num + 1
        var postId = newPostNum + "-" + currUser.uid
        var recNum = 0        
        var randNumber = Math.floor(Math.random() * 10);
        var colorList =  ["#64B0A5","#F3CA3E","#FF3366","#3399FF","#64B075","#CA6CC1","#33E1FF","#FF5F58","#828282","#2AC940","#7C6DF7"];
        var color = colorList[randNumber];
        await setDoc(doc(db,"Posts",postId), {
            postId: postId,
            postText: post,
            recNum: recNum,
            uid: currUser.uid,
            photoURL: currUser.photoURL,
            name: currUser.displayName,
            color: color
        });
        

        const updateUser = async () => {
            await updateDoc(doc(db,"Users",currUser.uid),{
                postNum: newPostNum
            });
            await updateDoc(doc(db,"Last Post","Last Post"), {
                postId: postId,
            });

        }
        const addPostNum = async () => {
            await updateDoc(doc(db,"PostNum","PostNum"),{
                postNum: postNumber
            });

        }


        updateUser();
        addPostNum();
        navigation.replace("TABS",{screen: 'Community'});

    }
    


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
                value={post}
                onChangeText={text => setPost(text)}
                style={{
                backgroundColor:"white",
                padding:20,
                paddingTop:20,
                borderRadius:12,
                height:"85%",
                textAlignVertical:"top"}}                    placeholder="I'm looking for...">

                </TextInput>
            </View>
            </View>

        </ScrollView>
        <FAB
        title="Post"
        color="#057DFE" 
        icon={{ name: 'add', color: 'white' }} 
        size = "large"
        style={{marginBottom:"10%"}}
        onPress={() => CreatePost(post)}
        //onPress={() =>navigation.navigate("Create Recommendation")}
        />
        </View>
  )
}

export default CreateRec


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


