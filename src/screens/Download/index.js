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
  Platform,
} from 'react-native';
import {getDownload, dispatchFuncOn, dispatchText} from '../../Redux/action';
import {connect} from 'react-redux';
import Header from '../../Component/Header';
import {styles} from './styles';
import Folder from './Folders';
import Files from './Files';
import RNFetchBlob from 'react-native-blob-util';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation-locker';
import FileViewer from 'react-native-file-viewer';

class DownUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    const {login} = this.props.user;
    this.props.getDownload(login.data.type, login.data.id);
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }
    });
  }

  async iosDownload(fileUrl) {
    this.setState({isOpen: true});
    var date = new Date();
    var url = fileUrl;
    var encoded = encodeURI(url);
    var ext = this.extention(url);
    ext = '.' + ext[0];
    let dirs =
      RNFetchBlob.fs.dirs.DCIMDir +
      '/NeoeStudio_' +
      Math.floor(date.getTime() + date.getSeconds() / 2) +
      ext;
    console.log(dirs, 'document path');
    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      fileCache: true,
      path: dirs,
    })
      .fetch('GET', encoded, {
        //some headers ..
      })
      .then(res => {
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        // RNFetchBlob.ios.openDocument(resp.data);
        RNFetchBlob.fs.writeFile(dirs, res.data, 'base64');
        RNFetchBlob.ios.previewDocument(dirs);
        // FileViewer.open(resp.data, {showOpenWithDialog: true});
        this.setState({isOpen: false});
      })
      .catch(error => {
        this.setState({isOpen: false});
        this.props.dispatchText();
        this.props.dispatchFuncOn();
      });
  }
  download(fileUrl) {
    var date = new Date();
    var url = fileUrl;
    var ext = this.extention(url);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let DownloadDir = fs.dirs.DownloadDir;
    this.setState({isOpen: true});
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          DownloadDir +
          '/NeoeStudio_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'NeoeStudio',
      },
    };
    config(options)
      .fetch('GET', url)
      .then(res => {
        //Alert.alert("Success Downloaded");
        this.setState({isOpen: false});
        this.props.dispatchText();
        this.props.dispatchFuncOn();
      });
  }
  extention(filename) {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  }

  requestPermission = async url => {
    try {
      const granted = await PermissionsAndroid.request(
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
        this.download(url);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      //console.warn(err);
    }
  };

  render() {
    const {download, AuthLoading} = this.props.user;
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
          title={'Descargas' + '\n' + 'Subidas'}
        />
        <View style={styles.upDownView}>
          <FastImage
            source={require('./assets/descargas.png')}
            style={styles.download}
            resizeMode={FastImage.resizeMode.stretch}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Upload')}>
            <FastImage
              source={require('../../Images/no_upload.png')}
              style={styles.download}
              resizeMode={FastImage.resizeMode.stretch}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.mainView}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
            showsVerticalScrollIndicator={false}>
            {!download ? (
              <View />
            ) : (
              <View>
                <View>
                  {download.folders.map((item, index) => {
                    return (
                      <Folder
                        key={'unique' + index}
                        text={item.name}
                        isActive={item.isActive}
                        count={item.count}
                        clickHandler={() => (
                          Orientation.unlockAllOrientations(),
                          this.props.navigation.navigate('FolderFiles', {
                            id: item.id,
                          })
                        )}
                      />
                    );
                  })}
                </View>
                <View style={styles.fileView}>
                  {download.files.map((item, index) => {
                    return (
                      <Files
                        key={'unique' + index}
                        text={item.title ? item.title : item.name}
                        isActive={item.isActive}
                        clickHandler={() => {
                          if (Platform.OS === 'android') {
                            this.download(item.file);
                          } else {
                            this.iosDownload(item.file);
                          }
                        }}
                      />
                    );
                  })}
                </View>
              </View>
            )}
          </ScrollView>
        </View>
        {this.state.isOpen && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
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
export default connect(mapStateToProps, {
  getDownload,
  dispatchFuncOn,
  dispatchText,
})(DownUpload);
