// App.js

import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

// import the different screens
import Loading from './app/login/Loading';
import SignUp from './app/login/SignUp';
import Login from './app/login/Login';
import ForgotPassword from './app/login/ForgotPassword';
import Main from './app/main/Main';

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBW8yLguJINXykZopPbu3cXssHw50TijEQ",
  authDomain: "checkbox-71e6e.firebaseapp.com",
  projectId: "checkbox-71e6e",
  databaseURL: "https://checkbox-71e6e.firebaseio.com",
  storageBucket: "checkbox-71e6e.appspot.com"
};

firebase.initializeApp(firebaseConfig);

// create our app's navigation stack
const RootSwitch = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    ForgotPassword,
    Main
  },
  {
    initialRouteName: 'Loading'
  }
)

const App = createAppContainer(RootSwitch);

export default App;
