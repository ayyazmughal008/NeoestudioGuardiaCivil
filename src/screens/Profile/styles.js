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
  },
  logoView: {
    flexDirection: 'row-reverse',
  },
  logo: {
    position: 'absolute',
    right: '0%',
    top: Platform.OS === 'android' ? '0%' : '5%',
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(9),
  },

  searchMain: {
    marginTop: widthPercentageToDP(7),
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(8),
    alignItems: 'center',
    //backgroundColor:"red"
  },
  searchBar: {
    width: widthPercentageToDP(85),
    height: heightPercentageToDP(8),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  input: {
    width: widthPercentageToDP(60),
    height: heightPercentageToDP(8),
    padding: widthPercentageToDP(5),
    color: '#000',
    fontFamily: fonts.elegance,
    fontSize: widthPercentageToDP(4),
    //backgroundColor:"red"
  },
  searchImage: {
    width: widthPercentageToDP(15),
    height: heightPercentageToDP(7),
  },
  directoryView: {
    flex: 1,
    alignItems: 'center',
    marginTop: heightPercentageToDP(2),
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
