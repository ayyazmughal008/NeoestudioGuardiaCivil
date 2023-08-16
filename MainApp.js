import React from 'react';
import {View, AppState} from 'react-native';
import PropTypes from 'prop-types';
import NAVIGATOR, {navigationService} from './src/navigator';
import MainNavigator from './src/MainNavigator';
import {connect} from 'react-redux';
import {
  dispatchFunc,
  saveToken,
  saveUserRankPoint,
  updateUserRankPoint,
  updateLoginTime,
  updateLogoutTime,
} from './src/Redux/action';
import Dialog from './src/Component/DailogBox';
import Toast from './src/Component/Toast';
import messaging from '@react-native-firebase/messaging';

class MainApp extends React.Component {
  state = {
    appState: AppState.currentState,
  };

  async componentDidMount() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      this.getFcmToken();
      console.log('Authorization status:', authStatus);
    }
    messaging().onMessage(async remoteMessage => {
      console.log('===>', remoteMessage);
      // if (remoteMessage.data.type == "holiday") {
      //   navigationService.navigate("Vocation")
      // }
      // else {
      //   alert("No data")
      // }
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      // if (remoteMessage.data.type == "holiday") {
      //   navigationService.navigate("Vocation")
      // }
      // else {
      //   alert("No data")
      // }
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      // if (remoteMessage.data.type == "holiday") {
      //   navigationService.navigate("Vocation")
      // }
      // else {
      //   alert("No data")
      // }
      // navigation.navigate(remoteMessage.data.type);
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          // if (remoteMessage.data.type == "holiday") {
          //   navigationService.navigate("Vocation")
          // }
        }
      });
  }
  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);
      this.props.saveToken(fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  componentDidMount() {
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this._handleAppStateChange,
    );
  }

  componentWillUnmount() {
    this.appStateSubscription.remove();
  }

  _handleAppStateChange = nextAppState => {
    const {login} = this.props.user;
    if (login) {
      if (nextAppState === 'background') {
        this.props.updateLogoutTime(login.data.id);
        updateUserRankPoint('Yes', 'No', 'normal_points', login.data.id);
      } else if (nextAppState === 'active') {
        saveUserRankPoint('Yes', 'No', 'normal_points', login.data.id);
        this.props.updateLoginTime(login.data.id);
      }
    }
  };

  render() {
    const {login} = this.props.user;
    return (
      <View
        style={{
          flex: 1,
        }}>
        <Dialog dispatchFunction={this.props.dispatchFunc} />
        {/* <Toast /> */}
        {!login ? (
          <NAVIGATOR
            //uriPrefix={prefix}
            ref={navigatorRef => {
              navigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        ) : (
          <MainNavigator
            //uriPrefix={prefix}
            ref={navigatorRef => {
              navigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  dispatchFunc,
  saveToken,
  updateLoginTime,
  updateLogoutTime,
})(MainApp);
