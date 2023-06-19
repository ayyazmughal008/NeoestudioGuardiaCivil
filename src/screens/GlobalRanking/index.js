import React from 'react';
import {View, BackHandler, ActivityIndicator, Platform} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation-locker';
import Webview from 'react-native-webview';
const URL = 'https://neoestudio.net/googleChart?studentId=';

class GlobalRanking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToLandscape();
      }
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return Orientation.unlockAllOrientations(), false;
  }

  ActivityIndicatorLoadingView() {
    //making a view to show to while loading the webpage
    return (
      <ActivityIndicator color="#009688" size="large" style={styles.loading} />
    );
  }

  render() {
    const scalesPageToFit = Platform.OS === 'android';
    const {login} = this.props.user;
    return (
      <View style={{flex: 1}}>
        <FastImage
          source={
            Platform.OS === 'android'
              ? require('../../Images/veoestudio.png')
              : require('../../Images/ios_logo.png')
          }
          resizeMode={FastImage.resizeMode.contain}
          style={styles.logo}
        />
        <Webview
          style={styles.WebViewStyle}
          source={{
            uri: `${URL}` + login.data.id,
            //uri: 'http://95.179.208.227/acadmy/public/googleChart',
            //html: '<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">',
            // method: 'GET'
          }}
          //Enable Javascript support
          javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}
          //View to show while loading the webpage
          renderLoading={this.ActivityIndicatorLoadingView}
          //Want to show the view or not
          startInLoadingState={true}
          scalesPageToFit={scalesPageToFit}
          bounces={false}
          scrollEnabled={false}></Webview>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps)(GlobalRanking);
