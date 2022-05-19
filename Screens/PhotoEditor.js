import React from "react";
import { Text,View,Alert,TouchableOpacity,FlatList,ScrollView,StyleSheet,Image,Dimensions} from "react-native";
import ItemSeparator from "../components/ItemSeperator";
import { Button, Overlay, Icon } from 'react-native-elements';
import {getAuth,updateProfile} from 'firebase/auth'
import { authenication } from "../firebase";
import Toast from 'react-native-toast-message';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
const { width,height } = Dimensions.get("screen");



 

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;
const windowWidth = Dimensions.get('window').width;
const windowHieght = Dimensions.get('window').height;



const PfpEditor = ({navigation}) => {
    const [ characters, setCharacters] = React.useState([]);
    const [imageUri, setImageUri] = React.useState("");
    const isFocused = useIsFocused();
    const [temp, setTemp] = React.useState("");

    React.useEffect(()=>{
      navigation.addListener('focus', () => {
        //updateUser(temp);
      });
        fetch(`https://api.jikan.moe/v4/top/characters?limit=24`)
        .then(re => re.json())
        .then((re) => {
          setCharacters(re.data);
    
      })
    },[isFocused,navigation]);

    const [visible, setVisible] = React.useState(false);
      
    const toggleOverlay = (link) => {
        setImageUri(link)
        setVisible(!visible);
    };

    const updateUser = (url) => {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
          photoURL: url,

        }).then(() => {
          navigation.goBack()

                      // Profile updated!
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
        });
      }

    return(
        
        <View style={styles.container2}>
            <FlatList style={styles.flatlist} 
                data={characters}
                keyExtractor={(item) => item.mal_id }
                renderItem={({item,index}) => (   
                <View>
                <TouchableOpacity styles={styles.container} onPress={(item) => {toggleOverlay(characters[index]["images"]["jpg"]["image_url"])}}>
                    <Image
                    source={{
                        uri: item.images.jpg.image_url,
                    }}
                    style={styles.container}
                    resizeMode="cover"
                />
            </TouchableOpacity>
            
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.textPrimary}>Change Your Profile Picture?</Text>
        <Image source={{uri: imageUri}}style ={styles.overlayImage} />
        <View style={{marginTop:10}}>
        <Text style={styles.textSecondary}>
          Click Yes or No
        </Text>
        </View>
        <View style={{marginTop:10}}>
        <Button 
          title="Yes"
          onPress={() => {
                  updateUser(imageUri);
                  toggleOverlay("");
                  Toast.show({
                    type: 'success',
                    text1: 'Changed Profile Picture',
                    text2: 'Long Press picture to remove'
                    });
        }}
        />
        <View style={{marginTop:10}}>
        <Button
          title="No"
          onPress= {() => {toggleOverlay("");}}
        />
        </View>
        </View>
      </Overlay>

        
        </View>)}
                numColumns={3}
                showsHorizontalScrollIndicator={false}/>

        </View>
 
    );
}

    
        


const styles = StyleSheet.create({
    container: {
        //margin:10,
        justifyContent: "center",
        alignItems:"center",
        //borderRadius: 12,
        //backgroundColor: "#057DFE",
        paddingVertical: 8,
        //marginHorizontal:4,
        width:setWidth(33), 
        height:setHeight(18)


    },
    container2:{
        //margin:8,
        alignItems:"center",

    },
    container3:{
        marginStart:5,
        marginTop:10,
        marginBottom:10


    },


    flatlist: {
        flexDirection: 'column',

    },

    overlayImage: {
        height: windowHieght / 2.5,
        width: windowWidth - 30,
        marginTop: 10,
        borderRadius: 10,
      },


});

export default PfpEditor;