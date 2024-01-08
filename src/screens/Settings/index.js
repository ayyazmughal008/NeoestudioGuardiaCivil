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
import {
  deleteMyUser,
  logout,
  resetAllActivities,
  resetAllExams,
  updateUserBaremo,
  getCurrentUser,
} from '../../Redux/action';
import {useSelector, useDispatch} from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import BaremoUpdate from '../../Component/BaremoModal';

const Settings = props => {
  const dispatch = useDispatch();
  const [isPopUp, setpop] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isNoti, setNoti] = useState(false);
  const [baremoTxt, setBaremo] = useState(0);
  const [baremoModal, showBaremo] = useState(false);

  const login = useSelector(state => state.user.login);
  const AuthLoading = useSelector(state => state.user.AuthLoading);
  const text = 'User has been deleted !';

  const apiCall = async () => {
    setpop(false);
    setLoading(true);
    const response = await deleteMyUser(login?.data?.id);
    setLoading(false);
    if (response?.message === text) {
      logoutApi();
    } else {
      Alert.alert('Solicitud fallida', response?.message);
    }
  };

  const barempApiCall = async () => {
    setLoading(true);
    const response = await updateUserBaremo(login?.data?.id, baremoTxt);
    setLoading(false);
    dispatch(getCurrentUser(login?.data?.id));
  };

  const logoutApi = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(logout());
    }, 15000);
  };

  const _resetActivity = async () => {
    setLoading(true);
    const result = await resetAllActivities(login.data.id);
    setLoading(false);
    if (result?.status === 'Successfull') {
      Alert.alert('', 'Todas las actividades se han reiniciado.');
    }
  };

  return (
    <FastImage
      style={styles.root}
      resizeMode={FastImage.resizeMode.stretch}
      source={require('../Exames/assets/back3.png')}>
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
        {/* reset exames */}
        <View
          style={[
            styles.rowView,
            {marginTop: 0, width: widthPercentageToDP(75)},
          ]}>
          <Text style={styles.itemTitle}>{'Puntos de baremo'}</Text>
          <Text onPress={() => showBaremo(true)} style={styles.itemTitle}>
            {login.data.baremo}
          </Text>
        </View>
        {/* Notification Block */}
        <View
          style={[
            styles.rowView,
            {marginTop: 0, width: widthPercentageToDP(80)},
          ]}>
          <Text style={styles.itemTitle}>{'Notificaciones Push'}</Text>
          <ToggleSwitch
            isOn={isNoti}
            onColor="green"
            offColor="red"
            //label="Example label"
            labelStyle={{color: 'black', fontWeight: '900'}}
            size="small"
            onToggle={isOn => setNoti(isOn)}
          />
        </View>
        {/* reset exames */}
        <View style={[styles.rowView, {marginTop: 0}]}>
          <Text style={styles.itemTitle}>{'Resetear Exámenes'}</Text>
          <TouchableOpacity
            onPress={() => dispatch(resetAllExams(login?.data?.id))}
            style={styles.btn}>
            <FastImage
              source={require('../../Images/button.png')}
              resizeMode={'contain'}
              style={styles.imgBtn}>
              <Text
                style={[
                  styles.itemTitle,
                  {color: 'white', fontSize: widthPercentageToDP(3.5)},
                ]}>
                {'Reiniciar'}
              </Text>
            </FastImage>
          </TouchableOpacity>
        </View>
        {/* reset actividades */}
        <View style={[styles.rowView, {marginTop: 0}]}>
          <Text style={styles.itemTitle}>{'Resetear Actividades'}</Text>
          <TouchableOpacity onPress={() => _resetActivity()} style={styles.btn}>
            <FastImage
              source={require('../../Images/button.png')}
              resizeMode={'contain'}
              style={styles.imgBtn}>
              <Text
                style={[
                  styles.itemTitle,
                  {color: 'white', fontSize: widthPercentageToDP(3.5)},
                ]}>
                {'Reiniciar'}
              </Text>
            </FastImage>
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.mainTitle}>{'Gestiona tu cuenta'}</Text> */}
        <View style={[styles.rowView, {marginTop: 0}]}>
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
      {AuthLoading && (
        <ActivityIndicator
          style={styles.loading}
          size={'large'}
          color={'black'}
        />
      )}
      <BaremoUpdate
        isOpen={baremoModal}
        baremoText={text => setBaremo(text)}
        yesClick={() => {
          //console.log('hii',baremoTxt);
          if (baremoTxt === 0) {
            Alert.alert('', 'Por favor escriba un número baremo válido.');
          } else {
            showBaremo(false);
            barempApiCall();
          }
        }}
        noClick={() => {
          showBaremo(false);
        }}
        myText = {"Escribe tu escala y presiona el botón Enviar."}
      />
    </FastImage>
  );
};

export default Settings;
