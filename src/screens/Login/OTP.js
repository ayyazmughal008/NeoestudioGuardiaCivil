import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Platform,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';

import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import Header from '../../Component/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getOTPMobile, verifyMobileOTP} from '../../Redux/action';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNOtpVerify from 'react-native-otp-verify';
import SmsRetriever from 'react-native-sms-retriever';
import {fonts} from '../../utils';

const OTP = props => {
  const dispatch = useDispatch();
  const AuthLoading = useSelector(state => state.user.AuthLoading);
  const [isLoading, setLoading] = useState();
  const [code, setCode] = useState('');
  const inputEl = useRef(null);
  const [timerCount, setTimer] = useState(60);
  const [resend, setResend] = useState(true);
  const data = props.navigation.getParam('data', '');
  const type = props.navigation.getParam('type', '');

  const getOTPApi = async () => {
    setLoading(true);
    const result = await getOTPMobile(data.data.id, data.data.telephone);
    await setLoading(false);
  };

  useEffect(() => {
    const smsListner = async () => {
      try {
        const registered = await SmsRetriever.startSmsRetriever();
        if (registered) {
          //alert('registered')
          SmsRetriever.addSmsListener(event => {
            if (event) {
              const otp = /(\d{6})/g.exec(event.message)[1];
              setCode(otp);
              //alert(JSON.stringify(otp));
              SmsRetriever.removeSmsListener();
            }
          });
        }
      } catch (error) {
        //alert(JSON.stringify(error));
      }
    };
    smsListner();
    // return () => SmsRetriever.removeSmsListener();
  }, []);
  useEffect(() => {
    RNOtpVerify.getHash()
      .then(code => console.log(code))
      .catch(console.log);

    // RNOtpVerify.getOtp()
    //     .then(p => RNOtpVerify.addListener(otpHandler))
    //     .catch(p => console.log(p));

    // return () => RNOtpVerify.removeListener()
  }, {});

  useEffect(() => {
    setTimeout(() => {
      inputEl.current?.focusField(0);
    }, 500);
  }, []);

  useEffect(() => {
    getOTPApi();
  }, []);

  useEffect(() => {
    if (resend) {
      let interval = setInterval(() => {
        setTimer(lastTimerCount => {
          lastTimerCount <= 1 && clearInterval(interval);
          return lastTimerCount - 1;
        });
      }, 1000); //each count lasts for a second
      //cleanup the interval on complete
      return () => clearInterval(interval);
    }
  }, [resend]);

  useEffect(() => {
    if (timerCount == 0) {
      setResend(false);
    }
  }, [timerCount]);

  return (
    <FastImage
      source={
        Platform.OS === 'android'
          ? require('./assets/bg2.jpg')
          : require('../Login/assets/bg2Ios.jpeg')
      }
      resizeMode={FastImage.resizeMode.stretch}
      style={styles.container}>
      <View style={styles.centerView}>
        <Text style={styles.verify}>{'Verificación del teléfono'}</Text>
        <Text
          style={[
            styles.received,
            {
              //marginVertical: heightPercentageToDP(-2),
              color: '#659ece',
              fontFamily: fonts.novaBold,
              fontSize: widthPercentageToDP(4.5),
            },
          ]}>
          {'Introduce el código del SMS'}
        </Text>
        {/* <Text style={styles.received}>{"Copia el código de verificación aquí 👇"}</Text> */}

        <OTPInputView
          ref={input => (inputEl.current = input)}
          style={{width: '100%', height: 150, alignSelf: 'center'}}
          pinCount={6}
          code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={code => setCode(code)}
          autoFocusOnLoad={true}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={num => {
            console.log('===>', num);
          }}
        />
        {code ? (
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => {
              dispatch(verifyMobileOTP(data.data.id, code, data));
            }}>
            <FastImage
              source={require('../../Images/button.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.button}>
              <Text style={styles.btnText2}>{'Ingresar'}</Text>
            </FastImage>
          </TouchableOpacity>
        ) : null}
        <Text
          style={[
            styles.received,
            {
              marginVertical: heightPercentageToDP(2),
            },
          ]}>
          {'¿No recibiste ningún código?'}
        </Text>
        <View style={styles.row}>
          <Text
            style={[
              styles.received,
              {
                marginVertical: heightPercentageToDP(2),
                color: '#659ece',
                fontFamily: fonts.novaBold,
                fontSize: widthPercentageToDP(4),
              },
            ]}>
            {'Reenviar código en ' + timerCount + ' segundos'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setTimer(60);
              setResend(true);
              getOTPApi();
            }}
            disabled={resend ? true : false}
            style={{...styles.circle, opacity: resend ? 0.6 : 1}}>
            <AntDesign name="arrowright" color="#ffffff" size={30} />
          </TouchableOpacity>
        </View>

        {isLoading && (
          <ActivityIndicator
            size={'large'}
            color="#000"
            style={styles.loading}
          />
        )}
        {AuthLoading && (
          <ActivityIndicator
            size={'large'}
            color="#000"
            style={styles.loading}
          />
        )}
      </View>
    </FastImage>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  centerView: {
    width: widthPercentageToDP(85),
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPercentageToDP(45),
    // position: "absolute",
    // bottom: "0%"
    //backgroundColor:"red"
  },
  logo: {
    position: 'absolute',
    right: '0%',
    top: '0%',
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(9),
  },
  verify: {
    //marginVertical: heightPercentageToDP(3),
    //paddingLeft: widthPercentageToDP(),
    fontFamily: fonts.novaBold,
    fontSize: widthPercentageToDP(6),
    color: 'black',
  },
  btnText2: {
    //marginVertical: heightPercentageToDP(3),
    //paddingLeft: widthPercentageToDP(),
    fontFamily: fonts.novaBold,
    fontSize: widthPercentageToDP(6),
    color: 'white',
  },
  received: {
    //marginVertical: heightPercentageToDP(-3),
    //paddingLeft: widthPercentageToDP(4),
    fontFamily: fonts.novaRegular,
    fontSize: widthPercentageToDP(3.5),
    color: 'grey',
    textAlign: 'center',
  },
  smallText: {
    marginVertical: heightPercentageToDP(-3),
    //paddingLeft: widthPercentageToDP(4),
    fontFamily: fonts.novaRegular,
    fontSize: widthPercentageToDP(3.5),
    color: 'grey',
  },
  // borderStyleBase: {
  //     width: 40,
  //     height: 45,
  // },

  // borderStyleHighLighted: {
  //     borderColor: "#03DAC6",
  //     color:"black",
  // },

  underlineStyleBase: {
    width: widthPercentageToDP(13),
    height: heightPercentageToDP(10),
    borderWidth: widthPercentageToDP(0.2),
    borderColor: '#659ece',
    fontSize: widthPercentageToDP(8),
    color: 'black',
    fontFamily: fonts.novaRegular,
  },

  underlineStyleHighLighted: {
    width: widthPercentageToDP(13),
    height: heightPercentageToDP(10),
    borderWidth: widthPercentageToDP(0.2),
    borderColor: '#659ece',
    fontSize: widthPercentageToDP(8),
    color: 'black',
    fontFamily: fonts.novaRegular,
  },
  btn: {
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(7),
    backgroundColor: '#659ece',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPercentageToDP(10),
    alignSelf: 'center',
  },
  btnText: {
    fontFamily: fonts.novaRegular,
    fontSize: widthPercentageToDP(4.5),
    color: 'white',
  },
  row: {
    marginTop: heightPercentageToDP(-2),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circle: {
    width: widthPercentageToDP(16),
    height: widthPercentageToDP(16),
    borderRadius: widthPercentageToDP(16) / 2,
    backgroundColor: '#659ece',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: heightPercentageToDP(5)
  },
  btnStyle: {
    //marginTop:heightPercentageToDP(2),
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentageToDP(80),
    height: widthPercentageToDP(15),
    alignSelf: 'center',
    //backgroundColor:"yellow"
    marginTop: heightPercentageToDP(-2),
  },
});

export default OTP;
