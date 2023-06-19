import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Component/MakeMeResponsive';

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
    // width:widthPercentageToDP(100),
    // height:heightPercentageToDP(48),
    flex: 1,
    alignItems: 'center',
    marginTop: heightPercentageToDP(4),
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
