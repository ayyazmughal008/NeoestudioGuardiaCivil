import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Component/MakeMeResponsive';
import FastImage from 'react-native-fast-image';
import IconBadge from 'react-native-icon-badge';
import {Avatar, Badge} from 'react-native-elements';
import { fonts } from '../../utils';

export default class HomeMenu extends React.Component {
  render() {
    const {
      img,
      text,
      clickHandler,
      status,
      newsCount,
      chatCount,
      isChat,
      newItems,
      isNewItem,
      allAppCount,
      myStyle,
      myIndex,
      username,
      experience,
      aptos,
      puntos,
      percentage,
      avatarClick,
      profileAction,
      userPhoto,
      rankPhoto,
      rankName,
      isShow,
    } = this.props;
    if (myIndex == 0) {
      return (
        <View
          style={{
            width: widthPercentageToDP(90),
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={avatarClick}>
            {!userPhoto ? (
              <FastImage
                source={require('./assets/Photo_or_avatar.png')}
                resizeMode={FastImage.resizeMode.stretch}
                style={styles.bageImg}
              />
            ) : (
              <FastImage
                source={{
                  uri: 'https://neoestudio.net/public/userImage/' + userPhoto,
                }}
                resizeMode={FastImage.resizeMode.stretch}
                style={styles.bageImg}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={profileAction}
            style={{
              width: widthPercentageToDP(65),
              height: heightPercentageToDP(8),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginLeft: widthPercentageToDP(2),
              //backgroundColor: "red"
            }}>
            <View style={{alignItems: 'center'}}>
              {!rankPhoto ? (
                <FastImage
                  source={{
                    uri: 'https://neoestudio.net/gamification/1642874385.png',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.smallIcon}
                />
              ) : (
                <FastImage
                  source={{uri: 'https://neoestudio.net/' + rankPhoto}}
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.smallIcon}
                />
              )}
              <Text style={styles.smallTxt}>
                {!rankName ? 'Aspirante' : rankName}
              </Text>
              <Text style={styles.smallTxt2}>
                {!username ? '' : username.slice(0, 8)}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <FastImage
                source={require('../../Images/Timer.png')}
                resizeMode={FastImage.resizeMode.contain}
                style={styles.smallIcon}
              />
              <Text style={styles.smallTxt}>
                {!experience ? 0 : experience} {'h'}
              </Text>
              <Text style={styles.smallTxt2}>{'Tiempo'}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <FastImage
                source={require('./assets/Medallas.png')}
                resizeMode={FastImage.resizeMode.contain}
                style={styles.smallIcon}
              />
              <Text style={styles.smallTxt}>{!aptos ? 0 : aptos}</Text>
              <Text style={styles.smallTxt2}>{'Aptos'}</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginRight: widthPercentageToDP(2),
              }}>
              <FastImage
                source={require('./assets/Puntos.png')}
                resizeMode={FastImage.resizeMode.contain}
                style={styles.smallIcon}
              />
              <Text style={styles.smallTxt}>{!puntos ? 0 : puntos}</Text>
              <Text style={styles.smallTxt2}>{'Correctas'}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <FastImage
                source={require('./assets/Percentage.png')}
                resizeMode={FastImage.resizeMode.contain}
                style={[
                  styles.smallIcon,
                  {
                    width: widthPercentageToDP(11),
                    height: widthPercentageToDP(11),
                    marginTop: heightPercentageToDP(0.5),
                  },
                ]}
              />
              <Text
                style={[
                  styles.smallTxt,
                  {
                    marginTop: heightPercentageToDP(1.5),
                  },
                ]}>
                {!percentage ? 0 : percentage}
              </Text>
              <Text style={styles.smallTxt2}>{'Percentil'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (isShow) {
      return (
        <View
          style={{
            flex: 1,
            height: widthPercentageToDP(30),
          }}>
          <TouchableOpacity
            style={{
              width: widthPercentageToDP(100),
              height: widthPercentageToDP(30),
              alignItems: 'center',
              flexDirection: 'row',
            }}
            onPress={clickHandler}>
            {status ? (
              newsCount === 0 ? (
                <FastImage
                  source={img}
                  resizeMode={FastImage.resizeMode.stretch}
                  style={[styles.imgStyle, myStyle]}
                />
              ) : (
                <View>
                  <FastImage
                    source={img}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={[styles.imgStyle, myStyle]}
                  />
                  <Badge
                    status="error"
                    value={newsCount}
                    containerStyle={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                    }}
                  />
                </View>
              )
            ) : isChat ? (
              chatCount === 0 ? (
                <FastImage
                  source={img}
                  resizeMode={FastImage.resizeMode.stretch}
                  style={[styles.imgStyle, myStyle]}
                />
              ) : (
                <View>
                  <FastImage
                    source={img}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={[styles.imgStyle, myStyle]}
                  />
                  <Badge
                    status="error"
                    value={chatCount}
                    containerStyle={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                    }}
                  />
                </View>
              )
            ) : newItems ? (
              isNewItem ? (
                <View>
                  <FastImage
                    source={img}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={[styles.imgStyle, myStyle]}
                  />
                  <Badge
                    status="error"
                    value={allAppCount == 0 ? ' ' : allAppCount}
                    containerStyle={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                    }}
                  />
                </View>
              ) : (
                <FastImage
                  source={img}
                  resizeMode={FastImage.resizeMode.stretch}
                  style={[styles.imgStyle, myStyle]}
                />
              )
            ) : (
              <FastImage
                source={img}
                resizeMode={FastImage.resizeMode.stretch}
                style={[styles.imgStyle, myStyle]}
              />
            )}
            <Text
              style={{
                color: '#252525',
                fontSize: widthPercentageToDP(7),
                fontFamily: fonts.elegance,
                marginLeft: widthPercentageToDP(2),
              }}>
              {text}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  }
}
const styles = StyleSheet.create({
  imgStyle: {
    width: widthPercentageToDP(33),
    height: widthPercentageToDP(30),
  },
  bageImg: {
    width: widthPercentageToDP(23),
    height: widthPercentageToDP(23),
    borderRadius: widthPercentageToDP(4),
    //paddingTop:heightPercentageToDP(3)
  },
  smallIcon: {
    width: widthPercentageToDP(14),
    height: widthPercentageToDP(14),
  },
  smallTxt: {
    marginTop: heightPercentageToDP(0.5),
    color: '#252525',
    fontSize: widthPercentageToDP(3.5),
    fontFamily: fonts.novaBold,
  },
  smallTxt2: {
    marginTop: heightPercentageToDP(0.5),
    color: '#252525',
    fontSize: widthPercentageToDP(3),
    fontFamily: fonts.novaRegular,
  },
});
