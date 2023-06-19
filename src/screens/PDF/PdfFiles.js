import React from 'react';
import {
  ImageBackground,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import {getPdfFiles} from '../../Redux/action';
import Header from '../../Component/Header';
import Player from '../../Component/Player';
import Orientation from 'react-native-orientation-locker';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';

class VideoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      isOpen: false,
      pdfFile: '',
    };
    this.getData();
  }
  getData = () => {
    const {login} = this.props.user;
    const position = this.props.navigation.getParam('position', '1');
    this.props.getPdfFiles(position, login.data.id);
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
    const {pdf, AuthLoading, login} = this.props.user;
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
          title="Temario"
        />
        {!pdf ? (
          <View />
        ) : (
          <View style={{alignItems: 'center'}}>
            <View style={styles.VideoView}>
              {/* <ScrollView
                                contentContainerStyle={{ flexGrow: 1 }}
                                showsVerticalScrollIndicator={false}
                            >
                                {pdf.message === 'success' ?
                                    pdf.files.map((item, index) => {
                                        return (
                                            <Player
                                                key={"unique" + index}
                                                img={require('../../Images/pdf.png')}
                                                isActive={item.isActive}
                                                title={item.name}
                                                clickHandler={() =>
                                                    // this.props.navigation.navigate('PdfView', {
                                                    //     url: item.url,
                                                    //     id: login.data.id
                                                    // })
                                                    this.setState({ isOpen: true, pdfFile: item.file })
                                                    //console.log(item)
                                                }
                                            />
                                        )
                                    })
                                    : <View />}
                            </ScrollView> */}
              {pdf.message === 'success' ? (
                <FlatList
                  data={pdf.files}
                  keyExtractor={item => 'unique' + item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{flexGrow: 1}}
                  renderItem={({item, index}) => {
                    return (
                      <Player
                        key={'unique' + index}
                        img={require('../../Images/pdf.png')}
                        isActive={item.isActive}
                        title={item.title}
                        clickHandler={
                          () =>
                            // this.props.navigation.navigate('PdfView', {
                            //     url: item.url,
                            //     id: login.data.id
                            // })
                            this.setState({isOpen: true, pdfFile: item.file})
                          //console.log(item)
                        }
                      />
                    );
                  }}
                />
              ) : (
                <View />
              )}
            </View>
          </View>
        )}
        {AuthLoading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
        {this.state.isOpen && (
          <Modal
            transparent={true}
            visible={this.state.isOpen}
            animationType="slide"
            supportedOrientations={['portrait', 'landscape']}
            onRequestClose={() => {
              console.log('alert close');
            }}>
            <TouchableOpacity
              style={styles.modalMain}
              activeOpacity={1}
              onPressOut={() => this.setState({isOpen: false})}>
              <TouchableWithoutFeedback>
                <FastImage
                  source={require('../Home/assets/email_box.png')}
                  resizeMode={FastImage.resizeMode.stretch}
                  style={[
                    styles.quesBox,
                    {
                      height: DeviceInfo.isTablet()
                        ? widthPercentageToDP(45)
                        : widthPercentageToDP(40),
                    },
                  ]}>
                  <Text style={styles.text1}>
                    {'Elige cómo quieres leer el documento.'}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '80%',
                      justifyContent: 'space-around',
                    }}>
                    <TouchableOpacity
                      style={styles.confirmBtn}
                      onPress={() => (
                        Orientation.unlockAllOrientations(),
                        this.setState({isOpen: false}),
                        this.props.navigation.navigate('PdfView', {
                          url: this.state.pdfFile,
                        })
                      )}>
                      <FastImage
                        source={require('../../Images/Horizontal.png')}
                        style={styles.btnImage}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.confirmBtn}
                      onPress={() => (
                        Orientation.unlockAllOrientations(),
                        this.setState({isOpen: false}),
                        this.props.navigation.navigate('PdfView2', {
                          url: this.state.pdfFile,
                        })
                      )}>
                      <FastImage
                        source={require('../../Images/Vertical.png')}
                        style={styles.btnImage}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </TouchableOpacity>
                  </View>
                </FastImage>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </Modal>
        )}
      </FastImage>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, {getPdfFiles})(VideoDetail);
