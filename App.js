import { StyleSheet, Text, View } from 'react-native';
import Tabs from "./components/tabs"
import AiringScreen from './Screens/Airing';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';
import PopularScreen from './Screens/Popular';
import TrendingScreen from './Screens/Trending';
import UpcomingScreen from './Screens/Upcoming';
import AnimeDetailScreen from './Screens/AnimeDetail';
import SearchAnime from './components/SearchBar';
import SearchScreen from './Screens/SearchScreen';
import SignUpScreen from './Screens/SignUp';
import LoginScreen from './Screens/Login';
import PfpEditor from './Screens/PhotoEditor';
import Toast from 'react-native-toast-message';
import CreateRec from './Screens/createRec';
import Recommend from './Screens/recommend';
import SearchRec from './Screens/SearchRec';
import UserRecommend from './Screens/UserRecommend';
import CreateDiscuss from './Screens/createDiscuss';
import Discuss from './Screens/discuss';
import CreateComment from './Screens/createComment';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Sign Up">
    <Stack.Screen name = "TABS" component= {Tabs} options={{headerShown: false}}/>
    <Stack.Screen name = "Airing Now" component= {AiringScreen} options={{headerShown: true}}/>
    <Stack.Screen name = "Upcoming Anime" component= {UpcomingScreen} options={{headerShown: true}}/>
    <Stack.Screen name = "Top Ranked Anime" component= {PopularScreen} options={{headerShown: true}}/>
    <Stack.Screen name = "Anime Detail" component= {AnimeDetailScreen} options={{headerShown: true}}/>
    <Stack.Screen name = "Search" component= {SearchScreen} options={{headerShown: true}}/>
    <Stack.Screen name = "Sign Up" component = {SignUpScreen} options={{headerShown: false}}/>
    <Stack.Screen name = "Login" component = {LoginScreen} options={{headerShown: false}}/>
    <Stack.Screen name = "Change Profile Picture" component = {PfpEditor} options={{headerShown: true}}/>
    <Stack.Screen name = "Create Recommendation" component = {CreateRec} options={{headerShown: true}}/>
    <Stack.Screen name = "Recommend" component = {Recommend} options={{headerShown: true}}/>
    <Stack.Screen name = "Search Recommendation" component = {SearchRec} options={{headerShown: true}}/>
    <Stack.Screen name = "User Recommend" component = {UserRecommend} options={{headerShown: true}}/>
    <Stack.Screen name = "Create Discussion" component = {CreateDiscuss} options={{headerShown: true}}/>
    <Stack.Screen name = "Discuss" component = {Discuss} options={{headerShown: true}}/>
    <Stack.Screen name = "Create Comment" component = {CreateComment} options={{headerShown: true}}/>











    </Stack.Navigator>
    </NavigationContainer>
    <Toast />
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

