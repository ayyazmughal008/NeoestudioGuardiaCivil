import React from 'react';
import {
  ScrollView,
  View,
  Text,
  BackHandler,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import {background, logo, btn_background} from './assets';
import styles from './styles';
import {data} from './courseData';
import {dummy} from './examData';
import CourseLayout from './CourseLayout';
import ExamLayout from './ExamLayout';
import {connect} from 'react-redux';
import {
  getExames,
  getVerticalRanking,
  dispatchFuncOn,
  dispatchExamText,
  clearStates,
} from '../../Redux/action';
import Orientation from 'react-native-orientation-locker';
import {NavigationEvents} from 'react-navigation';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/dist/Feather';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Ranking from '../../Component/Ranking';
import ScrollView2 from 'rn-faded-scrollview';
const URL = 'https://neoestudio.net/api/getAllExamsOfFolder';
const url3 = 'https://neoestudio.net/api/getAllExamsOfFolderApp';
const URL2 = 'https://neoestudio.net/api/getAllExams';
import ModalBox from '../../Component/Modal';

class ExamScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      testData: [],
      examID: '',
      timer: '',
      isPsicotechnics: false,
      recordId: '',
      isImageTest: false,
      modalVisible: false,
      width: 0,
      height: 0,
      isLoading: true,
      isRefresh: false,
      page: 0,
      isComplete: false,
      isOpen: false,
      recordID: '',
      isReshedule: '',
    };
  }
  getExamApi = (examId, isRestart) => {
    const {login} = this.props.user;
    const id = this.props.navigation.getParam('position', '123');
    this.props.clearStates();
    this.setState({isComplete: true});
    // this.props.getExames(login.data.id, false, login.data.type)
    fetch(url3, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: login.data.id,
        studentType: login.data.type,
        examId: examId,
        isRestart: isRestart,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log('Api called', json.data);
        this.setState({isComplete: false});
        if (json.status === 'Successfull') {
          this.setState({testData: json.data}, () => {});
          // if (json.data.length) {
          //     // let temArr = this.state.testData
          //     // json.data.forEach((item) => {
          //     //     temArr.push({
          //     //         folderName: item.folderName,
          //     //         Conocimientos: item.Conocimientos,
          //     //         Inglés: item.Inglés,
          //     //         Psicotécnicos: item.Psicotécnicos,
          //     //         Ortografía: item.Ortografía
          //     //     })
          //     // })
          //     // this.setState({ testData: temArr }, () => {
          //     //     this.LoadMoreRandomData();
          //     // })
          // } else {
          //     this.setState({ isComplete: true })
          //     console.log("array finished")
          // }
        }
      })
      .catch(error => {
        this.setState({isComplete: false});
        console.log('exception error is =>', error);
      });
  };

  refreshExamList = () => {
    const {login} = this.props.user;
    this.props.clearStates();
    this.setState({isRefresh: true, page: 1});
    console.log('api calling');
    // this.props.getExames(login.data.id, false, login.data.type)
    fetch(URL2, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: login.data.id,
        studentType: login.data.type,
        offset: 1,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('refresh call');
        this.setState({isRefresh: false});
        if (json.status === 'Successfull') {
          this.setState({testData: json.data});
        }
      })
      .catch(error => {
        this.setState({isRefresh: false});
        console.log('exception error is =>', error);
      });
  };

  LoadMoreRandomData = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => this.getExamApi(null, 'no'),
      //console.log(this.state.page)
    );
  };

  handleModalOpen = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.LoadMoreRandomData();
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }
    });
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  changeArray = () => {
    const {examsData} = this.props.user;
    this.setState({testData: examsData.data});
  };

  updateArray1 = (index, folderType, position) => {
    const {testData} = this.state;
    const newArray = [...testData];
    for (var i = 0; i < newArray[index].Conocimientos.length; i++) {
      newArray[index].Conocimientos[i].activeStatus = 'false';
    }
    for (var i = 0; i < newArray[index].Inglés.length; i++) {
      newArray[index].Inglés[i].activeStatus = 'false';
    }
    for (var i = 0; i < newArray[index].Psicotécnicos.length; i++) {
      newArray[index].Psicotécnicos[i].activeStatus = 'false';
    }
    for (var i = 0; i < newArray[index].Ortografía.length; i++) {
      newArray[index].Ortografía[i].activeStatus = 'false';
    }
    newArray[index].Conocimientos[position].activeStatus = 'true';
    this.setState({testData: newArray});
  };

  updateArray2 = (index, folderType, position) => {
    const {testData} = this.state;
    const newArray = [...testData];
    for (var i = 0; i < newArray[index].Conocimientos.length; i++) {
      newArray[index].Conocimientos[i].activeStatus = 'false';
    }
    for (var i = 0; i < newArray[index].Inglés.length; i++) {
      newArray[index].Inglés[i].activeStatus = 'false';
    }
    for (var i = 0; i < newArray[index].Psicotécnicos.length; i++) {
      newArray[index].Psicotécnicos[i].activeStatus = 'false';
    }
    for (var i = 0; i < newArray[index].Ortografía.length; i++) {
      newArray[index].Ortografía[i].activeStatus = 'false';
    }
    newArray[index].Inglés[position].activeStatus = 'true';
    this.setState({testData: newArray});
  };

  updateArray3 = (index, folderType, position) => {
    const {testData} = this.state;
    const newArray = [...testData];
    for (var i = 0; i < newArray[index].Conocimientos.length; i++) {
      newArray[index].Conocimientos[i].activeStatus = 'false';
    }
    for (var i = 0; i < newArray[index].Inglés.length; i++) {
      newArray[index].Inglés[i].activeStatus = 'false';
    }
    for (var i = 0; i < newArray[index].Psicotécnicos.length; i++) {
      newArray[index].Psicotécnicos[i].activeStatus = 'false';
    }
    for (var i = 0; i < newArray[index].Ortografía.length; i++) {
      newArray[index].Ortografía[i].activeStatus = 'false';
    }

    newArray[index].Psicotécnicos[position].activeStatus = 'true';
    this.setState({testData: newArray});
  };

  updateArray4 = (index, folderType, position) => {
    const {testData} = this.state;
    const newArray = [...testData];
    for (var i = 0; i < newArray[index].Conocimientos.length; i++) {
      newArray[index].Conocimientos[i].activeStatus = 'false';
    }
    for (var i = 0; i < newArray[index].Inglés.length; i++) {
      newArray[index].Inglés[i].activeStatus = 'false';
    }
    for (var i = 0; i < newArray[index].Psicotécnicos.length; i++) {
      newArray[index].Psicotécnicos[i].activeStatus = 'false';
    }
    for (var i = 0; i < newArray[index].Ortografía.length; i++) {
      newArray[index].Ortografía[i].activeStatus = 'false';
    }

    newArray[index].Ortografía[position].activeStatus = 'true';
    this.setState({testData: newArray});
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

  toggleBox = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  render() {
    const {AuthLoading, login, verticalRanking, examsData} = this.props.user;
    const {testData, recordId, isImageTest, isComplete, isOpen, recordID} =
      this.state;
    const isRefresh = this.props.navigation.getParam('isRefresh', 'false');
    //console.log("myExams",examsData)

    return (
      <FastImage
        source={background}
        style={styles.background}
        resizeMode={FastImage.resizeMode.stretch}
        onLayout={e => {
          this._onLayout(e);
        }}>
        {isRefresh === 'true' && (
          <NavigationEvents onDidFocus={() => this.LoadMoreRandomData()} />
        )}

        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => this.handleModalOpen()}
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
            resizeMode={FastImage.resizeMode.stretch}
          />
        </View>

        <View style={{flex: 1, width: '100%'}}>
          <View style={styles.courseItem}>
            {data.map((item, index) => {
              return (
                <CourseLayout
                  key={'unique' + index}
                  image={item.img}
                  text={item.text}
                />
              );
            })}
          </View>

          <View style={styles.mainView}>
            {!testData ? (
              <View />
            ) : (
              <FlatList
                data={testData}
                keyExtractor={(item, index) => 'unique' + index}
                showsVerticalScrollIndicator={false}
                initialNumToRender={8}
                contentContainerStyle={{flexGrow: 1}}
                renderItem={({item, index}) => {
                  return (
                    <View key={'unique' + index}>
                      <Text style={styles.folderName}>{item.folderName}</Text>
                      <View style={styles.columView}>
                        <View style={{width: '25%'}}>
                          {item.Conocimientos.map((item1, index1) => {
                            //console.log("hiiii")
                            return (
                              <ExamLayout
                                text={item1.name}
                                status={item1.studentStatus}
                                activeStatus={item1.activeStatus}
                                examStatus={item1.studentExamStatus}
                                studentExamStatus={
                                  item1.studentExamStatus === 'end'
                                    ? true
                                    : false
                                }
                                clickHandler={() => {
                                  if (item1.studentStatus === 'Habilitado') {
                                    this.setState({examID: item1.id}, () => {
                                      this.setState(
                                        {
                                          timer: item1.examDuration,
                                          isPsicotechnics: false,
                                          recordId: '',
                                          isReshedule: item1.isReshedule,
                                        },
                                        () => {
                                          this.updateArray1(
                                            index,
                                            'Conocimientos',
                                            index1,
                                          );
                                        },
                                      );
                                    });
                                  } else if (
                                    item1.studentExamStatus === 'end'
                                  ) {
                                    this.setState(
                                      {
                                        recordId: item1.studentExamRecordId,
                                        isImageTest: false,
                                      },
                                      () => {
                                        this.updateArray1(
                                          index,
                                          'Conocimientos',
                                          index1,
                                        );
                                      },
                                    );
                                  }
                                }}
                                onLongPres={() => {
                                  this.setState(
                                    {recordID: item1.studentExamRecordId},
                                    () => {
                                      console.log(item1.studentExamStatus);
                                      if (item1.studentExamStatus === 'end') {
                                        this.toggleBox();
                                      }
                                    },
                                  );
                                }}
                              />
                            );
                          })}
                        </View>
                        <View style={{width: '25%'}}>
                          {item.Inglés.map((item2, index2) => {
                            return (
                              <ExamLayout
                                text={item2.name}
                                status={item2.studentStatus}
                                activeStatus={item2.activeStatus}
                                examStatus={item2.studentExamStatus}
                                studentExamStatus={
                                  item2.studentExamStatus === 'end'
                                    ? true
                                    : false
                                }
                                clickHandler={() => {
                                  if (item2.studentStatus === 'Habilitado') {
                                    this.setState({examID: item2.id}, () => {
                                      this.setState(
                                        {
                                          timer: item2.examDuration,
                                          isPsicotechnics: false,
                                          recordId: '',
                                          isReshedule: item2.isReshedule,
                                        },
                                        () => {
                                          this.updateArray2(
                                            index,
                                            'Inglés',
                                            index2,
                                          );
                                        },
                                      );
                                    });
                                  } else if (
                                    item2.studentExamStatus === 'end'
                                  ) {
                                    this.setState(
                                      {
                                        recordId: item2.studentExamRecordId,
                                        isImageTest: false,
                                      },
                                      () => {
                                        this.updateArray2(
                                          index,
                                          'Inglés',
                                          index2,
                                        );
                                      },
                                    );
                                  }
                                }}
                                onLongPres={() => {
                                  this.setState(
                                    {recordID: item2.studentExamRecordId},
                                    () => {
                                      if (item2.studentExamStatus === 'end') {
                                        this.toggleBox();
                                      }
                                    },
                                  );
                                }}
                              />
                            );
                          })}
                        </View>
                        <View style={{width: '25%'}}>
                          {item.Psicotécnicos.map((item3, index3) => {
                            return (
                              <ExamLayout
                                text={item3.name}
                                status={item3.studentStatus}
                                activeStatus={item3.activeStatus}
                                examStatus={item3.studentExamStatus}
                                studentExamStatus={
                                  item3.studentExamStatus === 'end'
                                    ? true
                                    : false
                                }
                                clickHandler={() => {
                                  if (item3.studentStatus === 'Habilitado') {
                                    this.setState({examID: item3.id}, () => {
                                      this.setState(
                                        {
                                          timer: item3.examDuration,
                                          isPsicotechnics: true,
                                          recordId: '',
                                          isReshedule: item3.isReshedule,
                                        },
                                        () => {
                                          this.updateArray3(
                                            index,
                                            'Psicotécnicos',
                                            index3,
                                          );
                                        },
                                      );
                                    });
                                  } else if (
                                    item3.studentExamStatus === 'end'
                                  ) {
                                    this.setState(
                                      {
                                        recordId: item3.studentExamRecordId,
                                        isImageTest: true,
                                      },
                                      () => {
                                        this.updateArray3(
                                          index,
                                          'Psicotécnicos',
                                          index3,
                                        );
                                      },
                                    );
                                  }
                                }}
                                onLongPres={() => {
                                  this.setState(
                                    {recordID: item3.studentExamRecordId},
                                    () => {
                                      if (item3.studentExamStatus === 'end') {
                                        this.toggleBox();
                                      }
                                    },
                                  );
                                }}
                              />
                            );
                          })}
                        </View>
                        <View style={{width: '25%'}}>
                          {item.Ortografía.map((item4, index4) => {
                            return (
                              <ExamLayout
                                text={item4.name}
                                status={item4.studentStatus}
                                activeStatus={item4.activeStatus}
                                examStatus={item4.studentExamStatus}
                                studentExamStatus={
                                  item4.studentExamStatus === 'end'
                                    ? true
                                    : false
                                }
                                clickHandler={() => {
                                  if (item4.studentStatus === 'Habilitado') {
                                    this.setState({examID: item4.id}, () => {
                                      this.setState(
                                        {
                                          timer: item4.examDuration,
                                          isPsicotechnics: false,
                                          recordId: '',
                                          isReshedule: item4.isReshedule,
                                        },
                                        () => {
                                          this.updateArray4(
                                            index,
                                            'Ortografía',
                                            index4,
                                          );
                                        },
                                      );
                                    });
                                  } else if (
                                    item4.studentExamStatus === 'end'
                                  ) {
                                    this.setState(
                                      {
                                        recordId: item4.studentExamRecordId,
                                        isImageTest: false,
                                      },
                                      () => {
                                        this.updateArray4(
                                          index,
                                          'Ortografía',
                                          index4,
                                        );
                                      },
                                    );
                                  }
                                }}
                                onLongPres={() => {
                                  this.setState(
                                    {recordID: item4.studentExamRecordId},
                                    () => {
                                      if (item4.studentExamStatus === 'end') {
                                        this.toggleBox();
                                      }
                                    },
                                  );
                                }}
                              />
                            );
                          })}
                        </View>
                      </View>
                      <View style={styles.viewHeight} />
                    </View>
                  );
                }}
              />
            )}

            <View style={styles.topHeight} />
          </View>

          {/* <View style={styles.bottomView}> */}
          <View style={styles.innerBottom}>
            <TouchableOpacity
              style={styles.bottomBtn}
              onPress={() => {
                !this.state.examID && !recordId
                  ? (this.props.dispatchExamText(), this.props.dispatchFuncOn())
                  : // : isComplete ?
                  !recordId
                  ? (Orientation.unlockAllOrientations(),
                    this.props.navigation.navigate('Test', {
                      examsId: this.state.examID,
                      totalTime: this.state.timer,
                      isPsico: this.state.isPsicotechnics,
                      type: 'exam',
                      isReshedule: this.state.isReshedule,
                    }))
                  : (Orientation.unlockAllOrientations(),
                    this.props.navigation.navigate('Review', {
                      id: recordId,
                      isImage: isImageTest,
                      type: 'exam',
                    }));
                // : Alert.alert("", "Espere, los exámenes se están cargando")
                //console.log(this.state.examID)
              }}>
              <FastImage
                style={styles.btnBackground}
                source={require('../../Images/Comenzar.png')}
                resizeMode={FastImage.resizeMode.contain}></FastImage>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </View>
        {AuthLoading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
        {this.state.isComplete && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
        {this.state.modalVisible && (
          <Modal
            transparent={true}
            visible={this.state.modalVisible}
            supportedOrientations={['portrait', 'landscape']}
            onRequestClose={() => {
              console.log('alert close');
            }}>
            <View style={styles.modalMain}>
              <View style={styles.innerModal}>
                <FastImage
                  source={require('../../Images/navigationSlider.png')}
                  resizeMode={FastImage.resizeMode.stretch}
                  style={styles.navigation}>
                  <View style={styles.topModal}>
                    <View style={styles.navigationHeader}>
                      <TouchableOpacity
                        //style = {styles.}
                        onPress={() =>
                          this.props.getVerticalRanking(login.data.id)
                        }>
                        <FastImage
                          style={styles.loaderStyle}
                          resizeMode={FastImage.resizeMode.contain}
                          source={require('../../Images/loader.png')}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        //style = {styles.}
                        onPress={() => this.handleModalOpen()}>
                        <Icon2 name="close" color="#ffff" size={30} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.mainModalVie}>
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                      {!verticalRanking ? (
                        <View />
                      ) : (
                        verticalRanking.data.map((item, index) => {
                          return (
                            <View key={'unique' + index}>
                              <Text style={styles.titleText}>
                                {item.folderName}
                              </Text>
                              {item.courses.map((item, index) => {
                                return (
                                  <Ranking
                                    key={'unique' + index}
                                    subject={item.rankName}
                                    getPoints={item.points}
                                    totalPoints={item.totalPoints}
                                    minLength={
                                      item.percentage === 'null'
                                        ? 'null'
                                        : item.percentage
                                    }
                                    maxLength={
                                      item.percentage === 'null'
                                        ? 100
                                        : 100 - item.percentage
                                    }
                                    obtainPercentage={
                                      item.percentage === 'null'
                                        ? 'null'
                                        : item.percentage
                                    }
                                    drawer={true}
                                  />
                                );
                              })}
                              <Ranking
                                subject={item.withoutBaremo.rankName}
                                getPoints={item.withoutBaremo.points}
                                totalPoints={item.withoutBaremo.totalPoints}
                                minLength={
                                  item.withoutBaremo.percentage === null
                                    ? 'null'
                                    : item.withoutBaremo.percentage
                                }
                                maxLength={
                                  item.withoutBaremo.percentage === null
                                    ? 100
                                    : 100 - item.withoutBaremo.percentage
                                }
                                obtainPercentage={
                                  item.withoutBaremo.percentage === null
                                    ? 'null'
                                    : item.withoutBaremo.percentage
                                }
                                drawer={true}
                              />
                              <Ranking
                                subject={item.withBaremo.rankName}
                                getPoints={item.withBaremo.points}
                                totalPoints={item.withBaremo.totalPoints}
                                minLength={
                                  item.withBaremo.percentage === null
                                    ? 'null'
                                    : item.withBaremo.percentage
                                }
                                maxLength={
                                  item.withBaremo.percentage === null
                                    ? 100
                                    : 100 - item.withBaremo.percentage
                                }
                                obtainPercentage={
                                  item.withBaremo.percentage === null
                                    ? 'null'
                                    : item.withBaremo.percentage
                                }
                                drawer={true}
                              />
                            </View>
                          );
                        })
                      )}
                      <View style={styles.jump} />
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
        )}
        {isOpen && (
          <ModalBox
            isOpen={isOpen}
            closeBox={() => this.toggleBox()}
            yesClick={() => {
              this.toggleBox();
              this.getExamApi(recordID, 'yes');
            }}
            noClick={() => {
              this.toggleBox();
            }}
          />
        )}
      </FastImage>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  getExames,
  getVerticalRanking,
  dispatchExamText,
  dispatchFuncOn,
  clearStates,
})(ExamScreen);
