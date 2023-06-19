import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import { fonts } from '../../utils';

class ModalBox extends React.Component {
  render() {
    const {isOpen, closeBox, yesClick, noClick} = this.props;
    return (
      <Modal
        transparent={true}
        visible={isOpen}
        animationType="slide"
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={() => {
          console.log('alert close');
        }}>
        <TouchableOpacity
          style={styles.modalMain}
          activeOpacity={1}
          onPressOut={closeBox}>
          <TouchableWithoutFeedback>
            <FastImage
              source={require('../../screens/Home/assets/email_box.png')}
              resizeMode={FastImage.resizeMode.stretch}
              style={[
                styles.quesBox,
                {
                  height: DeviceInfo.isTablet()
                    ? widthPercentageToDP(55)
                    : widthPercentageToDP(53),
                },
              ]}>
              <Text style={styles.text1}>
                {
                  'Has creado una nueva batalla, ¿quieres enviar una notificación a tus compañeros para invitarles a unirse?'
                }
              </Text>
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
            </FastImage>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modalMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    //justifyContent: "center"
  },
  confirmBtn: {
    width: widthPercentageToDP(25),
    height: heightPercentageToDP(5),
    marginTop: heightPercentageToDP(0),
    marginBottom: widthPercentageToDP(1.5),
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:"red"
  },
  btnImage: {
    width: widthPercentageToDP(43),
    height: heightPercentageToDP(20),
    //marginTop:heightPercentageToDP(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    position: 'absolute',
    bottom: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    justifyContent: 'space-around',
  },
});
export default ModalBox;
