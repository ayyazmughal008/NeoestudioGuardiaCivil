import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Text,
  Alert,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {getUploadFolder, uploadFiles} from '../../Redux/action';
import Header from '../../Component/Header';
import {styles} from './styles';
import UploadComponent from './UploadFile';
import DocumentPicker from 'react-native-document-picker';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation-locker';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUri: '',
      fileType: '',
      folderID: '',
      fileName: '',
    };
    const {login} = this.props.user;
    this.props.getUploadFolder(login.data.type, login.data.id);
  }

  filePicker = async folderId => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(
        res.uri,
        '\n',
        res.type, // mime type
        // res.name,
        //   res.size
      );
      this.setState({
        fileUri: res.uri,
        fileType: res.type,
        folderID: folderId,
        fileName: res.name,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
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
    const {uploadFolder, login, AuthLoading} = this.props.user;
    var fileData = {
      type: this.state.fileType,
      name: Date.now() + this.state.fileName,
      uri: this.state.fileUri,
    };
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
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <FastImage
              source={require('../../Images/no_download.png')}
              style={styles.download}
              resizeMode={FastImage.resizeMode.stretch}
            />
          </TouchableOpacity>
          <FastImage
            source={require('../Download/assets/subidas.png')}
            style={styles.download}
            resizeMode={FastImage.resizeMode.stretch}
          />
        </View>
        <View style={styles.mainView}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
            }}
            showsVerticalScrollIndicator={false}>
            {!uploadFolder ? (
              <View />
            ) : (
              uploadFolder.data.map((item, index) => {
                return (
                  <UploadComponent
                    key={'unique' + index}
                    text={item.name}
                    status={item.status}
                    isActive={item.isActive}
                    //textUri = {index,this.state.fileUri}
                    clickHandler={() => this.filePicker(item.id)}
                  />
                );
              })
            )}
          </ScrollView>
          <TouchableOpacity
            style={styles.subBtn}
            onPress={() => {
              !this.state.fileUri
                ? Alert.alert('Por favor elige el archivo')
                : this.props.uploadFiles(
                    this.state.folderID,
                    login.data.id,
                    login.data.type,
                    fileData,
                  );
            }}>
            <FastImage
              source={require('../../Images/Enviar.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.submitBtn}></FastImage>
          </TouchableOpacity>
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
export default connect(mapStateToProps, {getUploadFolder, uploadFiles})(Upload);
