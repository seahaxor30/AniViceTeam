import { StyleSheet, Text, View,Image,TextInput,ScrollView } from 'react-native'
import React from 'react'
import { authenication } from "../firebase";
import { FAB } from 'react-native-elements';
import { getFirestore,collection,getDoc,doc, getDocs, setDoc, updateDoc } from "firebase/firestore"

const CreateComment = ({route,navigation}) => {
    const currUser = authenication.currentUser;
    var avatar = currUser.photoURL
    const db = getFirestore();

    const [discussion, setDiscussion] = React.useState()
    const [discussNum, setDiscussNum] = React.useState(0)
    const {discussId} = route.params;
    const [userCommentNum,setUserCommentNum] = React.useState(0)

    const [num, setNum] =  React.useState(0)
    
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
                <TextInput
                autoFocus={true}
                multiline={true}
                numberOfLines={4}
                value={discussion}
                onChangeText={text => setDiscussion(text)}
                style={{flex:1, backgroundColor:"white",paddingTop:20,padding:20,borderRadius:20}}
                placeholder="I'm looking for...">

                </TextInput>

            </View>

        </ScrollView>
        <FAB
        title="Comment"
        color="#057DFE" 
        icon={{ name: 'add', color: 'white' }} 
        size = "large"
        style={{marginBottom:"10%"}}
        onPress={() => updateUser()}
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


