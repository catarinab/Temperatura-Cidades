import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import HomeScreen from './screens/HomeScreen.js'

//ideias: noutro screen escolher quais cidades queremos que apareçam

const MainStack = createStackNavigator({
  Home: {screen: HomeScreen},
},
{
  headerMode: 'none',
  navigationOptions:{
    headerVisible: false,

  }
});

const App = createAppContainer(MainStack);

export default App;
