import React, {PureComponent} from 'react';
import {
  ImageBackground,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StatusBar,
  FlatList,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import {getVIdeoFiles} from '../../Redux/action';
import Header from '../../Component/Header';
import Player from '../../Component/Player';
import Orientation from 'react-native-orientation-locker';
import FastImage from 'react-native-fast-image';
import {NavigationEvents} from 'react-navigation';

class VideoDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
    };
    this.getData();
  }

  getData = () => {
    const {login} = this.props.user;
    const position = this.props.navigation.getParam('position', '1');
    this.props.getVIdeoFiles(position, login.data.id);
  };

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }
    });
  }

  _onLayout = e => {
    console.log('************', e.nativeEvent.layout.height);
    let width = e.nativeEvent.layout.width;
    let height = e.nativeEvent.layout.height;
    this.setState({
      height: height,
      width: width,
    });
  };

  render() {
    const {video, AuthLoading, login} = this.props.user;
    const name = this.props.navigation.getParam('name', 'Tema 1');

    return (
      <FastImage
        source={require('../../Images/bg.png')}
        style={styles.container}
        resizeMode={FastImage.resizeMode.stretch}
        onLayout={e => {
          this._onLayout(e);
        }}>
        <FastImage
          style={styles.logo}
          source={
            Platform.OS === 'android'
              ? require('../../Images/veoestudio.png')
              : require('../../Images/ios_logo.png')
          }
          resizeMode={FastImage.resizeMode.contain}
        />
        <Header
          iconName="left"
          leftClick={() => this.props.navigation.goBack()}
          title="Video"
        />
        {!video ? (
          <View />
        ) : (
          <FlatList
            data={video.data}
            keyExtractor={item => item.title}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            initialNumToRender={8}
            renderItem={({item, index}) => {
              return (
                <Player
                  key={'unique' + index}
                  img={require('../../Images/video.png')}
                  isActive={item.isActive}
                  title={item.title}
                  clickHandler={
                    () => (
                      Orientation.unlockAllOrientations(),
                      this.props.navigation.navigate('TestVideo', {
                        url: item.url,
                        id: login.data.id,
                      })
                    )
                    // this.props.navigation.navigate('VideoPlayer', {
                    //     url: item.url,
                    //     id: login.data.id
                    // })
                    //console.log(item)
                  }
                />
              );
            }}
          />
        )}
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
export default connect(mapStateToProps, {getVIdeoFiles})(VideoDetail);
