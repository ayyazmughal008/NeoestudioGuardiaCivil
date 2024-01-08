import React from 'react';
import {View, AppState, Linking} from 'react-native';
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
  getUserVideos,
} from './src/Redux/action';
import Dialog from './src/Component/DailogBox';
import Toast from './src/Component/Toast';
import messaging from '@react-native-firebase/messaging';
import Orientation from 'react-native-orientation-locker';

class MainApp extends React.Component {
  state = {
    appState: AppState.currentState,
  };

  fetchVideoData = async () => {
    await getUserVideos('Alumno');
  };

  test = () => {
    Orientation.unlockAllOrientations();
  };

  async componentDidMount() {
    console.log('hiiii 2');
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this._handleAppStateChange,
    );
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
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      if (remoteMessage?.data?.isweb) {
        Linking.openURL(remoteMessage?.data?.link);
      } else {
        if (remoteMessage?.data?.screen === 'Actividades') {
          {
            this.test(), navigationService.navigate('Actividad');
          }
        } else if (remoteMessage?.data?.screen === 'Entrenamiento') {
          {
            this.test(), this.fetchVideoData();
          }
        } else if (remoteMessage?.data?.screen === 'Clases') {
          this.test(), navigationService.navigate('Clases');
        } else if (remoteMessage?.data?.screen === 'Exámenes') {
          this.test(),
            navigationService.navigate('ExamFile', {
              isRefresh: 'false',
            });
        } else if (remoteMessage?.data?.screen === 'Temario') {
          this.test(), navigationService.navigate('PDF');
        } else if (remoteMessage?.data?.screen === 'Videos') {
          this.test(), navigationService.navigate('VideoClass');
        } else if (remoteMessage?.data?.screen === 'Ranking global') {
          this.test(), navigationService.navigate('GlobalRanking');
        } else if (remoteMessage?.data?.screen === 'Audiolibro') {
          this.test(), navigationService.navigate('AudioClass');
        } else if (remoteMessage?.data?.screen === 'Repaso') {
          this.test(), navigationService.navigate('ReviewTest');
        } else if (remoteMessage?.data?.screen === 'Entervista') {
          this.test(), navigationService.navigate('Personality');
        } else if (remoteMessage?.data?.screen === 'Descargas') {
          this.test(), navigationService.navigate('DownUpload');
        } else {
          console.log('no screen found');
        }
      }
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      if (remoteMessage?.data?.isweb) {
        Linking.openURL(remoteMessage?.data?.link);
      } else {
        if (remoteMessage?.data?.screen === 'Actividades') {
          {
            this.test(), navigationService.navigate('Actividad');
          }
        } else if (remoteMessage?.data?.screen === 'Entrenamiento') {
          {
            this.test(), this.fetchVideoData();
          }
        } else if (remoteMessage?.data?.screen === 'Clases') {
          this.test(), navigationService.navigate('Clases');
        } else if (remoteMessage?.data?.screen === 'Exámenes') {
          this.test(),
            navigationService.navigate('ExamFile', {
              isRefresh: 'false',
            });
        } else if (remoteMessage?.data?.screen === 'Temario') {
          this.test(), navigationService.navigate('PDF');
        } else if (remoteMessage?.data?.screen === 'Videos') {
          this.test(), navigationService.navigate('VideoClass');
        } else if (remoteMessage?.data?.screen === 'Ranking global') {
          this.test(), navigationService.navigate('GlobalRanking');
        } else if (remoteMessage?.data?.screen === 'Audiolibro') {
          this.test(), navigationService.navigate('AudioClass');
        } else if (remoteMessage?.data?.screen === 'Repaso') {
          this.test(), navigationService.navigate('ReviewTest');
        } else if (remoteMessage?.data?.screen === 'Entervista') {
          this.test(), navigationService.navigate('Personality');
        } else if (remoteMessage?.data?.screen === 'Descargas') {
          this.test(), navigationService.navigate('DownUpload');
        } else {
          console.log('no screen found');
        }
      }
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          if (remoteMessage?.data?.isweb) {
            Linking.openURL(remoteMessage?.data?.link);
          } else {
            if (remoteMessage?.data?.screen === 'Actividades') {
              {
                this.test(), navigationService.navigate('Actividad');
              }
            } else if (remoteMessage?.data?.screen === 'Entrenamiento') {
              {
                this.test(), this.fetchVideoData();
              }
            } else if (remoteMessage?.data?.screen === 'Clases') {
              this.test(), navigationService.navigate('Clases');
            } else if (remoteMessage?.data?.screen === 'Exámenes') {
              this.test(),
                navigationService.navigate('ExamFile', {
                  isRefresh: 'false',
                });
            } else if (remoteMessage?.data?.screen === 'Temario') {
              this.test(), navigationService.navigate('PDF');
            } else if (remoteMessage?.data?.screen === 'Videos') {
              this.test(), navigationService.navigate('VideoClass');
            } else if (remoteMessage?.data?.screen === 'Ranking global') {
              this.test(), navigationService.navigate('GlobalRanking');
            } else if (remoteMessage?.data?.screen === 'Audiolibro') {
              this.test(), navigationService.navigate('AudioClass');
            } else if (remoteMessage?.data?.screen === 'Repaso') {
              this.test(), navigationService.navigate('ReviewTest');
            } else if (remoteMessage?.data?.screen === 'Entervista') {
              this.test(), navigationService.navigate('Personality');
            } else if (remoteMessage?.data?.screen === 'Descargas') {
              this.test(), navigationService.navigate('DownUpload');
            } else {
              console.log('no screen found');
            }
          }
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

  // componentDidMount() {
   
  // }

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
