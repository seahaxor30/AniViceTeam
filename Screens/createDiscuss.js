import { StyleSheet, Text, View,Image,TextInput,ScrollView } from 'react-native'
import React from 'react'
import { authenication } from "../firebase";
import { FAB } from 'react-native-elements';
import { getFirestore,collection,getDoc,doc, getDocs, setDoc, updateDoc } from "firebase/firestore"

const CreateDiscuss = ({navigation}) => {
    const currUser = authenication.currentUser;
    var avatar = currUser.photoURL
    const db = getFirestore();

    const [discussion, setDiscussion] = React.useState()
    const [discussNum, setDiscussNum] = React.useState(0)
    const [num, setNum] =  React.useState(0)
    
    React.useEffect(() => {
        const fetchData = async () => {
            const snapNum = await getDoc(doc(db, 'DiscussNum','DiscussNum'))
            setNum(snapNum.data().discussNum)
            const snap = await getDoc(doc(db, 'Users', currUser.uid))
            if (snap.exists()) {
                console.log(snap.data());
                setDiscussNum(snap.data().discussNum)
                console.log(discussNum);
            }
            else{
                console.log("none")
            }
        }
        fetchData();

    }, []);
    

    const CreateDiscussion = async (discussion) => {
        var newDiscussNum = discussNum + 1
        var discussNumber = num + 1
        var discussId = newDiscussNum + "-" + currUser.uid
        var commentNum = 0        
        var randNumber = Math.floor(Math.random() * 10);
        var colorList =  ["#64B0A5","#F3CA3E","#FF3366","#3399FF","#64B075","#CA6CC1","#33E1FF","#FF5F58","#828282","#2AC940","#7C6DF7"];
        var color = colorList[randNumber];
        await setDoc(doc(db,"Discussions",discussId), {
            discussId: discussId,
            discussText: discussion,
            commentNum: commentNum,
            uid: currUser.uid,
            color: color
        });
        

        const updateUser = async () => {
            await updateDoc(doc(db,"Users",currUser.uid),{
                discussNum: newDiscussNum
            });

        }
        const addDiscussNum = async () => {
            await updateDoc(doc(db,"DiscussNum","DiscussNum"),{
                discussNum: discussNumber
            });

        }


        updateUser();
        addDiscussNum();
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
        title="Post"
        color="#057DFE" 
        icon={{ name: 'add', color: 'white' }} 
        size = "large"
        style={{marginBottom:"10%"}}
        onPress={() => CreateDiscussion(discussion)}
        //onPress={() =>navigation.navigate("Create Recommendation")}
        />
        </View>
  )
}

export default CreateDiscuss


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


