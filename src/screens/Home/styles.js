import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import { fonts } from '../../utils';
export const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
  },
  bg: {
    position: 'absolute',
    zIndex: 1000,
    width: '100%',
    height: '100%',
    //width: widthPercentageToDP(100),
    //height: heightPercentageToDP(100)
  },
  logo: {
    width: widthPercentageToDP(83),
    height: heightPercentageToDP(9),
    position: 'absolute',
    right: '1%',
    top: '0%',
  },
  menuView: {
    flex: 1,
    marginTop: heightPercentageToDP(0),
    alignItems: 'center',
  },
  modalMain: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerModal2: {
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(45),
  },
  quesBox: {
    width: widthPercentageToDP(90),
    height: widthPercentageToDP(52),
    alignItems: 'center',
    marginLeft: widthPercentageToDP(4),
  },
  textView: {
    marginTop: widthPercentageToDP(7),
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(15),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthPercentageToDP(4),
  },
  text2: {
    color: '#000',
    fontFamily: fonts.novaBold,
    fontSize: widthPercentageToDP(4.5),
    width: widthPercentageToDP(75),
    flexDirection: 'row',
    textAlign: 'justify',
  },
  square: {
    width: widthPercentageToDP(5),
    height: widthPercentageToDP(5),
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: widthPercentageToDP(0.5),
    borderColor: '#000',
    marginLeft: widthPercentageToDP(5),
    marginTop: heightPercentageToDP(1),
  },
  tick: {
    width: widthPercentageToDP(4),
    height: widthPercentageToDP(4),
  },
  confirmBtn: {
    width: widthPercentageToDP(25),
    height: heightPercentageToDP(5),
    marginTop: heightPercentageToDP(0),
    marginBottom: widthPercentageToDP(1.5),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '3%',
  },
  confirmStyle: {
    width: widthPercentageToDP(60),
    height: heightPercentageToDP(10),
    //marginTop:heightPercentageToDP(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmText: {
    color: '#ffff',
    fontFamily: fonts.novaRegular,
    fontSize: widthPercentageToDP(3.5),
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
  headerView: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(9),
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Platform.OS === 'android' ? 0: heightPercentageToDP(5)
  },
  menu: {
    position: 'absolute',
    top: '20%',
    left: '3%',
  },
  modalMain2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:"red"
  },
  innerModal2: {
    width: '100%',
    height: '100%',
    marginBottom: widthPercentageToDP(10),
    marginLeft: widthPercentageToDP(5),
    marginRight: widthPercentageToDP(5),
  },
  navigation: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
  },
  topModal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: widthPercentageToDP(100),
    marginTop: Platform.OS === 'android' ? heightPercentageToDP(5) : heightPercentageToDP(10),
    marginLeft: widthPercentageToDP(3),
  },
  navigationHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    right: '5%',
    zIndex:3
  },
  loaderStyle: {
    width: widthPercentageToDP(8),
    height: widthPercentageToDP(8),
    marginRight: widthPercentageToDP(3),
  },
  mainModalView: {
    flex: 1,
    //marginTop: heightPercentageToDP(10)
  },
  titleText: {
    fontSize: widthPercentageToDP(6),
    fontFamily: fonts.elegance,
    color: '#ffff',
    textAlign: 'center',
    marginTop: heightPercentageToDP(1),
    marginBottom: widthPercentageToDP(4),
  },
  jump: {marginBottom: heightPercentageToDP(30)},
  topJump: {
    height: heightPercentageToDP(4),
  },
  modalTitle: {
    width: widthPercentageToDP(100),
    // position: "absolute",
    // left: "4%",
    // top: '4%'
    marginLeft: widthPercentageToDP(3),
  },
  modalTileView: {
    width: widthPercentageToDP(40),
  },
  modalTitleDetail: {
    width: widthPercentageToDP(60),
  },
  ModalTitleText3: {
    fontSize: widthPercentageToDP(4.3),
    fontFamily: fonts.novaBold,
    color: '#ffff',
    marginLeft: widthPercentageToDP(3),
  },
  ModalTitleText: {
    fontSize: widthPercentageToDP(4),
    fontFamily: fonts.elegance,
    color: '#ffff',
  },
  ModalTitleText2: {
    fontSize: widthPercentageToDP(4),
    fontFamily: fonts.elegance,
    color: '#ffff',
    fontWeight: 'bold',
    marginLeft: widthPercentageToDP(3),
  },
  topTitle: {
    fontSize: widthPercentageToDP(5),
    fontFamily: fonts.novaBold,
    color: '#ffff',
  },
  mainModal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  versionText: {
    position: 'absolute',
    bottom: '1%',
    right: '7%',
    fontSize: widthPercentageToDP(3.5),
    fontFamily: fonts.elegance,
    color: '#ffff',
    marginTop: heightPercentageToDP(10),
  },
  timerView: {
    width: widthPercentageToDP(95),
    height: heightPercentageToDP(8),
    alignSelf: 'center',
    marginTop: heightPercentageToDP(-3),
    //backgroundColor: "red"
  },
  preubaText: {
    fontSize: widthPercentageToDP(5),
    fontFamily: fonts.novaBold,
    color: '#000',
    marginLeft: widthPercentageToDP(1),
  },
});
