import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import { fonts } from '../../utils';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
    width: '100%',
    height: '100%',
  },
  logo: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(10),
    //backgroundColor:"red",
    alignSelf: 'center',
    //aspectRatio: 1
  },
  keybordView: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginBottom:widthPercentageToDP(18)
    //backgroundColor: "#ffff",
  },
  loginView: {
    flex: 1,
    //width: widthPercentageToDP(100),
    //justifyContent: "center",
    //alignItems: "center",
    //marginTop: heightPercentageToDP(11),
    //backgroundColor:"red"
  },
  version: {
    width: widthPercentageToDP(80),
    //flexDirection: "row",
    //alignItems: "center",
    alignSelf: 'center',
    //paddingLeft: widthPercentageToDP(3)
    //backgroundColor:"red"
    //justifyContent: "space-between"
  },
  versionText: {
    fontSize: widthPercentageToDP(4),
    fontFamily: fonts.novaBold,
    color: '#fff',
  },
  switch: {
    width: widthPercentageToDP(30),
    height: widthPercentageToDP(10),
    marginLeft: widthPercentageToDP(5),
    //marginRight: widthPercentageToDP(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchText: {
    color: '#ffff',
    fontFamily: fonts.novaBold,
    fontSize: widthPercentageToDP(4),
    marginBottom: heightPercentageToDP(0.5),
  },
  question: {
    width: widthPercentageToDP(9),
    height: widthPercentageToDP(9),
    marginLeft: widthPercentageToDP(2),
  },
  loginSection: {
    //flex: 1,
    marginTop: widthPercentageToDP(0),
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(9),
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    //alignSelf:"center",
    //backgroundColor:"red"
  },
  loginSection2: {
    //flex: 1,
    marginTop: widthPercentageToDP(-2),
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(9),
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //alignSelf:"center",
    //backgroundColor:"red"
  },
  email: {
    width: '10%',
    height: '60%',
    marginLeft: widthPercentageToDP(4),
  },
  telphone: {
    width: '7%',
    height: '40%',
    marginLeft: widthPercentageToDP(4),
  },
  user: {
    width: '8%',
    height: '50%',
    marginLeft: widthPercentageToDP(4),
  },
  password: {
    width: '7%',
    height: '45%',
    marginLeft: widthPercentageToDP(5),
  },
  input: {
    width: '80%',
    height: '90%',
    color: '#000',
    fontFamily: fonts.novaBold,
    fontSize: widthPercentageToDP(4.5),
    fontWeight: 'normal',
    paddingRight: widthPercentageToDP(10),
    //backgroundColor:"red"
  },
  inputStyles: {
    color: '#000',
    fontFamily: fonts.novaBold,
    fontSize: widthPercentageToDP(4),
  },
  inputConatiner: {
    borderBottomWidth: widthPercentageToDP(0),
  },
  placeHolderStyles: {
    color: '#000',
    fontFamily: fonts.novaRegular,
    fontSize: widthPercentageToDP(5),
  },
  button: {
    width: '100%',
    height: '100%',
    //marginTop: heightPercentageToDP(5)
  },
  btnStyle: {
    //marginTop:heightPercentageToDP(2),
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentageToDP(100),
    height: widthPercentageToDP(25),
    alignSelf: 'center',
    //backgroundColor:"yellow"
    //marginTop: heightPercentageToDP(4),
  },
  btnText: {
    fontSize: widthPercentageToDP(7),
    fontFamily: fonts.novaBold,
    color: '#ffff',
    textAlign: 'center',
    marginTop: widthPercentageToDP(-11),
  },
  quesText: {
    fontSize: widthPercentageToDP(10),
    fontFamily: fonts.novaBold,
    color: 'grey',
    marginTop: widthPercentageToDP(-1),
    marginLeft: widthPercentageToDP(2),
  },
  quesBox: {
    width: widthPercentageToDP(80),
    height: widthPercentageToDP(60),
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop:heightPercentageToDP(5)
  },
  modalMain: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerModal: {
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(30),
    marginBottom: heightPercentageToDP(5),
    marginLeft: widthPercentageToDP(6),
  },
  text1: {
    marginTop: widthPercentageToDP(10),
    color: '#707070',
    fontFamily: fonts.novaRegular,
    marginLeft: widthPercentageToDP(-4),
    fontSize: widthPercentageToDP(4),
    width: widthPercentageToDP(70),
    padding: widthPercentageToDP(2),
    textAlign: 'justify',
  },
  text2: {
    color: '#000',
    fontFamily: fonts.novaBold,
    fontSize: widthPercentageToDP(4),
    marginLeft: widthPercentageToDP(-4),
    width: widthPercentageToDP(70),
    padding: widthPercentageToDP(2),
    textAlign: 'justify',
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
  linkTest: {
    fontSize: widthPercentageToDP(3),
    fontFamily: fonts.elegance,
    color: '#ffff',
    textAlign: 'center',
  },
  linkView: {
    width: widthPercentageToDP(90),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  emptyCheck: {
    width: widthPercentageToDP(8),
    height: widthPercentageToDP(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
