import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';
import Video from 'react-native-video';
const {width, height} = Dimensions.get('window');
export default class BackgroundVideo extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Video
          source={
            Platform.OS === 'android'
              ? require('../../Images/Video/bgVideo.mp4')
              : require('../../Images/Video/bgVideoIos.mp4')
          }
          style={styles.backgroundVideo}
          muted={false}
          repeat={true}
          resizeMode={'stretch'}
          rate={1.0}
          ignoreSilentSwitch={'obey'}
        />
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
});

// styled-component
