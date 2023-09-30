// import React from 'react'
// import { ImageBackground, ScrollView, View, ActivityIndicator } from 'react-native'
// import { connect } from 'react-redux';
// import { styles } from './styles';
// import Header from '../../Component/Header'
// import { getTopics, getPdfFolder } from '../../Redux/action'
// import Directory from '../../Component/Directory';
// import FastImage from 'react-native-fast-image'
// import Orientation from 'react-native-orientation-locker';
// import { NavigationEvents } from 'react-navigation';

// class AudioClass extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             directoryName: []
//         };
//         this.getAllTopics();
//     }

//     getAllTopics = () => {
//         const { login } = this.props.user;
//         this.props.getTopics(
//             login.data.type,
//             login.data.id,
//             "pdf"
//         )
//     }
//     UNSAFE_componentWillMount() {
//         var initial = Orientation.getInitialOrientation();
//         if (initial === 'LANDSCAPE') {
//             Orientation.lockToPortrait()
//             console.log("hii")
//             //do stuff
//         }
//     }
//     _onOrientationDidChange = (orientation) => {
//         if (orientation == 'LANDSCAPE') {
//             Orientation.lockToPortrait();
//         }
//     };

//     componentDidMount() {
//         Orientation.lockToPortrait()
//         Orientation.addOrientationListener(this._onOrientationDidChange);
//     }

//     componentWillUnmount() {
//         Orientation.removeOrientationListener(this._onOrientationDidChange);
//     }

//     render() {
//         const { topics, AuthLoading } = this.props.user
//         //console.log("audio",topics)
//         return (
//             <FastImage
//                 source={require('../../Images/bg.png')}
//                 style={styles.container}
//                 resizeMode={FastImage.resizeMode.stretch}
//             >
//                 <NavigationEvents onDidFocus={() => this.getAllTopics()} />
//                 <FastImage
//                     style={styles.logo}
//                     source={require('../../Images/veoestudio.png')}
//                     resizeMode={FastImage.resizeMode.contain}
//                 />
//                 <Header
//                     iconName='left'
//                     leftClick={() => this.props.navigation.goBack()}
//                     title='Temario'
//                 />
//                 <View style={styles.directoryView}>
//                     <ScrollView
//                         contentContainerStyle={{ flexGrow: 1 }}
//                         showsVerticalScrollIndicator={false}
//                     >
//                         {!topics ?
//                             <View />
//                             : topics.data.map((item, index) => {
//                                 return (
//                                     <Directory
//                                         key={"unique" + index}
//                                         img={require('../../Images/directory.png')}
//                                         title={item.name}
//                                         status="Habilitado"
//                                         isActive={item.isActive}
//                                         count={item.count}
//                                         clickHandler={() => {
//                                             this.props.navigation.navigate('PdfDetail', {
//                                                 position: item.id,
//                                                 name: item.name
//                                             })
//                                         }}
//                                     />
//                                 )
//                             })}
//                     </ScrollView>
//                 </View>
//                 {AuthLoading &&
//                     <ActivityIndicator
//                         size="large"
//                         color="#000"
//                         style={styles.loading}
//                     />
//                 }
//             </FastImage>
//         )
//     }
// }

// const mapStateToProps = state => ({
//     user: state.user,
// });
// export default connect(mapStateToProps, { getTopics , getPdfFolder })(AudioClass);
import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  PermissionsAndroid,
  Alert,
  Text,
  TouchableWithoutFeedback,
  Modal,
  Platform,
} from 'react-native';
import {getPdfFolder} from '../../Redux/action';
import {connect} from 'react-redux';
import Header from '../../Component/Header';
import {styles} from './styles';
import Folder from '../Download/Folders';
import Files from '../Download/Files';
//import RNFetchBlob from 'react-native-blob-util';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import Orientation from 'react-native-orientation-locker';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';

class PDFFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      pdfFile: '',
    };
    const {login} = this.props.user;
    this.props.getPdfFolder(login.data.type, login.data.id);
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }else{
        Orientation.lockToPortrait();
      }
    });
  }

  render() {
    const {AuthLoading, pdfFolders} = this.props.user;
    console.log('---->', pdfFolders);
    return (
      <FastImage
        source={require('../../Images/bg.png')}
        resizeMode={FastImage.resizeMode.stretch}
        style={styles.container}>
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
          title={'Temario'}
        />
        <View style={styles.mainView}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
            showsVerticalScrollIndicator={false}>
            {!pdfFolders ? (
              <View />
            ) : (
              <View>
                <View>
                  {pdfFolders.folders.map((item, index) => {
                    return (
                      <Folder
                        key={'unique' + index}
                        text={item.name}
                        isActive={item.isActive}
                        count={item.count}
                        clickHandler={() => (
                          Orientation.unlockAllOrientations(),
                          this.props.navigation.navigate('PdfDetail', {
                            position: item.id,
                            name: item.name,
                          })
                        )}
                      />
                    );
                  })}
                </View>
                <View style={styles.fileView}>
                  {pdfFolders.files.map((item, index) => {
                    return (
                      <Files
                        key={'unique' + index}
                        text={item.title}
                        isActive={item.isActive}
                        clickHandler={() =>
                          this.setState({isOpen: true, pdfFile: item.file})
                        }
                      />
                    );
                  })}
                </View>
              </View>
            )}
          </ScrollView>
        </View>
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
export default connect(mapStateToProps, {
  getPdfFolder,
})(PDFFolder);
