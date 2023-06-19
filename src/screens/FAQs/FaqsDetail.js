import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import Header from '../../Component/Header';
import QuesAnswer from './AnswerQuestion';
import Orientation from 'react-native-orientation-locker';
import DeviceInfo from 'react-native-device-info';

class FAQSDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: '',
      dataSource: [],
    };
    this.arrayholder = [];
  }

  getData = string => {
    const id = this.props.navigation.getParam('id', '1');
    this.setState({isLoading: true});
    fetch('https://neoestudio.net/api/faqSearch', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        folderId: id,
        query: string,
        tab: DeviceInfo.isTablet() ? 'yes' : null,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          dataSource: responseJson.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  UNSAFE_componentWillMount() {
    var initial = Orientation.getInitialOrientation();
    if (initial === 'LANDSCAPE') {
      Orientation.lockToPortrait();
      console.log('hii');
      //do stuff
    }
  }
  _onOrientationDidChange = orientation => {
    if (orientation == 'LANDSCAPE') {
      Orientation.lockToPortrait();
    }
  };
  componentWillUnmount() {
    Orientation.removeOrientationListener(this._onOrientationDidChange);
  }

  componentDidMount() {
    Orientation.lockToPortrait();
    Orientation.addOrientationListener(this._onOrientationDidChange);
    const id = this.props.navigation.getParam('id', '1');
    console.log('My id is:', id);
    return fetch('https://neoestudio.net/api/getFolderFaqs', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        folderId: id,
        tab: DeviceInfo.isTablet() ? 'yes' : null,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.data,
          },
          function () {
            this.arrayholder = responseJson.data;
          },
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.answer
        ? item.answer.toUpperCase()
        : item.question
        ? item.answer.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      text: text,
    });
  }

  render() {
    const {faqFolders, AuthLoading} = this.props.user;
    return (
      <FastImage
        style={styles.container}
        resizeMode={FastImage.resizeMode.stretch}
        source={require('../../Images/bg.png')}>
        <FastImage
          source={
            Platform.OS === 'android'
              ? require('../../Images/veoestudio.png')
              : require('../../Images/ios_logo.png')
          }
          resizeMode={FastImage.resizeMode.contain}
          style={styles.logo}
        />
        <Header
          iconName="left"
          leftClick={() => this.props.navigation.goBack()}
          title={'Preguntas' + '\n' + 'Frecuentes'}
        />
        <View style={styles.searchMain}>
          <FastImage
            style={styles.searchBar}
            source={require('../../Images/search_bar.png')}
            resizeMode={FastImage.resizeMode.stretch}>
            <TextInput
              placeholder="Busca palabras clave"
              placeholderTextColor="#000"
              style={styles.input}
              returnKeyType={'next'}
              editable={true}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => this.setState({text: text})}
            />
            <TouchableOpacity onPress={() => this.getData(this.state.text)}>
              <FastImage
                source={require('../../Images/search.png')}
                resizeMode={FastImage.resizeMode.stretch}
                style={styles.searchImage}
              />
            </TouchableOpacity>
          </FastImage>
        </View>
        {!this.state.dataSource ? (
          <View />
        ) : (
          <View style={styles.directoryView}>
            <FlatList
              data={this.state.dataSource}
              enableEmptySections={true}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <QuesAnswer
                  img={require('../../Images/directory.png')}
                  question={item.question1}
                  answer={item.answer1}
                />
              )}
            />
          </View>
        )}

        {this.state.isLoading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
      </FastImage>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps)(FAQSDetail);
