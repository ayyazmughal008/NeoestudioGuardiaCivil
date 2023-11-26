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
    flex: 1,
    width: widthPercentageToDP(100),
    //height:"100%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightPercentageToDP(0),
    //backgroundColor: "yellow"
  },
  batlleView: {
    flex: 1,
    width: widthPercentageToDP(100),
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
  btn: {
    width: widthPercentageToDP(80),
    height: widthPercentageToDP(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightPercentageToDP(2),
  },
  btnTxt: {
    fontSize: widthPercentageToDP(6.5),
    fontFamily: fonts.novaBold,
    color: '#fff',
  },
  createBtn: {
    width: widthPercentageToDP(60),
    height: widthPercentageToDP(17),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // position: "absolute",
    // bottom: "1%",
    // zIndex: 3
    //backgroundColor: "red"
  },
  createBtn: {
    width: widthPercentageToDP(60),
    height: widthPercentageToDP(17),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // position: "absolute",
    // bottom: "1%",
    // zIndex: 3
    //backgroundColor: "red"
  },
  // =============
  folderView: {
    width: widthPercentageToDP(90),
    marginLeft: widthPercentageToDP(6),
    marginTop: heightPercentageToDP(2),
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0,
  },
  vectorIcon3: {
    width: widthPercentageToDP(8.5),
    height: widthPercentageToDP(8.5),
  },
  vectorIcon2: {
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
  },
  folderName: {
    marginLeft: widthPercentageToDP(6),
    fontSize: widthPercentageToDP(5),
    fontFamily: fonts.elegance,
    color: '#000',
  },
  vectorIcon: {
    width: widthPercentageToDP(6),
    height: widthPercentageToDP(6),
  },
  operator: {
    fontSize: widthPercentageToDP(8),
    fontFamily: fonts.novaBold,
    color: '#ffffff',
  },
  operatorTxt: {
    fontSize: widthPercentageToDP(4),
    fontFamily: fonts.novaRegular,
    color: '#000',
  },
  box: {
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
    //borderRadius: widthPercentageToDP(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    width: widthPercentageToDP(13),
    height: widthPercentageToDP(12),
    //borderRadius: widthPercentageToDP(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
