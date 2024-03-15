import React, {useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Component/MakeMeResponsive';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';

const TestTwo = ({navigation, route}) => {
  useEffect(() => {
    navigation.addListener('didFocus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToLandscapeRight();
      }
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <VideoPlayer
        source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
        navigator={() => {
          Orientation.unlockAllOrientations();
          navigation.goBack();
        }}
        ignoreSilentSwitch='ignore'
        disableFullscreen = {true}
      />
    </SafeAreaView>
  );
};

export default TestTwo
