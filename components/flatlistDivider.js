import React from "react";
import { View } from "react-native";

const Divider = ({ height, width }) => {
  return (
        <View
            style={{
                marginTop:10,
                height: 5,
                width: "100%",
                backgroundColor: "#efefef"}}>
        </View>
  )};

  

Divider.defaultProps = {
  height: 0,
  width: 0,
};

export default Divider;