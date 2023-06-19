import * as React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../../screens/Login'
import OTP from '../../screens/Login/OTP'

export default createStackNavigator(
  {
    Login: {
      screen: Login
    },
    OTP: {
      screen: OTP
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);
