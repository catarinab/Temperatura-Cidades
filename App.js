import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {createAppContainer, createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import HomeScreen from './screens/HomeScreen.js'
import SearchScreen from './screens/SearchScreen.js'

//ideias: noutro screen escolher quais cidades queremos que apareçam

const MainStack = createBottomTabNavigator({
  Cidades: {screen: HomeScreen},
  Procurar: {screen: SearchScreen}
},
{
  headerMode: 'none',
  navigationOptions:{
  headerVisible: false,

},
  tabBarOptions:{
  labelStyle: {
    fontSize: 12,
  },
  style: {
    paddingBottom: 15,
    fontFamily: 'Roboto'
  },
}
});

const App = createAppContainer(MainStack);

export default App;
