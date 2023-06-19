import React, {Component} from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  BackHandler,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  AppState,
  Platform,
  Alert,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {
  getExames,
  getStartExamData,
  pauseExams,
  endAllExams,
  saveUserRankPoint,
} from '../../Redux/action';
import Orientation from 'react-native-orientation-locker';
import {styles} from './styles';
import ExamLayout from './PaperLayout';
import BottomLayout from './BottomLayout';
import ViewPager from '@react-native-community/viewpager';
import CountDown from 'react-native-countdown-component';
import NetInfo from '@react-native-community/netinfo';
import ImageExam from './ImageExamsLayout';
import {StackActions, NavigationActions} from 'react-navigation';
import FastImage from 'react-native-fast-image';
import ImageZoom from 'react-native-image-pan-zoom';
import Icon from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import KeepAwake from 'react-native-keep-awake';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import DeviceInfo from 'react-native-device-info';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isEmail: false,
      Test: true,
      currentPage: 0,
      animationsAreEnabled: true,
      width: 0,
      height: 0,
      page: 0,
      appState: AppState.currentState,
      timer: '0',
      netConnected: true,
      pageSelected: 0,
      progressStatus: 0,
      currentImage: '',
      bottomTimer: 0,
      correctOption: '',
      isLoading: false,
    };
    this.getData();
    this.viewPager = React.createRef();
  }
  anim = new Animated.Value(0);

  getData = () => {
    const type = this.props.navigation.getParam('type', 'test');
    const examsID = this.props.navigation.getParam('examsId', '1');
    const isReshedule = this.props.navigation.getParam('isReshedule', 'no');
    const {login} = this.props.user;
    if (type === 'exam') {
      saveUserRankPoint('Yes', 'Yes', 'examine', login.data.id);
    } else if (type === 'reviewExam') {
      saveUserRankPoint('Yes', 'Yes', 'review', login.data.id);
    }
    this.props.getStartExamData(
      examsID,
      login.data.id,
      null,
      null,
      DeviceInfo.isTablet() ? 'yes' : null,
      isReshedule,
    );
    //console.log("My first paramaters are => " + login.data.id)
  };

  changeKeepAwake = shouldBeAwake => {
    if (shouldBeAwake) {
      KeepAwake.activate();
    } else {
      KeepAwake.deactivate();
    }
  };

  _onLayout = e => {
    let width = e.nativeEvent.layout.width;
    let height = e.nativeEvent.layout.height;
    this.setState({
      height: height,
      width: width,
    });
  };
  componentDidMount() {
    NetInfo.fetch().then(({isConnected, isInternetReachable, type}) => {
      // console.log('Is connected?', isConnected);
      this.setState({netConnected: isConnected});
    });
    this.unsubscribeNetInfo = NetInfo.addEventListener(
      ({isConnected, isInternetReachable, type}) => {
        // console.log('Connection type', state.type);
        // console.log('Is connected?', state.isConnected);
        this.setState({netConnected: isConnected});
      },
    );
    //this.onAnimate();
    this.changeKeepAwake(true);
    StatusBar.setHidden(true);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this._handleAppStateChange,
    );
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToLandscape();
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeNetInfo();
    StatusBar.setHidden(false);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.appStateSubscription.remove();
  }
  _handleAppStateChange = nextAppState => {
    this.setState({appState: nextAppState}, () => {
      if (nextAppState === 'background') {
        this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'HomeScreen'})],
          }),
        );
      }
    });
  };
  handleBackButton() {
    //ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }
  move = number => {
    const page = this.state.page + number;
    this.go(page);
  };
  go = number => {
    if (this.state.animationsAreEnabled) {
      /* $FlowFixMe we need to update flow to support React.Ref and createRef() */
      this.viewPager.current.setPage(number);
    } else {
      /* $FlowFixMe we need to update flow to support React.Ref and createRef() */
      this.viewPager.current.setPageWithoutAnimation(number);
    }
  };
  onAnimate = () => {
    const totalTime = this.props.navigation.getParam('totalTime', '1234');
    this.anim.addListener(({value}) => {
      this.setState({progressStatus: parseInt(value, 5)});
    });
    Animated.timing(this.anim, {
      toValue: 100,
      duration: 50000,
      useNativeDriver: false,
    }).start();
  };
  test = () => {
    Orientation.unlockAllOrientations();
  };
  // endMyCurrentExam = async () => {
  //   const {examStartData} = this.props.user;
  //   const isPsico = this.props.navigation.getParam('isPsico', 'false');
  //   const type = this.props.navigation.getParam('type', 'exam');
  //   this.setState({isLoading: true});
  //   const result = await endAllExams(
  //     examStartData.studentExamRecordId,
  //     this.state.timer,
  //     isPsico,
  //     type,
  //   );
  //   this.setState({isLoading: false}, () => {
  //     if (result.status === 'Successfull') {
  //       this.test();
  //       this.props.navigation.navigate('Result', {
  //         data: result,
  //         examID: examStartData.studentExamRecordId,
  //         image: isPsico,
  //         type: type,
  //       });
  //     }
  //   });
  // };

  render() {
    const {examStartData, AuthLoading, login} = this.props.user;
    const totalTime = this.props.navigation.getParam('totalTime', '1234');
    const isPsico = this.props.navigation.getParam('isPsico', 'false');
    const type = this.props.navigation.getParam('type', 'exam');
    const isReshedule = this.props.navigation.getParam('isReshedule', 'no');
    const {correctOption, pageSelected} = this.state;
    const examsID = this.props.navigation.getParam('examsId', '1');
    const isRepasoImage = this.props.navigation.getParam(
      'isRepasoImage',
      false,
    );

    //console.log('My Current Progress => ', examStartData.data);
    return (
      <View
        style={styles.container}
        onLayout={e => {
          this._onLayout(e);
        }}>
        <View style={styles.topView}>
          <View style={styles.playPauseView}>
            <TouchableOpacity
              disabled={examStartData.canPause === 'yes' ? false : true}
              onPress={() => {
                this.state.netConnected
                  ? (this.test(),
                    this.props.pauseExams(
                      examStartData.studentExamRecordId,
                      this.state.timer,
                      login.data.id,
                      login.data.type,
                    ))
                  : Alert.alert(
                      'Connection Failed',
                      'Check your internet connection and try again',
                    );
              }}>
              <FastImage
                source={require('../AudioClass/assets/pause.png')}
                resizeMode={FastImage.resizeMode.stretch}
                style={[
                  styles.btnImage,
                  {
                    opacity: examStartData.canPause === 'yes' ? 1 : 0.5,
                  },
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.state.netConnected
                  ? //Orientation.unlockAllOrientations(),
                    this.props.endAllExams(
                      examStartData.studentExamRecordId,
                      this.state.timer,
                      isPsico,
                      type,
                      isRepasoImage,
                    )
                  : Alert.alert(
                      'Connection Failed',
                      'Check your internet connection and try again',
                    );
              }}>
              <FastImage
                source={require('../../Images/stop.png')}
                resizeMode={FastImage.resizeMode.stretch}
                style={styles.btnImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.getStartExamData(
                  examsID,
                  login.data.id,
                  null,
                  null,
                  DeviceInfo.isTablet() ? 'yes' : null,
                  isReshedule,
                  'True',
                  examStartData.data[pageSelected].id,
                );
              }}>
              <FastImage
                source={require('../../Images/correct1.png')}
                resizeMode={FastImage.resizeMode.stretch}
                style={styles.btnImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timerView}>
            <Text style={styles.timerText}>{'Tiempo '}</Text>
            <CountDown
              until={parseInt(totalTime)}
              //until={1234}
              size={17}
              onFinish={() => {
                this.state.netConnected
                  ? this.props.endAllExams(
                      examStartData.studentExamRecordId,
                      null,
                    )
                  : Alert.alert(
                      'Connection Failed',
                      'Check your internet connection and finish the Exam',
                    );
              }}
              digitStyle={{backgroundColor: '#ffff'}}
              digitTxtStyle={{
                color: '#0a52cb',
                marginBottom: 5,
                fontSize: heightPercentageToDP(3.5),
              }}
              onChange={time =>
                this.setState({
                  timer: time,
                  bottomTimer: this.state.bottomTimer + 1,
                })
              }
              timeToShow={['M', 'S']}
              timeLabels={{m: null, s: null}}
              separatorStyle={{
                marginBottom: 7,
                color: '#000',
                fontSize: heightPercentageToDP(3.5),
              }}
              showSeparator
              running={AuthLoading ? false : true}
            />
          </View>
          <FastImage
            style={styles.logo}
            resizeMode={FastImage.resizeMode.contain}
            source={
              Platform.OS === 'android'
                ? require('../../Images/veoestudio2.png')
                : require('../../Images/ios_logo.png')
            }
          />
        </View>
        <ViewPager
          style={styles.middleView}
          initialPage={0}
          onPageSelected={e =>
            this.setState({pageSelected: e.nativeEvent.position})
          }
          setPage={this.state.currentPage}
          ref={this.viewPager}>
          {!examStartData ? (
            <View />
          ) : isPsico === true ? (
            examStartData.data.map((item, index) => {
              return (
                <ImageExam
                  key={'unique' + index}
                  isAttempt={item.studentAnswered === null ? false : true}
                  isOption1={item.studentAnswered}
                  imgURL={item.image}
                  option1={item.answer1}
                  option2={item.answer2}
                  option3={item.answer3}
                  option4={item.answer4}
                  question={item.question}
                  description={item.description}
                  allowdescription={item.Allowdescription}
                  isCorrect={item.correct}
                  clickHandler1={() => {
                    this.state.netConnected
                      ? this.props.getStartExamData(
                          null,
                          login.data.id,
                          item.id,
                          'answer1',
                          DeviceInfo.isTablet() ? 'yes' : null,
                          isReshedule,
                        )
                      : Alert.alert(
                          'Connection Failed',
                          'Check your internet connection and try again',
                        );
                  }}
                  clickHandler2={() => {
                    this.state.netConnected
                      ? this.props.getStartExamData(
                          null,
                          login.data.id,
                          item.id,
                          'answer2',
                          DeviceInfo.isTablet() ? 'yes' : null,
                          isReshedule,
                        )
                      : Alert.alert(
                          'Connection Failed',
                          'Check your internet connection and try again',
                        );
                  }}
                  clickHandler3={() => {
                    this.state.netConnected
                      ? this.props.getStartExamData(
                          null,
                          login.data.id,
                          item.id,
                          'answer3',
                          DeviceInfo.isTablet() ? 'yes' : null,
                          isReshedule,
                        )
                      : Alert.alert(
                          'Connection Failed',
                          'Check your internet connection and try again',
                        );
                  }}
                  clickHandler4={() => {
                    this.state.netConnected
                      ? this.props.getStartExamData(
                          null,
                          login.data.id,
                          item.id,
                          'answer4',
                          DeviceInfo.isTablet() ? 'yes' : null,
                          isReshedule,
                        )
                      : Alert.alert(
                          'Connection Failed',
                          'Check your internet connection and try again',
                        );
                  }}
                  ModalClick={() => {
                    // this.setState({currentImage: item.image}, () =>
                    //   this.setState({isOpen: true}),
                    // );
                  }}
                />
              );
            })
          ) : type === 'reviewExam' && isRepasoImage ? (
            examStartData.data.map((item, index) => {
              return (
                <ImageExam
                  key={'unique' + index}
                  isAttempt={item.studentAnswered === null ? false : true}
                  isOption1={item.studentAnswered}
                  imgURL={item.image}
                  option1={item.answer1}
                  option2={item.answer2}
                  option3={item.answer3}
                  option4={item.answer4}
                  question={item.question}
                  description={item.description}
                  allowdescription={item.Allowdescription}
                  isCorrect={item.correct}
                  clickHandler1={() => {
                    this.state.netConnected
                      ? this.props.getStartExamData(
                          null,
                          login.data.id,
                          item.id,
                          'answer1',
                          DeviceInfo.isTablet() ? 'yes' : null,
                          isReshedule,
                        )
                      : Alert.alert(
                          'Connection Failed',
                          'Check your internet connection and try again',
                        );
                  }}
                  clickHandler2={() => {
                    this.state.netConnected
                      ? this.props.getStartExamData(
                          null,
                          login.data.id,
                          item.id,
                          'answer2',
                          DeviceInfo.isTablet() ? 'yes' : null,
                          isReshedule,
                        )
                      : Alert.alert(
                          'Connection Failed',
                          'Check your internet connection and try again',
                        );
                  }}
                  clickHandler3={() => {
                    this.state.netConnected
                      ? this.props.getStartExamData(
                          null,
                          login.data.id,
                          item.id,
                          'answer3',
                          DeviceInfo.isTablet() ? 'yes' : null,
                          isReshedule,
                        )
                      : Alert.alert(
                          'Connection Failed',
                          'Check your internet connection and try again',
                        );
                  }}
                  clickHandler4={() => {
                    this.state.netConnected
                      ? this.props.getStartExamData(
                          null,
                          login.data.id,
                          item.id,
                          'answer4',
                          DeviceInfo.isTablet() ? 'yes' : null,
                          isReshedule,
                        )
                      : Alert.alert(
                          'Connection Failed',
                          'Check your internet connection and try again',
                        );
                  }}
                  ModalClick={() => {
                    // this.setState({currentImage: item.image}, () =>
                    //   this.setState({isOpen: true}),
                    // );
                  }}
                />
              );
            })
          ) : (
            examStartData.data.map((item, index) => {
              return (
                <ExamLayout
                  key={'unique' + index}
                  isAttempt={item.studentAnswered === null ? false : true}
                  isOption1={item.studentAnswered}
                  option1={item.answer1}
                  option2={item.answer2}
                  option3={item.answer3}
                  option4={item.answer4}
                  description={item.description}
                  allowdescription={item.Allowdescription}
                  isTablet={this.state.isTable}
                  question={item.question}
                  isCorrect={item.correct}
                  clickHandler1={() => {
                    this.state.netConnected
                      ? this.props.getStartExamData(
                          null,
                          login.data.id,
                          item.id,
                          'answer1',
                          DeviceInfo.isTablet() ? 'yes' : null,
                          isReshedule,
                        )
                      : Alert.alert(
                          'Connection Failed',
                          'Check your internet connection and try again',
                        );
                  }}
                  clickHandler2={() => {
                    this.state.netConnected
                      ? this.props.getStartExamData(
                          null,
                          login.data.id,
                          item.id,
                          'answer2',
                          DeviceInfo.isTablet() ? 'yes' : null,
                          isReshedule,
                        )
                      : Alert.alert(
                          'Connection Failed',
                          'Check your internet connection and try again',
                        );
                  }}
                  clickHandler3={() => {
                    this.state.netConnected
                      ? this.props.getStartExamData(
                          null,
                          login.data.id,
                          item.id,
                          'answer3',
                          DeviceInfo.isTablet() ? 'yes' : null,
                          isReshedule,
                        )
                      : Alert.alert(
                          'Connection Failed',
                          'Check your internet connection and try again',
                        );
                  }}
                  clickHandler4={() => {
                    this.state.netConnected
                      ? this.props.getStartExamData(
                          null,
                          login.data.id,
                          item.id,
                          'answer4',
                          DeviceInfo.isTablet() ? 'yes' : null,
                          isReshedule,
                        )
                      : Alert.alert(
                          'Connection Failed',
                          'Check your internet connection and try again',
                        );
                  }}
                />
              );
            })
          )}
        </ViewPager>
        <View style={styles.bottomView}>
          <ScrollView horizontal contentContainerStyle={{flexGrow: 0}}>
            {!examStartData ? (
              <View />
            ) : (
              examStartData.data.map((item, index) => {
                return (
                  <BottomLayout
                    key={'unique' + index}
                    text={index + 1}
                    isSelected={
                      this.state.pageSelected === index ? true : false
                    }
                    isAttempt={item.studentAnswered}
                    totalItem={examStartData.totalItems}
                    clickHandler={() => this.move(index)}
                  />
                );
              })
            )}
          </ScrollView>
        </View>
        {/* <Animated.View
                    style={[
                        styles.inner, { width: this.state.progressStatus + "%" },
                    ]}
                /> */}
        <View
          style={{
            width: '100%',
            height: '4%',
            //backgroundColor: "green",
            position: 'absolute',
            bottom: '0%',
            //marginTop:heightPercentageToDP(1)
            //left:"1%"
          }}>
          <Slider
            value={this.state.bottomTimer}
            minimumValue={1}
            maximumValue={parseInt(totalTime)}
            disabled={false}
            trackStyle={styles.trackStyle}
            maximumTrackTintColor="#D3D3D3"
            minimumTrackTintColor="#007EBA"
            style={styles.sliderStyle}
            thumbImage={() => null}
            thumbTintColor="transparent"
            thumbStyle={{
              backgroundColor: 'red',
            }}
          />
        </View>

        {AuthLoading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
        {this.props.isLoading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
        {this.state.isOpen && (
          <Modal
            transparent={true}
            visible={this.state.modalVisible}
            supportedOrientations={['portrait', 'landscape']}
            onRequestClose={() => {
              console.log('alert close');
            }}>
            <TouchableOpacity
              style={styles.modalMain}
              activeOpacity={1}
              //onPressOut={() => this.setState({ isOpen: false })}
            >
              <View style={styles.innerModal}>
                <TouchableWithoutFeedback>
                  <View>
                    <TouchableOpacity
                      style={styles.crossBtn}
                      onPress={() => this.setState({isOpen: false})}>
                      <Icon name="close" />
                    </TouchableOpacity>
                    <ImageZoom
                      cropWidth={Dimensions.get('window').width}
                      cropHeight={Dimensions.get('window').height}
                      imageWidth={Dimensions.get('window').width}
                      imageHeight={Dimensions.get('window').height}>
                      <FastImage
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        source={{
                          uri: this.state.currentImage,
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.stretch}
                      />
                    </ImageZoom>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableOpacity>
          </Modal>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  getExames,
  getStartExamData,
  pauseExams,
  endAllExams,
})(Test);
