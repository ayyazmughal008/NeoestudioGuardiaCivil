import React from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  PermissionsAndroid,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import Header from '../../Component/Header';
import Orientation from 'react-native-orientation-locker';
import ChatBox from './ChatItems';
import {data} from './dummyData';
import {postChat, getAllChats} from '../../Redux/action';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Icon2 from 'react-native-vector-icons/dist/Entypo';
import Icon3 from 'react-native-vector-icons/dist/SimpleLineIcons';
import Icon4 from 'react-native-vector-icons/dist/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
import TrackPlayer, {STATE_PLAYING} from 'react-native-track-player';
import Constants from './Constants';
//import {AudioPlayer, AudioRecorder} from 'react-native-audio-player-recorder';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isRecording: true,
      isFinishRecorded: false,
      isPlaying: false,
      isPaused: false,
      currentTime: 0,
      audioLength: 0,
      fileUri: '',
      fileType: '',
      fileName: '',
      testArray: [],
      isPlayingMusic: false,
      audioPath:
        Platform.OS === 'ios'
          ? AudioUtils.DocumentDirectoryPath + '/test.aac'
          : '',
    };
    this.timer = null;
    //this.props.getAllChats();
  }

  setPlayer = fileUrl => {
    TrackPlayer.setupPlayer({
      minBuffer: 200,
      maxBuffer: 600,
      playBuffer: 100,
      maxCacheSize: 1000,
    }).then(() => {
      console.log('ready to be used');
    });
    TrackPlayer.add({
      id: 'unique track id', // Must be a string, required
      url: fileUrl,
      title: 'Avaritia',
      artist: 'deadmau5',
      album: 'while(1<2)',
      genre: 'Progressive House, Electro House',
      date: '2014-05-20T07:00:00+00:00', // RFC 3339
      artwork: require('../Home/assets/novedades.png'),
    });
    TrackPlayer.stop();
    TrackPlayer.play();
    TrackPlayer.addEventListener('playback-queue-ended', () => {
      TrackPlayer.seekTo(0);
      TrackPlayer.pause();
      //this.storeData('false')
    });
  };

  filePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(
        res.uri,
        '\n',
        res.type,
        '\n',
        res.name,
        // mime type
        // res.name,
        // res.size
      );
      this.setState(
        {
          fileUri: res.uri,
          fileType: res.type,
          fileName: res.name,
        },
        () => this.setState({message: res.name}),
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
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
        this.record();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      //console.warn(err);
    }
  };

  prepareRecordingPath() {
    AudioRecorder.prepareRecordingAtPath(Constants.AUDIO_PATH, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000,
    });
  }

  record = () => {
    try {
      this.prepareRecordingPath();
      AudioRecorder.startRecording();
      this.setState({
        isRecording: false,
        audioLength: 0,
        currentTime: 0,
      });

      this.timer = setInterval(() => {
        const time = this.state.currentTime + 1;
        this.setState({currentTime: time});
        if (time === Constants.MAX_AUDIO_LENGTH) {
          this.stopRecording();
        }
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  stopRecording = () => {
    const {login} = this.props.user;
    AudioRecorder.stopRecording();
    this.setState({audioLength: this.state.currentTime + 1});
    clearInterval(this.timer);
    this.setState(
      {
        isRecording: true,
        isFinishRecorded: true,
        currentTime: 0,
        audioPath: Constants.AUDIO_PATH,
      },
      () => {
        const filesData = {
          name: Date.now() + 'NeoeStudio.mp3',
          type: 'audio/mpeg',
          uri: 'file://' + this.state.audioPath,
        };
        this.props.postChat(
          login.data.id,
          this.state.message,
          filesData,
          false,
          'audio/mpeg',
        );
        //console.log(Constants.AUDIO_PATH)
      },
    );
  };

  componentDidMount() {
    this.updateArray();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }
    });
  }

  updateArray = () => {
    const {getChats} = this.props.user;
    this.setState({testArray: getChats.chats});
  };

  playCurrentMusic = (position, isPLay, url) => {
    const {getChats} = this.props.user;
    const newArray = [...getChats.chats];
    for (var i = 0; i < newArray.length; i++) {
      newArray[i].isActive = false;
    }
    newArray[position].isActive = true;
    this.setPlayer(url);
    this.setState({testArray: newArray});
  };

  render() {
    const {login, AuthLoading, getChats} = this.props.user;
    var fileData = {
      type: this.state.fileType,
      name: Date.now() + this.state.fileName,
      uri: this.state.fileUri,
    };
    return (
      <FastImage
        style={styles.container}
        source={require('../../Images/bg.png')}
        resizeMode={FastImage.resizeMode.stretch}>
        <FastImage
          source={Platform.OS === 'android' ?
          require('../../Images/veoestudio.png')
         :require('../../Images/ios_logo.png')}
          style={styles.logo}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Header
          iconName="left"
          leftClick={() => this.props.navigation.goBack()}
          title={'Consultas'}
        />
        {!getChats.teacher ? (
          <View />
        ) : (
          <View style={styles.profileVie}>
            <FastImage
              source={{uri: getChats.teacher.profilePicture}}
              style={styles.profile}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text style={styles.profileName}>{getChats.teacher.name}</Text>
          </View>
        )}
        <View style={styles.chatView}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            ref={ref => {
              this.scrollView = ref;
            }}
            onContentSizeChange={() =>
              this.scrollView.scrollToEnd({animated: true})
            }>
            {!this.state.testArray ? (
              <View />
            ) : (
              getChats.chats.map((item, index) => {
                return (
                  <ChatBox
                    key={'unique' + index}
                    type={item.sender}
                    message={item.message}
                    downloadFile={item.file}
                    fileType={item.type}
                    isActive={item.isActive}
                    isClose={item.field2x}
                    studentClickHandler={() =>
                      this.playCurrentMusic(index, '', item.file)
                    }
                    teacherClickHandler={() =>
                      this.playCurrentMusic(index, '', item.file)
                    }
                  />
                );
              })
            )}
            <View style={styles.jump} />
          </ScrollView>
        </View>
        <View style={styles.bottomView}>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Mensaje"
              placeholderTextColor="grey"
              style={styles.textInput}
              numberOfLines={5}
              multiline
              returnKeyType={'next'}
              //editable={true}
              autoCapitalize="none"
              editable={this.state.isRecording ? true : false}
              keyboardType="email-address"
              onChangeText={text => this.setState({message: text})}
              ref={input => {
                this.textInput = input;
              }}
            />
            {!this.state.message ? (
              this.state.isRecording ? (
                <TouchableOpacity onPress={this.requestPermission}>
                  <Icon3 name="microphone" size={30} color="grey" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => this.stopRecording()}>
                  <Icon4 name="microphone-slash" size={30} color="grey" />
                </TouchableOpacity>
              )
            ) : (
              <TouchableOpacity
                onPress={() => {
                  !this.state.fileName
                    ? (this.props.postChat(
                        login.data.id,
                        this.state.message,
                        fileData,
                        true,
                      ),
                      this.textInput.clear())
                    : (this.props.postChat(
                        login.data.id,
                        this.state.message,
                        fileData,
                        false,
                        fileData.type,
                      ),
                      this.setState({
                        fileName: '',
                        message: '',
                      }));
                }}>
                <Icon name="md-send" size={30} color="grey" />
              </TouchableOpacity>
            )}
          </View>
          {!this.state.fileName ? (
            <TouchableOpacity
              disabled={this.state.isRecording ? false : true}
              style={styles.attachment}
              onPress={() => this.filePicker()}>
              <Icon2 name="attachment" size={30} color="grey" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={this.state.isRecording ? false : true}
              style={styles.attachment}
              onPress={() => this.setState({fileName: '', message: ''})}>
              <Icon4 name="close" size={30} color="grey" />
              <Text style={styles.clear}>{'clear'}</Text>
            </TouchableOpacity>
          )}
        </View>
        {AuthLoading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
      </FastImage>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, {postChat, getAllChats})(Chat);
