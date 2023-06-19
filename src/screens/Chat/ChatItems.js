import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Component/MakeMeResponsive';
import LinearGradient from 'react-native-linear-gradient';
import Icon2 from 'react-native-vector-icons/dist/Entypo';
import RNFetchBlob from 'react-native-blob-util';
//import AudioProgress from './audprogress'
//import TrackPlayer, { STATE_PLAYING } from 'react-native-track-player';
import FastImage from 'react-native-fast-image';
import {fonts} from '../../utils';

class ChatItems extends Component {
  async iosDownload(fileUrl) {
    var date = new Date();
    var url = fileUrl;
    var encoded = encodeURI(url);
    var ext = this.extention(url);
    ext = '.' + ext[0];
    let dirs =
      RNFetchBlob.fs.dirs.DCIMDir +
      '/NeoeStudio_' +
      Math.floor(date.getTime() + date.getSeconds() / 2) +
      ext;
    console.log(dirs, 'document path');
    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      fileCache: true,
      path: dirs,
    })
      .fetch('GET', encoded, {
        //some headers ..
      })
      .then(res => {
        RNFetchBlob.fs.writeFile(dirs, res.data, 'base64');
        RNFetchBlob.ios.previewDocument(dirs);
      })
      .catch(error => {});
  }

  download(fileUrl) {
    var date = new Date();
    var url = fileUrl;
    var ext = this.extention(url);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let DownloadDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          DownloadDir +
          '/NeoeStudio_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'NeoeStudio',
      },
    };
    config(options)
      .fetch('GET', url)
      .then(res => {
        Alert.alert('Successfully Downloaded');
      });
  }
  extention(filename) {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  }

  requestPermission = async url => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Neoestudio Application',
          message:
            'Neoestudio App needs access to your Storage ' +
            'so you can download and save any files.',
          //buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.download(url);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      //console.warn(err);
    }
  };

  render() {
    const {
      message,
      type,
      fileType,
      downloadFile,
      isActive,
      studentClickHandler,
      teacherClickHandler,
      play,
      isClose,
    } = this.props;

    if (type === 'student') {
      return (
        <View style={{flex: 0, alignItems: 'center'}}>
          {isClose === 'opened' && (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginBottom: heightPercentageToDP(1),
              }}>
              <View
                style={{
                  width: widthPercentageToDP(30),
                  height: heightPercentageToDP(0.2),
                  backgroundColor: 'green',
                  marginBottom: heightPercentageToDP(1),
                }}
              />
              <Text
                style={{
                  color: 'green',
                  fontFamily: fonts.elegance,
                  fontSize: widthPercentageToDP(4),
                  marginLeft: widthPercentageToDP(3),
                  marginRight: widthPercentageToDP(3),
                }}>
                {'Consulta abierta'}
              </Text>
              <View
                style={{
                  width: widthPercentageToDP(30),
                  height: heightPercentageToDP(0.2),
                  backgroundColor: 'green',
                  marginBottom: heightPercentageToDP(1),
                }}
              />
            </View>
          )}
          <LinearGradient
            style={{
              flex: 0,
              // height: widthPercentageToDP(20),
              width: widthPercentageToDP(80),
              marginBottom: widthPercentageToDP(3),
              marginLeft: widthPercentageToDP(17),
              marginRight: widthPercentageToDP(1),
              borderRadius: widthPercentageToDP(1.5),
            }}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#659ece', '#80b6dc']}>
            {message ? (
              <Text
                style={{
                  paddingLeft: widthPercentageToDP(2),
                  paddingTop: widthPercentageToDP(2),
                  paddingBottom: widthPercentageToDP(1),
                  fontSize: widthPercentageToDP(4),
                  fontFamily: fonts.elegance,
                  color: '#ffff',
                }}>
                {message}
              </Text>
            ) : fileType === 'file' ? (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  //justifyContent: "space-between"
                }}
                onPress={() => {
                  if (Platform.OS === 'android') {
                    this.download(downloadFile);
                  } else {
                    this.iosDownload(downloadFile);
                  }
                }}>
                <Icon2 name="attachment" size={25} color="red" />
                <Text
                  style={{
                    color: '#ffff',
                    fontFamily: fonts.elegance,
                    fontSize: widthPercentageToDP(3),
                    textDecorationLine: 'underline',
                    marginLeft: widthPercentageToDP(3),
                  }}>
                  {'Download Attachment'}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  //justifyContent: "space-between"
                }}
                onPress={studentClickHandler}>
                <FastImage
                  source={
                    play
                      ? require('../AudioClass/assets/pause.png')
                      : require('../AudioClass/assets/play.png')
                  }
                  style={{
                    width: widthPercentageToDP(10),
                    height: widthPercentageToDP(10),
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                />
                {isActive && <AudioProgress />}
              </TouchableOpacity>
            )}
          </LinearGradient>
          {isClose === 'closed' && (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginBottom: heightPercentageToDP(1),
              }}>
              <View
                style={{
                  width: widthPercentageToDP(30),
                  height: heightPercentageToDP(0.2),
                  backgroundColor: 'red',
                  marginBottom: heightPercentageToDP(1),
                }}
              />
              <Text
                style={{
                  color: 'red',
                  fontFamily: fonts.elegance,
                  fontSize: widthPercentageToDP(4),
                  marginLeft: widthPercentageToDP(3),
                  marginRight: widthPercentageToDP(3),
                }}>
                {'Consulta cerrada'}
              </Text>
              <View
                style={{
                  width: widthPercentageToDP(30),
                  height: heightPercentageToDP(0.2),
                  backgroundColor: 'red',
                  marginBottom: heightPercentageToDP(1),
                }}
              />
            </View>
          )}
        </View>
      );
    } else if (type === 'teacher') {
      return (
        <View style={{flex: 0, alignItems: 'center'}}>
          {isClose === 'opened' && (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginBottom: heightPercentageToDP(1),
              }}>
              <View
                style={{
                  width: widthPercentageToDP(30),
                  height: heightPercentageToDP(0.2),
                  backgroundColor: 'green',
                  marginBottom: heightPercentageToDP(1),
                }}
              />
              <Text
                style={{
                  color: 'green',
                  fontFamily: fonts.elegance,
                  fontSize: widthPercentageToDP(4),
                  marginLeft: widthPercentageToDP(3),
                  marginRight: widthPercentageToDP(3),
                }}>
                {'Consulta abierta'}
              </Text>
              <View
                style={{
                  width: widthPercentageToDP(30),
                  height: heightPercentageToDP(0.2),
                  backgroundColor: 'green',
                  marginBottom: heightPercentageToDP(1),
                }}
              />
            </View>
          )}
          <LinearGradient
            style={{
              flex: 0,
              width: widthPercentageToDP(80),
              marginRight: widthPercentageToDP(17),
              marginLeft: widthPercentageToDP(1),
              marginBottom: widthPercentageToDP(3),
              borderRadius: widthPercentageToDP(1.5),
            }}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#cacaca', '#e9e9e9']}>
            {message ? (
              <Text
                style={{
                  paddingLeft: widthPercentageToDP(2),
                  paddingTop: widthPercentageToDP(2),
                  paddingBottom: widthPercentageToDP(1),
                  fontSize: widthPercentageToDP(4),
                  fontFamily: fonts.elegance,
                  color: '#000',
                }}>
                {message}
              </Text>
            ) : fileType === 'file' ? (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  //justifyContent: "space-between"
                }}
                onPress={() => {
                  if (Platform.OS === 'android') {
                    this.download(downloadFile);
                  } else {
                    this.iosDownload(downloadFile);
                  }
                }}>
                <Icon2 name="attachment" size={25} color="red" />
                <Text
                  style={{
                    color: '#000',
                    fontFamily: fonts.elegance,
                    fontSize: widthPercentageToDP(3),
                    textDecorationLine: 'underline',
                    marginLeft: widthPercentageToDP(3),
                  }}>
                  {'Download Attachment'}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  //justifyContent: "space-between"
                }}
                onPress={teacherClickHandler}>
                <FastImage
                  source={
                    play
                      ? require('../AudioClass/assets/pause.png')
                      : require('../AudioClass/assets/play.png')
                  }
                  style={{
                    width: widthPercentageToDP(10),
                    height: widthPercentageToDP(10),
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                />
                {isActive && <AudioProgress />}
              </TouchableOpacity>
            )}
          </LinearGradient>
          {isClose === 'closed' && (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginBottom: heightPercentageToDP(1),
              }}>
              <View
                style={{
                  width: widthPercentageToDP(30),
                  height: heightPercentageToDP(0.2),
                  backgroundColor: 'red',
                  marginBottom: heightPercentageToDP(1),
                }}
              />
              <Text
                style={{
                  color: 'red',
                  fontFamily: fonts.elegance,
                  fontSize: widthPercentageToDP(4),
                  marginLeft: widthPercentageToDP(3),
                  marginRight: widthPercentageToDP(3),
                }}>
                {'Consulta cerrada'}
              </Text>
              <View
                style={{
                  width: widthPercentageToDP(30),
                  height: heightPercentageToDP(0.2),
                  backgroundColor: 'red',
                  marginBottom: heightPercentageToDP(1),
                }}
              />
            </View>
          )}
        </View>
      );
    }
  }
}

export default ChatItems;
