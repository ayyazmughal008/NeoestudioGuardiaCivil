import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
} from 'react-native';
import {heightPercentageToDP, widthPercentageToDP} from '../MakeMeResponsive';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import {fonts} from '../../utils';

const BaremoUpdate = ({
  isOpen,
  yesClick,
  noClick,
  myText,
  baremoText,
}) => {
  return (
    <Modal
      transparent={true}
      visible={isOpen}
      animationType="slide"
      supportedOrientations={['portrait', 'landscape']}
      onRequestClose={() => {
        console.log('alert close');
      }}>
      <View style={styles.modalMain}>
        <View
          style={[
            styles.quesBox,
            {
              height: DeviceInfo.isTablet()
                ? widthPercentageToDP(40)
                : widthPercentageToDP(50),
            },
          ]}>
          <Text style={styles.text1}>
            {!myText ? 'Por favor escribe el baremo y presiona sí.' : myText}
          </Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={baremoText}
            placeholder="Escribe Baremo"
            placeholderTextColor={'black'}
            style={{
              width: widthPercentageToDP(80),
              height: heightPercentageToDP(6),
              fontFamily: fonts.novaRegular,
              color: 'black',
              paddingLeft: widthPercentageToDP(5),
              borderWidth: widthPercentageToDP(0.2),
              borderColor: 'black',
              borderRadius: widthPercentageToDP(4),
            }}
          />
          <View style={styles.bottomView}>
            <TouchableOpacity style={styles.confirmBtn} onPress={yesClick}>
              <FastImage
                source={require('../../Images/Si.png')}
                style={styles.btnImage}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} onPress={noClick}>
              <FastImage
                source={require('../../Images/No.png')}
                style={styles.btnImage}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  text1: {
    marginTop: widthPercentageToDP(7),
    color: '#252525',
    fontFamily: fonts.novaBold,
    //marginLeft: widthPercentageToDP(-4),
    fontSize: widthPercentageToDP(4),
    width: widthPercentageToDP(70),
    padding: widthPercentageToDP(2),
    textAlign: 'center',
  },
  quesBox: {
    width: widthPercentageToDP(95),
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: widthPercentageToDP(4),
    //justifyContent: "center"
  },
  confirmBtn: {
    width: widthPercentageToDP(25),
    height: heightPercentageToDP(5),
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:"red"
  },
  btnImage: {
    width: widthPercentageToDP(43),
    height: widthPercentageToDP(20),
    //marginTop:heightPercentageToDP(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    // position: 'absolute',
    // bottom: '4%',
    marginTop: heightPercentageToDP(2),
    height: widthPercentageToDP(10),
    flexDirection: 'row',
    alignItems: 'center',
    width: widthPercentageToDP(80),
    justifyContent: 'space-around',
    //backgroundColor:"red"
  },
});
export default BaremoUpdate;
