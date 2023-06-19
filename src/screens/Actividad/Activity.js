import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  Modal,
  Text,
} from 'react-native';
import {styles} from './styles';
import Header from '../../Component/Header';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation-locker';
import {
  getUserProgramsActivites,
  updateCompleteActivites,
  removeUserActivites,
  saveActivityId,
  showToastFunc,
  resetAllPrograms,
} from '../../Redux/action';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import Activities from '../../Component/Activity';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
//import Orientation from 'react-native-orientation-locker';
import {NavigationEvents} from 'react-navigation';
import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { fonts } from '../../utils';

const Programs = props => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.user.login);
  const activityId = useSelector(state => state.user.activityId);
  const activityName = useSelector(state => state.user.activityName);
  //const showToast = useSelector((state) => state.user.showToast);
  //const activityName = props.navigation.getParam('activityName', 'test');
  const [isLoading, setLoading] = useState(false);
  const [showToast, hideToast] = useState(false);
  const [response, setResponse] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSelected, setPageSelected] = useState(0);
  const [counter, setCounter] = useState(0);
  const viewPager = useRef();
  const refsArray = useRef([]);

  useEffect(() => {
    _fetchData();
  }, []);
  const _deleteDataApi = async (activityId, type) => {
    setLoading(true);
    const result = await removeUserActivites(login.data.id, activityId, type);
    await setResponse(result.data);
    await setLoading(false);
  };
  // swiper
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = async (rowMap, rowKey, activityId, type) => {
    closeRow(rowMap, rowKey);
    setLoading(true);
    const result = await removeUserActivites(login.data.id, activityId, type);
    const newData = [...result];
    const prevIndex = response.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    await setResponse(newData);
    await setLoading(false);
  };

  const VisibleItem = props => {
    const {
      data,
      rowHeightAnimatedValue,
      removeRow,
      leftActionState,
      rightActionState,
      Navigation,
    } = props;

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }

    return (
      <Animated.View
        style={[styles.rowFront, {height: rowHeightAnimatedValue}]}>
        <Activities
          type={data.item.type}
          name={data.item.name}
          title={data.item.title}
          isCompleted={data.item.isCompleted}
          studentExamStatus={data.item.studentExamStatus}
          clickHandler={() => {
            if (data.item.type === 'pdf') {
              updateCompleteActivites(login.data.id, data.item.activityId);
              Navigation.navigate('PdfView2', {
                url: data.item.file,
              });
            } else if (data.item.type === 'video') {
              updateCompleteActivites(login.data.id, data.item.activityId);
              Navigation.navigate('TestVideo', {
                url: 'https://neoestudio.net/' + data.item.material,
                id: login.data.id,
              });
            } else if (data.item.type === 'audio') {
              updateCompleteActivites(login.data.id, data.item.activityId);
              let data = [];
              data.push({
                artist: !data.item.name ? data.item.title : data.item.name,
                artwork: 'http://neoestudio.net/neostudio/Logo.png',
                id: 0,
                isActive: false,
                title: !data.item.name ? data.item.title : data.item.name,
                url: 'http://neoestudio.net/' + data.item.material,
              });
              Navigation.navigate('AudioActivity', {
                data: data,
              });
            } else {
              updateCompleteActivites(login.data.id, data.item.activityId);
              if (data.item.type === 'exam') {
                if (data.item.studentStatus === 'Habilitado') {
                  Navigation.navigate('Test', {
                    examsId: data.item.id,
                    totalTime: data.item.examDuration,
                    isPsico: false,
                    type: 'all',
                    isReshedule: 'no',
                  });
                } else if (data.item.studentExamStatus === 'end') {
                  Navigation.navigate('Review', {
                    id: data.item.studentExamRecordId,
                    isImage: false,
                    type: 'all',
                  });
                }
              } else if (data.item.type === 'review') {
                if (data.item.studentStatus === 'Habilitado') {
                  Navigation.navigate('Test', {
                    examsId: data.item.id,
                    totalTime: data.item.examDuration,
                    isPsico: false,
                    type: 'all',
                    isReshedule: 'no',
                  });
                } else if (data.item.studentExamStatus === 'end') {
                  Navigation.navigate('Review', {
                    id: data.item.studentExamRecordId,
                    isImage: false,
                    type: 'all',
                  });
                  //console.log(item)
                }
              }
            }
          }}
        />
      </Animated.View>
    );
  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(60);
    return (
      <VisibleItem
        data={data}
        Navigation={props.navigation}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() =>
          deleteRow(rowMap, data.item.key, data.item.activityId, 'archive')
        }
      />
    );
  };

  const HiddenItemWithActions = props => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
        {/* <Text>Left</Text> */}
        {/* {!leftActionActivated && (
                    <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnLeft]}
                        onPress={onClose}>
                        <MaterialCommunityIcons
                            name="close-circle-outline"
                            size={25}
                            style={styles.trash}
                            color="#fff"
                        />
                    </TouchableOpacity>
                )} */}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}>
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={25}
                  color="#fff"
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  const LeftItem = () => {
    return (
      <View style={styles.leftItem}>
        {/* <Text style={[styles.leftItemText]}>Open</Text> */}
      </View>
    );
  };

  const deleteItem = (id, index) => {
    deleteApi(id);
    refsArray.current[index].close();
    const newData = [...response];
    const prevIndex = response.findIndex(item => item.activityId === id);
    newData.splice(prevIndex, 1);
    setResponse(newData);
    // let arr = [...response]
    // arr = arr.filter(item => item.activityId !== id)
    // setResponse(arr)
  };
  const deleteApi = async id => {
    const result = await removeUserActivites(login.data.id, id, 'delete');
    if (result.status === 'Success') {
      hideToast(true);
    }
  };
  const loadMoreData = () => {
    setPage(page + 1);
  };
  const _resetPrograms = async () => {
    setLoading(true);
    const result = await resetAllPrograms(login.data.id, activityId);
    setLoading(false);
    if (result?.status === 'Successfull') {
      _fetchData();
    }
  };
  const _fetchData = async () => {
    setLoading(true);
    const result = await getUserProgramsActivites(
      login.data.id,
      activityId,
      page,
    );
    await setResponse(result);
    await setLoading(false);
  };
  const _fetchData2 = async () => {
    setLoading(true);
    const result = await getUserProgramsActivites(
      login.data.id,
      activityId,
      page,
    );
    await setResponse([...response, ...result]);
    await setLoading(false);
  };
  useEffect(() => {
    if (page) {
      _fetchData2();
    }
  }, [page]);
  useEffect(() => {
    if (showToast)
      setTimeout(() => {
        hideToast(false);
        //alert("Hi =>" + showToast)
      }, 1000);
  }, [showToast]);

  useEffect(() => {
    props.navigation.addListener('didFocus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }
    });
  }, []);

  return (
    <View
      //source={require('../../Images/bg.png')}
      style={[styles.container, {backgroundColor: '#f2f3f3'}]}
      //resizeMode={FastImage.resizeMode.stretch}
    >
      <NavigationEvents
        onDidFocus={() => {
          _fetchData();
        }}
      />
      <View style={styles.headerTop}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{marginLeft: widthPercentageToDP(5)}}
            onPress={() => {
              dispatch(saveActivityId(''));
              props.navigation.navigate('Actividad');
            }}>
            <FastImage
              style={{
                width: widthPercentageToDP(11),
                height: widthPercentageToDP(11),
              }}
              source={require('../../Images/Actividades_icon.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => {
              _resetPrograms();
            }}>
            <FastImage
              style={{
                width: widthPercentageToDP(10),
                height: widthPercentageToDP(10),
              }}
              source={require('../../Images/loader.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        </View>
        <FastImage
          style={{
            width: widthPercentageToDP(25),
            height: widthPercentageToDP(25),
            marginTop: heightPercentageToDP(2),
            marginRight: widthPercentageToDP(2),
          }}
          source={require('../../Images/logo2.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text
          style={[
            styles.headerText,
            {
              position: 'absolute',
              left: '33%',
              //right: '0%',
              top: '30%',
              //bottom:
            },
          ]}>
          {!activityName ? '' : activityName.toUpperCase()}
        </Text>
      </View>

      {/* <Header
                iconName='left'
                leftClick={() => this.props.navigation.goBack()}
                title='Actividades'
                isActivity = {true}
            /> */}
      <View style={styles.directoryView}>
        {!response || !response.length ? (
          <View />
        ) : (
          <FlatList
            onEndReachedThreshold={0.2}
            onEndReached={() => loadMoreData()}
            data={response}
            style={{marginTop: heightPercentageToDP(3)}}
            keyExtractor={(item, index) => 'unique' + index}
            renderItem={({item, index}) => {
              return (
                <Swipeable
                  ref={ref => (refsArray.current[index] = ref)}
                  onSwipeableLeftOpen={() => deleteItem(item.activityId, index)}
                  onSwipeableRightOpen={() => console.log('Swiped right')}
                  renderLeftActions={() => <LeftItem />}
                  friction={2}
                  leftThreshold={30}
                  //onSwipeableOpen={closeRow(index)}
                  //leftThreshold={80}
                >
                  <Activities
                    type={item.type}
                    name={item.name}
                    title={item.title}
                    activityName={item.activityName}
                    isCompleted={item.isCompleted}
                    studentExamStatus={item.studentExamStatus}
                    clickHandler={() => {
                      if (item.type === 'pdf') {
                        Orientation.unlockAllOrientations();
                        updateCompleteActivites(login.data.id, item.activityId);
                        setPage(1);
                        props.navigation.navigate('PdfView', {
                          url: item.file,
                        });
                      } else if (item.type === 'video') {
                        Orientation.unlockAllOrientations();
                        updateCompleteActivites(login.data.id, item.activityId);
                        setPage(1);
                        props.navigation.navigate('TestVideo', {
                          url: 'https://neoestudio.net/' + item.material,
                          id: login.data.id,
                        });
                      } else if (item.type === 'audio') {
                        Orientation.unlockAllOrientations();
                        updateCompleteActivites(login.data.id, item.activityId);
                        setPage(1);
                        let data = [];
                        data.push({
                          artist: !item.name ? item.title : item.name,
                          artwork: 'http://neoestudio.net/neostudio/Logo.png',
                          id: 0,
                          isActive: false,
                          title: !item.name ? item.title : item.name,
                          url: 'http://neoestudio.net/' + item.material,
                        });
                        props.navigation.navigate('AudioActivity', {
                          data: data,
                        });
                      } else {
                        Orientation.unlockAllOrientations();
                        updateCompleteActivites(login.data.id, item.activityId);
                        setPage(1);
                        if (item.type === 'exam') {
                          if (item.studentStatus === 'Habilitado') {
                            props.navigation.navigate('Test', {
                              examsId: item.id,
                              totalTime: item.examDuration,
                              isPsico: item.name.includes('Psico')
                                ? true
                                : false,
                              type: 'all',
                              isReshedule: 'no',
                            });
                          } else if (item.studentExamStatus === 'end') {
                            props.navigation.navigate('Review', {
                              id: item.studentExamRecordId,
                              isImage: item.name.includes('Psico')
                                ? true
                                : false,
                              type: 'all',
                            });
                          }
                        } else if (item.type === 'review') {
                          if (item.studentStatus === 'Habilitado') {
                            props.navigation.navigate('Test', {
                              examsId: item.id,
                              totalTime: item.examDuration,
                              isPsico: false,
                              type: 'all',
                              isReshedule: 'no',
                            });
                          } else if (item.studentExamStatus === 'end') {
                            props.navigation.navigate('Review', {
                              id: item.studentExamRecordId,
                              isImage: false,
                              type: 'all',
                            });
                            //console.log(item)
                          }
                        }
                      }
                    }}
                  />
                </Swipeable>
              );
            }}
          />
        )}
      </View>
      {isLoading && (
        <ActivityIndicator size="large" color="#000" style={styles.loading} />
      )}
      {showToast && (
        <Modal
          visible={showToast}
          animationType="slide"
          transparent={true}
          supportedOrientations={['portrait', 'landscape']}
          onRequestClose={() => console.log('Hi')}>
          <View style={{flex: 1}}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#cacaca', '#e9e9e9']}
              style={{
                width: widthPercentageToDP(90),
                height: heightPercentageToDP(7),
                borderWidth: widthPercentageToDP(0.3),
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: '5%',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontFamily: fonts.novaBold,
                  fontSize: widthPercentageToDP(4),
                  color: '#000',
                }}>
                {'¡Enhorabuena!'}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.elegance,
                  fontSize: widthPercentageToDP(4),
                  color: '#000',
                }}>
                {'Has completado y archivado esta tarea.'}
              </Text>
            </LinearGradient>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Programs;

{
  /* <SwipeListView
                        data={response}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        leftOpenValue={75}
                        rightOpenValue={-150}
                        disableRightSwipe
                        onRowDidOpen={onRowDidOpen}
                        leftActivationValue={100}
                        rightActivationValue={-200}
                        leftActionValue={0}
                        rightActionValue={-500}
                        onLeftAction={onLeftAction}
                        onRightAction={onRightAction}
                        onLeftActionStatusChange={onLeftActionStatusChange}
                        onRightActionStatusChange={onRightActionStatusChange}
                    /> */
}
