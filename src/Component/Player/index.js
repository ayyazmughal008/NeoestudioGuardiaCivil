import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from '../MakeMeResponsive';
import FastImage from 'react-native-fast-image';
import {Badge} from 'react-native-elements';
import {fonts} from '../../utils';

export default class Player extends React.Component {
  render() {
    const {title, img, clickHandler, isActive, count} = this.props;
    return (
      <TouchableOpacity
        style={{
          width: widthPercentageToDP(95),
          height: heightPercentageToDP(7),
          alignItems: 'center',
          //justifyContent: "space-between",
          flexDirection: 'row',
          marginTop: heightPercentageToDP(3),
        }}
        onPress={clickHandler}>
        {isActive ? (
          <View>
            <FastImage
              source={img}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: widthPercentageToDP(15),
                height: widthPercentageToDP(15),
              }}
            />
            <Badge
              status="error"
              value={'!'}
              containerStyle={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            />
          </View>
        ) : (
          <FastImage
            source={img}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: widthPercentageToDP(15),
              height: widthPercentageToDP(15),
            }}
          />
        )}
        <Text
          style={{
            flex: 1,
            flexWrap: 'wrap',
            flexShrink: 1,
            flexGrow: 1,
            fontSize: widthPercentageToDP(4),
            fontFamily: fonts.novaRegular,
            color: '#252525',
            marginLeft: widthPercentageToDP(2.5),
            //textAlign: "center",
            marginTop: widthPercentageToDP(1.5),
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}
