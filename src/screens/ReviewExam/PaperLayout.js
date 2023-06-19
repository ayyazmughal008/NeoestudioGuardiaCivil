import React from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import HTML from 'react-native-render-html';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import FastImage from 'react-native-fast-image';
import ScrollView2 from 'rn-faded-scrollview';
import DeviceInfo from 'react-native-device-info';
import WebView from 'react-native-webview';
import { fonts } from '../../utils';

export default class PaperLayout extends React.Component {
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
      correct,
      description,
    } = this.props;
    return (
      <View
        style={{
          width: '100%',
          height: '81%',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <ScrollView2
            contentContainerStyle={{flexGrow: 1}}
            allowStartFade={true}
            fadeColors={[
              'rgba(255,255,255, 0.18)',
              'rgba(255,255,255, 0.6)',
              'rgba(255,255,255, 0.9)',
            ]}
            fadeSize={20}>
            <View
              style={{
                marginRight: widthPercentageToDP(3),
                marginTop: widthPercentageToDP(-1),
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
                    textAlign: 'justify',
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
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: DeviceInfo.isTablet()
                  ? widthPercentageToDP(1)
                  : widthPercentageToDP(-1),
                marginRight: widthPercentageToDP(3),
              }}
              disabled={true}
              onPress={clickHandler1}>
              {correct === 'a' || correct === 'a y b' ? (
                <FastImage
                  style={{
                    width: widthPercentageToDP(4),
                    height: widthPercentageToDP(3),
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                  source={require('../../Images/correct.png')}
                />
              ) : isOption1 === 'answer1' ? (
                <FastImage
                  style={{
                    width: widthPercentageToDP(4),
                    height: widthPercentageToDP(3),
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                  source={require('../../Images/cross.png')}
                />
              ) : (
                <View
                  style={{
                    width: widthPercentageToDP(4),
                    height: widthPercentageToDP(3),
                  }}
                />
              )}
              <View
                style={{
                  marginLeft: widthPercentageToDP(0.5),
                  marginRight: widthPercentageToDP(5),
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
                  tagsStyles={{
                    p: {
                      padding: 10,
                      textAlign: 'justify',
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
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: DeviceInfo.isTablet()
                  ? widthPercentageToDP(1)
                  : widthPercentageToDP(-2),
                marginRight: widthPercentageToDP(3),
              }}
              disabled={true}
              onPress={clickHandler2}>
              {correct === 'b' || correct === 'a y b' ? (
                <FastImage
                  style={{
                    width: widthPercentageToDP(4),
                    height: widthPercentageToDP(3),
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                  source={require('../../Images/correct.png')}
                />
              ) : isOption1 === 'answer2' ? (
                <FastImage
                  style={{
                    width: widthPercentageToDP(4),
                    height: widthPercentageToDP(3),
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                  source={require('../../Images/cross.png')}
                />
              ) : (
                <View
                  style={{
                    width: widthPercentageToDP(4),
                    height: widthPercentageToDP(3),
                  }}
                />
              )}
              <View
                style={{
                  marginLeft: widthPercentageToDP(0.5),
                  marginRight: widthPercentageToDP(5),
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
                  tagsStyles={{
                    p: {
                      padding: 10,
                      textAlign: 'justify',
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
            </TouchableOpacity>
            {option3 !== '' && (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: DeviceInfo.isTablet()
                    ? widthPercentageToDP(1)
                    : widthPercentageToDP(-2),
                }}
                disabled={true}
                onPress={clickHandler3}>
                {correct === 'c' || correct === 'c y d' ? (
                  <FastImage
                    style={{
                      width: widthPercentageToDP(4),
                      height: widthPercentageToDP(3),
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
                    source={require('../../Images/correct.png')}
                  />
                ) : isOption1 === 'answer3' ? (
                  <FastImage
                    style={{
                      width: widthPercentageToDP(4),
                      height: widthPercentageToDP(3),
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
                    source={require('../../Images/cross.png')}
                  />
                ) : (
                  <View
                    style={{
                      width: widthPercentageToDP(4),
                      height: widthPercentageToDP(3),
                    }}
                  />
                )}
                <View
                  style={{
                    marginLeft: widthPercentageToDP(0.5),
                    marginRight: widthPercentageToDP(5),
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
                    tagsStyles={{
                      p: {
                        padding: 10,
                        textAlign: 'justify',
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
              </TouchableOpacity>
            )}
            {option4 !== '' && (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: DeviceInfo.isTablet()
                    ? widthPercentageToDP(1)
                    : widthPercentageToDP(-2),
                  marginRight: widthPercentageToDP(3),
                }}
                disabled={true}
                onPress={clickHandler4}>
                {correct === 'd' || correct === 'c y d' ? (
                  <Image
                    style={{
                      width: widthPercentageToDP(4),
                      height: widthPercentageToDP(3),
                    }}
                    resizeMode="stretch"
                    source={require('../../Images/correct.png')}
                  />
                ) : isOption1 === 'answer4' ? (
                  <Image
                    style={{
                      width: widthPercentageToDP(4),
                      height: widthPercentageToDP(3),
                    }}
                    resizeMode="stretch"
                    source={require('../../Images/cross.png')}
                  />
                ) : (
                  <View
                    style={{
                      width: widthPercentageToDP(4),
                      height: widthPercentageToDP(3),
                    }}
                  />
                )}
                <View
                  style={{
                    marginLeft: widthPercentageToDP(0.5),
                    marginRight: widthPercentageToDP(5),
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
                    tagsStyles={{
                      p: {
                        padding: 10,
                        textAlign: 'justify',
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
              </TouchableOpacity>
            )}
            <View
              style={{
                marginLeft: widthPercentageToDP(0),
                marginRight: widthPercentageToDP(5),
                marginTop: DeviceInfo.isTablet()
                  ? widthPercentageToDP(1)
                  : widthPercentageToDP(-1),
              }}>
              {/* <WebView
                                source={{ html: description }}
                                // underlayColor={'transparent'}
                                // automaticallyAdjustContentInsets={false}
                                // contentInset={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                // opaque={false}
                            /> */}
              <HTML
                html={description}
                classesStyles={{
                  regular: {
                    //fontSize: widthPercentageToDP(2),
                    fontFamily: fonts.novaRegular,
                    color: '#000',
                  },
                  bold: {
                    //fontSize: widthPercentageToDP(2),
                    fontFamily: fonts.novaBold,
                    fontWeight: 'normal',
                    color: '#000',
                  },
                  round: {
                    //fontSize: widthPercentageToDP(2),
                    fontFamily: fonts.elegance,
                    color: '#000',
                  },
                }}
                tagsStyles={{
                  p: {
                    padding: 6,
                    //textAlign: "justify"
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
          </ScrollView2>
        </View>
      </View>
    );
  }
}
