import React from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {getAllNews} from '../../Redux/action';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import Header from '../../Component/Header';
import NEWS from './NewsItem';
import Orientation from 'react-native-orientation-locker';
import DeviceInfo from 'react-native-device-info';

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.getData();
  }

  getData = () => {
    const {login} = this.props.user;
    this.props.getAllNews(login.data.id, DeviceInfo.isTablet() ? 'yes' : null);
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
    const {newsItem, AuthLoading} = this.props.user;
    console.log(newsItem);
    return (
      <FastImage
        style={styles.container}
        source={require('../../Images/bg.png')}
        resizeMode={FastImage.resizeMode.stretch}>
        <Header
          iconName="left"
          leftClick={() => this.props.navigation.goBack()}
          title={'Tablón de ' + '\n' + 'anuncios'}
        />
        <FastImage
          style={styles.logo}
          source={
            Platform.OS === 'android'
              ? require('../../Images/veoestudio.png')
              : require('../../Images/ios_logo.png')
          }
          resizeMode={FastImage.resizeMode.cover}
        />

        <View style={styles.directoryView}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {!newsItem ? (
              <View />
            ) : (
              newsItem.data.map((item, index) => {
                return (
                  <NEWS
                    key={'unique' + index}
                    news={item.news}
                    status={item.status}
                    date={item.updated_at}
                  />
                );
              })
            )}
          </ScrollView>
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
export default connect(mapStateToProps, {getAllNews})(News);
