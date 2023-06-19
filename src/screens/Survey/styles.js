import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Component/MakeMeResponsive';
import {fonts} from '../../utils';
export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    right: '0%',
    top: Platform.OS === 'android' ? '0%' : '5%',
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(9),
  },
  directoryView: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(50),
    //flex: 1,
    alignItems: 'center',
    marginTop: heightPercentageToDP(5),
  },
  surveyView: {
    // width: widthPercentageToDP(100),
    // height: heightPercentageToDP(50),
    flex: 1,
    alignItems: 'center',
    marginTop: heightPercentageToDP(5),
    //backgroundColor:"red"
  },
  topView: {
    // width:widthPercentageToDP(100),
    // height:heightPercentageToDP(70)
    flex: 1,
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
  title: {
    paddingLeft: widthPercentageToDP(7),
    paddingRight: widthPercentageToDP(7),
    fontSize: widthPercentageToDP(4),
    marginTop: widthPercentageToDP(3),
    fontFamily: fonts.elegance,
    color: '#000',
  },
  bottomView: {
    position: 'absolute',
    bottom: '5%',
    alignItems: 'center',
    width: widthPercentageToDP(100),
    height: widthPercentageToDP(10),
  },

  bottomBtn: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(10),
    //backgroundColor:"#e9e9e9",
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: widthPercentageToDP(65),
    height: heightPercentageToDP(10),
  },
  btnText: {
    fontSize: widthPercentageToDP(5),
    fontFamily: fonts.elegance,
    color: '#ffff',
  },
  dummyView: {
    height: heightPercentageToDP(5),
  },
});
