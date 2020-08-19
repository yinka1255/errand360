import React, { Component } from 'react';
import { AppRegistry, Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Button, Platform, StyleSheet, Text, View, TouchableOpacity,AsyncStorage } from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Initial from './src/Initial';
import Login from './src/Login';
import Register from './src/Register';
import Home from './src/Home';
import Eat from './src/Eat';
import Welcome from './src/Welcome';
import EatDetails from './src/EatDetails';
import Cart from './src/Cart';
import EatDeliveryAddress from './src/EatDeliveryAddress';
import EatOrderSummary from './src/EatOrderSummary';

console.disableYellowBox = true;


const MainNavigator = createStackNavigator({
  Welcome: {screen: Welcome},
  EatOrderSummary: {screen: EatOrderSummary},
  EatDeliveryAddress: {screen: EatDeliveryAddress},
  Cart: {screen: Cart},
  EatDetails: {screen: EatDetails},
  Login: {screen: Login},
  Home: {screen: Home},
  Eat: {screen: Eat},
  Login: {screen: Login},
  Register: {screen: Register},
  Initial: {screen: Initial}
   
});

AppRegistry.registerComponent(appName, () => createAppContainer(MainNavigator));