import React, {Fragment} from 'react';
import {View, Text, ImageBackground, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import MAINAPP from './MainApp';
import SplashScreen from 'react-native-splash-screen';
import {Store, persistor} from './src/Redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import RemotePushController from './src/services/RemotePushController';
import Orientation from 'react-native-orientation-locker';
//======================================================
export default class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Provider store={Store}>
          <PersistGate loading={null} persistor={persistor}>
            <MAINAPP />
            <RemotePushController />
          </PersistGate>
        </Provider>
      </View>
    );
  }
}
