import React from 'react';
import {
  View,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import HTML from 'react-native-render-html';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import ImageZoom from 'react-native-image-pan-zoom';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import ScrollView2 from 'rn-faded-scrollview';
import {styles} from './styles';
import { fonts } from '../../utils';

const {width} = Dimensions.get('window');

export default class PaperLayout extends React.Component {
  state = {
    loading: false,
  };

  scale = new Animated.Value(1);

  onZoomEvent = Animated.event(
    [
      {
        nativeEvent: {scale: this.scale},
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  onZoomStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(this.scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  render() {
    const {
      isAttempt,
      isOption1,
      option1,
      option2,
      option3,
      option4,
      question,
      clickHandler1,
      clickHandler2,
      clickHandler3,
      clickHandler4,
      imgURL,
      ModalClick,
      isCorrect,
      description,
    } = this.props;
    return (
      <View
        style={{
          width: '100%',
          height: '80%',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flex: 1,
            marginRight: widthPercentageToDP(3),
            marginTop: widthPercentageToDP(-0.5),
          }}>
          <HTML
            html={question}
            classesStyles={{
              regular: {
                //fontSize: widthPercentageToDP(2.5),
                fontFamily: fonts.novaRegular,
                color: '#000',
              },
              bold: {
                //fontSize: widthPercentageToDP(2.5),
                fontFamily: fonts.novaBold,
                fontWeight: 'normal',
                color: '#000',
              },
              round: {
                //fontSize: widthPercentageToDP(2.5),
                fontFamily: fonts.elegance,
                color: '#000',
              },
            }}
            tagsStyles={{
              p: {
                padding: 6,
              },
              span: {
                //fontSize: Platform.isPad ? widthPercentageToDP(2.5) : widthPercentageToDP(4),
                flexDirection: 'row',
              },
              tap: {
                fontSize: DeviceInfo.isTablet()
                  ? widthPercentageToDP(2)
                  : widthPercentageToDP(1.5),
              },
            }}
          />
          <ScrollView2
            contentContainerStyle={{
              flexGrow: 0,
              alignItems: 'center',
            }}
            allowStartFade={true}
            fadeColors={[
              'rgba(255,255,255, 0.18)',
              'rgba(255,255,255, 0.6)',
              'rgba(255,255,255, 0.9)',
            ]}
            fadeSize={20}>
            <View
              style={{
                width: widthPercentageToDP(80),
                height: heightPercentageToDP(72),
                marginTop: widthPercentageToDP(-1),
              }}>
              <TouchableOpacity onPress={ModalClick}>
                <FastImage
                  style={{
                    width: widthPercentageToDP(80),
                    height: heightPercentageToDP(72),
                  }}
                  onLoadStart={e => this.setState({loading: true})}
                  onLoad={e => this.setState({loading: false})}
                  onLoadEnd={e => this.setState({loading: false})}
                  onError={error =>
                    Alert.alert(
                      'Problema de Internet',
                      'La imagen no se ha podido cargar correctamente. Por favor, compruebe su conexión a internet.',
                    )
                  }
                  source={{
                    uri: imgURL,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                {this.state.loading && (
                  <ActivityIndicator
                    size="large"
                    color="#000"
                    style={styles.loading}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                height: '15%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                //backgroundColor:"red",
                // position:"absolute",
                marginTop: widthPercentageToDP(1),
                bottom: '3%',
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '20%',
                }}
                disabled={isAttempt ? true : false}
                onPress={clickHandler1}>
                {isCorrect === 'a' || isCorrect === 'a y b' ? (
                  <Image
                    style={{
                      width: widthPercentageToDP(3),
                      height: widthPercentageToDP(3),
                    }}
                    resizeMode="stretch"
                    source={require('../../Images/correct.png')}
                  />
                ) : isOption1 === 'answer1' ? (
                  <Image
                    style={{
                      width: widthPercentageToDP(3),
                      height: widthPercentageToDP(3),
                    }}
                    resizeMode="stretch"
                    source={require('../../Images/cross.png')}
                  />
                ) : (
                  <View
                    style={{
                      width: widthPercentageToDP(3),
                      height: widthPercentageToDP(3),
                    }}
                  />
                )}
                <View
                  style={{
                    marginLeft: widthPercentageToDP(0.5),
                  }}>
                  <HTML
                    html={option1}
                    classesStyles={{
                      regular: {
                        //fontSize: widthPercentageToDP(2.5),
                        fontFamily: fonts.novaRegular,
                        color: '#000',
                      },
                      bold: {
                        //fontSize: widthPercentageToDP(2.5),
                        fontFamily: fonts.novaBold,
                        fontWeight: 'normal',
                        color: '#000',
                      },
                      round: {
                        //fontSize: widthPercentageToDP(2.5),
                        fontFamily: fonts.elegance,
                        color: '#000',
                      },
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '20%',
                }}
                disabled={isAttempt ? true : false}
                onPress={clickHandler2}>
                {isCorrect === 'b' || isCorrect === 'a y b' ? (
                  <Image
                    style={{
                      width: widthPercentageToDP(3),
                      height: widthPercentageToDP(3),
                    }}
                    resizeMode="stretch"
                    source={require('../../Images/correct.png')}
                  />
                ) : isOption1 === 'answer2' ? (
                  <Image
                    style={{
                      width: widthPercentageToDP(3),
                      height: widthPercentageToDP(3),
                    }}
                    resizeMode="stretch"
                    source={require('../../Images/cross.png')}
                  />
                ) : (
                  <View
                    style={{
                      width: widthPercentageToDP(3),
                      height: widthPercentageToDP(3),
                    }}
                  />
                )}
                <View
                  style={{
                    marginLeft: widthPercentageToDP(0.5),
                  }}>
                  <HTML
                    html={option2}
                    classesStyles={{
                      regular: {
                        //fontSize: widthPercentageToDP(2.5),
                        fontFamily: fonts.novaRegular,
                        color: '#000',
                      },
                      bold: {
                        //fontSize: widthPercentageToDP(2.5),
                        fontFamily: fonts.novaBold,
                        fontWeight: 'normal',
                        color: '#000',
                      },
                      round: {
                        //fontSize: widthPercentageToDP(2.5),
                        fontFamily: fonts.elegance,
                        color: '#000',
                      },
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '20%',
                }}
                disabled={isAttempt ? true : false}
                onPress={clickHandler3}>
                {isCorrect === 'c' || isCorrect === 'c y d' ? (
                  <Image
                    style={{
                      width: widthPercentageToDP(3),
                      height: widthPercentageToDP(3),
                    }}
                    resizeMode="stretch"
                    source={require('../../Images/correct.png')}
                  />
                ) : isOption1 === 'answer3' ? (
                  <Image
                    style={{
                      width: widthPercentageToDP(3),
                      height: widthPercentageToDP(3),
                    }}
                    resizeMode="stretch"
                    source={require('../../Images/cross.png')}
                  />
                ) : (
                  <View
                    style={{
                      width: widthPercentageToDP(3),
                      height: widthPercentageToDP(3),
                    }}
                  />
                )}
                <View
                  style={{
                    marginLeft: widthPercentageToDP(0.5),
                  }}>
                  <HTML
                    html={option3}
                    classesStyles={{
                      regular: {
                        //fontSize: widthPercentageToDP(2.5),
                        fontFamily: fonts.novaRegular,
                        color: '#000',
                      },
                      bold: {
                        //fontSize: widthPercentageToDP(2.5),
                        fontFamily: fonts.novaBold,
                        fontWeight: 'normal',
                        color: '#000',
                      },
                      round: {
                        //fontSize: widthPercentageToDP(2.5),
                        fontFamily: fonts.elegance,
                        color: '#000',
                      },
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '20%',
                }}
                disabled={isAttempt ? true : false}
                onPress={clickHandler4}>
                {isCorrect === 'd' || isCorrect === 'c y d' ? (
                  <Image
                    style={{
                      width: widthPercentageToDP(3),
                      height: widthPercentageToDP(3),
                    }}
                    resizeMode="stretch"
                    source={require('../../Images/correct.png')}
                  />
                ) : isOption1 === 'answer4' ? (
                  <Image
                    style={{
                      width: widthPercentageToDP(3),
                      height: widthPercentageToDP(3),
                    }}
                    resizeMode="stretch"
                    source={require('../../Images/cross.png')}
                  />
                ) : (
                  <View
                    style={{
                      width: widthPercentageToDP(3),
                      height: widthPercentageToDP(3),
                    }}
                  />
                )}
                <View
                  style={{
                    marginLeft: widthPercentageToDP(0.5),
                  }}>
                  <HTML
                    html={option4}
                    classesStyles={{
                      regular: {
                        //fontSize: widthPercentageToDP(2.5),
                        fontFamily: fonts.novaRegular,
                        color: '#000',
                      },
                      bold: {
                        //fontSize: widthPercentageToDP(2.5),
                        fontFamily: fonts.novaBold,
                        fontWeight: 'normal',
                        color: '#000',
                      },
                      round: {
                        //fontSize: widthPercentageToDP(2.5),
                        fontFamily: fonts.elegance,
                        color: '#000',
                      },
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {isOption1 && (
              <View
                style={{
                  marginTop: widthPercentageToDP(0),
                  marginLeft: widthPercentageToDP(0),
                  marginRight: widthPercentageToDP(5),
                  marginBottom: widthPercentageToDP(10),
                }}>
                <HTML
                  html={description}
                  classesStyles={{
                    regular: {
                      //fontSize: widthPercentageToDP(2.5),
                      fontFamily: fonts.novaRegular,
                      color: '#000',
                    },
                    bold: {
                      //fontSize: widthPercentageToDP(2.5),
                      fontFamily: fonts.novaBold,
                      fontWeight: 'normal',
                      color: '#000',
                    },
                    round: {
                      //fontSize: widthPercentageToDP(2.5),
                      fontFamily: fonts.elegance,
                      color: '#000',
                    },
                  }}
                  tagsStyles={{
                    p: {
                      padding: 6,
                    },
                    span: {
                      //fontSize: Platform.isPad ? widthPercentageToDP(2.5) : widthPercentageToDP(4),
                      flexDirection: 'row',
                    },
                    tap: {
                      fontSize: DeviceInfo.isTablet()
                        ? widthPercentageToDP(2)
                        : widthPercentageToDP(1.5),
                    },
                  }}
                />
              </View>
            )}
          </ScrollView2>
        </View>
      </View>
    );
  }
}
