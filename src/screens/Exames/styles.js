import { Platform, StyleSheet } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { Dimensions } from 'react-native'
let { height, width } = Dimensions.get('screen');
let min = (height < width) ? height : width;
let is_tablet = (min > 600) ? true : false;
import { fonts } from '../../utils';

export const styles = StyleSheet.create({
  btnText: {
    width: "100%",
    textAlign: "center",
    fontSize: widthPercentageToDP(5.5),
    fontWeight: "bold",
    color: "white",
    lineHeight: 19,
    position: "relative",
    fontFamily: fonts.novaRegular,
  },
  btnBackground: {
    height: heightPercentageToDP(10),
    width: widthPercentageToDP(60),
    alignContent: "center",
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center"
  },
  background: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center"
  },
  folderName: {
    fontSize: widthPercentageToDP(6),
    fontFamily: fonts.novaBold,
    color: "#000",
    textAlign: "center",
    marginTop: heightPercentageToDP(-0.5)
  },
  columView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  innerBottom: {
    width:widthPercentageToDP(100),
    height:heightPercentageToDP(8),
    alignItems: "center",
    backgroundColor: "transparent",
    position:"absolute",
    bottom:"2%"
  },
  bottomBtn: {
    alignItems: "center",
    flexDirection: "row",
    width: widthPercentageToDP(60),
    height: heightPercentageToDP(5),
  },
  mainView: {
    width:widthPercentageToDP(100),
    height:heightPercentageToDP(100),
    marginTop: heightPercentageToDP(1),
    //backgroundColor:"red"
  },
  headerView: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(9),
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop : Platform.OS === 'android' ? 0: heightPercentageToDP(5)
  },
  logo: {
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(9),
    position: "absolute",
    right: "1%",
    top: "0%"
  },
  menu: {
    position: "absolute",
    top: "20%",
    left: "3%"
  },
  modalMain: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerModal: {
    width: "100%",
    height: "100%",
    marginBottom: widthPercentageToDP(10),
    marginLeft: widthPercentageToDP(5),
    marginRight: widthPercentageToDP(5)
  },
  navigation: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100)
  },
  topModal: {
    flexDirection: "row-reverse",
    marginTop: heightPercentageToDP(5),
    marginRight: Platform.OS === 'android' ? widthPercentageToDP(10) : heightPercentageToDP(10)
  },
  navigationHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginRight: widthPercentageToDP(5),
    marginTop: Platform.OS === 'android' ? 0 : heightPercentageToDP(3),
    //backgroundColor:"red"
    // position: "absolute",
    // right: "4%",
    // top: "4%"
  },
  loaderStyle: {
    width: widthPercentageToDP(8),
    height: widthPercentageToDP(8),
    marginRight: widthPercentageToDP(3)
  },
  mainModalView: {
    flex: 1,
    marginTop: heightPercentageToDP(2)
  },
  titleText: {
    fontSize: widthPercentageToDP(6),
    fontFamily: fonts.elegance,
    color: "#ffff",
    textAlign: "center",
    marginTop: heightPercentageToDP(1),
    marginBottom: widthPercentageToDP(4)
  },
  jump: { marginBottom: heightPercentageToDP(30) },
  viewHeight: {
    marginTop: heightPercentageToDP(4)
  },
  courseItem:{
     width:widthPercentageToDP(100),
     alignItems: "center", 
     flexDirection:"row",
     marginLeft:widthPercentageToDP(2) 
    },
    topHeight:{
      marginTop:heightPercentageToDP(37),
      //backgroundColor:"red"
    }
})
export default styles;