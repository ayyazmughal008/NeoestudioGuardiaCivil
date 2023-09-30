import React from 'react';
import {View, TouchableOpacity, Text, Platform} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from '../MakeMeResponsive';
import Icon from 'react-native-vector-icons/AntDesign';
import {fonts} from '../../utils';

export default class Header extends React.Component {
  render() {
    const {iconName, leftClick, title, isActivity, isPdf} = this.props;
    return (
      <View
        style={{
          width: widthPercentageToDP(100),
          height: heightPercentageToDP(8),
          alignItems: 'center',
          //justifyContent:"center",
          flexDirection: 'row',
          marginTop: isPdf
            ? 0
            : isActivity
            ? heightPercentageToDP(2)
            : Platform.OS === 'android'
            ? heightPercentageToDP(5)
            : heightPercentageToDP(11),
        }}>
        <TouchableOpacity
          style={{
            marginLeft: widthPercentageToDP(3),
            alignItems: 'center',
          }}
          onPress={leftClick}>
          <Icon name={iconName} color="#707070" size={widthPercentageToDP(6)} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: widthPercentageToDP(5.5),
            fontFamily: fonts.elegance,
            color: '#252525',
            marginLeft: widthPercentageToDP(2.5),
            textAlign: 'center',
            marginTop: widthPercentageToDP(1.5),
          }}>
          {title}
        </Text>
      </View>
    );
  }
}
