import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import {styles} from './styles';
import Header from '../../Component/Header';
import FastImage from 'react-native-fast-image';
import {useSelector, useDispatch} from 'react-redux';
import Items from '../../Component/CurrentBattle';
import {getAllActiveBattle, joinMyBattle} from '../../Redux/action';
import Orientation from 'react-native-orientation-locker';

const battle = props => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.user.login);
  const AuthLoading = useSelector(state => state.user.AuthLoading);
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    setLoading(true);
    const result = await getAllActiveBattle(login.data.id, login.data.type);
    setLoading(false);
    if (result.status === 'Successfull') {
      setResponse(result?.data);
    }
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
        source={Platform.OS === 'android' ?
         require('../../Images/veoestudio.png')
        :require('../../Images/ios_logo.png')}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Header
        iconName="left"
        leftClick={() => props.navigation.goBack()}
        title="Tests a la carta"
      />

      <View style={styles.batlleView}>
        {!response || !response.length ? (
          <View />
        ) : (
          <FlatList
            data={response}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <Items
                  userImage={item.photo}
                  key={'unique' + index}
                  ActiveUsers={item.ActiveUsers}
                  name={item.username}
                  FolderDetails={item.FolderDetails}
                  isActive={true}
                  clickHandler={() => {
                    Orientation.unlockAllOrientations();
                    dispatch(
                      joinMyBattle(
                        login.data.id,
                        login.data.type,
                        item.id,
                        null,
                        null,
                        null,
                      ),
                    );
                  }}
                />
              );
            }}
          />
        )}

        <TouchableOpacity
          onPress={() => (
            Orientation.unlockAllOrientations(),
            props.navigation.navigate('CreateBatlle')
          )}
          style={styles.createBtn}>
          <FastImage
            source={require('../../Images/createBattle.png')}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.createBtn}
          />
        </TouchableOpacity>
      </View>
      {isLoading && (
        <ActivityIndicator size="large" color="#000" style={styles.loading} />
      )}
      {AuthLoading && (
        <ActivityIndicator size="large" color="#000" style={styles.loading} />
      )}
    </FastImage>
  );
};

export default battle;
