import * as React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../../screens/Login'
import OTP from '../../screens/Login/OTP'

export default createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    OTP: {
      screen: OTP,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);
