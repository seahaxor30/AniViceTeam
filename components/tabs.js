import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import WatchList from '../Screens/WatchList';
import ProfileScreen from '../Screens/Profile';
import { Ionicons} from '@expo/vector-icons';
import Community from '../Screens/Community';
import Discover from '../Screens/Discover';

const Tab = createBottomTabNavigator();
        
const Tabs = (props) => {
  return(
    <Tab.Navigator screenOptions={({ route }) => ({tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name === 'Home') {
          iconName = focused
            ? 'home-sharp'
            : 'home-outline';
      }
      else if (route.name === 'Profile') {
          iconName = focused ? 'person-circle' : 'person-circle-outline';
      }
      else if(route.name == 'Watchlist'){
        iconName = focused ? 'list-circle' : 'list-circle-outline';
      }
      else if (route.name == 'Community'){
        iconName = focused ? 'people-sharp' : 'people-outline';
      }

      else if (route.name == 'Discover'){
        iconName = focused ? 'search' : 'search-outline';
      }

        

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#057DFE",
      tabBarInactiveTintColor: 'gray', })} initialRouteName = "Home">
      <Tab.Screen name = "Profile" component = {ProfileScreen} />
      <Tab.Screen name = "Community" component = {Community}/>
      <Tab.Screen name = "Discover" component = {Discover}/>
      <Tab.Screen name = "Watchlist" component = {WatchList}/>
    </Tab.Navigator> 
  );


}

export default Tabs;