import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import RegistrationScreen from '../screens/RegistrationScreen';
import HomeScreen from '../screens/HomeScreen';

const AppNavigator = createStackNavigator({
    Register: {
      screen: RegistrationScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Home: {
        screen: HomeScreen
    }
  }, {initialRouteName: 'Register'})

export default createAppContainer(AppNavigator)


