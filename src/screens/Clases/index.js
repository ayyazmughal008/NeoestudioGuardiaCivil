import React, {PureComponent} from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import Header from '../../Component/Header';
import Directory from '../../Component/Directory';
import {getTopics} from '../../Redux/action';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation-locker';
import {NavigationEvents} from 'react-navigation';

class VideoClass extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      response: [],
    };
    this.getAllTopics();
  }

  getAllTopics = () => {
    const {login} = this.props.user;
    this.setState({loading: true});
    fetch('https://neoestudio.net/api/getClassTopics', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentType: login.data.type,
        studentId: login.data.id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        this.setState({loading: false});
        this.setState({response: json});
      })
      .catch(error => {
        this.setState({loading: false});
        console.log('exception error is =>', error);
      });
  };

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }
    });
  }

  render() {
    const {topics, login, AuthLoading} = this.props.user;
    const {loading, response} = this.state;
    return (
      <FastImage
        source={require('../../Images/bg.png')}
        resizeMode={FastImage.resizeMode.stretch}
        style={styles.container}>
        <NavigationEvents onDidFocus={() => this.getAllTopics()} />
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
          title="Clases"
        />
        <View style={styles.directoryView}>
          {!response || !response.length ? (
            <View />
          ) : (
            <FlatList
              data={response}
              keyExtractor={item => 'unique' + item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}
              initialNumToRender={8}
              renderItem={({item, index}) => {
                return (
                  <Directory
                    key={'unique' + index}
                    img={require('../../Images/directory.png')}
                    title={item.name}
                    status={item.status}
                    isActive={item.isActive}
                    count={item.count}
                    clickHandler={() => {
                      Orientation.unlockAllOrientations();
                      this.props.navigation.navigate('VideoDetail2', {
                        topicId: item.id,
                        type: 'video',
                      });
                    }}
                  />
                );
              }}
            />
          )}
        </View>
        {loading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
      </FastImage>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, {getTopics})(VideoClass);
