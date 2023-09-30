import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import Header from '../../Component/Header';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {StackActions, NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import {showHUD, hideHUD} from '../../Component/Loader';
import IAP, {purchaseErrorListener} from 'react-native-iap';
import {validate} from '@babel/types';
import {updateSubscription} from '../../Redux/action';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const items = Platform.select({
  ios: [
    'NGC2_15_PM',
    'NGC2_25_PF',
    'NGC2_120_PA',
    'NGC2_45_OM',
    'NGC2_75_OF',
    'NGC2_360_OA',
    'NGC2_80_DM',
    'NGC2_120_DF',
    'NGC2_560_DA',
  ],
  android: [''],
});

let purchaseUpdateListner;
let purchaseErrorListner;

const IAPurchase = props => {
  const login = useSelector(state => state.user.login);
  const [purchased, setPurchase] = useState(false);
  const [products, setProducts] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [tenure, setTenure] = useState('');
  const [packagePlan, setPackage] = useState('');
  const [myReceipt, setMyReceipt] = useState('');

  useEffect(() => {
    IAP.initConnection()
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        console.log('connecting to store ...');
        getSubscriptions();
      });
    purchaseErrorListner = IAP.purchaseErrorListener(error => {
      setLoading(false);
      console.log(error);
    });
    purchaseUpdateListner = IAP.purchaseUpdatedListener(purchase => {
      try {
        const recipt = purchase.transactionReceipt;
        setMyReceipt(recipt);
        //setPurchase(true)
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    });
  }, []);

  const getSubscriptions = async () => {
    setLoading(true);
    try {
      const products = await IAP.getSubscriptions(items);
      console.log(products);
      setProducts(products);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const validate = async receipt => {
    const reciptBody = {
      'receipt-data': receipt,
      password: '70f6c4d6a650424c9636968b5fbc6b3a',
    };
    const result = await IAP.validateReceiptIos(reciptBody, true)
      .catch(error => {
        console.log(error);
      })
      .then(receipt => {
        try {
          const renewalHistory = receipt.latest_expired_receipt_info;
          const expiration = renewalHistory.expires_date_ms;
          let expired = Date.now() > expiration;
          if (!expired) {
            setPurchase(true);
          } else {
            Alert.alert(
              'expire subscription',
              'Your subscription has been expired',
            );
          }
        } catch (error) {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    if (myReceipt) {
      updateMyPackage(amount, tenure, packagePlan);
    }
  }, [amount, tenure, packagePlan, myReceipt]);

  const updateMyPackage = async (amount, tenure, packagePlan) => {
    await updateSubscription(
      login.data.id,
      amount,
      tenure,
      packagePlan,
      'success',
    );
    await setLoading(false);
  };

  return (
    <FastImage
      source={require('../../Images/bg.png')}
      resizeMode={FastImage.resizeMode.stretch}
      style={styles.container}>
      {/* <TouchableOpacity
                style={{
                    zIndex: 1,
                    position: 'absolute',
                    left: "3%",
                    top: "4%",
                    alignItem: "center",
                    with: widthPercentageToDP(7),
                    height: widthPercentageToDP(7),
                    //backgroundColor:"red"
                }}
                onPress={() => props.navigation.goBack()}
            >
                <Icon
                    name="left"
                    color="#707070"
                    size={widthPercentageToDP(7)}
                />
            </TouchableOpacity> */}
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
        title={'¡Pídelo ya!'}
      />
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        {!products || !products.length ? (
          <View />
        ) : (
          <View>
            <Text
              style={[
                styles.title,
                {
                  textAlign: 'center',
                  fontSize: widthPercentageToDP(8),
                  //marginBottom: heightPercentageToDP(3),
                  marginTop: heightPercentageToDP(2),
                },
              ]}>
              {'Plata'}
            </Text>
            <FastImage
              source={require('../../Images/Plata.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.packageImageView}
            />
            <FastImage
              source={require('./assets/Plata_min.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.packageDetail}
            />
            <View style={styles.rowView}>
              <TouchableOpacity
                style={{width: '33%', height: '100%'}}
                onPress={() => {
                  setLoading(true),
                    setPackage('4'),
                    setTenure('monthly'),
                    setAmount(products[2].price.toString()),
                    IAP.requestSubscription(products[2]['productId']);
                }}>
                <FastImage
                  source={{
                    uri: 'https://www.neoestudio.net/neostudio/pages/comienza/Mensual.png',
                    priority: 'high',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: '33%', height: '100%'}}
                onPress={() => {
                  setLoading(true);
                  setPackage('4');
                  setTenure('fractional');
                  setAmount(products[3].price);
                  IAP.requestSubscription(products[3]['productId']);
                }}>
                <FastImage
                  source={{
                    uri: 'https://www.neoestudio.net/neostudio/pages/comienza/Fraccionado.png',
                    priority: 'high',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: '33%', height: '100%'}}
                onPress={() => {
                  setLoading(true);
                  setPackage('4');
                  setTenure('annual');
                  setAmount(products[1].price);
                  IAP.requestSubscription(products[1]['productId']);
                }}>
                <FastImage
                  source={{
                    uri: 'https://www.neoestudio.net/neostudio/pages/comienza/Anual.png',
                    priority: 'high',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.rowView,
                {
                  height: heightPercentageToDP(5),
                  justifyContent: 'space-around',
                },
              ]}>
              <Text
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4),
                    //marginBottom: heightPercentageToDP(3),
                  },
                ]}>
                {products[2].localizedPrice}
                <Text
                  style={[
                    styles.title,
                    {
                      fontFamily: 'Proximasoft-Regular',
                      fontSize: widthPercentageToDP(4),
                    },
                  ]}>
                  {'/mes'}
                </Text>
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4),
                    marginRight: widthPercentageToDP(2),
                  },
                ]}>
                {products[3].localizedPrice}
                <Text
                  style={[
                    styles.title,
                    {
                      fontFamily: 'Proximasoft-Regular',
                      fontSize: widthPercentageToDP(4),
                    },
                  ]}>
                  {'\n' + 'durante 6 meses'}
                </Text>
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4),
                    marginRight: widthPercentageToDP(3.5),
                  },
                ]}>
                {products[1].localizedPrice}
              </Text>
            </View>
            {/* Oro section start */}

            {/* <Text
              style={[
                styles.title,
                {
                  textAlign: 'center',
                  fontSize: widthPercentageToDP(8),
                  //marginBottom: heightPercentageToDP(3),
                  marginTop: heightPercentageToDP(2),
                },
              ]}>
              {'Oro'}
            </Text>
            <FastImage
              source={require('../../Images/Oro.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.packageImageView}
            />
            <FastImage
              source={require('./assets/Oro_min.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={[
                styles.packageDetail,
                {
                  height: widthPercentageToDP(160),
                },
              ]}
            />
            <View style={styles.rowView}>
              <TouchableOpacity
                style={{width: '33%', height: '100%'}}
                onPress={() => {
                  setLoading(true);
                  setPackage('5');
                  setTenure('monthly');
                  setAmount(products[5].price);
                  IAP.requestSubscription(products[5]['productId']);
                }}>
                <FastImage
                  source={{
                    uri: 'https://www.neoestudio.net/neostudio/pages/comienza/Mensual.png',
                    priority: 'high',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: '33%', height: '100%'}}
                onPress={() => {
                  setLoading(true);
                  setPackage('5');
                  setTenure('fractional');
                  setAmount(products[7].price);
                  IAP.requestSubscription(products[7]['productId']);
                }}>
                <FastImage
                  source={{
                    uri: 'https://www.neoestudio.net/neostudio/pages/comienza/Fraccionado.png',
                    priority: 'high',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: '33%', height: '100%'}}
                onPress={() => {
                  setLoading(true);
                  setPackage('5');
                  setTenure('annual');
                  setAmount(products[4].price);
                  IAP.requestSubscription(products[4]['productId']);
                }}>
                <FastImage
                  source={{
                    uri: 'https://www.neoestudio.net/neostudio/pages/comienza/Anual.png',
                    priority: 'high',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.rowView,
                {
                  height: heightPercentageToDP(5),
                  justifyContent: 'space-around',
                },
              ]}>
              <Text
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4),
                    //marginBottom: heightPercentageToDP(3),
                  },
                ]}>
                {products[5].localizedPrice}
                <Text
                  style={[
                    styles.title,
                    {
                      fontFamily: 'Proximasoft-Regular',
                      fontSize: widthPercentageToDP(4),
                    },
                  ]}>
                  {'/mes'}
                </Text>
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4),
                    marginRight: widthPercentageToDP(2),
                  },
                ]}>
                {products[7].localizedPrice}
                <Text
                  style={[
                    styles.title,
                    {
                      fontFamily: 'Proximasoft-Regular',
                      fontSize: widthPercentageToDP(4),
                    },
                  ]}>
                  {'\n' + 'durante 6 meses'}
                </Text>
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4),
                    marginRight: widthPercentageToDP(3.5),
                  },
                ]}>
                {products[4].localizedPrice}
              </Text>
            </View> */}

            {/* Diamante section start */}
            <Text
              style={[
                styles.title,
                {
                  textAlign: 'center',
                  fontSize: widthPercentageToDP(8),
                  //marginBottom: heightPercentageToDP(3),
                  marginTop: heightPercentageToDP(2),
                },
              ]}>
              {'Diamante'}
            </Text>
            <FastImage
              source={require('../../Images/Oro.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.packageImageView}
            />
            <FastImage
              source={require('./assets/Diamante_min.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={[
                styles.packageDetail,
                {
                  height: widthPercentageToDP(180),
                },
              ]}
            />
            <View style={styles.rowView}>
              <TouchableOpacity
                style={{width: '33%', height: '100%'}}
                onPress={() => {
                  setLoading(true);
                  setPackage('6');
                  setTenure('monthly');
                  setAmount(products[8].price);
                  IAP.requestSubscription(products[8]['productId']);
                }}>
                <FastImage
                  source={{
                    uri: 'https://www.neoestudio.net/neostudio/pages/comienza/Mensual.png',
                    priority: 'high',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: '33%', height: '100%'}}
                onPress={() => {
                  setLoading(true);
                  setPackage('6');
                  setTenure('fractional');
                  setAmount(products[0].price);
                  IAP.requestSubscription(products[0]['productId']);
                }}>
                <FastImage
                  source={{
                    uri: 'https://www.neoestudio.net/neostudio/pages/comienza/Fraccionado.png',
                    priority: 'high',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: '33%', height: '100%'}}
                onPress={() => {
                  setLoading(true);
                  setPackage('6');
                  setTenure('annual');
                  setAmount(products[6].price);
                  IAP.requestSubscription(products[6]['productId']);
                }}>
                <FastImage
                  source={{
                    uri: 'https://www.neoestudio.net/neostudio/pages/comienza/Anual.png',
                    priority: 'high',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.rowView,
                {
                  height: heightPercentageToDP(5),
                  justifyContent: 'space-around',
                },
              ]}>
              <Text
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4),
                    //marginBottom: heightPercentageToDP(3),
                  },
                ]}>
                {products[8].localizedPrice}
                <Text
                  style={[
                    styles.title,
                    {
                      fontFamily: 'Proximasoft-Regular',
                      fontSize: widthPercentageToDP(4),
                    },
                  ]}>
                  {'/mes'}
                </Text>
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4),
                    marginRight: widthPercentageToDP(2),
                  },
                ]}>
                {products[0].localizedPrice}
                <Text
                  style={[
                    styles.title,
                    {
                      fontFamily: 'Proximasoft-Regular',
                      fontSize: widthPercentageToDP(4),
                    },
                  ]}>
                  {'\n' + 'durante 6 meses'}
                </Text>
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4),
                    marginRight: widthPercentageToDP(3.5),
                  },
                ]}>
                {products[6].localizedPrice}
              </Text>
            </View>
            <View
              style={[
                styles.rowView,
                {
                  height: heightPercentageToDP(5),
                  justifyContent: 'space-around',
                },
              ]}>
              <Text
                onPress={() => {
                  Linking.openURL(
                    'https://neoestudio.net/pol%C3%ADtica-de-privacidad-y-protecci%C3%B3n-de-datos',
                  );
                }}
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4.5),
                    marginLeft: widthPercentageToDP(2),
                    //marginRight: widthPercentageToDP(2)
                  },
                ]}>
                {'Política de privacidad'}
              </Text>
              <Text
                onPress={() => {
                  Linking.openURL(
                    'https://neoestudio.net/aviso-legal-y-t%C3%A9rminos-de-uso',
                  );
                }}
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4.5),
                    marginRight: widthPercentageToDP(2),
                    //marginRight: widthPercentageToDP(2)
                  },
                ]}>
                {'Términos de servicio'}
              </Text>
            </View>
          </View>
        )}
        <View style={{height: heightPercentageToDP(4)}} />
      </KeyboardAwareScrollView>
      {isLoading ? showHUD('Cargando..') : hideHUD()}
    </FastImage>
  );
};

export default IAPurchase;
