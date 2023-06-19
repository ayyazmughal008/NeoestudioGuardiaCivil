import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import Header from '../../Component/Header';
import FastImage from 'react-native-fast-image';
import {useSelector, useDispatch} from 'react-redux';
import Orientation from 'react-native-orientation-locker';

const battle = props => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.user.login);
  const [isLoading, setLoading] = useState(false);

  const activeBattles = () => {
    Orientation.unlockAllOrientations();
    props.navigation.navigate('ActiveBattle');
  };

  const createBattles = () => {
    Orientation.unlockAllOrientations();
    props.navigation.navigate('CreateBatlle');
  };

  const finishBattles = () => {};

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
        source={require('../../Images/veoestudio.png')}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Header
        iconName="left"
        leftClick={() => this.props.navigation.goBack()}
        title="Batalla"
      />

      <View style={styles.directoryView}>
        <TouchableOpacity onPress={() => activeBattles()} style={styles.btn}>
          <FastImage
            source={require('../../Images/button.png')}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.btnTxt}>{'Batallas activas'}</Text>
          </FastImage>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => createBattles()} style={styles.btn}>
          <FastImage
            source={require('../../Images/button.png')}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.btnTxt}>{'Nueva batalla'}</Text>
          </FastImage>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => finishBattles()} style={styles.btn}>
          <FastImage
            source={require('../../Images/button.png')}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.btnTxt}>{'Batallas finalizadas'}</Text>
          </FastImage>
        </TouchableOpacity>
      </View>
      {isLoading && (
        <ActivityIndicator size="large" color="#000" style={styles.loading} />
      )}
    </FastImage>
  );
};

export default battle;
