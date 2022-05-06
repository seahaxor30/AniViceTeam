import React, { useState, useCallback, useRef, } from "react";
import { Button, View, Alert,Dimensions } from "react-native";
import { FullWindowOverlay } from "react-native-screens";
import YoutubePlayer from "react-native-youtube-iframe";


const { width,height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;


const  Player = (props) =>{
  const [playing, setPlaying] = useState(false);


  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    //  Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View>
      <YoutubePlayer
        width={setWidth(props.width1)}
        height={setHeight(props.height1)}
        play={playing}
        videoId={props.vidID}
        onChangeState={onStateChange}
        
        
      />
     
    </View>
  );
}

export default Player;
