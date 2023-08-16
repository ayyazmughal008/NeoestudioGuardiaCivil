import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import Header from '../../Component/Header';
import {widthPercentageToDP} from '../../Component/MakeMeResponsive';
import ModalBox from '../../Component/Modal';
import {deleteMyUser, logout} from '../../Redux/action';
import {useSelector, useDispatch} from 'react-redux';

const Settings = props => {
  const dispatch = useDispatch();
  const [isPopUp, setpop] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const login = useSelector(state => state.user.login);
  const text = 'User has been deleted !';

  const apiCall = async () => {
    setpop(false);
    setLoading(true);
    const response = await deleteMyUser('7642');
    setLoading(false);
    if (response?.message === text) {
      logoutApi();
    }else{
        Alert.alert('Solicitud fallida',response?.message)
    }
  };

  const logoutApi = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(logout());
    }, 15000);
  };

  return (
    <FastImage
      style={styles.root}
      resizeMode={FastImage.resizeMode.stretch}
      source={require('../../Images/bg.png')}>
      <FastImage
        source={
          Platform.OS === 'android'
            ? require('../../Images/veoestudio.png')
            : require('../../Images/ios_logo.png')
        }
        resizeMode={FastImage.resizeMode.contain}
        style={styles.logo}
      />
      <Header
        iconName="left"
        leftClick={() => props.navigation.goBack()}
        title={'Ajustes'}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.mainTitle}>{'Gestiona tu cuenta'}</Text>
        <View style={styles.rowView}>
          <Text style={styles.itemTitle}>{'Borrar usuario'}</Text>
          <TouchableOpacity onPress={() => setpop(true)} style={styles.btn}>
            <FastImage
              source={require('../../Images/button.png')}
              resizeMode={'contain'}
              style={styles.imgBtn}>
              <Text
                style={[
                  styles.itemTitle,
                  {color: 'white', fontSize: widthPercentageToDP(3.5)},
                ]}>
                {'Confirmar'}
              </Text>
            </FastImage>
          </TouchableOpacity>
        </View>
      </View>
      {isPopUp && (
        <ModalBox
          isOpen={isPopUp}
          myText={
            'Su cuenta se eliminará de forma permanente y, junto con todos los datos de clasificación, se eliminarán. ¿Estas seguro que deseas continuar?'
          }
          noClick={() => setpop(false)}
          closeBox={() => setpop(false)}
          yesClick={() => apiCall()}
        />
      )}
      {isLoading && (
        <ActivityIndicator
          style={styles.loading}
          size={'large'}
          color={'black'}
        />
      )}
    </FastImage>
  );
};

export default Settings;
