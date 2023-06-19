import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import {styles} from './styles';
import Header from '../../Component/Header';
import FastImage from 'react-native-fast-image';
import {useSelector, useDispatch} from 'react-redux';
import Items from '../../Component/NewBatlle';
import {
  createNewBattle,
  startNewBattle,
  joinMyBattle,
} from '../../Redux/action';
import ModalBox from './Model';
import Orientation from 'react-native-orientation-locker';

const battle = props => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.user.login);
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [myArray1, setArray1] = useState([]);
  const [myArray2, setArray2] = useState([]);
  const [myArray3, setArray3] = useState([]);
  const [myArray4, setArray4] = useState([]);
  const [myArray5, setArray5] = useState([]);

  useEffect(() => {
    apiCall();
  }, []);

  const startBattleApi = async sendNoti => {
    var firstArry = myArray1.concat(myArray2);
    var secondArray = firstArry.concat(myArray3);
    var thirdArray = secondArray.concat(myArray4);
    var fourthArray = thirdArray.concat(myArray5);
    console.log(fourthArray);
    setLoading(true);
    const result = await startNewBattle(
      login.data.id,
      login.data.type,
      fourthArray,
      sendNoti,
    );
    setLoading(false);
    if (result.status === 'Successfull') {
      Orientation.unlockAllOrientations();
      dispatch(
        joinMyBattle(
          login.data.id,
          login.data.type,
          result?.Battleid,
          null,
          null,
          null,
        ),
      );
    }
  };
  const apiCall = async () => {
    setLoading(true);
    const result = await createNewBattle(login.data.id, login.data.type);
    setLoading(false);
    if (result || result.status === 'Successfull') {
      setResponse(result?.data);
    }
  };
  const _removeItem = value => {
    const temArr = [...myArray1];
    const index = temArr.map(e => e.id).indexOf(value);
    if (index > -1) {
      temArr.splice(index, 1);
    }
    console.log(temArr);
    setArray1(temArr);
  };
  const _removeItem2 = value => {
    const temArr = [...myArray2];
    const index = temArr.map(e => e.id).indexOf(value);
    if (index > -1) {
      temArr.splice(index, 1);
    }
    setArray2(temArr);
  };
  const _removeItem3 = value => {
    const temArr = [...myArray3];
    const index = temArr.map(e => e.id).indexOf(value);
    if (index > -1) {
      temArr.splice(index, 1);
    }
    setArray3(temArr);
  };
  const _removeItem4 = value => {
    const temArr = [...myArray4];
    const index = temArr.map(e => e.id).indexOf(value);
    if (index > -1) {
      temArr.splice(index, 1);
    }
    setArray4(temArr);
  };
  const _removeItem5 = value => {
    const temArr = [...myArray5];
    const index = temArr.map(e => e.id).indexOf(value);
    if (index > -1) {
      temArr.splice(index, 1);
    }
    setArray5(temArr);
  };
  const updateOne = (id, CourseId) => {
    let temArr = {...response};
    let tempValue = [...myArray1];
    for (let i = 0; i < temArr.Conocimientos.length; i++) {
      if (temArr.Conocimientos[i].id === id) {
        if (temArr.Conocimientos[i].IsActive === 'False') {
          temArr.Conocimientos[i].IsActive = 'True';
          tempValue.push({
            id: temArr.Conocimientos[i].id,
            courseId: temArr.Conocimientos[i].CourseId,
          });
          setArray1(tempValue);
        } else {
          temArr.Conocimientos[i].IsActive = 'False';
          _removeItem(temArr.Conocimientos[i].id);
        }
      }
    }
    setResponse(temArr);
  };
  const updateTwo = () => {
    let tempValue = [...myArray2];
    if (!tempValue || !tempValue.length) {
      tempValue.push({
        id: response.Inglés.id,
        courseId: response.Inglés.courseId,
      });
      setArray2(tempValue);
    } else {
      const index = tempValue.map(e => e.id).indexOf(response.Inglés.id);
      if (index > -1) {
        tempValue.splice(index, 1);
      }
      setArray2(tempValue);
    }
  };
  const updateThree = () => {
    let tempValue = [...myArray3];
    if (!tempValue || !tempValue.length) {
      tempValue.push({
        id: response.Psicotécnicos.id,
        courseId: response.Psicotécnicos.courseId,
      });
      setArray3(tempValue);
    } else {
      const index = tempValue.map(e => e.id).indexOf(response.Psicotécnicos.id);
      if (index > -1) {
        tempValue.splice(index, 1);
      }
      setArray3(tempValue);
    }
  };
  const updateFour = () => {
    let tempValue = [...myArray4];
    if (!tempValue || !tempValue.length) {
      tempValue.push({
        id: response.Ortografía.id,
        courseId: response.Ortografía.courseId,
      });
      setArray4(tempValue);
    } else {
      const index = tempValue.map(e => e.id).indexOf(response.Ortografía.id);
      if (index > -1) {
        tempValue.splice(index, 1);
      }
      setArray4(tempValue);
    }
  };
  const updateFive = (id, CourseId) => {
    let temArr = {...response};
    let tempValue = [...myArray5];
    for (let i = 0; i < temArr.repaso.length; i++) {
      if (temArr.repaso[i].id === id) {
        if (temArr.repaso[i].IsActive === 'False') {
          temArr.repaso[i].IsActive = 'True';
          tempValue.push({
            id: temArr.repaso[i].id,
            courseId: temArr.repaso[i].courseId,
          });
          setArray5(tempValue);
        } else {
          temArr.repaso[i].IsActive = 'False';
          _removeItem5(temArr.repaso[i].id);
        }
      }
    }
    setResponse(temArr);
  };

  useEffect(() => {
    props.navigation.addListener('didFocus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }
    });
  }, []);

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
        leftClick={() => props.navigation.goBack()}
        title="Batalla"
      />

      <View style={styles.batlleView}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {/* Conocimientos */}
          <View style={styles.folderView}>
            <FastImage
              source={require('../../Images/empty_box.png')}
              style={[
                styles.vectorIcon3,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              {myArray1.length > 0 && (
                <FastImage
                  source={require('../../Images/Check.png')}
                  style={styles.vectorIcon}
                />
              )}
            </FastImage>
            <Text style={styles.folderName}>{'Conocimientos'}</Text>
          </View>
          {!response || !response.Conocimientos.length ? (
            <View />
          ) : (
            response.Conocimientos.map((item, index) => {
              return (
                <Items
                  key={'unique' + index}
                  isActive={item.IsActive}
                  ExamName={item.name}
                  clickHandler={() => {
                    updateOne(item.id, item.CourseId);
                  }}
                />
              );
            })
          )}
          {/* repaso */}
          <View style={styles.folderView}>
            <FastImage
              source={require('../../Images/empty_box.png')}
              style={[
                styles.vectorIcon3,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              {myArray5.length > 0 && (
                <FastImage
                  source={require('../../Images/Check.png')}
                  style={styles.vectorIcon}
                />
              )}
            </FastImage>
            <Text style={styles.folderName}>{'Repaso'}</Text>
          </View>
          {!response || !response.repaso.length ? (
            <View />
          ) : (
            response.repaso.map((item, index) => {
              return (
                <Items
                  key={'unique' + index}
                  isActive={item.IsActive}
                  ExamName={item.name}
                  clickHandler={() => {
                    updateFive(item.id, item.CourseId);
                  }}
                />
              );
            })
          )}

          {/* Inglés */}
          <View style={styles.folderView}>
            <TouchableOpacity onPress={() => updateTwo()}>
              <FastImage
                source={require('../../Images/empty_box.png')}
                style={[
                  styles.vectorIcon3,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                {myArray2.length > 0 && (
                  <FastImage
                    source={require('../../Images/Check.png')}
                    style={styles.vectorIcon}
                  />
                )}
              </FastImage>
            </TouchableOpacity>

            <Text style={styles.folderName}>{'Inglés'}</Text>
          </View>
          {/* {!response || !response.Inglés.length ?
                        <View />
                        : response.Inglés.map((item, index) => {
                            return (
                                <Items
                                    key={"unique" + index}
                                    isActive={item.IsActive}
                                    ExamName={item.name}
                                    clickHandler={() => { updateTwo(item.id, item.CourseId) }}
                                />
                            )
                        })} */}
          {/* Psicotécnicos */}
          <View style={styles.folderView}>
            <TouchableOpacity onPress={() => updateThree()}>
              <FastImage
                source={require('../../Images/empty_box.png')}
                style={[
                  styles.vectorIcon3,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                {myArray3.length > 0 && (
                  <FastImage
                    source={require('../../Images/Check.png')}
                    style={styles.vectorIcon}
                  />
                )}
              </FastImage>
            </TouchableOpacity>

            <Text style={styles.folderName}>{'Psicotécnicos'}</Text>
          </View>
          {/* {!response || !response.Psicotécnicos.length ?
                        <View />
                        : response.Psicotécnicos.map((item, index) => {
                            return (
                                <Items
                                    key={"unique" + index}
                                    isActive={item.IsActive}
                                    ExamName={item.name}
                                    clickHandler={() => { updateThree(item.id, item.CourseId) }}
                                />
                            )
                        })} */}
          {/* Ortografía */}
          <View style={styles.folderView}>
            <TouchableOpacity onPress={() => updateFour()}>
              <FastImage
                source={require('../../Images/empty_box.png')}
                style={[
                  styles.vectorIcon3,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                {myArray4.length > 0 && (
                  <FastImage
                    source={require('../../Images/Check.png')}
                    style={styles.vectorIcon}
                  />
                )}
              </FastImage>
            </TouchableOpacity>

            <Text style={styles.folderName}>{'Ortografía'}</Text>
          </View>
          {/* {!response || !response.Ortografía.length ?
                        <View />
                        : response.Ortografía.map((item, index) => {
                            return (
                                <Items
                                    key={"unique" + index}
                                    isActive={item.IsActive}
                                    ExamName={item.name}
                                    clickHandler={() => { updateFour(item.id, item.CourseId) }}
                                />
                            )
                        })} */}
        </ScrollView>
        <TouchableOpacity
          onPress={() => setIsOpen(true)}
          style={styles.createBtn}>
          <FastImage
            source={require('../../Images/createBattle.png')}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.createBtn}
          />
        </TouchableOpacity>
        {isOpen && (
          <ModalBox
            isOpen={isOpen}
            closeBox={() => setIsOpen(false)}
            yesClick={() => {
              setIsOpen(false);
              startBattleApi(true);
            }}
            noClick={() => {
              setIsOpen(false);
              startBattleApi(false);
            }}
          />
        )}
      </View>
      {isLoading && (
        <ActivityIndicator size="large" color="#000" style={styles.loading} />
      )}
    </FastImage>
  );
};

export default battle;
