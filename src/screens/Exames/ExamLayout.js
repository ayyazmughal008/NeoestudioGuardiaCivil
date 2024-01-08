import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Component/MakeMeResponsive';
import {fonts} from '../../utils';

export default class Course extends React.Component {
  render() {
    const {
      text,
      clickHandler,
      status,
      activeStatus,
      studentExamStatus,
      onLongPres,
      examStatus,
      isApto,
    } = this.props;
    return (
      <View
        style={{
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={clickHandler}
          disabled={
            studentExamStatus
              ? false
              : status === 'Deshabilitado'
              ? true
              : false
          }
          onLongPress={onLongPres}
          delayLongPress={1001}>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontFamily:
                activeStatus === 'true'
                  ? fonts.novaBold
                  : isApto === 'APTO'
                  ? fonts.novaBold
                  : isApto === 'NO APTO'
                  ? fonts.novaBold
                  : status === 'Habilitado'
                  ? fonts.novaRegular
                  : studentExamStatus
                  ? fonts.novaBold
                  : fonts.novaRegular,
              color:
                activeStatus === 'true'
                  ? '#0A52CB'
                  : isApto === 'APTO'
                  ? '#008300'
                  : isApto === 'NO APTO'
                  ? '#252525'
                  : examStatus === 'paused'
                  ? '#252525'
                  : status === 'Habilitado'
                  ? '#202020'
                  : studentExamStatus
                  ? '#202020'
                  : '#202020',
              marginTop: heightPercentageToDP(1),
              //fontWeight: studentExamStatus ? 'bold' : status === "Deshabilitado" ? "300" : "bold"
            }}>
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
