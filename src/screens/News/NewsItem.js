import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Component/MakeMeResponsive';
import LinearGradient from 'react-native-linear-gradient';
import HTML from 'react-native-render-html';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import {fonts} from '../../utils'

export default class Directory extends React.Component {
  render() {
    const {news, img, date, status} = this.props;
    const myHtml = `<p class="last-paragraph">Finally, this paragraph is styled through the classesStyles prop</p>`;
    // const myHtml = `
    // <p>
    // <span class="regular" style="">This is regular font.<br />
    // <span class="round" style="">This is bold font.<br />
    // <span class="round" style="">This is rounded font.</span>
    // </span></span></p>`
    return (
      <LinearGradient
        style={{
          flex: 0,
          //height: widthPercentageToDP(20),
          width: widthPercentageToDP(95),
          marginBottom: widthPercentageToDP(2),
          borderRadius: widthPercentageToDP(1.5),
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={
          status === 'unseen' ? ['#659ece', '#80b6dc'] : ['#cacaca', '#e9e9e9']
        }>
        <View
          style={{
            paddingLeft: widthPercentageToDP(2),
            paddingRight: widthPercentageToDP(2),
            paddingTop: widthPercentageToDP(2),
          }}>
          <HTML
            html={news}
            classesStyles={{
              regular: {
                //fontSize: widthPercentageToDP(5),
                fontFamily: fonts.novaRegular,
                color: status === 'unseen' ? '#ffff' : '#000',
              },
              bold: {
                //fontSize: widthPercentageToDP(5),
                fontFamily: fonts.novaBold,
                fontWeight: 'normal',
                color: status === 'unseen' ? '#ffff' : '#000',
              },
              round: {
                //fontSize: widthPercentageToDP(5),
                fontFamily: fonts.elegance,
                color: status === 'unseen' ? '#ffff' : '#000',
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
        <View
          style={{
            marginTop: heightPercentageToDP(2),
            marginBottom: heightPercentageToDP(1),
          }}>
          <Text
            style={{
              position: 'absolute',
              bottom: '1%',
              right: '1%',
              fontSize: widthPercentageToDP(3),
              fontFamily: fonts.novaRegular,
              color: status === 'unseen' ? '#ffff' : '#000',
            }}>
            {moment(date).format('D/M/YYYY')}
          </Text>
        </View>
      </LinearGradient>
    );
  }
}
