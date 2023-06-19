import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import { fonts } from '../../utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  topView: {
    width: '100%',
    height: '15%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    //backgroundColor:"red"
    // justifyContent: "space-between",
    //marginLeft: widthPercentageToDP(2),
    //marginRight: widthPercentageToDP(2),
  },
  centerView: {
    flexDirection: 'row',
    // alignItems:"center",
    width: '100%',
    height: '67%',
    //backgroundColor: "yellow"
  },
  bottomView: {
    width: '100%',
    height: '23%',
    marginTop: widthPercentageToDP(1),
    //backgroundColor:"green",
  },
  logoView: {
    flexDirection: 'row-reverse',
  },
  logo: {
    width: heightPercentageToDP(55),
    height: widthPercentageToDP(12),
  },
  title: {
    fontSize: heightPercentageToDP(5),
    fontFamily: fonts.elegance,
    color: '#000',
    textAlign: 'center',
  },
  centerLeftView: {
    width: '30%',
    height: '100%',
    //backgroundColor: "blue",
  },
  centerRightView: {
    width: '30%',
    height: '100%',
    //backgroundColor: "green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: widthPercentageToDP(3),
    marginRight: widthPercentageToDP(3),
  },
  pointViewMiddlle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: widthPercentageToDP(3.1),
    marginRight: widthPercentageToDP(3),
    marginTop: widthPercentageToDP(3),
  },
  pointViewMiddlle2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: widthPercentageToDP(3),
    marginRight: widthPercentageToDP(-3),
    marginTop: widthPercentageToDP(3),
  },
  pointViewBottom: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    bottom: '23%',
    alignItems: 'center',
    marginLeft: widthPercentageToDP(3),
    marginRight: widthPercentageToDP(3),
  },
  passFailView: {
    position: 'absolute',
    bottom: '2%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textUnBold: {
    fontSize: heightPercentageToDP(4),
    fontFamily: fonts.elegance,
    color: '#000',
  },
  textBold: {
    fontSize: heightPercentageToDP(3.5),
    fontFamily: fonts.novaBold,
    color: '#000',
    marginLeft: heightPercentageToDP(8),
    marginTop: widthPercentageToDP(0.5),
  },
  textBold1: {
    fontSize: heightPercentageToDP(3),
    fontFamily: fonts.novaBold,
    color: '#000',
    marginLeft: widthPercentageToDP(9),
  },
  textBold2: {
    fontSize: heightPercentageToDP(3.5),
    fontFamily: fonts.novaBold,
    color: '#000',
    marginLeft: heightPercentageToDP(12),
    marginTop: widthPercentageToDP(0.5),
  },
  textBold3: {
    fontSize: heightPercentageToDP(5),
    fontFamily: fonts.novaBold,
    color: '#000',
    marginLeft: widthPercentageToDP(7),
  },
  textUnBold3: {
    fontSize: heightPercentageToDP(5),
    fontFamily: fonts.novaBold,
    color: '#000',
    marginTop: widthPercentageToDP(1),
  },
  smallText: {
    fontSize: heightPercentageToDP(2.5),
    fontFamily: fonts.elegance,
    color: '#000',
    marginTop: widthPercentageToDP(1),
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: heightPercentageToDP(60),
    height: widthPercentageToDP(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage2: {
    width: heightPercentageToDP(60),
    height: widthPercentageToDP(15),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightPercentageToDP(5),
  },
  passFailImage: {
    width: heightPercentageToDP(30),
    height: heightPercentageToDP(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginTop: heightPercentageToDP(10),
  },
  btnText: {
    fontSize: heightPercentageToDP(6),
    fontFamily: fonts.novaBold,
    color: '#fff',
  },
  btnText2: {
    fontSize: heightPercentageToDP(6),
    fontFamily: fonts.novaBold,
    color: '#000',
  },
  centerMainView: {
    width: '40%',
    height: '100%',
    //backgroundColor: "yellow",
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  graphMain: {
    width: '25%',
    height: '100%',
    //backgroundColor: "orange",
  },
  graphView: {
    width: '100%',
    position: 'absolute',
    bottom: '0%',
  },
  graphText: {
    fontSize: heightPercentageToDP(3.5),
    fontFamily: fonts.novaBold,
    color: '#000',
    position: 'absolute',
    bottom: '0%',
    left: '30%',
  },
  graphHeight: {
    width: '100%',
    height: '70%',
    position: 'absolute',
    bottom: '30%',
  },
  graphBottom: {
    width: '100%',
    height: '20%',
    position: 'absolute',
    bottom: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphImage: {
    width: heightPercentageToDP(6),
    height: heightPercentageToDP(6),
  },
  nullText: {
    fontSize: heightPercentageToDP(4),
    fontFamily: fonts.novaBold,
    color: '#000',
  },
});
