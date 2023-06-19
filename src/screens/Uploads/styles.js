import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
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
  upDownView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: widthPercentageToDP(80),
    justifyContent: 'space-around',
    marginTop: heightPercentageToDP(4),
  },
  download: {
    width: widthPercentageToDP(25),
    height: heightPercentageToDP(17),
  },
  mainView: {
    flex: 1,
    marginTop: heightPercentageToDP(3),
    alignItems: 'center',
  },
  submitBtn: {
    width: widthPercentageToDP(60),
    height: heightPercentageToDP(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  subBtn: {
    marginBottom: widthPercentageToDP(5),
  },
  submitText: {
    fontSize: widthPercentageToDP(5),
    fontFamily: fonts.elegance,
    color: '#ffff',
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
});
