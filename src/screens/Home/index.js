import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Modal,
  Text,
  Linking,
  TouchableOpacity,
  Alert,
  TextInput,
  Platform,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {
  getEmailSubscription,
  logout,
  getExames,
  clearStates,
  getAllChats,
  getReviewRanking,
  getCurrentUser,
  logoutFromSystem,
  saveUserToken,
  getUserVideos,
  storeGalleryImage,
  storeAvatarImage,
  updateRank,
  saveUserRankPoint,
  updateUserRankPoint,
  updateUserProfile,
  updateUserFeedback,
  updateLoginTime,
  resetAllExams,
  checkPackageExpired,
} from '../../Redux/action';
import {styles} from './styles';
import HomeMenu from './HomeMenu';
import {data} from './data';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/dist/Feather';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Ranking from '../../Component/Ranking';
import {NavigationEvents} from 'react-navigation';
import {version, iosVerion} from '../../../package.json';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Component/MakeMeResponsive';
import RNRestart from 'react-native-restart';
import {showHUD, hideHUD} from '../../Component/Loader';
import VersionPop from '../../Component/VerPopUp';
import AvatarBox from './Avatar';
import ImagePicker from 'react-native-image-crop-picker';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Stars from './stars';
import ModalBox from '../../Component/Modal';
import {fonts} from '../../utils';
import IAP, {purchaseErrorListener} from 'react-native-iap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isEmail: false,
      Test: true,
      width: 0,
      height: 0,
      modalVisible: '',
      popUp: false,
      isLoading: false,
      verSionPopUp: false,
      avatarPopUp: false,
      selectImage: false,
      isFcous: false,
      rating: 0,
      count: 1,
      userFeeback: '',
      isConfirm: false,
    };
    //androidVersion
  }

  test = () => {
    Orientation.unlockAllOrientations();
  };
  refreshAppData = async () => {
    const {login, token} = this.props.user;
    if (login.data.IsBlocked === 'False' || !login?.data?.IsBlocked) {
      if (Platform.OS === 'ios') {
        this.fetchReceipt();
      }
      this.props.clearStates(),
        await Promise.all([
          updateRank(login.data.id),
          this.props.updateLoginTime(login.data.id),
          this.props.updateUserProfile(login.data.id),
          this.props.saveUserToken(login.data.id, token),
          this.props.getCurrentUser(login.data.id, login.data.type),
          saveUserRankPoint('Yes', 'No', 'normal_points', login.data.id),
        ]);
    } else {
      this.props.logout();
    }
  };
  handleModalOpen = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };
  // _onOrientationDidChange = orientation => {
  //   if (orientation == 'LANDSCAPE') {
  //     Orientation.lockToPortrait();
  //   }
  // };
  // componentWillUnmount() {
  //   // this.focusListener.remove();
  //   Orientation.removeOrientationListener(this._onOrientationDidChange);
  // }
  UNSAFE_componentWillMount() {
    const {login} = this.props.user;
    this.setState({
      isOpen: login.data.emailSubscription === null ? true : false,
    });
    if(Platform.OS === 'android'){
      if (login.data.androidVersion !== version) {
        this.setState({verSionPopUp: true});
      }
    }else {
      if (login.data.iosVersion !== iosVerion) {
        this.setState({verSionPopUp: true});
      }
    }
  }
  componentDidMount() {
    const {navigation} = this.props;
    const {login} = this.props.user;
    if (Platform.OS === 'ios') {
      IAP.initConnection()
        .catch(error => {
          console.log(error);
        })
        .then(() => {
          console.log('connecting to store ...');
          IAP.getPurchaseHistory()
            .then(res => {
              const receipt = res[res.length - 1].transactionReceipt;
              if (receipt) {
                this.validate(receipt);
                //console.log(res)
              }
            })
            .catch(error => {
              console.log('iap error', error);
            });
        });
    }
    this.focusListener = navigation.addListener('didFocus', () => {
      const locked = Orientation.isLocked();
      console.log('is screen locked ?', locked);
      if (!locked) {
        Orientation.lockToPortrait();
      } else {
        Orientation.lockToPortrait();
      }
      this.setState({count: this.state.count + 1}, () => {
        if (this.state.count == 3) {
          //this.setState({ isFcous: true })
          if (!login.is_feedback || login.is_feedback === 'No') {
            this.setState({isFcous: true});
          } else {
          }
        } else {
        }
      });
    });
  }
  fetchReceipt = () => {
    IAP.initConnection()
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        console.log('connecting to store ...');
        IAP.getPurchaseHistory()
          .then(res => {
            const receipt = res[res.length - 1].transactionReceipt;
            if (receipt) {
              this.validate(receipt);
              //console.log(receipt)
            }
          })
          .catch(() => {});
      });
  };
  validate = async receipt => {
    const {login} = this.props.user;
    this.setState({isLoading: true});
    await checkPackageExpired(
      receipt,
      '70f6c4d6a650424c9636968b5fbc6b3a',
      true,
      false,
      login.data.id,
    );
    await this.setState({isLoading: false});
  };

  async openLink() {
    const {login} = this.props.user;
    try {
      const url = 'https://neoestudio.net/main/';
      //const url = 'https://neoestudioguardiaciviloposiciones.es/payment/16/nul'
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Propertiesnt/
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#99adbc',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'overFullScreen',
          modalTransitionStyle: 'partialCurl',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#2c3f4f',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        // this.props.navigation.dispatch(
        //     StackActions.reset({
        //         index: 0,
        //         actions: [NavigationActions.navigate({ routeName: "HomeScreen" })]
        //     })
        // )
      } else Linking.openURL(url);
    } catch (error) {
      Alert.alert(error.message);
    }
  }
  navigationHandler = index => {
    const {login, AuthLoading, activityId} = this.props.user;
    switch (index) {
      case 0:
        return AuthLoading ? false : null;
      case 1:
        return AuthLoading
          ? false
          : !login.package
          ? !activityId
            ? (this.test(), this.props.navigation.navigate('Actividad'))
            : (this.test(), this.props.navigation.navigate('Activity'))
          : login.data.type === 'Alumno' && login.package.course === 'Gold'
          ? this.setState({popUp: true})
          : !activityId
          ? (this.test(), this.props.navigation.navigate('Actividad'))
          : (this.test(), this.props.navigation.navigate('Activity'));
      case 2:
        return AuthLoading ? false : (this.test(), this.fetchVideoData());
      //this.props.navigation.navigate('TikTok')
      case 3:
        //return this.handleClick();
        return AuthLoading
          ? false
          : //: crashlytics().crash();
            (this.test(), this.props.navigation.navigate('Objectives'));
      case 4:
        return AuthLoading
          ? false
          : //: this.props.navigation.navigate('Calender')
            (this.test(), this.props.navigation.navigate('News'));
      case 5:
        return AuthLoading
          ? false
          : (this.test(), this.props.navigation.navigate('Calender'));
      case 6:
        return (
          AuthLoading
            ? false
            : //: this.props.getExames(login.data.id, true, login.data.type)
              this.test(),
          updateUserRankPoint('Yes', 'No', 'normal_points', login.data.id),
          this.props.navigation.navigate('ExamFile', {
            isRefresh: 'false',
          })
        );
      case 7:
        return AuthLoading
          ? false
          : !login.package
          ? (this.test(), this.props.navigation.navigate('PDF'))
          : login.data.type === 'Alumno' && login.package.course === 'Silver'
          ? this.setState({popUp: true})
          : //this.props.navigation.navigate('PDF')
            (this.test(), this.props.navigation.navigate('PDF'));
      case 8:
        return AuthLoading
          ? false
          : !login.package
          ? (this.test(), this.props.navigation.navigate('AudioClass'))
          : login.data.type === 'Alumno' && login.package.course === 'Silver'
          ? this.setState({popUp: true})
          : (this.test(), this.props.navigation.navigate('AudioClass'));

      case 9:
        return AuthLoading
          ? false
          : !login.package
          ? (this.test(), this.props.navigation.navigate('VideoClass'))
          : login.data.type === 'Alumno' && login.package.course === 'Silver'
          ? this.setState({popUp: true})
          : (this.test(), this.props.navigation.navigate('VideoClass'));
      case 10:
        return AuthLoading
          ? false
          : !login.package
          ? (this.test(), this.props.navigation.navigate('Clases'))
          : login.data.type === 'Alumno' && login.package.course === 'Gold'
          ? this.setState({popUp: true})
          : (this.test(), this.props.navigation.navigate('Clases'));
      case 11:
        return AuthLoading ? false : null;
      case 12:
        return AuthLoading
          ? false
          : //: null
            (this.test(), this.props.navigation.navigate('ActiveBattle'));
      case 13:
        return AuthLoading
          ? false
          : !login.package
          ? (this.test(), this.props.navigation.navigate('FAQ'))
          : login.data.type === 'Alumno' && login.package.course === 'Silver'
          ? this.setState({popUp: true})
          : (this.test(), this.props.navigation.navigate('FAQ'));
      case 14:
        return AuthLoading
          ? false
          : (this.test(), this.props.navigation.navigate('GlobalRanking'));
      case 15:
        return (
          AuthLoading ? false : this.test(),
          updateUserRankPoint('Yes', 'No', 'normal_points', login.data.id),
          this.props.navigation.navigate('ReviewTest')
        );
      case 16:
        return AuthLoading
          ? false
          : (this.test(), this.props.navigation.navigate('Personality'));
      case 17:
        return AuthLoading
          ? false
          : !login.package
          ? (this.test(), this.props.getAllChats(true, login.data.id))
          : login.data.type === 'Alumno' && login.package.course === 'Gold'
          ? this.setState({popUp: true})
          : (this.test(), this.props.getAllChats(true, login.data.id));
      case 18:
        return AuthLoading
          ? false
          : (this.test(), this.props.navigation.navigate('DownUpload'));
      case 19:
        return AuthLoading
          ? false
          : (this.test(), this.props.navigation.navigate('Survey'));
      case 20:
        return AuthLoading ? false : null;
      case 21:
        return AuthLoading
          ? false
          : Platform.OS === 'android'
          ? this.openLink()
          : this.props.navigation.navigate('Payment');
      case 22:
        return AuthLoading ? false : (this.test(), this.logoutApi());
    }
  };
  _onLayout = e => {
    console.log('************', e.nativeEvent.layout.height);
    let width = e.nativeEvent.layout.width;
    let height = e.nativeEvent.layout.height;
    this.setState({
      height: height,
      width: width,
    });
  };
  logoutApi = async () => {
    // const { login } = this.props.user
    this.setState({isLoading: true});
    // await logoutFromSystem(login.data.id)
    // await this.setState({ isLoading: false })
    // this.props.logout()
    // this.props.navigation.navigate('Login')
    setTimeout(() => {
      this.setState({isLoading: false}, () => {
        this.props.logout();
      });
    }, 15000);
  };
  fetchVideoData = async () => {
    const {login} = this.props.user;
    this.setState({isLoading: true});
    await getUserVideos('Alumno');
    await this.setState({isLoading: false});
  };
  _onGallery = type => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        this.setState({avatarPopUp: false});
        let data = '';
        data = {
          uri: image.path,
          type: image.mime,
          name: Date.now() + '_Wine.png',
        };
        this._handlePostImage(type, data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  _handlePostImage = async (type, image) => {
    const {login} = this.props.user;
    if (type === 'gallery') {
      this.setState({isLoading: true});
      await storeGalleryImage(login.data.id, image);
      await this.setState({isLoading: false}, () => {
        this.props.getCurrentUser(login.data.id, login.data.type);
      });
    } else {
      this.setState({isLoading: true});
      await storeAvatarImage(login.data.id, image);
      await this.setState({isLoading: false}, () => {
        this.props.getCurrentUser(login.data.id, login.data.type);
      });
    }
  };
  _onChangeTime = () => {
    const {login} = this.props.user;
    let toDate = '';
    let fromDate = '';
    let diff = '';
    //
    let hours = '';
    let minutes = '';
    let seconds = '';
    var d;
    if (login.data.expiry_date) {
      toDate = moment().format('YYYY-MM-DD hh:mm:ss');
      fromDate = moment(login.data.expiry_date);
      diff = moment.duration(moment(fromDate).diff(moment(toDate)));
      hours = parseInt(diff.asHours());
      minutes = parseInt(diff.minutes());
      seconds = parseInt(diff.seconds());
      d = hours * 60 * 60 + minutes * 60 + seconds;
      return d;
    }
  };
  feedbackApi = async () => {
    const {login} = this.props.user;
    this.setState({isLoading: true});
    await updateUserFeedback(
      login.data.id,
      this.state.rating,
      this.state.userFeeback,
    );
    await this.setState({isFcous: false});
    await this.setState({isLoading: false});
  };
  toggleBox = () => {
    this.setState({isConfirm: !this.state.isConfirm});
  };

  render() {
    const {
      login,
      AuthLoading,
      newsCount,
      chatCount,
      reviewRanking,
      allNotifications,
      RV_Images,
    } = this.props.user;
    const {verSionPopUp, avatarPopUp, selectImage, isFcous, rating, isConfirm} =
      this.state;
    //console.log('====>', moment.parseZone(login.data.expiry_date).utcOffset())
    return (
      <FastImage
        style={styles.bg}
        source={require('./assets/Fondo_1.png')}
        resizeMode={FastImage.resizeMode.stretch}
        onLayout={e => {
          this._onLayout(e);
        }}>
        <NavigationEvents onDidFocus={() => this.refreshAppData()} />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
          }}
          bouncesZoom={false}
          bounces={false}>
          <View style={styles.headerView}>
            <TouchableOpacity
              onPress={() => this.setState({modalVisible: 'modalVisible'})}
              style={styles.menu}>
              <Icon name="menu" color="#000" size={30} />
            </TouchableOpacity>
            <FastImage
              source={
                Platform.OS === 'android'
                  ? require('../../Images/veoestudio.png')
                  : require('../../Images/ios_logo.png')
              }
              style={styles.logo}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          {!login.data.expiry_date ? (
            <View />
          ) : (
            <View style={styles.timerView}>
              <Text style={styles.preubaText}>{'Prueba'}</Text>
              <CountDown
                until={this._onChangeTime()}
                size={17}
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: widthPercentageToDP(1),
                }}
                digitStyle={{
                  backgroundColor: 'transparent',
                  marginLeft: widthPercentageToDP(-2),
                }}
                digitTxtStyle={{
                  color: '#cc0000',
                  marginBottom: 5,
                  fontSize: heightPercentageToDP(2.5),
                  fontFamily: fonts.novaBold,
                  fontWeight: 'normal',
                }}
                timeToShow={['H', 'M', 'S']}
                timeLabels={{m: null, s: null}}
                separatorStyle={{
                  marginBottom: 7,
                  color: '#cc0000',
                  fontSize: heightPercentageToDP(2.5),
                  fontFamily: fonts.novaBold,
                  fontWeight: 'normal',
                  marginLeft: widthPercentageToDP(-2),
                }}
                showSeparator
                running={true}
              />
            </View>
          )}
          <View style={styles.menuView}>
            {data.map((item, index) => {
              return (
                <HomeMenu
                  key={'unique' + index}
                  img={item.image}
                  text={item.text}
                  status={item.status}
                  isChat={item.isChat}
                  isShow={item.isShow}
                  myIndex={index}
                  avatarClick={() => {
                    this.setState({avatarPopUp: true});
                  }}
                  // myStyle={{
                  //   width: index == 0 ? widthPercentageToDP(25) : widthPercentageToDP(33),
                  //   height: index == 0 ? widthPercentageToDP(25) : widthPercentageToDP(30),
                  //   marginLeft: index == 0 ? widthPercentageToDP(5) : 0
                  // }}
                  profileAction={() => {
                    this.props.navigation.navigate('Profile');
                  }}
                  username={login.data.userName}
                  experience={parseFloat(login?.time).toFixed(2)}
                  aptos={login.data.aptos}
                  puntos={login.data.points}
                  percentage={login.data.percentage}
                  userPhoto={login.data.photo}
                  rankPhoto={login.data.rank_image}
                  rankName={login.data.rank_name}
                  newItems={item.newItems}
                  newsCount={!newsCount ? 0 : newsCount.data}
                  chatCount={!chatCount ? 0 : chatCount.count}
                  isNewItem={
                    !allNotifications
                      ? false
                      : allNotifications.data[index].isActive
                  }
                  allAppCount={
                    !allNotifications
                      ? false
                      : allNotifications.data[index].count
                  }
                  clickHandler={() => this.navigationHandler(index)}
                />
              );
            })}
          </View>
        </ScrollView>
        {AuthLoading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}

        {this.state.isOpen && (
          <Modal
            transparent={true}
            visible={this.state.isOpen}
            onRequestClose={() => {
              console.log('alert close');
            }}>
            <View style={styles.modalMain2}>
              <FastImage
                source={require('./assets/email_box.png')}
                resizeMode={FastImage.resizeMode.stretch}
                style={styles.quesBox}
                //onLoadStart = {false ? console.log("Not load") : console.log("Load") }
                //onLoad = {(res)=> console.log(res)}
              >
                <View style={styles.textView}>
                  <Text style={styles.text2}>
                    {
                      'Hola, para poder ofrecerle contenido promocional y acceso a la versión gratuita de Neoestudio necesitamos emplear los datos que ha facilitado. ¿Está de acuerdo?'
                    }
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={() => {
                    this.setState({isOpen: false}, () => {
                      this.props.getEmailSubscription(login.data.id, 'true');
                    });
                  }}>
                  <FastImage
                    source={require('../../Images/Confirmar.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.confirmStyle}></FastImage>
                </TouchableOpacity>
              </FastImage>
            </View>
          </Modal>
        )}
        {this.state.popUp && (
          <Modal
            transparent={true}
            visible={this.state.popUp}
            onRequestClose={() => {
              console.log('alert close');
            }}>
            <View style={styles.modalMain2}>
              <FastImage
                source={require('./assets/email_box.png')}
                resizeMode={FastImage.resizeMode.stretch}
                style={styles.quesBox}
                //onLoadStart = {false ? console.log("Not load") : console.log("Load") }
                //onLoad = {(res)=> console.log(res)}
              >
                <View style={styles.textView}>
                  <Text style={styles.text2}>
                    {
                      'Este módulo no está habilitado en la modalidad que te has suscrito. Si quieres tener acceso tienes que mejorar tu suscripción iniciando sesión en nuestra página web.'
                    }
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={() => {
                    this.setState({popUp: false});
                  }}>
                  <FastImage
                    source={require('../../Images/Confirmar.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.confirmStyle}
                  />
                </TouchableOpacity>
              </FastImage>
            </View>
          </Modal>
        )}
        <Modal
          transparent={true}
          visible={this.state.modalVisible === 'modalVisible'}
          onRequestClose={() => {
            console.log('alert close');
          }}>
          <View style={styles.modalMain}>
            <View style={styles.innerModal2}>
              <FastImage
                source={require('../../Images/navigationSlider.png')}
                resizeMode={FastImage.resizeMode.stretch}
                style={styles.navigation}>
                <View style={styles.topModal}>
                  <Text style={styles.topTitle}>
                    {!reviewRanking.username
                      ? login.data.email
                      : reviewRanking.username}
                  </Text>
                  <View style={styles.navigationHeader}>
                    <TouchableOpacity
                      //style = {styles.}
                      onPress={() => {
                        this.setState({modalVisible: 'isConfirm'});
                      }}>
                      <FastImage
                        style={styles.loaderStyle}
                        resizeMode={FastImage.resizeMode.contain}
                        source={require('../../Images/loader.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      //style = {styles.}
                      onPress={() => this.setState({modalVisible: ''})}>
                      <Icon2 name="close" color="#ffff" size={30} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.modalTitle}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                    }}>
                    <View style={styles.modalTileView}>
                      <Text style={styles.ModalTitleText}>{'Usuario:'}</Text>
                      <Text style={styles.ModalTitleText}>{'Baremo:'}</Text>
                      <Text style={styles.ModalTitleText}>
                        {'Nº alumnos ranking:'}
                      </Text>
                    </View>
                    <View style={styles.modalTitleDetail}>
                      <Text style={styles.ModalTitleText3}>
                        {login.data.studentCode}
                      </Text>
                      <Text style={styles.ModalTitleText3}>
                        {login.data.baremo}
                      </Text>
                      <Text style={styles.ModalTitleText3}>
                        {reviewRanking.numberOfStudents}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.mainModalVie}>
                  <ScrollView
                    contentContainerStyle={{flexGrow: 1, marginTop: 6}}>
                    {!reviewRanking ? (
                      <View />
                    ) : (
                      reviewRanking.data.courses.map((item, index) => {
                        return (
                          <Ranking
                            key={'unique' + index}
                            subject={item.rankName}
                            //subject={"Rank. Tema 1 - Derecho penal con baremo"}
                            getPoints={item.points}
                            //totalPoints={item.totalPoints}
                            minLength={
                              item.percentage === null
                                ? 'null'
                                : Math.round(item.percentage) > 100
                                ? 100
                                : Math.round(item.percentage)
                            }
                            maxLength={
                              item.percentage === null
                                ? 100
                                : 100 - Math.round(item.percentage)
                            }
                            obtainPercentage={
                              item.percentage === null
                                ? 'null'
                                : Math.round(item.percentage)
                            }
                            drawer={true}
                            isHome={true}
                          />
                        );
                      })
                    )}
                    <Text style={styles.versionText}>
                      {'versión: '}
                      {version}
                    </Text>
                    {/* <View style={styles.jump} /> */}
                  </ScrollView>
                </View>
              </FastImage>
            </View>
          </View>
          {AuthLoading && (
            <ActivityIndicator
              size="large"
              color="#000"
              style={styles.loading}
            />
          )}
        </Modal>
        {this.state.isLoading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
        {verSionPopUp && (
          <VersionPop
            isDialogOpen={verSionPopUp}
            closeBox={() => this.setState({verSionPopUp: false})}
            cancelClick={() => {
              if (Platform.OS === 'android') {
                this.setState({verSionPopUp: false}),
                  Linking.openURL(
                    'https://play.google.com/store/apps/details?id=com.neostudio',
                  );
              } else {
                this.setState({verSionPopUp: false}),
                  Linking.openURL(
                    'https://apps.apple.com/us/app/neoestudio-guardia-civil-2023/id1531939360',
                  );
              }
            }}
            okClick={() => {
              this.setState({verSionPopUp: false});
            }}
          />
        )}
        {avatarPopUp && (
          <AvatarBox
            isDialogOpen={avatarPopUp}
            galleryClick={() => {
              this._onGallery('gallery');
              //this.setState({avatarPopUp: false});
            }}
            preClick={() => {
              this.setState({avatarPopUp: false}, () => {
                this.setState({selectImage: true});
              });
            }}
            closeBox={() => {
              this.setState({avatarPopUp: false});
            }}
          />
        )}
        {selectImage && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={selectImage}
            onRequestClose={() => {
              console.log('alert close');
            }}>
            <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
              <View
                style={{
                  height: heightPercentageToDP(3.5),
                  marginTop:
                    Platform.OS === 'android' ? 0 : heightPercentageToDP(5),
                }}
              />
              <Text
                style={[
                  styles.text2,
                  {
                    textAlign: 'center',
                    width: '100%',
                  },
                ]}>
                {'Seleccione la imagen de las siguientes'}
              </Text>
              {!RV_Images || !RV_Images.avatar.length ? (
                <View />
              ) : (
                <FlatList
                  data={RV_Images.avatar}
                  keyExtractor={(item, index) => 'unique' + index}
                  style={{marginTop: heightPercentageToDP(2)}}
                  numColumns={2}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#ffff',
                          borderRadius: widthPercentageToDP(4),
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: widthPercentageToDP(48),
                          height: widthPercentageToDP(48),
                          margin: widthPercentageToDP(1),
                          shadowColor: '#999',
                          shadowOffset: {width: 0, height: 1},
                          shadowOpacity: 2,
                          shadowRadius: 2,
                          elevation: 5,
                        }}
                        onPress={() =>
                          this.setState({selectImage: false}, () => {
                            this._handlePostImage(
                              'avatar',
                              'https://neoestudio.net/' + item.material,
                            );
                          })
                        }>
                        <FastImage
                          style={{
                            width: widthPercentageToDP(48),
                            height: heightPercentageToDP(20),

                            //backgroundColor:"red"
                          }}
                          source={{
                            uri: 'https://neoestudio.net/' + item.material,
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              )}
            </View>
          </Modal>
        )}
        {isFcous && (
          <Modal
            transparent={true}
            visible={isFcous}
            animationType="fade"
            onRequestClose={() => {
              console.log('alert close');
            }}>
            <View style={myStyles.modalMain2}>
              <View
                style={[
                  myStyles.quesBox,
                  {
                    height:
                      rating == 0 || rating == 5
                        ? heightPercentageToDP(25)
                        : heightPercentageToDP(45),
                  },
                ]}>
                <View style={myStyles.toptile}>
                  <Text style={myStyles.toptext}>
                    {'¿Te ha gustado la aplicación?'}
                  </Text>
                </View>

                <Stars
                  value={rating}
                  clickHandler1={() => {
                    this.setState({rating: 1});
                  }}
                  clickHandler2={() => {
                    this.setState({rating: 2});
                  }}
                  clickHandler3={() => {
                    this.setState({rating: 3});
                  }}
                  clickHandler4={() => {
                    this.setState({rating: 4});
                  }}
                  clickHandler5={() => {
                    this.setState({rating: 5});
                  }}
                />

                {rating !== 5 && rating !== 0 && (
                  <TextInput
                    placeholder="Ayúdanos  escribiendo aquí lo que podríamos mejorar."
                    placeholderTextColor="#000000"
                    multiline={true}
                    style={myStyles.input}
                    onChangeText={text => this.setState({userFeeback: text})}
                  />
                )}
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#006176', '#00a7cb']}
                  style={myStyles.bottomView}>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.rating == 5) {
                        updateUserFeedback(
                          login.data.id,
                          this.state.rating,
                          this.state.userFeeback,
                        );
                        this.setState({isFcous: false}, () => {
                          Linking.openURL(
                            'https://play.google.com/store/apps/details?id=com.neostudio&reviewId=0',
                          );
                        });
                      } else {
                        this.feedbackApi();
                      }
                    }}>
                    <Text style={myStyles.btnTxt}>{'Enviar'}</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </Modal>
        )}
        <ModalBox
          myText={'¿Deseas resetear todos los exámenes de la aplicación?'}
          isOpen={this.state.modalVisible === 'isConfirm'}
          closeBox={() => this.setState({modalVisible: ''})}
          yesClick={() => {
            this.setState({modalVisible: ''});
            this.props.resetAllExams(login.data.id);
          }}
          noClick={() => {
            this.setState({modalVisible: ''});
            this.toggleBox();
          }}
        />
      </FastImage>
    );
  }
}

const myStyles = StyleSheet.create({
  modalMain2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  quesBox: {
    width: widthPercentageToDP(90),
    //flex: 0,
    borderRadius: widthPercentageToDP(3),
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
    borderRadius: widthPercentageToDP(5),
    shadowColor: '#000000',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
  },
  toptile: {
    width: '100%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: widthPercentageToDP(0.1),
    borderBottomColor: '#000',
  },
  toptext: {
    color: '#000',
    fontSize: widthPercentageToDP(4.5),
    fontFamily: fonts.novaBold,
    ///paddingLeft: widthPercentageToDP(3),
    marginTop: heightPercentageToDP(1),
    textAlign: 'center',
  },
  bottomView: {
    width: '100%',
    height: heightPercentageToDP(8),
    position: 'absolute',
    bottom: '0%',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: lightBlue,
    borderBottomLeftRadius: widthPercentageToDP(5),
    borderBottomRightRadius: widthPercentageToDP(5),
  },
  input: {
    textAlignVertical: 'top',
    padding: widthPercentageToDP(3),
    borderWidth: widthPercentageToDP(0.1),
    borderColor: '#000',
    marginTop: heightPercentageToDP(1),
    width: '90%',
    height: heightPercentageToDP(12),
    borderRadius: widthPercentageToDP(4),
    fontSize: widthPercentageToDP(5),
    color: '#000',
    fontFamily: fonts.novaBold,
  },
  btnTxt: {
    color: '#ffffff',
    fontSize: widthPercentageToDP(6),
    fontFamily: fonts.novaBold,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  getEmailSubscription,
  logout,
  getExames,
  clearStates,
  getAllChats,
  getReviewRanking,
  getCurrentUser,
  saveUserToken,
  updateUserProfile,
  updateLoginTime,
  resetAllExams,
})(Home);
