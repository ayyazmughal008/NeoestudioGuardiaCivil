/*Example of React Native Video*/
import React from 'react';
//Import React
import { Platform, StyleSheet, Text, View, StatusBar, Dimensions, ActivityIndicator } from 'react-native';
//Import Basic React Native Component
import Video from 'react-native-video';
import { connect } from 'react-redux';
import { postVideoState } from '../../Redux/action'
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Orientation from 'react-native-orientation-locker';
import TrackPlayer from 'react-native-track-player';
//Media Controls to control Play/Pause/Seek and full screen

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'content',
    };
    TrackPlayer.seekTo(0)
    TrackPlayer.pause()
    TrackPlayer.destroy()
  }

  _onOrientationDidChange = (orientation) => {
    if (orientation == 'PORTRAIT') {
      Orientation.lockToLandscapeLeft();
    }
  };

  componentDidMount() {
    StatusBar.setHidden(true)
    Orientation.lockToLandscapeLeft();
    Orientation.addOrientationListener(this._onOrientationDidChange);
  }

  componentWillUnmount() {
    StatusBar.setHidden(false)
    Orientation.unlockAllOrientations()
    Orientation.removeOrientationListener(this._onOrientationDidChange);
  }

  onSeek = seek => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
  };

  onPaused = playerState => {
    //Handler for Video Pause
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onReplay = () => {
    //Handler for Replay
    this.setState({ playerState: PLAYER_STATES.PLAYING });
    this.videoPlayer.seek(0);
  };

  onProgress = data => {
    const { isLoading, playerState } = this.state;
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({ currentTime: data.currentTime });
    }
  };

  onLoad = data => this.setState({ duration: data.duration, isLoading: false });

  onLoadStart = data => this.setState({ isLoading: true });

  onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });

  onError = () => alert('Oh! ', error);

  exitFullScreen = () => {
    alert('Exit full screen');
  };

  enterFullScreen = () => { };

  onFullScreen = () => {
    if (this.state.screenType == 'content')
      this.setState({ screenType: 'cover' });
    else this.setState({ screenType: 'content' });
  };
  renderToolbar = () => (
    <View>
      <Text> toolbar </Text>
    </View>
  );
  onSeeking = currentTime => this.setState({ currentTime });

  render() {
    const url = this.props.navigation.getParam('url', 'kcbkdjb')
    //console.log('myUrl', url)
    const stdID = this.props.navigation.getParam('id', '1')
    const { login } = this.props.user
    return (
      <View style={{ flex: 1, justifyContent:"center",alignItems:"center" }}>
        <Video
          onEnd={this.onEnd}
          onLoad={(e) => {
            this.setState({ duration: e.duration, isLoading: false }, 
            // () => {
            //   this.props.postVideoState(
            //     login.data.id,
            //     "start"
            //   )
            // }
            )
          }}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          fullscreen={true}
          resizeMode="cover"
          source={{ uri: url }}
          style={styles.mediaPlayer}
          volume={10}
          onBuffer={this.onLoadStart}
          bufferConfig={{
            minBufferMs: 15000,
            maxBufferMs: 50000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000
          }}
          selectedVideoTrack={{
            type: "auto",
            //value: 
          }}
          controls={true}
          minLoadRetryCount={5}
          maxBitRate={2000000}
          ignoreSilentSwitch="ignore"
        />
        {/* <MediaControls
                    duration={this.state.duration}
                    isLoading={this.state.isLoading}
                    mainColor="transparent"
                    onFullScreen={this.onFullScreen}
                    onPaused={this.onPaused}
                    onReplay={this.onReplay}
                    onSeek={this.onSeek}
                    onSeeking={this.onSeeking}
                    playerState={this.state.playerState}
                    progress={this.state.currentTime}
                    toolbar={this.renderToolbar()}
                /> */}
        {this.state.isLoading &&
          <ActivityIndicator
            size="large"
            color="red"
            style={styles.loading}
          />
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});
const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  postVideoState
})(App);

// /*Example of React Native Video*/
// import React from 'react';
// //Import React
// import { Platform, StyleSheet, Text, View, StatusBar, Dimensions } from 'react-native';
// //Import Basic React Native Component
// //import Video from 'react-native-video';
// import Video from 'react-native-video-player'
// import { connect } from 'react-redux';
// import { postVideoState } from '../../Redux/action'
// import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
// import Orientation from 'react-native-orientation';
// import TrackPlayer from 'react-native-track-player';
// //Media Controls to control Play/Pause/Seek and full screen

// class VideoPlayer extends React.Component {

//     render() {
//         const url = this.props.navigation.getParam('url', 'kcbkdjb')
//         return (
//             <View style={{ flex: 1, alignItems: "center" }}>
//                 <Video
//                     video={{ uri: url }}
//                     videoWidth={Dimensions.get('window').width}
//                     videoHeight={Dimensions.get('window').height}
//                 />
//             </View>
//         )
//     }
// }
// const mapStateToProps = state => ({
//     user: state.user,
// });
// export default connect(mapStateToProps, {
//     postVideoState
// })(VideoPlayer);


