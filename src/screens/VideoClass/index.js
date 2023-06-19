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
    this.state = {};
    this.getAllTopics();
  }

  getAllTopics = () => {
    const {login} = this.props.user;
    this.props.getTopics(login.data.type, login.data.id, 'video');
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
    //console.log(topics)
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
          title="Video"
        />
        <View style={styles.directoryView}>
          {/* <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {!topics ?
                            <View />
                            : topics.data.map((item, index) => {
                                return (
                                    <Directory
                                        key={"unique" + index}
                                        img={require('../../Images/directory.png')}
                                        title={item.name}
                                        status="Habilitado"
                                        isActive={item.isActive}
                                        count={item.count}
                                        clickHandler={() => {
                                            this.props.navigation.navigate('VideoDetail', {
                                                position: item.id,
                                                name: item.name,
                                                id: login.data.id
                                            })
                                        }}
                                    />
                                )
                            })}
                    </ScrollView> */}
          {!topics ? (
            <View />
          ) : (
            <FlatList
              data={topics.data}
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
                    status="Habilitado"
                    isActive={item.isActive}
                    count={item.count}
                    clickHandler={() => {
                      Orientation.unlockAllOrientations();
                      this.props.navigation.navigate('VideoDetail', {
                        position: item.id,
                        name: item.name,
                        id: login.data.id,
                      });
                    }}
                  />
                );
              }}
            />
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
export default connect(mapStateToProps, {getTopics})(VideoClass);
