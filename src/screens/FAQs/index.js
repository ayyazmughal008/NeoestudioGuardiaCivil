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
import Directory from '../../Component/Directory';
import Orientation from 'react-native-orientation-locker';
import QuesAnswer from './AnswerQuestion';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DeviceInfo from 'react-native-device-info';

class FAQS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: '',
      dataSource: [],
      totalResponse: '',
    };
    this.arrayholder = [];
  }

  getData = string => {
    const {login} = this.props.user;
    this.setState({isLoading: true});
    fetch('https://neoestudio.net/api/getFaqFolders', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentType: login.data.type,
        queryString: string,
        tab: DeviceInfo.isTablet() ? 'yes' : null,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          dataSource: responseJson.data,
          totalResponse: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }
    });
    const {login} = this.props.user;
    return fetch('https://neoestudio.net/api/getFaqFolders', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentType: login.data.type,
        queryString: this.state.text,
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
            totalResponse: responseJson,
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
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
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
              value={this.state.text}
              onChangeText={text => this.setState({text: text})}
            />

            {this.state.text !== '' ? (
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() => {
                  this.setState({text: ''});
                  this.getData('');
                }}>
                <Icon name="clear" size={25} color="#000" />
              </TouchableOpacity>
            ) : (
              <View />
            )}

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
            {this.state.totalResponse.queryString === 'no' ? (
              <FlatList
                data={this.state.dataSource}
                enableEmptySections={true}
                contentContainerStyle={{flexGrow: 1}}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <Directory
                    img={require('../../Images/directory.png')}
                    title={item.name}
                    status="Habilitado"
                    clickHandler={() => {
                      this.props.navigation.navigate('FAQSDetail', {
                        id: item.id,
                      });
                    }}
                  />
                )}
              />
            ) : (
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
            )}
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
export default connect(mapStateToProps)(FAQS);
