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
  getHighSccore,
  joinMyBattle,
  leaveCurrentBattle,
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
import Sound from 'react-native-sound';
// import { Player } from '@react-native-community/audio-toolkit';

let sound1, sound2, sound3;
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
      highRank: [],
      testObject: '',
      timeInterval: 60000,
      isLoading: false,
    };
    this.getData();
    this.viewPager = React.createRef();
  }
  anim = new Animated.Value(0);

  getData = async () => {
    const battle_id = this.props.navigation.getParam('battle_id', '12');
    //const { login } = this.props.user
    const result = await getHighSccore(battle_id);
    this.setState({highRank: result?.data});
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
    console.log(e.nativeEvent.layout.height);
    let width = e.nativeEvent.layout.width;
    let height = e.nativeEvent.layout.height;
    this.setState({
      height: height,
      width: width,
    });
  };
  componentDidMount() {
    const {login, battaleQues} = this.props.user;
    const battle_id = this.props.navigation.getParam('battle_id', '123');
    Sound.setCategory('Playback', true);
    this._PlayMusic();
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
    this.changeArray();
    this.onAnimate();
    this.changeKeepAwake(true);
    StatusBar.setHidden(true);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToLandscape();
      }
    });
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this._handleAppStateChange,
    );
    this.interval = setInterval(() => this.getData(), 5000);
    // this.interval2 = setInterval(() => {
    //   this.props.joinMyBattle(
    //     login.data.id,
    //     login.data.type,
    //     battle_id,
    //     null,
    //     null,
    //     null,
    //   );
    // }, this.state.timeInterval);
  }
  changeArray = () => {
    const {battaleQues} = this.props.user;
    this.setState({testObject: battaleQues});
  };
  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.interval2);
    if (sound1) sound1.release();
    if (sound2) sound2.release();
    if (sound3) sound3.release();
    this.unsubscribeNetInfo();
    StatusBar.setHidden(false);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.appStateSubscription.remove();
  }
  _handleAppStateChange = nextAppState => {
    this.setState({appState: nextAppState}, () => {
      if (nextAppState === 'background') {
        if (sound1)
          sound1.stop(() => {
            console.log('Stop 1');
          });
        if (sound2)
          sound2.stop(() => {
            console.log('Stop 2');
          });
        if (sound3)
          sound3.stop(() => {
            console.log('Stop 3');
          });
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
    }).start();
  };
  _attemptedQuestion = (id, studentAnswer, correctAnswer) => {
    const {login, battaleQues} = this.props.user;
    const battle_id = this.props.navigation.getParam('battle_id', '123');
    const temmObj = {...battaleQues};
    temmObj.data[0].SelectedAnswer = studentAnswer;
    temmObj.data[0].CorrectAnswer = correctAnswer;
    this.setState({testObject: temmObj});
  };
  _PlayMusic = () => {
    sound1 = new Sound(
      require('../../Images/Audio/epic_music_battle.mp3'),
      (error, _sound) => {
        if (error) {
          alert('error' + error.message);
          return;
        }
        sound1.play(() => {
          sound1.release();
        });
      },
    );
  };
  _PlayMusicRight = () => {
    try {
      console.log('hiiiii');
      sound2 = new Sound(
        require('../../Images/Audio/correct_sound.mp3'),
        (error, _sound) => {
          if (error) {
            alert('error' + error.message);
            return;
          }
          sound2.play(() => {
            sound2.release();
          });
        },
      );
    } catch (error) {
      //console.warn(error);
    }
  };
  _PlayMusicWrong = () => {
    try {
      console.log('byeeeeeee');
      sound3 = new Sound(
        require('../../Images/Audio/incorrect_sound.mp3'),
        (error, _sound) => {
          if (error) {
            alert('error' + error.message);
            return;
          }
          sound3.play(() => {
            sound3.release();
          });
        },
      );
    } catch (error) {
      //console.warn(error);
    }
  };
  finishBattle = async () => {
    this.setState({isLoading: true});
    const {login} = this.props.user;
    const battle_id = this.props.navigation.getParam('battle_id', '123');
    const result = await leaveCurrentBattle(
      login.data.id,
      login.data.type,
      battle_id,
    );
    this.setState({isLoading: false});
    if (result?.status === 'Successfull') {
      this.test();
      this.props.navigation.navigate('HomeScreen');
      // this.props.navigation.dispatch(
      //     StackActions.reset({
      //         index: 0,
      //         actions: [NavigationActions.navigate({ routeName: "HomeScreen" })]
      //     })
      // )
    }
  };
  test = () => {
    Orientation.unlockAllOrientations();
  };

  render() {
    const {examStartData, AuthLoading, login, battaleQues} = this.props.user;
    const battle_id = this.props.navigation.getParam('battle_id', '123');
    const isReshedule = this.props.navigation.getParam('isReshedule', 'no');
    const {correctOption, pageSelected, highRank, testObject} = this.state;
    //console.log("My Current Progress => ", this.state.progressStatus)
    return (
      <View
        style={styles.container}
        onLayout={e => {
          this._onLayout(e);
        }}>
        <View style={styles.mainTopView}>
          <View style={styles.topView}>
            <ScrollView
              horizontal
              contentContainerStyle={{flexGrow: 1}}
              showsHorizontalScrollIndicator={false}>
              {!highRank || !highRank.length ? (
                <View />
              ) : (
                highRank.map((item, index) => {
                  return (
                    <View
                      key={'unique' + index}
                      style={{
                        marginLeft: widthPercentageToDP(2),
                        marginTop: widthPercentageToDP(0.5),
                      }}>
                      <View
                        style={[
                          styles.circle,
                          {
                            borderColor: item.correct == 0 ? 'red' : 'green',
                          },
                        ]}>
                        <FastImage
                          source={{
                            uri:
                              'https://neoestudio.net/public/userImage/' +
                              item.photo,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                          style={styles.coverPhoto}
                        />
                      </View>

                      <Text style={styles.smallText}>
                        {!item.name ? 'TrialUser' : item.name.slice(0, 8)}{' '}
                        {item.Score}
                      </Text>
                    </View>
                  );
                })
              )}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: '9%',
              top: '7%',
              zIndex: 3,
              width: widthPercentageToDP(15),
              height: widthPercentageToDP(7),
              //backgroundColor:"blue"
            }}
            onPress={() => {
              this.setState({timeInterval: 30000}, () => {
                this.props.joinMyBattle(
                  login.data.id,
                  login.data.type,
                  battle_id,
                  null,
                  null,
                  null,
                );
              });
            }}>
            <FastImage
              source={require('../../Images/nextQues.png')}
              resizeMode={FastImage.resizeMode.stretch}
              style={styles.btnImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: '2%',
              top: '7%',
              zIndex: 3,
              width: widthPercentageToDP(15),
              height: widthPercentageToDP(7),
              //backgroundColor:"red"
            }}
            onPress={() => {
              this.finishBattle();
            }}>
            <FastImage
              source={require('../../Images/stop.png')}
              resizeMode={FastImage.resizeMode.stretch}
              style={styles.btnImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.middleView}>
          {!battaleQues || !battaleQues?.data.length ? (
            <View />
          ) : battaleQues?.data[0].subjectname === 'Psicotécnicos' ? (
            battaleQues.data.map((item, index) => {
              return (
                <ImageExam
                  key={'unique' + index}
                  isAttempt={item.IsAttempted}
                  isOption1={item.SelectedAnswer}
                  isCorrect={item.CorrectedAnswer}
                  description={item.description}
                  correct={item.correct}
                  imgURL={item.image}
                  option1={item.answer1}
                  option2={item.answer2}
                  option3={item.answer3}
                  option4={item.answer4}
                  question={item.question}
                  clickHandler1={() => {
                    item.correct === 'a' || item.correct === 'a y b'
                      ? this._PlayMusicRight()
                      : this._PlayMusicWrong(),
                      this.state.netConnected
                        ? this.setState({timeInterval: 60000}, () => {
                            this.props.joinMyBattle(
                              login.data.id,
                              login.data.type,
                              battle_id,
                              item.id,
                              'answer1',
                              item.correct,
                            );
                          })
                        : Alert.alert(
                            'Connection Failed',
                            'Check your internet connection and try again',
                          );
                  }}
                  clickHandler2={() => {
                    item.correct === 'b' || item.correct === 'a y b'
                      ? this._PlayMusicRight()
                      : this._PlayMusicWrong(),
                      this.state.netConnected
                        ? this.setState({timeInterval: 60000}, () => {
                            this.props.joinMyBattle(
                              login.data.id,
                              login.data.type,
                              battle_id,
                              item.id,
                              'answer2',
                              item.correct,
                            );
                          })
                        : Alert.alert(
                            'Connection Failed',
                            'Check your internet connection and try again',
                          );
                  }}
                  clickHandler3={() => {
                    item.correct === 'c' || item.correct === 'c y d'
                      ? this._PlayMusicRight()
                      : this._PlayMusicWrong(),
                      this.state.netConnected
                        ? this.setState({timeInterval: 60000}, () => {
                            this.props.joinMyBattle(
                              login.data.id,
                              login.data.type,
                              battle_id,
                              item.id,
                              'answer3',
                              item.correct,
                            );
                          })
                        : Alert.alert(
                            'Connection Failed',
                            'Check your internet connection and try again',
                          );
                  }}
                  clickHandler4={() => {
                    item.correct === 'd' || item.correct === 'c y d'
                      ? this._PlayMusicRight()
                      : this._PlayMusicWrong(),
                      this.state.netConnected
                        ? this.setState({timeInterval: 60000}, () => {
                            this.props.joinMyBattle(
                              login.data.id,
                              login.data.type,
                              battle_id,
                              item.id,
                              'answer4',
                              item.correct,
                            );
                          })
                        : Alert.alert(
                            'Connection Failed',
                            'Check your internet connection and try again',
                          );
                  }}
                  ModalClick={() =>
                    this.setState({currentImage: item.image}, () =>
                      this.setState({isOpen: true}),
                    )
                  }
                />
              );
            })
          ) : (
            battaleQues.data.map((item, index) => {
              return (
                <ExamLayout
                  key={'unique' + index}
                  //isAttempt={item.studentAnswered === null ? false : true}
                  isOption1={item.SelectedAnswer}
                  isCorrect={item.CorrectedAnswer}
                  description={item.description}
                  isAttempt={item.IsAttempted}
                  option1={item.answer1}
                  option2={item.answer2}
                  option3={item.answer3}
                  option4={item.answer4}
                  correct={item.correct}
                  isTablet={this.state.isTable}
                  question={item.question}
                  clickHandler1={() => {
                    item.correct === 'a' || item.correct === 'a y b'
                      ? this._PlayMusicRight()
                      : this._PlayMusicWrong(),
                      this.state.netConnected
                        ? this.setState({timeInterval: 60000}, () => {
                            this.props.joinMyBattle(
                              login.data.id,
                              login.data.type,
                              battle_id,
                              item.id,
                              'answer1',
                              item.correct,
                            );
                          })
                        : //this._attemptedQuestion(item.id, item.answer1, item.correct)
                          Alert.alert(
                            'Connection Failed',
                            'Check your internet connection and try again',
                          );
                  }}
                  clickHandler2={() => {
                    item.correct === 'b' || item.correct === 'a y b'
                      ? this._PlayMusicRight()
                      : this._PlayMusicWrong(),
                      this.state.netConnected
                        ? //this._attemptedQuestion(item.id, item.answer1, item.correct)
                          this.setState({timeInterval: 60000}, () => {
                            this.props.joinMyBattle(
                              login.data.id,
                              login.data.type,
                              battle_id,
                              item.id,
                              'answer2',
                              item.correct,
                            );
                          })
                        : Alert.alert(
                            'Connection Failed',
                            'Check your internet connection and try again',
                          );
                  }}
                  clickHandler3={() => {
                    item.correct === 'c' || item.correct === 'c y d'
                      ? this._PlayMusicRight()
                      : this._PlayMusicWrong(),
                      this.state.netConnected
                        ? //this._attemptedQuestion(item.id, item.answer1, item.correct)
                          this.setState({timeInterval: 60000}, () => {
                            this.props.joinMyBattle(
                              login.data.id,
                              login.data.type,
                              battle_id,
                              item.id,
                              'answer3',
                              item.correct,
                            );
                          })
                        : Alert.alert(
                            'Connection Failed',
                            'Check your internet connection and try again',
                          );
                  }}
                  clickHandler4={() => {
                    item.correct === 'd' || item.correct === 'a y b'
                      ? this._PlayMusicRight()
                      : this._PlayMusicWrong(),
                      this.state.netConnected
                        ? //this._attemptedQuestion(item.id, item.answer1, item.correct)
                          this.setState({timeInterval: 60000}, () => {
                            this.props.joinMyBattle(
                              login.data.id,
                              login.data.type,
                              battle_id,
                              item.id,
                              'answer4',
                              item.correct,
                            );
                          })
                        : Alert.alert(
                            'Connection Failed',
                            'Check your internet connection and try again',
                          );
                  }}
                />
              );
            })
          )}
        </View>
        {/* <View style={styles.bottomView}>
                    <ScrollView
                        horizontal
                        contentContainerStyle={{ flexGrow: 0 }}
                    >
                        {!examStartData ?
                            <View />
                            : examStartData.data.map((item, index) => {
                                return (
                                    <BottomLayout
                                        key={"unique" + index}
                                        text={index + 1}
                                        isSelected={this.state.pageSelected === index ? true : false}
                                        isAttempt={item.studentAnswered}
                                        totalItem={examStartData.totalItems}
                                        clickHandler={() => this.move(index)}
                                    />
                                )
                            })}
                    </ScrollView>
                </View> */}

        {!battaleQues || !battaleQues?.data.length ? (
          <View />
        ) : (
          <View
            style={{
              width: '100%',
              height: '4%',
              //backgroundColor: "green",
              position: 'absolute',
              bottom: '2%',
              //marginTop:heightPercentageToDP(1)
              //left:"1%"
            }}>
            {/* <Slider
                            //value={this.state.bottomTimer}
                            minimumValue={0}
                            maximumValue={1}
                            disabled={false}
                            trackStyle={styles.trackStyle}
                            maximumTrackTintColor='#D3D3D3'
                            minimumTrackTintColor='#007EBA'
                            style={styles.sliderStyle}
                            thumbImage={() => null}
                            thumbTintColor="transparent"
                            thumbStyle={{
                                backgroundColor: "red"
                            }}
                        /> */}
          </View>
        )}

        {AuthLoading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
        {this.state.isLoading && (
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
  joinMyBattle,
})(Test);
