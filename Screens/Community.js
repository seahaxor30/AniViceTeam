import React from "react";
import { Text,View,Button,Alert,TouchableOpacity} from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RecommendationsTab from "./RecTab";
import DiscussionTab from "./DiscussTab";
const Tab = createMaterialTopTabNavigator();


const  Community = ({navigation}) =>{
    
return(
  <Tab.Navigator>
      <Tab.Screen name="Recommendations" component={RecommendationsTab} />
      <Tab.Screen name="Discussions" component={DiscussionTab} />
    </Tab.Navigator>
);
}
export default Community;


