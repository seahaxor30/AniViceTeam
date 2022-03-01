import React from "react";
import {View,Text,StyleSheet,Dimensions,TouchableOpacity} from "react-native";
const { width } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const GenreCard = ({genre}) => {
    return(
        
        <TouchableOpacity style = {styles.container}>
            <Text style={styles.textStyle}>{genre} </Text>
        </TouchableOpacity>

    )


}

const styles = StyleSheet.create({

    container: {
        justifyContent: "center",
        alignItems:"center",
        borderRadius: 5,
        backgroundColor: "#057DFE",
        paddingVertical: 8,
        elevation: 5,
        marginVertical: 2,
        width:setWidth(25), 

    },

    textStyle:{
        color: "white"
    }

});

export default GenreCard;
